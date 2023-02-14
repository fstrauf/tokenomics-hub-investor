import { memo } from 'react'
import { Handle, Position, NodeToolbar, useStore } from 'reactflow'
import { NodeResizer } from '@reactflow/node-resizer';

const selectedNodesSelector = (state) =>  
  Array.from(state.nodeInternals.values())
    .filter((node) => node.selected)
    .map((node) => node.id);

const Grouping = ({ data, selected }) => {
    const selectedNodeId = useStore(selectedNodesSelector)[0];
    // console.log("🚀 ~ file: CustomNode.tsx:11 ~ CustomNode ~ selectedNodeIds", selectedNodeId)    
  return (
    <>
    <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      {/* <NodeToolbar
        isVisible={data.toolbarVisible}
        position={data.toolbarPosition}
      >
        {' '}
        <div>
          <input
          />
          <button>save</button>
        </div>
      </NodeToolbar> */}
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
    </>
  )
}

export default memo(Grouping)
