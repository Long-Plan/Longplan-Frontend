import React, { useState } from "react";
import { BaseBoxProps, SubjectBoxProps } from "utils/BoxUtils";
import CourseDetailsPopup from "../Dialog/Coursedetail"; // Adjust import path

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
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup control state

  // Handle click event to toggle popup
  const handleBoxClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <span className="relative">
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
            category: "Major Requirements (mock data)", // Example data, replace as needed
            recommendedYear: "ปี 3 เทอม 1", // Example data
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
    </span>
  );
};

export default HoverableBoxComponent;
