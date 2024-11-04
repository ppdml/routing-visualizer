import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    type Edge,
    MarkerType,
    MiniMap,
    type Node,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    Position,
    ReactFlow,
    useEdgesState,
    useNodesState
} from "@xyflow/react";
import {useCallback} from "react";
import '@xyflow/react/dist/style.css';
import EdcNode from "./nodes/EdcNode.tsx";
import ServiceNode from "./nodes/ServiceNode.tsx";
import KafkaNode from "./nodes/KafkaNode.tsx";

const initialNodes: Node[] = [
    {
        id: 'krone',
        data: {label: 'Krone'},
        position: {x: -270, y: 0},
        style: {backgroundColor: 'rgba(63,149,205,0.2)', width: 450, height: 375, fontSize: 24},
        className: 'light',
    },
    {
        id: 'krone-telematics',
        type: 'service',
        targetPosition: Position.Bottom,
        data: {label: 'Telematics Service',
            bottomHandle: true,
            rightHandle: true,
            topHandle: true,
            leftHandle: true},
        position: {x: 5, y: 50},
        className: 'light',
        parentId: 'krone'
    },
    {
        id: 'krone-edc',
        type: 'edc',
        data: {
            label: 'Eclipse Dataspace Connector',
            bottomHandle: true,
            rightHandle: true,
            topHandle: true,
            leftHandle: true
        },
        position: {x: 5, y: 260},
        className: 'light',
        parentId: 'krone'
    },
    {
        id: 'krone-kafka',
        type: 'kafka',
        data: {label: 'Kafka Message Broker',
            bottomHandle: true,
            rightHandle: true,
            topHandle: true,
            leftHandle: true},
        sourcePosition: Position.Bottom,
        targetPosition: Position.Left,
        position: {x: 295, y: 200},
        className: 'light',
        parentId: 'krone'
    },
    {
        id: 'dfki',
        data: {label: 'DFKI'},
        position: {x: 0, y: 500},
        style: {backgroundColor: 'rgba(229,59,255,0.49)', width: 450, height: 375, fontSize: 24},
        className: 'light',
    },
    {
        id: 'dfki-iwt',
        type: 'service',
        data: {label: 'iWT-Agent',
            bottomHandle: true,
            rightHandle: true,
            topHandle: true,
            leftHandle: true},
        sourcePosition: Position.Top,
        targetPosition: Position.Left,
        position: {x: 5, y: 300},
        className: 'light',
        parentId: 'dfki'
    },
    {
        id: 'dfki-edc',
        type: 'edc',
        data: {
            label: 'Eclipse Dataspace Connector',
            bottomHandle: true,
            rightHandle: true,
            topHandle: true,
            leftHandle: true
        },
        position: {x: 5, y: 50},
        className: 'light',
        parentId: 'dfki',
    },
    {
        id: 'dfki-kafka',
        type: 'kafka',
        data: {label: 'Kafka Message Broker',
            bottomHandle: true,
            rightHandle: true,
            topHandle: true,
            leftHandle: true},
        targetPosition: Position.Left,
        sourcePosition: Position.Top,
        position: {x: 295, y: 175},
        className: 'light',
        parentId: 'dfki'
    },
    {
        id: 'tu',
        data: {label: 'TU-Dortmund'},
        position: {x: 270, y: 0},
        style: {backgroundColor: 'rgba(80,244,44,0.47)', width: 450, height: 375, fontSize: 24},
        className: 'light',
        zIndex: -50,
    },
    {
        id: 'tu-eta',
        type: 'service',
        position: {x: 295, y: 100},
        data: {label: 'ETA-Service',
            bottomHandle: true,
            rightHandle: true,
            topHandle: true,
            leftHandle: true},
        className: 'light',
        parentId: 'tu'
    },
    {
        id: 'tu-gateway',
        type: 'service',
        position: {x: 5, y: 75},
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        data: {label: 'ETA-Gateway',
            bottomHandle: true,
            rightHandle: true,
            topHandle: true,
            leftHandle: true},
        className: 'light',
        parentId: 'tu'
    },
    {
        id: 'tu-edc',
        type: 'edc',
        data: {
            label: 'Eclipse Dataspace Connector',
            bottomHandle: true,
            rightHandle: true,
            topHandle: true,
            leftHandle: true
        },
        position: {x: 5, y: 260},
        className: 'light',
        parentId: 'tu'
    },
    {
        id: 'tu-kafka',
        type: 'kafka',
        data: {label: 'Kafka Message Broker',
            bottomHandle: true,
            rightHandle: true,
            topHandle: true,
            leftHandle: true},
        position: {x: 295, y: 200},
        className: 'light',
        parentId: 'tu'
    },
];

const edgeStyle = {strokeWidth: 4, stroke: '#B908FF'};
const markerEnd = {type: MarkerType.ArrowClosed, color: '#B908FF', markerUnits: 'strokeWidth'};

