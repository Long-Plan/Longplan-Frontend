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
            prerequisites: {
              frontCourses: [
                { code: "000000", name: "Algorithms", term: "ปี 2 เทอม 2" },
              ],
              allCourses: [
                { code: "000000", name: "Algorithms", term: "ปี 2 เทอม 2" },
                { code: "000000", name: "Discrete Math", term: "ปี 2 เทอม 1" },
                { code: "000000", name: "Data Structure", term: "ปี 2 เทอม 1" },
                {
                  code: "000000",
                  name: "Computer Programming",
                  term: "ปี 1 เทอม 2",
                },
              ],
            },
          }}
        />
      )}
    </>
  );
};

export default HoverableEnrollBox;
