import React from "react";
import { EnrollBoxProps } from "./HoverableEnrollBox";
import HoverableEnrollBox from "./HoverableEnrollBox";

const CoreEnrollBox: React.FC<EnrollBoxProps> = (props) => {
  return (
    <HoverableEnrollBox
      {...props}
      color="bg-collection-1-core-skybg"
      borderColor="border-collection-1-core-sk2"
      textColor="text-collection-1-core-sk2"
      highlightColor="bg-collection-1-core-sk2"
    />
  );
};

export default CoreEnrollBox;
