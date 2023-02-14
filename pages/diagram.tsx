import Layout from '../components/layout'
import React, { useRef } from 'react'
import { GetServerSideProps } from 'next'
import { useState, useCallback } from 'react'
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
  ReactFlowProvider,
  addEdge,
  useReactFlow
} from 'reactflow'
import 'reactflow/dist/style.css'
import ComponentNode from '../components/diagram/ComponentNode'
// import MultiSelectionToolbar from '../components/diagram/MultiSelectionToolbar'
import TextUpdaterNode from '../components/diagram/TextUpdaterNode'
import Grouping from '../components/diagram/Grouping'
import ResizeableGroup from '../components/diagram/ResizableGroup'
import Sidebar from '../components/diagram/Sidebar'
import NoteNode from '../components/diagram/NoteNode'
import CustomEdge from '../components/diagram/CustomEdge'

//drag and drop flow https://codesandbox.io/s/blue-browser-vd9pv?file=/src/DnDFlow.js
// changing a node name https://stackoverflow.com/questions/70238289/update-name-of-selected-node-from-sidebar-in-react-flow
// https://reactflow.dev/docs/examples/nodes/node-resizer/

const nodeTypes = {
  ComponentNode,
  NoteNode,
  ResizeableGroup,
}

const edgeTypes = {
  CustomEdge,
};

const initialNodes = [
  // {
  //   id: '1',
  //   type: 'custom',
  //   data: { label: 'Node 0' },
  //   position: { x: 250, y: 5 },
  //   className: 'light',
  // },
  {
    id: '2',
    type: 'ResizeableGroup',
    data: { label: 'Group A' },
    position: { x: 100, y: 100 },
    // className: 'light',
    // style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 200 },
  },
  {
    id: '2a',
    type: 'ComponentNode',
    data: { label: 'Node A.1' },
    position: { x: 10, y: 50 },
    parentNode: '2',
  }
]

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    markerEnd: {
      type: MarkerType.Arrow,
    },
    animated: true,
    type: 'smoothstep',
  },
  // { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' },
  // { id: 'e2a-4a', source: '2a', target: '4a', type: 'smoothstep' },
  // { id: 'e3-4', source: '3', target: '4', type: 'smoothstep' },
  // { id: 'e3-4b', source: '3', target: '4b', type: 'smoothstep' },
  // { id: 'e4a-4b1', source: '4a', target: '4b1', type: 'smoothstep' },
  // { id: 'e4a-4b2', source: '4a', target: '4b2', type: 'smoothstep' },
  // { id: 'e4b1-4b2', source: '4b1', target: '4b2', type: 'smoothstep' },
]

let id = 0
const getId = () => `dndnode_${id++}`

export default function Diagram({ posts }) {

  const { getIntersectingNodes } = useReactFlow();
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')
      // console.log("🚀 ~ file: diagram.tsx:159 ~ Diagram ~ type", type)

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance]
  )

  const onNodeDrag = useCallback((_: MouseEvent, node: Node) => {
    const intersections = getIntersectingNodes(node).map((n) => n.id);

    setNodes((ns) =>
      ns.map((n) => ({
        ...n,
        className: intersections.includes(n.id) ? 'highlight' : '',
      }))
    );
  }, []);


  //need to build this nested structure
  return (
    <>
      <Layout>
        {/* <button onClick={() => console.log(nodes)}>test</button> */}

        <div className="dndflow">
          <ReactFlowProvider>
            <div className="flex flex-row" ref={reactFlowWrapper}>
              <Sidebar />
              <div className="h-[700px] w-full">
                <ReactFlow
                  nodes={nodes}
                  onNodesChange={onNodesChange}
                  edges={edges}
                  onEdgesChange={onEdgesChange}
                  onInit={setReactFlowInstance}
                  nodeTypes={nodeTypes}
                  onConnect={onConnect}
                  onNodeDrag={onNodeDrag}
                  selectNodesOnDrag={false}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  // fitView
                  style={{
                    backgroundColor: 'rgb(16 22 35)',
                  }}
                >
                  <Background />
                  <Controls />
                </ReactFlow>
              </div>
            </div>
          </ReactFlowProvider>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      posts: null,
    },
    // revalidate: 1,
  }
}
