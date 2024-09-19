import React from "react";
import { truncateTitle, BaseBoxProps } from "utils/BoxUtils";
import HoverableBoxComponent from "./HoverableBoxComponent"; // Adjust the import path accordingly

interface ElecBoxProps {
  courseNo: string;
  courseTitleEng: string;
  courseFullName: string;
  courseCredit: number;
  courseCategory: string;
  coursePrerequisites?: string[];
  courseCorequisite?: string;
  recommendYear?: number;
  recommendSemester?: number;
  BoxComponent: React.FC<BaseBoxProps>;
}

const ElecBoxIsolate: React.FC<ElecBoxProps> = ({
  courseNo,
  courseTitleEng,
  courseFullName,
  courseCredit,
  coursePrerequisites,
  courseCategory,
  courseCorequisite,
  recommendYear,
  recommendSemester,
  BoxComponent,
}) => {
  return (
    <div>
      <HoverableBoxComponent
        key={courseNo}
        courseNo={courseNo}
        courseTitleEng={truncateTitle(courseTitleEng)}
        courseFullName={courseFullName}
        courseCredit={courseCredit}
        courseCategory={courseCategory}
        coursePrerequisites={coursePrerequisites || []}
        courseCorequisite={courseCorequisite || ""}
        courseRecommendedYear={
          "ปี " + recommendYear?.toString() + " เทอม " + recommendSemester ||
          "ไม่มีข้อมูล"
        }
        BoxComponent={BoxComponent}
      />
    </div>
  );
};

export default ElecBoxIsolate;
