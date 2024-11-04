import {Handle, Position} from '@xyflow/react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function ServiceNode({data, isConnectable}) {
    return (
        <div className="bg-lime-200 border-lime-600 border-2 w-[150px] p-[10px] rounded-lg text-black text-center justify-center content-center">
            {data.topHandle &&
                <Handle
                    type="source"
                    position={Position.Top}
                    id="sourceTop"
                    isConnectable={isConnectable}
                />}
            {data.topHandle &&
                <Handle
                    type="target"
                    position={Position.Top}
                    id="targetTop"
                    isConnectable={isConnectable}
                />}
            {data.leftHandle &&
                <Handle
                    type="source"
                    position={Position.Left}
                    id="sourceLeft"
                    isConnectable={isConnectable}
                />}
            {data.leftHandle &&
                <Handle
                    type="target"
                    position={Position.Left}
                    id="targetLeft"
                    isConnectable={isConnectable}
                />}
            <div>
                <label htmlFor="text">{data.label}</label>
            </div>
            {data.bottomHandle &&
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="sourceBottom"
                    isConnectable={isConnectable}
                />}
            {data.bottomHandle &&
                <Handle
                    type="target"
                    position={Position.Bottom}
                    id="targetBottom"
                    isConnectable={isConnectable}
                />}
            {data.rightHandle &&
                <Handle
                    type="source"
                    position={Position.Right}
                    id="sourceRight"
                    isConnectable={isConnectable}
                />}
            {data.rightHandle &&
                <Handle
                    type="target"
                    position={Position.Right}
                    id="targetRight"
                    isConnectable={isConnectable}
                />}
        </div>
    )
        ;
}

export default ServiceNode;