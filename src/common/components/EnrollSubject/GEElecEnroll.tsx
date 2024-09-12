import React from "react";
import HoverableEnrollBox from "./HoverableEnrollBox";
import { EnrollBoxProps } from "./HoverableEnrollBox";

const GEElecEnrollBox: React.FC<EnrollBoxProps> = (props) => {
  return (
    <HoverableEnrollBox
      {...props}
      color="bg-collection-1-electives-brown-sl"
      borderColor="border-collection-1-electives-brown"
      textColor="text-collection-1-electives-brown1"
      highlightColor="bg-collection-1-electives-brown"
    />
  );
};

export default GEElecEnrollBox;
