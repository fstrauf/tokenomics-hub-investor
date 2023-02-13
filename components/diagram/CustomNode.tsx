import { memo } from 'react'
import { Handle, Position, NodeToolbar, useStore } from 'reactflow'

const selectedNodesSelector = (state) =>  
  Array.from(state.nodeInternals.values())
    .filter((node) => node.selected)
    .map((node) => node.id);

const CustomNode = ({ data }) => {
    const selectedNodeId = useStore(selectedNodesSelector)[0];
    console.log("🚀 ~ file: CustomNode.tsx:11 ~ CustomNode ~ selectedNodeIds", selectedNodeId)    
  return (
    <>
      <NodeToolbar
        isVisible={data.toolbarVisible}
        position={data.toolbarPosition}
      >
        {' '}
        <div>
          <input
            // value={nodeName}
            // onChange={(evt) => setNodeName(evt.target.value)}
          />
          <button>save</button>
        </div>
      </NodeToolbar>
      <div className="rounded-md border-2 border-stone-400 bg-white px-4 py-2 shadow-md">
        <div className="flex">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100"></div>
          <div className="ml-2">
            <div className="text-lg font-bold">{data.label}</div>
            {/* <div className="text-gray-500">{data.job}</div> */}
          </div>
        </div>

        <Handle
          type="target"
          position={Position.Top}
          className="w-16 !bg-teal-500"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-16 !bg-teal-500"
        />
      </div>
      {/*       
      <div style={{ padding: '10px 20px' }}>{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} /> */}
    </>
  )
}

export default memo(CustomNode)
