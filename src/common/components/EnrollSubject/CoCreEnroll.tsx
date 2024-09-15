import React from "react";
import HoverableEnrollBox from "./HoverableEnrollBox";
import { EnrollBoxProps } from "./HoverableEnrollBox";

const CoCreEnrollBox: React.FC<EnrollBoxProps> = (props) => {
  return (
    <HoverableEnrollBox
      {...props}
      color="bg-collection-1-co-creator-orbg"
      borderColor="border-collection-1-co-creator-or"
      textColor="text-collection-1-co-creator-or1"
      highlightColor="bg-collection-1-co-creator-or"
    />
  );
};

export default CoCreEnrollBox;
