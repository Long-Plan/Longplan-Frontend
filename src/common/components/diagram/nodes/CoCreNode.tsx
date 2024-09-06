import { SubjectBoxProps } from "utils/BoxUtils";
import { CoCreSubjectBox } from "common/components/SubjectBox/SubjectBoxGroup.tsx";
import { truncateTitle } from "utils/BoxUtils";
import { Handle, Position, useStore } from "reactflow";

const connectionNodeIdSelector = (state: { connectionNodeId: any }) =>
  state.connectionNodeId;

export default function CoCreNode(props: { data: SubjectBoxProps }) {
  const { data } = props;
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;

  return (
    <div>
      <CoCreSubjectBox
        courseNo={data.courseNo}
        courseTitleEng={truncateTitle(data.courseTitleEng)}
        courseCredit={data.courseCredit}
      />
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
