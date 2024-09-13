import React, { useState } from "react";
import { BaseBoxProps, SubjectBoxProps } from "utils/BoxUtils";
import CourseDetailsPopup from "../Dialog/Coursedetail"; // Adjust import path

export interface HoverableBoxProps extends SubjectBoxProps {
  BoxComponent: React.FC<BaseBoxProps>;
  courseFullName: string;
  courseCategory: string;
  courseRecommendedYear: string;
  coursePrerequisites: string[];
  courseCorequisite?: string;
}

const HoverableBoxComponent: React.FC<HoverableBoxProps> = ({
  BoxComponent,
  courseNo,
  courseTitleEng,
  courseCredit,
  courseFullName,
  courseCategory,
  courseRecommendedYear,
  coursePrerequisites,
  courseCorequisite,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup control state

  // Handle click event to toggle popup
  const handleBoxClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <>
      {/* Render the course box */}
      <div onClick={handleBoxClick}>
        <BoxComponent
          courseNo={courseNo}
          courseTitleEng={courseTitleEng}
          courseCredit={courseCredit}
        />
      </div>
      {/* Render the Course Detail Popup only when isPopupOpen is true */}
      {isPopupOpen && (
        <CourseDetailsPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)} // Close the popup when clicked
          courseDetails={{
            code: courseNo,
            name: courseFullName,
            credits: courseCredit,
            category: courseCategory, // Example data, replace as needed
            recommendedYear: courseRecommendedYear,
            prerequisites: coursePrerequisites, // Pass the prerequisites data
            corequisite: courseCorequisite, // Pass the corequisite data
          }}
        />
      )}
    </>
  );
};

export default HoverableBoxComponent;
