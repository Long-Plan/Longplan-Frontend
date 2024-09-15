import React from "react";
import { EnrollBoxProps } from "./HoverableEnrollBox";
import HoverableEnrollBox from "./HoverableEnrollBox";

const FreeEnrollBox: React.FC<EnrollBoxProps> = (props) => {
  return (
    <HoverableEnrollBox
      courseNo={props.courseNo || ""}
      courseTitleEng={props.courseTitleEng || "Free Elective"}
      courseCredit={props.courseCredit || 0}
      courseFullName="Free Elective"
      courseRecommendedYear="ไม่มีข้อมูล"
      coursePrerequisites={props.coursePrerequisites || []}
      courseCategory="Free Elective"
      color="bg-collection-1-black-sl"
      borderColor="border-collection-1-black-shade-bl4"
      textColor="text-black"
      highlightColor="bg-collection-1-black-shade-bl4"
    />
  );
};

export default FreeEnrollBox;
