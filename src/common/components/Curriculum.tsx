import React, { useEffect, useState } from "react";
import axios from "axios";

// API Response Types
interface APICategory {
  id: number;
  name_en: string;
  credit: number;
  courses: APICourse[] | null;
  relationships: any[] | null;
  requirements: APIRequirement[] | null;
}

interface APICourse {
  id: number;
  course_no: string;
  semester: number;
  years: number;
  requisites: APIRequisite[] | null;
}

interface APIRequisite {
  related_course_no: string;
  requisite_type: string;
}

interface APIRequirement {
  regex: string;
  credit: number;
}

// Target Format Types
interface CurriculumData {
  curriculumProgram: string;
  year: number;
  isCOOPPlan: boolean;
  requiredCredits: number;
  freeElectiveCredits: number;
  coreAndMajorGroups: Group[];
  geGroups: Group[];
}

interface Group {
  requiredCredits: number;
  groupName: string;
  requiredCourses: Course[];
  electiveCourses: Course[];
}

interface Course {
  courseNo: string;
  courseTitleEng: string;
  recommendSemester: number;
  recommendYear: number;
  prerequisites: string[];
  corequisite: string | null;
  credits: number;
}

const Curriculum: React.FC = () => {
  const [curriculumData, setCurriculumData] = useState<CurriculumData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.10.182.135:8000/api/v1/categories/1"
        );
        const transformedData = transformAPIData(response.data.result);
        setCurriculumData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const transformAPIData = (apiData: APICategory[]): CurriculumData => {
    let coreAndMajorGroups: Group[] = [];
    let geGroups: Group[] = [];
    let freeElectiveCredits = 0;

    apiData.forEach((group) => {
      if (group.name_en.includes("Free Electives")) {
        freeElectiveCredits = group.credit;
      } else {
        const transformedGroup: Group = {
          requiredCredits: group.credit,
          groupName: group.name_en,
          requiredCourses: [],
          electiveCourses: [],
        };

        if (group.courses) {
          group.courses.forEach((course) => {
            const transformedCourse: Course = {
              courseNo: course.course_no,
              courseTitleEng: `Course Title for ${course.course_no}`, // Placeholder for missing course title
              recommendSemester: course.semester,
              recommendYear: course.years,
              prerequisites: course.requisites
                ? course.requisites.map((r) => r.related_course_no)
                : [],
              corequisite: null, // Corequisite not provided in API
              credits: 3, // Placeholder for credits
            };

            if (group.name_en.toLowerCase().includes("elective")) {
              transformedGroup.electiveCourses.push(transformedCourse);
            } else {
              transformedGroup.requiredCourses.push(transformedCourse);
            }
          });
        }

        if (
          group.name_en.includes("General Education") ||
          group.name_en.includes("Field of Specialization")
        ) {
          coreAndMajorGroups.push(transformedGroup);
        } else {
          geGroups.push(transformedGroup);
        }
      }
    });

    return {
      curriculumProgram: "CPE",
      year: 2563,
      isCOOPPlan: true,
      requiredCredits: 139,
      freeElectiveCredits: freeElectiveCredits,
      coreAndMajorGroups: coreAndMajorGroups,
      geGroups: geGroups,
    };
  };

  return (
    <div>
      <h1>Curriculum Program</h1>
      {curriculumData ? (
        <pre>{JSON.stringify(curriculumData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Curriculum;
