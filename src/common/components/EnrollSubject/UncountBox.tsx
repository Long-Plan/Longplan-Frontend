import React from "react";
import HoverableEnrollBox from "./HoverableEnrollBox";
import { EnrollBoxProps } from "./HoverableEnrollBox";

const UncountBox: React.FC<EnrollBoxProps> = (props) => {
  return (
    <HoverableEnrollBox
      {...props}
      courseTitleEng={props.courseTitleEng || "Not founded"}
      color="bg-gray-0"
      borderColor="border-gray-300"
      textColor="text-gray-300"
      highlightColor="bg-gray-300"
    />
  );
};

export default UncountBox;
