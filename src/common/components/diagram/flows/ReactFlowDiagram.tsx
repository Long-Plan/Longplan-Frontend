import ReactFlow, {
  ConnectionLineType,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { useCallback } from "react";
import {
  initialNodes,
  initialEdges,
  defaultEdgeOptions,
  nodeTypes,
  edgeTypes,
} from "./initFlow";

function Diagram() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) =>
      setEdges(addEdge({ ...params, type: "smoothstep" }, edges)),
    []
  );

  return (
    <div className="w-full h-full flex bg-white rounded-2xl">
      {/* Corrected prop name: nodes instead of node */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Controls position="bottom-right" />
        {/* <MiniMap /> */}
        {/* <Background variant={BackgroundVariant.Dots} gap={12} size={1} /> */}
      </ReactFlow>
    </div>
  );
}

export default Diagram;
