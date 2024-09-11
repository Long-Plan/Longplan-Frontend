import useGlobalStore from "common/contexts/StoreContext";
import { useEffect, useMemo, useState } from "react";
import { User } from "types";
import { coreApi } from "../../../core/connections.ts";
import { useQuery } from "react-query";
import { Course } from "utils/BoxUtils";
import { toNumber } from "lodash-es";
import PlanSelection from "common/components/Navbar/PlanSelection.tsx";
import { Nullable } from "tsdef";

type EnrolledCoursesData = {
  studentID: string;
  courses: Course[]; // Ensure this matches your API response structure
};

type CurriculumPayload = {
  major: string;
  year: string;
  plan: string;
};

interface Props {
  user: Nullable<User>;
  year: string;
  semester: string;
}

interface groupedEnrolls {
  [year: string]: {
    [semester: string]: Course[];
  };
}

const GeneralData = ({ user, year, semester }: Props) => {
  if (!user) {
    return null;
  }
  return (
    <div
      className="rounded-2xl py-8 items-center justify-center"
      style={{ fontFamily: "IBM Plex Sans Thai, sans-serif" }}
    >
      <div className="drop-shadow-[10px] rounded-[20px] backdrop-blur-md w-[500px] items-center jusify-center bg-white/10">
        <div className="flex flex-row items-center jusify-center pl-16">
          <img
            src="/imgs/ProfilePics.png"
            width="150px"
            className="my-5 mx-2 rounded-full"
          />
          <div className="items-center justify-center">
            <h1 className="text-xl font-medium mb-4 text-white">
              {user.prename} {user.first_name} {user.last_name}
            </h1>
            <h1 className="text-xl font-medium mb-4 text-white">
              {user.student_id}
            </h1>
            <h4 className="px-4 text-base font-normal bg-blue-shadeb5 rounded-lg text-white w-min-full h-[26px] text-center">
              {`ปี ${year} เทอม ${semester}`}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EnrollCourseProps {
  selectedYearSemester?: string;
}

const EnrollCourse = ({ selectedYearSemester }: EnrollCourseProps) => {
  const getEnrolledCourses = (): Promise<EnrolledCoursesData> => {
    return coreApi
      .get(`/student/enrolledDataOld`)
      .then((res: { data: EnrolledCoursesData }) => res.data)
      .catch((error) => {
        console.error("Error fetching enrolled courses:", error);
        throw error;
      });
  };

  function getCurriculum({
    major,
    year,
    plan,
  }: CurriculumPayload): Promise<CurriculumData> {
    return new Promise<CurriculumData>((resolve, reject) => {
      coreApi
        .get(`/curriculum/old?major=${major}&year=${year}&plan=${plan}`)
        .then((res: { data: CurriculumData }) => resolve(res.data))
        .catch(reject);
    });
  }

  interface CurriculumData {
    requiredCredits: number;
    freeElectiveCredits: number;
    coreAndMajorGroups: any[];
    geGroups: any[]; // Replace 'any' with the actual type of geGroups
    // Add other properties if necessary
  }

  const findCourseTitle = (
    courseNo: string
  ): { courseTitleEng: string | undefined; groupName: string } => {
    // Check if both curriculumData and groupedEnrolls are available
    if (curriculumData && groupedEnrolls) {
      // Iterate through the required courses in geGroups and coreAndMajorGroups
      for (const group of [
        ...curriculumData.geGroups,
        ...curriculumData.coreAndMajorGroups,
      ]) {
        for (const course of group.requiredCourses) {
          if (course.courseNo === courseNo) {
            return {
              courseTitleEng: course.courseTitleEng,
              groupName: group.groupName,
            };
          } else {
            for (const electiveCourse of group.electiveCourses) {
              if (electiveCourse.courseNo === courseNo) {
                return {
                  courseTitleEng: electiveCourse.courseTitleEng,
                  groupName: group.groupName,
                };
              }
            }
          }
        }
      }
    }
    return {
      courseTitleEng: undefined,
      groupName: "Free Elective",
    };
  };

  const { userData } = useGlobalStore();
  const [groupedEnrolls, setGroupedEnrolls] = useState<groupedEnrolls>();
  const [curriculumData, setCurriculumData] = useState<CurriculumData>();

  const { refetch } = useQuery("curriculum", fetchData, {
    onSuccess: async (data: { enrollData: any; curriculumData: any }) => {
      if (data) {
        setGroupedEnrolls(data.enrollData);
        setCurriculumData(data.curriculumData);
      }
    },
  });

  useEffect(() => {
    if (userData) {
      refetch();
    }
  }, [userData]);

  async function fetchData() {
    if (userData) {
      const [curriculumData, enrollData] = await Promise.all([
        getCurriculum({ major: "CPE", year: "2563", plan: "normal" }),
        getEnrolledCourses(),
      ]);
      return { curriculumData, enrollData };
    }
  }

  const groupOrder = [
    "Learner Person",
    "Co-creator",
    "Active Citizen",
    "Elective",
    "Core",
    "Major Required",
    "Major Elective",
    "Free Elective",
  ];

  // Filter enrolled courses based on the selected year and semester
  const filteredCourses = useMemo(() => {
    if (!groupedEnrolls || !selectedYearSemester) return [];
    const [year, semester] = selectedYearSemester.split("-");

    // Sort the courses based on the order of groups
    return (
      groupedEnrolls[year]?.[semester]?.sort((a: any, b: any) => {
        const groupIndexA = groupOrder.indexOf(
          findCourseTitle(a.courseNo).groupName
        );
        const groupIndexB = groupOrder.indexOf(
          findCourseTitle(b.courseNo).groupName
        );
        return groupIndexA - groupIndexB;
      }) ?? []
    );
  }, [groupedEnrolls, selectedYearSemester]);

  const gradeToNumber = (grade: string): number => {
    switch (grade) {
      case "A":
        return 4.0;
      case "B+":
        return 3.5;
      case "B":
        return 3.0;
      case "C+":
        return 2.5;
      case "C":
        return 2.0;
      case "D+":
        return 1.5;
      case "D":
        return 1.0;
      case "F":
        return 0.0;
      case "W":
        return 0.0; // For withdrawn courses
      default:
        return 0.0; // Default to 0 for unknown grades
    }
  };

  // Calculate sum of credits and average grade for selected year and semester
  const sumOfCredits = useMemo(() => {
    if (!filteredCourses.length) return 0;
    return filteredCourses.reduce((total: number, course: any) => {
      if (
        gradeToNumber(course.grade) > 0 ||
        course.grade === "CX" ||
        course.grade === "S" ||
        course.grade === "F" ||
        course.grade === "U"
      ) {
        return total + parseFloat(course.credit);
      } else {
        return total;
      }
    }, 0);
  }, [filteredCourses]);

  const averageGrade = useMemo(() => {
    if (!filteredCourses.length) return 0;

    const totalGradeCreditProduct = filteredCourses.reduce(
      (total: number, course: any) => {
        const gradeValue = gradeToNumber(course.grade);
        let credit = 0;
        if (gradeValue > 0 || course.grade === "F") {
          credit = parseFloat(course.credit);
        }

        // Only include valid grade values and credits in the sum
        if (
          !isNaN(gradeValue) &&
          gradeValue > 0 &&
          !isNaN(credit) &&
          credit > 0
        ) {
          return total + gradeValue * credit;
        } else {
          return total;
        }
      },
      0
    );

    const totalCredits = filteredCourses.reduce(
      (total: number, course: any) => {
        let credit = 0;
        if (gradeToNumber(course.grade) > 0 || course.grade === "F") {
          credit = parseFloat(course.credit);
        }
        // Only include valid credits in the sum
        if (!isNaN(credit) && credit > 0) {
          return total + credit;
        } else {
          return total;
        }
      },
      0
    );

    // Calculate the average grade based on the total grade-credit product and total credits
    if (totalCredits > 0) {
      return totalGradeCreditProduct / totalCredits;
    } else {
      return 0; // Avoid division by zero
    }
  }, [filteredCourses]);

  return (
    <>
      <tbody>
        {filteredCourses.map((course: any, index: number) => {
          const { courseNo, credit, grade } = course;
          const { courseTitleEng, groupName } = findCourseTitle(courseNo);
          return (
            <tr
              key={courseNo}
              className={`border-b border-gray-300 bg-${
                index % 2 === 0 ? "white" : "gray-100"
              } transition duration-300 ease-in-out hover:bg-blue-shadeb1 bg-opacity-70 hover:scale-105 text-sm`}
            >
              <td className="px-4 py-2 text-center">{index + 1}</td>
              <td className="px-4 py-2 text-center">{courseNo}</td>
              <td className="px-4 py-2">
                {courseTitleEng?.length && courseTitleEng.length >= 1
                  ? courseTitleEng?.substring(1, 0) +
                    courseTitleEng?.substring(1, 100).toLowerCase()
                  : "Free elective Course"}
              </td>
              <td className="px-4 py-2 text-center">{credit}</td>
              <td className="px-4 py-2 text-center justify-center items-center">
                {grade}
              </td>
              <td className="px-4 py-2 text-center items-center justify-center">
                {/*<span*/}
                {/*    className="inline-block px-2 py-1 text-sm font-medium text-gray-500 bg-white-500 rounded-[20px]">*/}
                {/*    {groupName}*/}
                {/*</span>*/}
                {(groupName === "Core" ||
                  groupName === "Major Required" ||
                  groupName === "Major Elective") && (
                  <>
                    <div className="inline-block px-2 text-sm w-[50px] font-medium text-white bg-blue-shadeb4 rounded-l-[10px] border border-solid border-blue-shadeb4">
                      Major
                    </div>
                    {groupName === "Core" && (
                      <div
                        className="inline-block pl-2 w-[100px] text-left text-sm font-medium bg-blue-shadeb1
                    rounded-r-[10px] text-collection-1-core-sk1 border border-solid border-blue-shadeb5"
                      >
                        Core
                      </div>
                    )}
                    {(groupName === "Major Required" ||
                      groupName === "Major Elective") && (
                      <div
                        className="inline-block pl-2  w-[100px] text-left text-sm font-medium bg-blue-shadeb1
                    rounded-r-[10px] text-blue-shadeb5 border border-solid border-blue-shadeb5"
                      >
                        {groupName.substring(5, groupName.length)}
                      </div>
                    )}
                  </>
                )}
                {(groupName === "Learner Person" ||
                  groupName === "Co-Creator" ||
                  groupName === "Active Citizen" ||
                  groupName === "Elective") && (
                  <>
                    {" "}
                    <div className="inline-block px-2 text-sm w-[40px] font-medium text-collection-1-yellow-shade-y7 bg-collection-1-yellow-shade-y5 rounded-l-[10px] border border-solid border-amber-300">
                      GE
                    </div>
                    {groupName === "Learner Person" && (
                      <div
                        className="inline-block pl-2 w-[110px] text-left text-sm font-medium bg-yellow-50
                    rounded-r-[10px] text-collection-1-yellow-shade-y7 border border-solid border-amber-300"
                      >
                        {groupName}
                      </div>
                    )}
                    {groupName === "Active Citizen" && (
                      <div
                        className="inline-block pl-2 w-[110px] text-left text-sm font-medium bg-yellow-50
                    rounded-r-[10px] text-collection-1-active-citizen-r2 border border-solid border-amber-300"
                      >
                        {groupName}
                      </div>
                    )}
                    {groupName === "Co-Creator" && (
                      <div
                        className="inline-block pl-2 w-[110px] text-left text-sm font-medium bg-yellow-50
                    rounded-r-[10px] text-collection-1-co-creator-or1 border border-solid border-amber-300"
                      >
                        {groupName}
                      </div>
                    )}
                    {groupName === "Elective" && (
                      <div
                        className="inline-block pl-2 w-[110px] text-left text-sm font-medium bg-yellow-50
                    rounded-r-[10px] text-collection-1-electives-brown1 border border-solid border-amber-300"
                      >
                        {groupName}
                      </div>
                    )}
                  </>
                )}
                {groupName === "Free Elective" && (
                  <div className="inline-block px-2 text-sm w-[150px] font-medium text-collection-1-black-shade-bl4 bg-collection-1-black-sl rounded-[10px] border border-solid border-collection-1-black-shade-bl4">
                    {groupName}
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot className="bg-blue-shadeb05 text-blue-shadeb5">
        <tr className={`text-sm`}>
          <td
            className="px-4 py-2 text-right rounded-bl-[18px] font-bold"
            colSpan={3}
          >
            หน่วยกิตรวม
          </td>
          <td className="px-4 py-2 text-center font-bold">{sumOfCredits}</td>
          <td className="px-4 py-2 text-center font-bold">
            {averageGrade.toFixed(2)}
          </td>
          <td className="rounded-br-[18px]"></td>
        </tr>
      </tfoot>
    </>
  );
};

const EnrollData = ({}: {}) => {
  const { userData } = useGlobalStore();
  const [groupedEnrolls, setGroupedEnrolls] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState({
    name: "Select your study plan",
    major: "ISNE",
    year: "2565",
    plan: "normal",
  });

  const { refetch } = useQuery("curriculum", {
    onSuccess: async (data: { enrollData: any; curriculumData: any }) => {
      if (data) {
        setGroupedEnrolls(data.enrollData);
      }
    },
  });

  useEffect(() => {
    if (userData) {
      refetch();
    }
  }, [userData, selectedPlan]);

  const [selectedYearSemester, setSelectedYearSemester] =
    useState<string>("1-1"); // State variable for selected year and semester

  // Function to handle year and semester selection
  const handleYearSemesterChange = (yearSemester: string) => {
    setSelectedYearSemester(yearSemester);
  };

  return (
    <div className="rounded-[20px] bg-white pt-4">
      <h4 className="text-center pt-4 pb-2">ข้อมูลการลงทะเบียนเรียน</h4>
      <div className="justify-start flex mb-12">
        <PlanSelection onPlanChange={setSelectedPlan} />
      </div>

      <div className="flex justify-center pt-4">
        <div className="grid grid-cols-1 items-center justify-center w-auto h-[20px] mr-8">
          <h2 className={`text-center`}>ภาคเรียน</h2>
          {/* Year and Semester selection buttons */}
          {groupedEnrolls &&
            Object.keys(groupedEnrolls).map((year) =>
              Object.keys(groupedEnrolls[year]).map((semester) => {
                const yearSemester = `${year}-${semester}`;

                if (groupedEnrolls[year][semester].length > 0) {
                  return (
                    <button
                      key={yearSemester}
                      onClick={() => handleYearSemesterChange(yearSemester)}
                      className={`m-[5px] rounded-[10px] h-[36px] text-center text-[12.5px] w-[150px] ${
                        selectedYearSemester === yearSemester
                          ? "bg-blue-shadeb5 text-white"
                          : "bg-white text-blue-shadeb5 transition duration-100 hover:bg-blue-shadeb05 hover:border-blue-shadeb2"
                      } border border-solid border-gray-400`}
                    >
                      {"ภาคเรียนที่  " +
                        semester +
                        "/" +
                        (toNumber(userData?.student_id.substring(0, 2)) +
                          (toNumber(year) - 1))}
                    </button>
                  );
                }
                return (
                  <button
                    className={`m-[5px] rounded-[10px] h-[36px] text-center text-[12.5px] w-[150px] bg-gray-200 text-gray-400 border border-solid border-gray-400 cursor-not-allowed opacity-50`}
                  >
                    {"ภาคเรียนที่  " +
                      semester +
                      "/" +
                      (toNumber(userData?.student_id.substring(0, 2)) +
                        (toNumber(year) - 1))}
                  </button>
                ); // Return null for semesters with no courses
              })
            )}
        </div>
        <div>
          <table className="table-auto rounded-[20px] w-[1100px] ml-8">
            <thead className="bg-blue-shadeb05 text-blue-shadeb5 text-md">
              <tr>
                <th className="border-b border-blue-shadeb05 w-[40px] px-4 py-2 text-left rounded-tl-[18px]">
                  ลำดับ
                </th>
                <th className="border-b border-blue-shadeb05 px-4 w-[100px] py-2 text-center">
                  รหัสวิชา
                </th>
                <th className="border-b border-blue-shadeb05 px-4 w-[450px] py-2 text-left">
                  ชื่อวิชา
                </th>
                <th className="border-b border-blue-shadeb05 w-[40px] px-4 py-2 text-center">
                  หน่วยกิต
                </th>
                <th className="border-b border-blue-shadeb05 w-[40px] px-4 py-2 text-center">
                  เกรด
                </th>
                <th className="border-b border-blue-shadeb05 px-4 py-2 text-center rounded-tr-[18px]">
                  หมวดหมู่
                </th>
              </tr>
            </thead>
            <EnrollCourse selectedYearSemester={selectedYearSemester} />
          </table>
        </div>
      </div>
    </div>
  );
};

function UserPage() {
  const { userData } = useGlobalStore();
  const [year, setYear] = useState<string>("1");
  const [semester, setSemester] = useState<string>("1");

  const { refetch } = useQuery("curriculum", {
    onSuccess: async (data: { enrollData: any; curriculumData: any }) => {
      if (data) {
        findLatestYearSemester(data.enrollData);
      }
    },
  });

  useEffect(() => {
    if (userData) {
      refetch();
    }
  }, [userData]);

  const findLatestYearSemester = (enrolls: any) => {
    let latestYear = "1";
    let latestSemester = "1";
    Object.keys(enrolls).forEach((year) => {
      Object.keys(enrolls[year]).forEach((semester) => {
        if (enrolls[year][semester].length > 0) {
          if (!latestYear || parseInt(year) > parseInt(latestYear)) {
            latestYear = year;
            latestSemester = semester; // Reset semester when a new year is found
          } else if (
            parseInt(year) === parseInt(latestYear) &&
            parseInt(semester) > parseInt(latestSemester)
          ) {
            latestSemester = semester; // Update semester if it's the same year and a later semester
          }
        }
      });
    });

    setYear(latestYear);
    setSemester(latestSemester);
  };

  return (
    <div
      className="h-full flex flex-col w-screen items-center"
      style={{ fontFamily: "IBM Plex Sans Thai, sans-serif" }}
    >
      <div className="w-full max-w-[1450px] pl-16 mt-12 justify-center items-center">
        <div className="flex bg-[#ECEEFA] rounded-t-2xl w-[1450px] shadow-2xl items-center justify-center bg-cover bg-bottom bg-[url('/imgs/ClockBG.svg')]">
          <div className="flex flex-row items-center">
            <GeneralData user={userData} year={year} semester={semester} />
          </div>
        </div>
        <div className="bg-white rounded-b-2xl shadow-lg w-[1450px] h-[800px] pb-32">
          <EnrollData />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
