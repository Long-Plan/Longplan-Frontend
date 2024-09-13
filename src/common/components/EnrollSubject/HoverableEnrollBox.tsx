import React, { useState } from "react";
import EnrollBox from "./EnrollBox"; // Adjust the import path
import CourseDetailsPopup from "../Dialog/Coursedetail"; // Adjust import path

export interface HoverableEnrollBoxProps {
  courseNo: string;
  courseTitleEng: string;
  courseCredit: number;
  courseFullName: string;
  courseCategory: string;
  courseRecommendedYear: string;
  coursePrerequisites?: string[];
  courseCorequisite?: string;
  color: string;
  borderColor: string;
  textColor: string;
  highlightColor: string;
  dummy?: boolean;
  remain?: boolean;
}

export interface EnrollBoxProps {
  courseNo: string;
  courseTitleEng: string;
  courseCredit: number;
  courseFullName: string;
  courseCategory: string;
  courseRecommendedYear: string;
  coursePrerequisites?: string[];
  courseCorequisite?: string;
  remain?: boolean;
  dummy?: boolean;
}

const HoverableEnrollBox: React.FC<HoverableEnrollBoxProps> = ({
  courseNo,
  courseTitleEng,
  courseCredit,
  courseFullName,
  courseCategory,
  courseRecommendedYear,
  coursePrerequisites,
  courseCorequisite,
  color,
  borderColor,
  textColor,
  highlightColor,
  dummy = false,
  remain = false,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup control state

  // Handle click event to toggle popup
  const handleBoxClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <>
      {/* Render the course box */}
      <EnrollBox
        courseNo={courseNo}
        courseTitleEng={courseTitleEng}
        courseCredit={courseCredit}
        coursePrerequisites={coursePrerequisites}
        courseCorequisite={courseCorequisite}
        dummy={dummy}
        remain={remain}
        color={color}
        borderColor={borderColor}
        textColor={textColor}
        highlightColor={highlightColor}
        onClick={handleBoxClick} // Pass the click handler
      />

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

export default HoverableEnrollBox;
