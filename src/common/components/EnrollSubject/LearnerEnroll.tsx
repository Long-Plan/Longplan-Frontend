import React from "react";
import HoverableEnrollBox from "./HoverableEnrollBox";
import { EnrollBoxProps } from "./HoverableEnrollBox";

const LearnerEnrollBox: React.FC<EnrollBoxProps> = (props) => {
  return (
    <HoverableEnrollBox
      {...props}
      color="bg-collection-1-yellow-shade-ybg"
      borderColor="border-collection-1-yellow-shade-y5-5"
      textColor="text-collection-1-yellow-shade-y7"
      highlightColor="bg-collection-1-yellow-shade-y5-5"
    />
  );
};

export default LearnerEnrollBox;
