import React, { useState } from "react";
import { BaseBoxProps, SubjectBoxProps } from "utils/BoxUtils";

// Detail component to show detailed information
const CourseDetailBox: React.FC<BaseBoxProps> = ({ courseTitleEng }) => (
  <div className="rounded-[20px] absolute bg-white p-2 border shadow-lg z-50 w-[150px] left-[80%] top-[50%]">
    <p className="font-bold text-[12px]">{courseTitleEng}</p>
    {/* Add more details as needed */}
  </div>
);

interface HoverableBoxProps extends SubjectBoxProps {
  BoxComponent: React.FC<BaseBoxProps>;
  courseFullName: string;
}

const HoverableBoxComponent: React.FC<HoverableBoxProps> = ({
  BoxComponent,
  courseNo,
  courseTitleEng,
  courseCredit,
  courseFullName,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  return (
    <span
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <BoxComponent
        courseNo={courseNo}
        courseTitleEng={courseTitleEng}
        courseCredit={courseCredit}
      />
      {showDetails && (
        <CourseDetailBox
          courseNo={courseNo}
          courseTitleEng={courseFullName}
          courseCredit={courseCredit}
        />
      )}
    </span>
  );
};

export default HoverableBoxComponent;
