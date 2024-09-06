import { SubjectBoxProps } from "utils/BoxUtils";
import { truncateTitle } from "utils/BoxUtils";
import {LearnerSubjectBox} from "common/components/SubjectBox/SubjectBoxGroup.tsx";
import { Handle, Position, useStore } from "reactflow";

const connectionNodeIdSelector = (state: { connectionNodeId: any }) =>
  state.connectionNodeId;

export default function LearnerNode(props: { data: SubjectBoxProps }) {
  const { data } = props;
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;

  return (
    <div>
      <LearnerSubjectBox
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
