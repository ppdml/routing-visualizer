import {useState} from "react";
import JsonView from "@uiw/react-json-view";


function RoutingResponseListItem(props: {
    response,
    isEven: boolean;
    handleMap: (geoJson: unknown) => void;
}) {
    const base = "m-1 p-1 bg-slate-100 rounded-lg";
    const even = base + " bg-slate-50";


    const [showModal, setShowModal] = useState(false);

    return (
        <div className={props.isEven ? base : even}>
            <h3 className="font-medium inline-block mb-1">{props.response.requestId}</h3>
            <div className="flex justify-around">
                <button onClick={() => props.handleMap(props.response)}
                    className="rounded-full border-gaiaPurple border-2 p-1 hover:shadow hover:shadow-gaiaPurple">Map
                </button>

                <button onClick={() => setShowModal(true)}
                    className="rounded-full border-gaiaPurple border-2 p-1 hover:shadow hover:shadow-gaiaPurple">Json
                </button>
                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl max-h-[calc(100vh-10rem)]">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-xl font-semibold">
                                            Json Answer: {props.response.requestId}
                                        </h3>
                                        <button
                                            className="p-1 ml-auto text-black text-xl leading-none font-semibold hover:drop-shadow-lg"
                                            onClick={() => setShowModal(false)}
                                        >×</button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto text-left">
                                        <JsonView value={props.response} enableClipboard={true} collapsed={false}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default RoutingResponseListItem;