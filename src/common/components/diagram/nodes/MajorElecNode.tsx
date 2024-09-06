import { Handle, Position, useStore } from "reactflow";
const connectionNodeIdSelector = (state: { connectionNodeId: any }) =>
	state.connectionNodeId;
export default function MajorElecNode() {
	const connectionNodeId = useStore(connectionNodeIdSelector);
	const isConnecting = !!connectionNodeId;
	return (
		<div>
			{/* <MajorElecBox totalCredit={3} /> */}
			{!isConnecting && (
				<Handle
					className="customHandle"
					position={Position.Right}
					type="source"
				/>
			)}
			<Handle
				className="customHandle"
				position={Position.Left}
				type="target"
				isConnectableStart={false}
			/>
		</div>
	);
}
