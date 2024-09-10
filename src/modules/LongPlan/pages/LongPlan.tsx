import { useEffect, useState } from "react";
import { useLoadingContext } from "react-router-loading";
import EnrollBox from "common/components/EnrollSubject/CoreEnroll"; // Use one component instead of multiple redundant imports
import { useQuery } from "react-query";
import { coreApi } from "core/connections";
import useGlobalStore from "common/contexts/StoreContext";

type CurriculumPayload = {
  major: string;
  year: string;
  plan: string;
};

type CurriculumData = {
  major: string;
  year: string;
  plan: string;
  geGroups: Group[];
  coreAndMajorGroups: Group[];
};

type Group = {
  groupName: string;
  requiredCourses: Course[];
  electiveCourses: Course[];
};

type Course = {
  courseNo: string;
  credit: number;
  courseTitleEng: string;
};

type EnrolledCoursesData = {
  studentID: string;
  courses: { [year: string]: { [semester: string]: Course[] } };
};

function LongPlan() {
  const loadingContext = useLoadingContext();
  const { userData } = useGlobalStore();

  const [groupedEnrolls, setGroupedEnrolls] =
    useState<EnrolledCoursesData | null>(null);
  const [curriculumData, setCurriculumData] = useState<CurriculumData | null>(
    null
  );
  const [selectedPlan, setSelectedPlan] = useState<CurriculumPayload>({
    name: "Select your study plan",
    major: "CPE",
    year: "2563",
    plan: "normal",
  });

  const [draggedCourse, setDraggedCourse] = useState<any>(null);

  useEffect(() => {
    loadingContext.done();
  }, [loadingContext]);

  const { refetch } = useQuery(
    "curriculum",
    async () => {
      if (userData) {
        const [curriculumData, enrollData] = await Promise.all([
          getCurriculum(selectedPlan),
          getEnrolledCourses(),
        ]);
        return { curriculumData, enrollData };
      }
      return null;
    },
    {
      onSuccess: (data) => {
        if (data) {
          setGroupedEnrolls(data.enrollData);
          setCurriculumData(data.curriculumData);
        }
      },
      enabled: !!userData,
    }
  );

  useEffect(() => {
    if (userData) {
      refetch();
    }
  }, [userData, refetch]);

  if (!groupedEnrolls || !curriculumData) {
    return <div>Loading...</div>;
  }

  const findCourseTitle = (courseNo: string) => {
    if (curriculumData && groupedEnrolls) {
      for (const group of [
        ...curriculumData.geGroups,
        ...curriculumData.coreAndMajorGroups,
      ]) {
        const foundCourse =
          group.requiredCourses.find(
            (course) => course.courseNo === courseNo
          ) ||
          group.electiveCourses.find((course) => course.courseNo === courseNo);
        if (foundCourse) {
          return {
            courseTitleEng: foundCourse.courseTitleEng,
            groupName: group.groupName,
          };
        }
      }
    }
    return { courseTitleEng: undefined, groupName: "Free Elective" };
  };

  const handleDragStart = (course: any) => {
    setDraggedCourse(course);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (targetYear: string, targetSemester: string) => {
    if (!draggedCourse) return;

    const updatedGroupedEnrolls = { ...groupedEnrolls };

    const originalYear = draggedCourse.year;
    const originalSemester = draggedCourse.semester;
    updatedGroupedEnrolls[originalYear][originalSemester] =
      updatedGroupedEnrolls[originalYear][originalSemester].filter(
        (course: any) => course.courseNo !== draggedCourse.courseNo
      );

    if (!updatedGroupedEnrolls[targetYear][targetSemester]) {
      updatedGroupedEnrolls[targetYear][targetSemester] = [];
    }
    updatedGroupedEnrolls[targetYear][targetSemester].push({
      ...draggedCourse,
      year: targetYear,
      semester: targetSemester,
    });

    setGroupedEnrolls(updatedGroupedEnrolls);
    setDraggedCourse(null);
  };

  const renderCourseBox = (course: {
    groupName: string;
    courseNo: string;
    courseTitleEng: string;
    credit: number;
    year?: string;
    semester?: string;
  }) => {
    return (
      <div
        draggable
        onDragStart={() => handleDragStart(course)}
        className="cursor-move flex "
      >
        <EnrollBox
          courseNo={course.courseNo}
          // courseTitleEng={course.courseTitleEng}
          courseCredit={course.credit}
          groupName={course.groupName}
        />
      </div>
    );
  };

  const semesters = ["1", "2", "3"]; // Predefined semester order: Sem 1, Sem 2, Sem 3

  return (
    <div className="w-screen flex flex-col justify-center items-center ">
      <div className="flex flex-col w-full">
        {semesters.map((semester) => (
          <div key={semester} className="flex flex-row w-full mb-4">
            {Object.keys(groupedEnrolls).map((year) => (
              <div
                key={year}
                className="flex-shrink-0"
                style={{ minWidth: "25%" }}
              >
                <div className="bg-white py-2 border border-solid border-b-0 border-gray-200">
                  <h2 className="text-center">
                    Year {year} - Sem {semester}
                  </h2>
                </div>
                <div
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(year, semester)}
                  className="p-4 border border-dashed border-gray-400"
                >
                  {groupedEnrolls[year][semester] ? (
                    groupedEnrolls[year][semester].map((course) => {
                      const courseData = findCourseTitle(course.courseNo);
                      return (
                        <div
                          key={course.courseNo}
                          className="flex justify-center my-2"
                        >
                          {renderCourseBox({ ...courseData, ...course })}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-gray-500">No courses</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function getCurriculum({ major, year, plan }: CurriculumPayload) {
  return coreApi
    .get(`/curriculum/old?major=${major}&year=${year}&plan=${plan}`)
    .then((res) => res.data);
}

function getEnrolledCourses() {
  return coreApi.get(`/student/enrolledData`).then((res) => res.data);
}

export default LongPlan;
