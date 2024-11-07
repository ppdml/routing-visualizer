import {Marker, useMapEvents} from "react-leaflet";
import {useState} from "react";

function LocationMarker() {
    const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 })

    const map = useMapEvents({
        click(event) {
            console.log(event.latlng);
            console.log(event.type);
            console.log(event.target);
        },
        locationfound(e) {
            const { lat, lng } = e.latlng;
            setPosition({
                latitude: lat,
                longitude: lng,
            })
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return (
        position.latitude !== 0 ?
            <Marker
                position={[position.latitude, position.longitude]}
                interactive={false}
            />

            : null
    )

}

export default LocationMarker;