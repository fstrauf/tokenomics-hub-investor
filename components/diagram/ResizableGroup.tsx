import { memo, useCallback } from 'react'
import { Handle, Position, useNodeId, useReactFlow } from 'reactflow'

import { NodeResizer } from '@reactflow/node-resizer'

import '@reactflow/node-resizer/dist/style.css'

const ResizableGroup = ({ data, selected }) => {
  const nodeId = useNodeId()

  // const size = useStore((s) => {
  //   const node = s.nodeInternals.get(nodeId)

  //   return {
  //     width: node.width,
  //     height: node.height,
  //   }
  // })

  const { setNodes } = useReactFlow()
  const onChange = useCallback((evt) => {
    const inputVal = evt.target.value
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              inputVal,
            },
          }
        }

        return node
      })
    )
  }, [])
  return (
    // div
    <div className="h-full rounded-md bg-dao-red">
      <div className="h-52">
        <NodeResizer
          color="#ff0071"
          isVisible={selected}
          minWidth={100}
          minHeight={30}
        />

        <Handle type="target" position={Position.Left} />

        <input
          className="bg-dao-red text-center text-white p-2 mt-1"
          id="text"
          name="text"
          onChange={onChange}
          value={data.label}
        ></input>

        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  )
}

export default memo(ResizableGroup)
