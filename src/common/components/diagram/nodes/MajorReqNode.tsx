import { SubjectBoxProps } from "utils/BoxUtils";
import { truncateTitle } from "utils/BoxUtils";
import {MajorSubjectBox} from "common/components/SubjectBox/SubjectBoxGroup.tsx";
import { Handle, Position, useStore } from "reactflow";
const connectionNodeIdSelector = (state: { connectionNodeId: any }) =>
  state.connectionNodeId;
export default function MajorReqNode(props: { data: SubjectBoxProps }) {
  const { data } = props;
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;
  return (
    <div>
      <MajorSubjectBox
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
      <Handle
        className="customHandle"
        position={Position.Bottom}
        type="source"
        id="b"
        isConnectableStart={false}
      />
      <Handle
        className="customHandle"
        position={Position.Top}
        type="target"
        id="b"
        isConnectableStart={false}
      />
    </div>
  );
}
