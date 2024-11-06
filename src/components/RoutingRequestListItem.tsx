


function RoutingRequestListItem(props: {
    request: { requestId: string; routeLocations: { latitude: number; longitude: number; }[]; },
    isEven: boolean;
}) {
    const base = "m-1 p-1 bg-slate-100 rounded-lg";
    const even = base + " bg-slate-50";
    return (
        <div className={props.isEven ? base : even}>
            <h3 className="font-medium inline-block mb-1">{props.request.requestId}</h3>
            <div className="flex justify-around">
                <div className="mb-1">
                    <h2 className="font-medium">Start</h2>
                    <p>{props.request.routeLocations[0].latitude.toFixed(5)}</p>
                    <p>{props.request.routeLocations[0].longitude.toFixed(5)}</p>
                </div>
                <div>
                    <h2 className="font-medium">End</h2>
                    <p>{props.request.routeLocations[1].latitude.toFixed(5)}</p>
                    <p>{props.request.routeLocations[1].longitude.toFixed(5)}</p>
                </div>
            </div>
        </div>
    );
}

export default RoutingRequestListItem;