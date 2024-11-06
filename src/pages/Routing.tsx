import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useState} from "react";
import {v4 as uuid} from 'uuid'
import RoutingRequestListItem from "../components/RoutingRequestListItem.tsx";
import RoutingResponseListItem from "../components/RoutingResponseListItem.tsx";


async function postRoutingRequest(startLat: number, startLong: number, endLat: number, endLong: number) {
    const body = {
        "records": [
            {
                "key": "routing-request",
                "value": {
                    "requestId": uuid(),
                    "routeLocations": [
                        {
                            "latitude": startLat,
                            "longitude": startLong,
                            "waitingTime": 0
                        },
                        {
                            "latitude": endLat,
                            "longitude": endLong,
                            "waitingTime": 0
                        }
                    ],
                    "metadata": {
                        "vehicleType": "CAR"
                    }
                }
            }
        ]
    }
    const res = await fetch('http://kafka-rest.gaiax.cluster.tsachweh.de/topics/tu-routing-request', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/vnd.kafka.json.v2+json',
            'Accept': 'application/vnd.kafka.v2+json'
        },
        body: JSON.stringify(body)
    })
}


async function createConsumer() {
    return fetch('http://kafka-rest.gaiax.cluster.tsachweh.de/consumers/cg1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/vnd.kafka.v2+json'
        },
        body: JSON.stringify({
            "name": "ci1",
            "format": "json",
            "auto.offset.reset": "earliest"
        })
    })
}

async function subscribeConsumer() {
    return fetch('http://kafka-rest.gaiax.cluster.tsachweh.de/consumers/cg1/instances/ci1/subscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/vnd.kafka.v2+json'
        },
        body: JSON.stringify({
            "topics": ["tu-routing-request", "tu-routing-response"]
        })
    })
}

async function clearConsumer() {
    return fetch('http://kafka-rest.gaiax.cluster.tsachweh.de/consumers/cg1/instances/ci1', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/vnd.kafka.v2+json'
        }
    })
}


function Routing() {
    const [routingRequests, setRoutingRequests] = useState([]);
    const [routingResponses, setRoutingResponses] = useState([]);
    const [startCoord, setStartCoord] = useState([52.312755058201034, 8.006472181577625]);
    const [endCoord, setEndCoord] = useState([52.312755058201034, 8.006472181577625]);

    const handleSendRoutingRequest = () => {
        return postRoutingRequest(startCoord[0], startCoord[1], endCoord[0], endCoord[1]);
    }
    useEffect(() => {
        createConsumer().then(() => {
            console.log('consumer created');
            subscribeConsumer().then(() => console.log('subscribed'));
        });
        const interval = setInterval(async () => {
            await fetch(`http://kafka-rest.gaiax.cluster.tsachweh.de/consumers/cg1/instances/ci1/records`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.kafka.json.v2+json'
                }
            }).then((response) => response.json()).then((data) => {
                for (const record of data) {
                    if (record.topic === 'tu-routing-request') {
                        setRoutingRequests(previousState => [record.value, ...previousState]);
                        console.log(routingRequests);
                    } else if (record.topic === 'tu-routing-response') {
                        setRoutingResponses(previousState => [record.value, ...previousState]);
                    }
                }
            });
        }, 2000);
        return () => {
            clearConsumer().then(() => console.log("subscription client cleared"));

            clearInterval(interval);
        };
    }, [routingRequests, routingResponses]);


    return (
        <div className="flex h-[calc(100vh-10rem)]">
            <div className="w-96 text-center m-2">
                <h1>Routing Requests</h1>
                {routingRequests.map((request, index) => (
                    <RoutingRequestListItem key={index} request={request} isEven={index % 2 == 0}/>
                ))}
            </div>

            <div className="w-96 text-center m-2">
                <h1>Routing Responses</h1>
                {routingResponses.map((response, index) => (
                    <RoutingResponseListItem key={index} response={response} isEven={index % 2 == 0}/>
                ))}
            </div>
            <div className="relative w-full h-[calc(100vh-10rem)] text-center">
                <MapContainer center={[52.312755058201034, 8.006472181577625]} zoom={13} scrollWheelZoom={false}
                              style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, zIndex: 0}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>

                <button onClick={handleSendRoutingRequest}
                        className="absolute top-1 right-1 m-2 rounded-lg bg-gaiaPurple p-2 text-white shadow shadow-slate-800 hover:bg-slate-100 hover:text-black hover:border-2 hover:border-gaiaPurple">Request Route
                </button>
            </div>

        </div>
    )
}

export default Routing;