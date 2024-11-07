import {GeoJSON, MapContainer, Marker, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useState} from "react";
import {v4 as uuid} from 'uuid'
import RoutingRequestListItem from "../components/RoutingRequestListItem.tsx";
import RoutingResponseListItem from "../components/RoutingResponseListItem.tsx";
import 'leaflet-contextmenu';
import 'leaflet-contextmenu/dist/leaflet.contextmenu.css';
import L from 'leaflet';


async function postRoutingRequest(startLat: number, startLong: number, endLat: number, endLong: number) {
    const body = {
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
    const res = await fetch('http://routing.gaiax.cs.tu-dortmund.de/routingRequest/', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    })
}


function Routing() {
    const [routingRequests, setRoutingRequests] = useState([]);
    const [routingResponses, setRoutingResponses] = useState([]);
    const [startCoord, setStartCoord] = useState(null);
    const [endCoord, setEndCoord] = useState(null);

    const handleSendRoutingRequest = () => {
        return postRoutingRequest(startCoord.lat, startCoord.lng, endCoord.lat, endCoord.lng);
    }
    useEffect(() => {
        const interval = setInterval(async () => {
            await fetch(`http://routing.gaiax.cs.tu-dortmund.de/caching/requests`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }).then((response) => response.json()).then((data) => {
                setRoutingRequests(data);
            });
            await fetch(`http://routing.gaiax.cs.tu-dortmund.de/caching/responses`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }).then((response) => response.json()).then((data) => {
                setRoutingResponses(data);
            });
        }, 2000);
        return () => {
            clearInterval(interval);
        };
    }, [routingRequests, routingResponses]);

    const [route, setRoute] = useState(null);

    function handleShowMap(geoJson) {
        setRoute({...geoJson});
    }

    function containsData(): boolean {
        return startCoord != null || endCoord != null || route != null;
    }

    function clearMapData() {
        setStartCoord(null);
        setEndCoord(null);
        setRoute(null);
    }

    return (
        <div className="flex">
            <div className="w-96 text-center m-2">
                <h1 className="mb-2">Routing Requests</h1>
                <div className="h-[calc(100vh-15rem)] overflow-y-scroll">
                    {routingRequests.map((request, index) => (
                        <RoutingRequestListItem key={index} request={request} isEven={index % 2 == 0}/>
                    ))}
                </div>
            </div>

            <div className="w-96 text-center m-2">
                <h1 className="mb-2">Routing Responses</h1>
                <div className="h-[calc(100vh-15rem)] overflow-y-scroll">
                    {routingResponses.map((response, index) => (
                        <RoutingResponseListItem key={index} response={response} isEven={index % 2 == 0}
                                                 handleMap={handleShowMap}/>
                    ))}
                </div>
            </div>
            <div className="relative w-full h-[calc(100vh-10rem)] text-center">
                <MapContainer center={[52.312755058201034, 8.006472181577625]} zoom={16} scrollWheelZoom={true}
                              contextmenu={true}
                              contextmenuItems={[
                                  {
                                      text: 'Routing Start',
                                      callback: (event) => {
                                          setStartCoord(event.latlng);
                                      }
                                  },
                                  {
                                      text: 'Routing End',
                                      callback: (event) => {
                                          setEndCoord(event.latlng);
                                      }
                                  }
                              ]}
                              style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, zIndex: 0}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {route && <GeoJSON data={route} key={route.requestId} pathOptions={{ color: '#B908FF' }}/>}

                    {startCoord && <Marker position={startCoord} draggable={true} icon={new L.Icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    })}/>}
                    {endCoord && <Marker position={endCoord} draggable={true} icon={new L.Icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    })}/>}
                </MapContainer>

                <div className="absolute top-1 right-1">
                    {startCoord && endCoord && <button onClick={handleSendRoutingRequest}
                                                       className="m-2 rounded-lg bg-gaiaPurple p-2 text-white shadow shadow-slate-800 hover:bg-slate-100 hover:text-black hover:border-2 hover:border-gaiaPurple">Request
                        Route
                    </button>}
                    {containsData() && <button
                        className="m-2 rounded-lg bg-gaiaPurple p-2 text-white shadow shadow-slate-800 hover:bg-slate-100 hover:text-black hover:border-2 hover:border-gaiaPurple"
                        onClick={clearMapData}>
                        Clear
                    </button>
                    }
                </div>

            </div>

        </div>
    )
}

export default Routing;