const dataFlowEdges: Edge[] = [
    {
        id: 'krone-telematic-kafka',
        source: 'krone-telematics',
        sourceHandle: 'sourceBottom',
        target: 'krone-kafka',
        targetHandle: 'targetTop',
        animated: true,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 1}
    },
    {
        id: 'krone-kafka-dfki-iwt',
        source: 'krone-kafka',
        sourceHandle: 'sourceBottom',
        target: 'dfki-iwt',
        targetHandle: 'targetLeft',
        animated: true,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 1.1}
    },
    {
        id: 'dfki-iwt-kafka',
        source: 'dfki-iwt',
        sourceHandle: 'sourceRight',
        target: 'dfki-kafka',
        targetHandle: 'targetBottom',
        animated: true,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 0.7}
    },
    {
        id: 'dfki-kafka-tu-gateway',
        source: 'dfki-kafka',
        sourceHandle: 'sourceTop',
        target: 'tu-gateway',
        targetHandle: 'targetLeft',
        animated: true,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 1.1}
    },
    {
        id: 'tu-gateway-eta-service',
        source: 'tu-gateway',
        sourceHandle: 'sourceTop',
        target: 'tu-eta',
        targetHandle: 'targetTop',
        animated: true,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 0.5}
    },
    {
        id: 'tu-eta-service-gateway',
        source: 'tu-eta',
        sourceHandle: 'sourceBottom',
        target: 'tu-gateway',
        targetHandle: 'targetRight',
        animated: true,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 0.6}
    },
    {
        id: 'tu-gateway-kafka',
        source: 'tu-gateway',
        sourceHandle: 'sourceBottom',
        target: 'tu-kafka',
        targetHandle: 'targetLeft',
        animated: true,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 0.7}
    },
    {
        id: 'tu-kafka-dfki-iwt',
        source: 'tu-kafka',
        sourceHandle: 'sourceBottom',
        target: 'dfki-iwt',
        targetHandle: 'targetRight',
        animated: true,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 1}
    },
];

const assetCreationEdges: Edge[] = [
    {
        id: 'krone-telematic-edc',
        source: 'krone-telematics',
        sourceHandle: 'sourceBottom',
        target: 'krone-edc',
        targetHandle: 'targetTop',
        animated: true,
        markerStart: markerEnd,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 0.7}
    },
    {
        id: 'dfki-iwt-edc',
        source: 'dfki-iwt',
        sourceHandle: 'sourceTop',
        target: 'dfki-edc',
        targetHandle: 'targetBottom',
        animated: true,
        markerStart: markerEnd,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 0.7}
    },
    {
        id: 'tu-gateway-edc',
        source: 'tu-gateway',
        sourceHandle: 'sourceBottom',
        target: 'tu-edc',
        targetHandle: 'targetTop',
        animated: true,
        markerStart: markerEnd,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 0.7}
    },
    {
        id: 'dataspace-krone-dfki',
        source: 'krone-edc',
        sourceHandle: 'sourceBottom',
        target: 'dfki-edc',
        targetHandle: 'targetTop',
        animated: true,
        markerStart: markerEnd,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 0.7}
    },
    {
        id: 'dataspace-tu-dfki',
        source: 'tu-edc',
        sourceHandle: 'sourceBottom',
        target: 'dfki-edc',
        targetHandle: 'targetTop',
        animated: true,
        markerStart: markerEnd,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 0.7}
    },
    {
        id: 'dataspace-krone-tu',
        source: 'krone-edc',
        sourceHandle: 'sourceRight',
        target: 'tu-edc',
        targetHandle: 'targetLeft',
        animated: true,
        markerStart: markerEnd,
        markerEnd: markerEnd,
        style: edgeStyle,
        pathOptions: {curvature: 1}
    },
];

function GaiaxRoutingImage() {
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(assetCreationEdges);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    return (
        <>
            <div className="w-full h-[36rem]">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={{
                        edc: EdcNode,
                        kafka: KafkaNode,
                        service: ServiceNode
                    }}
                    elementsSelectable={false}
                    nodesFocusable={false}
                    nodesDraggable={false}
                    edgesFocusable={false}
                    edgesReconnectable={false}
                    draggable={false}

                    className="react-flow-subflows-example"
                    fitView
                >
                    <MiniMap/>
                    <Controls showInteractive={false}/>
                    <Background/>
                </ReactFlow>
            </div>
            <div className="w-full flex content-center justify-center space-x-4">
                <button
                    className="font-medium bg-gaiaPurple hover:bg-tuGreen text-white py-2 px-4 rounded transition duration-200 hover:ease-in-out motion-reduce:transition-none"
                    onClick={() => setEdges(assetCreationEdges)}>Data Space Contracting
                </button>
                <button
                    className="font-medium bg-gaiaPurple hover:bg-tuGreen text-white py-2 px-4 rounded transition duration-200 hover:ease-in-out motion-reduce:transition-none"
                    onClick={() => setEdges(dataFlowEdges)}>Data Flow (After Contract)
                </button>
            </div>
        </>
    );
}

export default GaiaxRoutingImage;