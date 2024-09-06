import { isNumber } from "lodash-es";
import { CourseGroup } from "../common/components/CurriculumBox.tsx";

export const truncateTitle = (title: string): string => {
  if (title.length === 0) return title; // Handle empty string case

  const lastChar = title.charAt(title.length - 1);
  const lastCharNumber = Number(lastChar);

  if (isNumber(lastCharNumber) && !isNaN(lastCharNumber)) {
    return title.length > 9 ? `${title.substring(0, 8)} ${lastChar}` : title; // Handle cases where length is not greater than 9
  } else {
    return title.length > 9 ? `${title.substring(0, 8)}..` : title;
  }
};
// Define supporting types for BoxProps
export interface Course {
  courseTitleEng: string;
  courseNo: string;
  recommendSemester: number | null;
  recommendYear: number | null;
  prerequisites: Array<string>;
  corequisite: string | null;
  credit: number;
  grade: string;
}

export interface BoxData {
  requiredCredits: number;
  groupName: string;
  requiredCourses: Course[];
  electiveCourses: Course[];
}

export interface curriculumBoxProps {
  data: {
    requiredCredits: number;
    groupName: string;
    requiredCourses: Array<{
      courseTitleEng: string;
      courseNo: string;
      recommendSemester: number;
      recommendYear: number;
      prerequisites: Array<string>;
      corequisite: string | null;
      credits: number;
    }>;
    electiveCourses: Array<{
      courseNo: string;
      recommendSemester: number | null;
      recommendYear: number | null;
      prerequisites: Array<string>;
      corequisite: string | null;
      credits: number;
    }>;
  };
}

export interface BoxProps {
  data: CourseGroup;
}

export interface BaseBoxProps {
  courseNo?: string;
  courseTitleEng: string;
  courseCredit: number;
  remain?: boolean;
  dummy?: boolean;
}

export interface SubjectBoxProps {
  courseNo: string;
  courseTitleEng: string;
  courseCredit: number;
}
