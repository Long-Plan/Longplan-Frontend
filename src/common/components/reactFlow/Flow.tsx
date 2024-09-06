import { useCallback } from "react";
import ReactFlow, {
	MiniMap,
	Controls,
	Background,
	useNodesState,
	useEdgesState,
	addEdge,
	Connection,
	Edge,
} from "reactflow";
import {
	nodes as initialNodes,
	edges as initialEdges,
} from "./initial-element";
import "reactflow/dist/style.css";

export default function Flow() {
	const [nodes, , onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback(
		(params: Edge | Connection) =>
			setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds)),
		[setEdges]
	);
	return (
		<div className="h-screen w-screen">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
			>
				<Controls position="top-left" />
				<MiniMap />
				<Background gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}
