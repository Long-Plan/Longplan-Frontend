import React from "react";
import HoverableEnrollBox from "./HoverableEnrollBox";
import { EnrollBoxProps } from "./HoverableEnrollBox";

const ActEnrollBox: React.FC<EnrollBoxProps> = (props) => {
  return (
    <HoverableEnrollBox
      {...props}
      color="bg-collection-1-active-citizen-r-sl"
      borderColor="border-collection-1-active-citizen-r2"
      textColor="text-collection-1-active-citizen-r2"
      highlightColor="bg-collection-1-active-citizen-r2"
    />
  );
};

export default ActEnrollBox;
