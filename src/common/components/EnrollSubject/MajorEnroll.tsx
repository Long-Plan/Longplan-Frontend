import React from "react";
import HoverableEnrollBox from "./HoverableEnrollBox";
import { EnrollBoxProps } from "./HoverableEnrollBox";

const MajorEnrollBox: React.FC<EnrollBoxProps> = (props) => {
  return (
    <HoverableEnrollBox
      {...props}
      color="bg-collection-1-b-sl"
      borderColor="border-blue-shadeb5"
      textColor="text-blue-shadeb5"
      highlightColor="bg-blue-shadeb5"
    />
  );
};

export default MajorEnrollBox;
