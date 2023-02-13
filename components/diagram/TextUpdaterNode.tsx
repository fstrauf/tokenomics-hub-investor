import { useCallback } from 'react';
import { Handle, Position, useReactFlow, useNodeId } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data }) {

    const nodeId = useNodeId();
  const onChange = useCallback((evt) => {
    // console.log(evt.target.value);
    const inputVal =evt.target.value
    setNodes((nodes) =>
    nodes.map((node) => {
      if (node.id === nodeId) {
          return {
              ...node,
              data: {
                  inputVal,
              }
          }
      }

      return node;
    })
  );


  }, []);

  const {setNodes} = useReactFlow()

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        {/* <label htmlFor="text">Text:</label> */}
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default TextUpdaterNode;
