import React, { useState, useEffect } from "react";
import CoreEnrollBox from "./EnrollSubject/CoreEnroll";
import MajorEnrollBox from "./EnrollSubject/MajorEnroll";
import LearnerEnrollBox from "./EnrollSubject/LearnerEnroll";
import ActEnrollBox from "./EnrollSubject/ActEnroll";
import GEElecEnrollBox from "./EnrollSubject/GEElecEnroll";
import FreeEnrollBox from "./EnrollSubject/FreeEnroll";
import CoCreEnrollBox from "./EnrollSubject/CoCreEnroll";
import { truncateTitle } from "utils/BoxUtils";
import UncountBox from "./EnrollSubject/UncountBox";
import BlankBox from "./EnrollSubject/BlankBox";
import CreditBox from "./EnrollSubject/CreditBox";
import PendingCreditBox from "./EnrollSubject/PendingCreditBox";
import { coreApi } from "core/connections";
import { useQuery } from "react-query";
import useGlobalStore from "common/contexts/StoreContext";
import PlanSelection from "./PlanSelector/PlanSelection.tsx";
import { toInteger } from "lodash-es";
import SummaryBox from "./SummaryBox/CreditSummary.tsx";
import CourseRemainBox from "./SummaryBox/CourseRemainBox.tsx";
import InfoModal from "./Popup/InfoModal.tsx";
import PlanSettingPopup from "./PlanSelector/PlanSettingPopup.tsx";

type CurriculumPayload = {
  major: string;
  year: string;
  plan: string;
};

type CurriculumData = {
  // Define the structure of the curriculum data here
  major: string;
  year: string;
  plan: string;
  // Add more properties if needed
};

type EnrolledCoursesData = {
  // Define the structure of the enrolled courses data here
  studentID: string;
  // Add more properties if needed
};

type Course = {
  year?: string;
  semester?: string;
  courseNo: string;
  credit: number;
  grade?: string;
  courseTitleEng: string;
  recommendYear: number;
  recommendSemester: number;
  prerequisites?: string[];
  corequisites?: string;
};

type Plan = {
  name: string;
  major: string;
  year: string;
  plan: string;
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

function getEnrolledCourses(): Promise<EnrolledCoursesData> {
  return new Promise<EnrolledCoursesData>((resolve, reject) => {
    coreApi
      .get(`/student/enrolledDataOld`)
      .then((res: { data: EnrolledCoursesData }) => resolve(res.data))
      .catch(reject);
  });
}

export const EnrollAndCredits: React.FC = () => {
  interface groupedEnrolls {
    [year: string]: {
      [semester: string]: Course[];
    };
  }
  const { userData } = useGlobalStore();
  const [groupedEnrolls, setGroupedEnrolls] = useState<groupedEnrolls>();

  interface CurriculumData {
    requiredCredits: number;
    freeElectiveCredits: number;
    coreAndMajorGroups: any[];
    geGroups: any[]; // Replace 'any' with the actual type of geGroups
    // Add other properties if necessary
  }

  const [curriculumData, setCurriculumData] = useState<CurriculumData>();
  const [selectedPlan, setSelectedPlan] = useState<Plan>({
    name: "Select your study plan",
    major: "CPE",
    year: "2563",
    plan: "normal",
  });
  const [showInfo, setShowInfo] = useState(false);
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [showPlanSetting, setShowPlanSetting] = useState(true);

  const { refetch } = useQuery("curriculum", fetchData, {
    onSuccess: async (data: {
      enrollData: groupedEnrolls;
      curriculumData: CurriculumData;
    }) => {
      if (data) {
        setGroupedEnrolls(data.enrollData);
        setCurriculumData(data.curriculumData);
      }
    },
    enabled: !!userData, // Ensure the query runs only if userData is available
  });

  // Combine useEffects into a single useEffect for managing body overflow and refetching data
  useEffect(() => {
    if (userData) {
      refetch();
    }
    // If either showInfo or showInfoBox is true, disable scrolling
    document.body.style.overflow = showInfo || showInfoBox ? "hidden" : "auto";

    // Cleanup function to enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [userData, selectedPlan, showInfo, showInfoBox, refetch]);

  async function fetchData() {
    if (userData) {
      const [curriculumData, enrollData] = await Promise.all([
        getCurriculum(selectedPlan),
        getEnrolledCourses(),
      ]);
      return { curriculumData, enrollData };
    }
  }

  // Check if curriculumData is available before using it
  if (!curriculumData) {
    return null; // or a loading indicator, depending on your UI requirements
  }

  const handleClose = () => {
    setShowPlanSetting(false);
  };

  // Function to find courseTitleEng based on courseNo
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
          }
        }
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

    return { courseTitleEng: undefined, groupName: "Free Elective" };
  };

  // Function to calculate the sum of credits for each groupName
  const calculateGroupCredits = (): { [groupName: string]: number } => {
    const groupCredits: { [groupName: string]: number } = {};

    // Initialize groupCredits with 0 for each groupName, including Free Elective
    [...curriculumData.geGroups, ...curriculumData.coreAndMajorGroups].forEach(
      (group: { groupName: string }) => {
        groupCredits[group.groupName] = 0;
      }
    );
    groupCredits["Free Elective"] = 0; // Ensure Free Elective is also initialized
    if (groupedEnrolls) {
      // Iterate through groupedEnrolls to accumulate credits
      Object.keys(groupedEnrolls).forEach((year: string) => {
        Object.keys(groupedEnrolls[toInteger(year)]).forEach((semester) => {
          groupedEnrolls[toInteger(year)][toInteger(semester)].forEach(
            (course: any) => {
              if (course.grade !== "F" && course.grade !== "W") {
                const courseInfo = findCourseTitle(course.courseNo);
                if (courseInfo) {
                  // Assuming findCourseTitle returns undefined for courses not in curriculum
                  const groupName = courseInfo.groupName;
                  const requiredCredits = (
                    curriculumData.geGroups
                      .concat(curriculumData.coreAndMajorGroups)
                      .find(
                        (group: { groupName: string }) =>
                          group.groupName === groupName
                      ) || {}
                  ).requiredCredits;

                  // Check if adding credits exceeds requiredCredits for this group
                  if (
                    requiredCredits !== undefined &&
                    groupCredits[groupName] + Math.floor(course.credit) >
                      requiredCredits
                  ) {
                    const excessCredits =
                      groupCredits[groupName] +
                      Math.floor(course.credit) -
                      requiredCredits;
                    groupCredits[groupName] = requiredCredits; // Set to max requiredCredits
                    groupCredits["Free Elective"] += excessCredits; // Add excess to Free Elective
                  } else {
                    groupCredits[groupName] += Math.floor(course.credit);
                  }
                } else {
                  // Course not in curriculum, count towards Free Elective
                  groupCredits["Free Elective"] += Math.floor(course.credit);
                }
              }
            }
          );
        });
      });
    }

    return groupCredits;
  };

  // Calculate group credits
  const groupCredits = calculateGroupCredits();

  // Function to calculate the total sum of credits
  const calculateTotalCredits = (): number => {
    let totalCredits = 0;

    // Sum all group credits
    Object.keys(groupCredits).forEach((groupName) => {
      if (totalCredits < curriculumData.requiredCredits)
        totalCredits += groupCredits[groupName];
    });

    return totalCredits;
  };

  // Calculate total sum of credits
  const totalCredits = calculateTotalCredits();

  const getColorForGroupName = (groupName: string): string => {
    switch (groupName) {
      case "Core":
        return "collection-1-core-sk1";
      case "Major Required":
        return "blue-shadeb5";
      case "Major Elective":
        return "blue-shadeb5";
      case "Learner Person":
        return "collection-1-yellow-shade-y7";
      case "Active Citizen":
        return "collection-1-active-citizen-r2";
      case "Elective":
        return "collection-1-electives-brown1";
      case "Free Elective":
        return "collection-1-black-shade-bl4";
      case "Co-Creator":
        return "collection-1-co-creator-or1";
      // Add other cases for different group names as needed
      default:
        return "collection-1-yellow-shade-y6"; // Default color
    }
  };

  // Calculate the total required credits for coreAndMajorGroups
  const totalCoreAndMajorRequiredCredits =
    curriculumData.coreAndMajorGroups.reduce(
      (accumulator: any, group: { requiredCredits: any }) =>
        accumulator + group.requiredCredits,
      0
    );

  const totalGeCredits = curriculumData.geGroups.reduce(
    (accumulator: any, group: { requiredCredits: any }) =>
      accumulator + group.requiredCredits,
    0
  );

  // Calculate the total earned credits for coreAndMajorGroups
  // Assuming groupCredits is an object like: { Core: earnedCredits, Major Required: earnedCredits, ... }
  const totalCoreAndMajorEarnedCredits =
    curriculumData.coreAndMajorGroups.reduce(
      (accumulator: number, group: { groupName: string | number }) =>
        accumulator + (groupCredits[group.groupName] || 0),
      0
    );

  const calculateRemainingSubjectsForMajor = () => {
    return curriculumData.coreAndMajorGroups.map(
      (group: { groupName: string; requiredCredits: number }) => {
        const creditsCompleted = groupCredits[group.groupName] || 0;
        let creditsRemaining = group.requiredCredits - creditsCompleted;
        const subjectRemaining = Math.round(creditsRemaining / 3);
        if (creditsRemaining <= 0) creditsRemaining = 0;

        return {
          name: group.groupName,
          remaining: creditsRemaining,
          subjectRemaining, // Corrected property name
          color: getColorForGroupName(group.groupName),
        };
      }
    );
  };

  const remainingSubjectsForMajor = calculateRemainingSubjectsForMajor();

  const calculateRemainingSubjectsForGE = () => {
    return curriculumData.geGroups.map(
      (group: {
        groupName: string;
        requiredCredits: number;
        groups: string[];
      }) => {
        // Assuming groupCredits is an object where keys are group names and values are the credits completed
        const creditsCompleted = groupCredits[group.groupName] || 0; // Default to 0 if not found
        let creditsRemaining = group.requiredCredits - creditsCompleted;
        if (creditsRemaining <= 0) creditsRemaining = 0;

        // You need to return an object directly without the braces, or use parentheses to wrap the object
        return {
          name: group.groupName,
          remaining: creditsRemaining,
          color: getColorForGroupName(group.groupName),
          courseTitleEng: group.groupName,
        };
      }
    );
  };

  const remainingSubjectsForGE = calculateRemainingSubjectsForGE();

  const calculateRemainingFreeElectives = () => {
    const creditsCompleted = groupCredits["Free Elective"] || 0;
    const creditsRemaining =
      curriculumData.freeElectiveCredits - creditsCompleted;
    const subjectRemaining = Math.round(creditsRemaining); // Assuming direct subtraction is what you want

    return {
      name: "Free Elective",
      remaining: creditsRemaining,
      subjectRemaining,
      color: getColorForGroupName("Free Elective"), // Ensure this name matches your color map key
    };
  };

  const remainingFreeElectives = calculateRemainingFreeElectives();

  const groupOrder = [
    "Learner Person",
    "Co-Creator",
    "Active Citizen",
    "Elective",
    "Core",
    "Major Required",
    "Major Elective",
    "Free Elective",
  ];

  // Initialize variables to store maximum counts for each group
  let maxGeneralEducationCourses = 0;
  let maxMajorRequirementCourses = 0;
  let maxFreeElectiveCourses = 0;

  if (groupedEnrolls) {
    // Loop through each year and semester to find the maximum counts for each group
    Object.keys(groupedEnrolls).forEach((year) => {
      Object.keys(groupedEnrolls[toInteger(year)]).forEach((semester) => {
        const coursesByGroup: {
          generalEducation: Course[];
          majorRequirements: Course[];
          freeElective: Course[];
        } = {
          generalEducation: [],
          majorRequirements: [],
          freeElective: [],
        };

        groupedEnrolls[toInteger(year)][toInteger(semester)].forEach(
          (course) => {
            const { groupName } = findCourseTitle(course.courseNo);
            switch (groupName) {
              case "Learner Person":
              case "Co-Creator":
              case "Active Citizen":
              case "Elective":
                coursesByGroup.generalEducation.push(course);
                break;
              case "Core":
              case "Major Required":
              case "Major Elective":
                coursesByGroup.majorRequirements.push(course);
                break;
              default:
                coursesByGroup.freeElective.push(course);
            }
          }
        );

        // Update maximum counts for each group
        maxGeneralEducationCourses = Math.max(
          maxGeneralEducationCourses,
          coursesByGroup.generalEducation.length
        );
        maxMajorRequirementCourses = Math.max(
          maxMajorRequirementCourses,
          coursesByGroup.majorRequirements.length
        );
        maxFreeElectiveCourses = Math.max(
          maxFreeElectiveCourses,
          coursesByGroup.freeElective.length
        );
      });
    });
  }

  function numberToOrdinal(n: number) {
    const ordinals = [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
      "Seventh",
      "Eighth",
    ];
    return ordinals[n - 1];
  }

  function numberToSemester(n: number) {
    const ordinals = ["1st", "2nd"];
    return ordinals[n - 1];
  }

  function findRemainingCourses() {
    const remainingCourses: Course[] = [];

    if (curriculumData && groupedEnrolls) {
      // Iterate over each group in curriculumData
      curriculumData.coreAndMajorGroups.forEach((group) => {
        // Iterate over each course in the group
        group.requiredCourses.forEach(
          (course: {
            courseNo: string;
            recommendYear: number;
            recommendSemester: number;
            credits: number;
            courseTitleEng: string;
          }) => {
            // Check if the course exists in groupedEnrolls
            let courseExists = false;
            Object.keys(groupedEnrolls).forEach((year) => {
              Object.keys(groupedEnrolls[year]).forEach((semester) => {
                groupedEnrolls[year][semester].forEach((enrolledCourse) => {
                  if (enrolledCourse.courseNo === course.courseNo) {
                    courseExists = true;
                  }
                });
              });
            });

            // If the course does not exist in groupedEnrolls, add it to remainingCourses
            if (
              !courseExists &&
              course.recommendYear &&
              course.recommendSemester
            ) {
              remainingCourses.push({
                courseNo: course.courseNo,
                courseTitleEng: course.courseTitleEng,
                credit: course.credits, // Add course credits
                recommendYear: course.recommendYear,
                recommendSemester: course.recommendSemester,
              });
            }
          }
        );
      });

      // Iterate over each group in curriculumData
      curriculumData.geGroups.forEach((group) => {
        // Iterate over each course in the group
        group.requiredCourses.forEach(
          (course: {
            courseNo: string;
            recommendYear: number;
            recommendSemester: number;
            credits: number;
            courseTitleEng: string;
          }) => {
            // Check if the course exists in groupedEnrolls
            let courseExists = false;
            Object.keys(groupedEnrolls).forEach((year) => {
              Object.keys(groupedEnrolls[year]).forEach((semester) => {
                groupedEnrolls[year][semester].forEach((enrolledCourse) => {
                  if (
                    enrolledCourse.courseNo === course.courseNo &&
                    enrolledCourse.grade !== "F" &&
                    enrolledCourse.grade !== "W"
                  ) {
                    courseExists = true;
                  }
                });
              });
            });

            // If the course does not exist in groupedEnrolls, add it to remainingCourses
            if (
              !courseExists &&
              course.recommendYear &&
              course.recommendSemester
            ) {
              remainingCourses.push({
                courseNo: course.courseNo,
                courseTitleEng: course.courseTitleEng,
                credit: course.credits, // Add course credits
                recommendYear: course.recommendYear,
                recommendSemester: course.recommendSemester,
              });
            }
          }
        );
      });

      return remainingCourses;
    }
  }

  // Classify remainingCourses into their respective groups

  const remainingCourses = findRemainingCourses();

  const remainCoursesByGroup: {
    generalEducation: Course[];
    majorRequirements: Course[];
    freeElective: Course[];
  } = {
    generalEducation: [],
    majorRequirements: [],
    freeElective: [],
  };

  const remainGroup: {
    generalEducation: {
      "Learner Person": Course[];
      "Co-Creator": Course[];
      "Active Citizen": Course[];
      Elective: Course[];
    };
    majorRequirements: {
      Core: Course[];
      "Major Required": Course[];
      "Major Elective": Course[];
    };
    freeElective: Course[];
  } = {
    generalEducation: {
      "Learner Person": [],
      "Co-Creator": [],
      "Active Citizen": [],
      Elective: [],
    },
    majorRequirements: {
      Core: [],
      "Major Required": [],
      "Major Elective": [],
    },
    freeElective: [],
  };

  if (remainingCourses) {
    remainingCourses.forEach((course) => {
      const { groupName } = findCourseTitle(course.courseNo);
      if (!course.credit) {
        console.log(course);
      }
      switch (groupName) {
        case "Learner Person":
        case "Co-Creator":
        case "Active Citizen":
        case "Elective":
          remainCoursesByGroup.generalEducation.push(course);
          remainGroup.generalEducation[groupName].push(course);
          break;
        case "Core":
        case "Major Required":
        case "Major Elective":
          remainCoursesByGroup.majorRequirements.push(course);
          remainGroup.majorRequirements[groupName].push(course);
          break;
        default:
          remainCoursesByGroup.freeElective.push(course);
      }
    });
  }

  type Group = "generalEducation" | "majorRequirements" | "freeElective";

  function findMaxRemainCoursesByGroup(group: Group): number {
    const yearSemesterCount: { [key: string]: number } = {};

    remainCoursesByGroup[group].forEach(
      ({ recommendYear, recommendSemester }) => {
        if (recommendYear && recommendSemester) {
          const key = `${recommendYear}-${recommendSemester}`;
          yearSemesterCount[key] = (yearSemesterCount[key] || 0) + 1;
        }
      }
    );

    return Math.max(...Object.values(yearSemesterCount), 0);
  }

  if (maxFreeElectiveCourses === 0) maxFreeElectiveCourses = 1;

  maxGeneralEducationCourses += Math.ceil(
    findMaxRemainCoursesByGroup("generalEducation") / 2
  );
  maxMajorRequirementCourses += Math.ceil(
    findMaxRemainCoursesByGroup("majorRequirements") / 1.5
  );
  maxFreeElectiveCourses += Math.ceil(
    findMaxRemainCoursesByGroup("freeElective") / 2
  );

  function renderRemainCourse(course: Course) {
    const { groupName } = findCourseTitle(course.courseNo);
    let content;
    switch (groupName) {
      case "Learner Person":
        content = (
          <LearnerEnrollBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng || "")}
            courseFullName={course.courseTitleEng || ""}
            courseRecommendedYear={findCourseRecommendYearForCurriculumData(
              course.courseNo
            )}
            courseCategory={groupName}
            courseCredit={Math.floor(course.credit)}
            coursePrerequisites={findPreReqFromCurriculumData(course.courseNo)}
            courseCorequisite={findCoReqFromCurriculumData(course.courseNo)}
            remain={true}
          />
        );
        break;
      case "Co-Creator":
        content = (
          <CoCreEnrollBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng || "")}
            courseFullName={course.courseTitleEng || ""}
            courseRecommendedYear={findCourseRecommendYearForCurriculumData(
              course.courseNo
            )}
            courseCategory={groupName}
            coursePrerequisites={findPreReqFromCurriculumData(course.courseNo)}
            courseCorequisite={findCoReqFromCurriculumData(course.courseNo)}
            courseCredit={Math.floor(course.credit)}
            remain={true}
          />
        );
        break;
      case "Active Citizen":
        content = (
          <ActEnrollBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng || "")}
            courseFullName={course.courseTitleEng || ""}
            courseRecommendedYear={findCourseRecommendYearForCurriculumData(
              course.courseNo
            )}
            courseCategory={groupName}
            courseCredit={Math.floor(course.credit)}
            remain={true}
            coursePrerequisites={findPreReqFromCurriculumData(course.courseNo)}
            courseCorequisite={findCoReqFromCurriculumData(course.courseNo)}
          />
        );
        break;
      case "Elective":
        content = (
          <GEElecEnrollBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng || "")}
            courseFullName={course.courseTitleEng || ""}
            courseCredit={Math.floor(course.credit)}
            courseRecommendedYear={findCourseRecommendYearForCurriculumData(
              course.courseNo
            )}
            courseCategory={groupName}
            remain={true}
            coursePrerequisites={findPreReqFromCurriculumData(course.courseNo)}
            courseCorequisite={findCoReqFromCurriculumData(course.courseNo)}
          />
        );
        break;
      case "Core":
        content = (
          <CoreEnrollBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng || "")}
            courseFullName={course.courseTitleEng || ""}
            courseCredit={Math.floor(course.credit)}
            courseRecommendedYear={findCourseRecommendYearForCurriculumData(
              course.courseNo
            )}
            courseCategory={groupName}
            remain={true}
            coursePrerequisites={findPreReqFromCurriculumData(course.courseNo)}
            courseCorequisite={findCoReqFromCurriculumData(course.courseNo)}
          />
        );
        break;
      case "Major Required":
        content = (
          <MajorEnrollBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng || "")}
            courseFullName={course.courseTitleEng || ""}
            courseCredit={Math.floor(course.credit)}
            courseRecommendedYear={findCourseRecommendYearForCurriculumData(
              course.courseNo
            )}
            courseCategory={groupName}
            remain={true}
            coursePrerequisites={findPreReqFromCurriculumData(course.courseNo)}
            courseCorequisite={findCoReqFromCurriculumData(course.courseNo)}
          />
        );
        break;
      case "Major Elective":
        content = (
          <MajorEnrollBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng || "")}
            courseFullName={course.courseTitleEng || ""}
            courseCredit={Math.floor(course.credit)}
            courseRecommendedYear={findCourseRecommendYearForCurriculumData(
              course.courseNo
            )}
            courseCategory={groupName}
            remain={true}
            coursePrerequisites={findPreReqFromCurriculumData(course.courseNo)}
            courseCorequisite={findCoReqFromCurriculumData(course.courseNo)}
          />
        );
        break;
      default:
        content = (
          <FreeEnrollBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng || "")}
            courseFullName={course.courseTitleEng || ""}
            courseCredit={Math.floor(course.credit)}
            courseRecommendedYear={findCourseRecommendYearForCurriculumData(
              course.courseNo
            )}
            courseCategory={groupName}
            remain={true}
            coursePrerequisites={findPreReqFromCurriculumData(course.courseNo)}
            courseCorequisite={findCoReqFromCurriculumData(course.courseNo)}
          />
        );
    }
    return (
      <div
        key={course.courseNo}
        className="flex flex-col items-center justify-center my-1.5"
      >
        {content}
      </div>
    );
  }

  function findCourseRecommendYearForCurriculumData(courseNo: string) {
    if (!curriculumData) return "";
    for (const group of curriculumData.coreAndMajorGroups) {
      for (const course of group.requiredCourses) {
        if (course.courseNo === courseNo) {
          return (
            "ปี " + course.recommendYear + " เทอม " + course.recommendSemester
          );
        }
      }
    }
    for (const group of curriculumData.geGroups) {
      for (const course of group.requiredCourses) {
        if (course.courseNo === courseNo) {
          return (
            "ปี " + course.recommendYear + " เทอม " + course.recommendSemester
          );
        }
      }
    }
    return "ไม่มีข้อมูล";
  }

  function findPreReqFromCurriculumData(courseNo: string) {
    if (!curriculumData) return [];
    for (const group of curriculumData.coreAndMajorGroups) {
      for (const course of group.requiredCourses) {
        if (course.courseNo === courseNo) {
          return course.prerequisites;
        }
      }
    }
    for (const group of curriculumData.geGroups) {
      for (const course of group.requiredCourses) {
        if (course.courseNo === courseNo) {
          return course.prerequisites;
        }
      }
    }
    return [];
  }

  function findCoReqFromCurriculumData(courseNo: string) {
    if (!curriculumData) return "";
    for (const group of curriculumData.coreAndMajorGroups) {
      for (const course of group.requiredCourses) {
        if (course.courseNo === courseNo) {
          return course.corequisite || "";
        }
      }
    }
    return "";
  }

  function calculateRemainingCredits(course: Course[]) {
    return course
      .filter((course: Course) => course.credit)
      .filter((course: Course) => course.credit)
      .reduce((acc: number, course: Course) => acc + course.credit, 0);
  }

  function findGERemainByGroup(name: string): number {
    if (!remainingSubjectsForGE || remainingSubjectsForGE.length === 0)
      return 0;
    const group = remainingSubjectsForGE.find((group) => group.name === name);
    return group ? group.remaining : 0;
  }

  function findMJRemainByGroup(name: string) {
    if (!remainingSubjectsForMajor || remainingSubjectsForMajor.length === 0)
      return 0;
    const group = remainingSubjectsForMajor.find(
      (group) => group.name === name
    );
    return group ? group.remaining : 0;
  }

  const remainLearner =
    findGERemainByGroup("Learner Person") -
    calculateRemainingCredits(remainGroup.generalEducation["Learner Person"]);
  const remainCocre =
    findGERemainByGroup("Co-Creator") -
    calculateRemainingCredits(remainGroup.generalEducation["Co-Creator"]);
  const remainAct =
    findGERemainByGroup("Active Citizen") -
    calculateRemainingCredits(remainGroup.generalEducation["Active Citizen"]);
  const remainElec =
    findGERemainByGroup("Elective") -
    calculateRemainingCredits(remainGroup.generalEducation["Elective"]);

  const remainCore =
    findMJRemainByGroup("Core") -
    calculateRemainingCredits(remainGroup.majorRequirements["Core"]);
  const remainMJreq =
    findMJRemainByGroup("Major Required") -
    calculateRemainingCredits(remainGroup.majorRequirements["Major Required"]);
  const remainMJelec =
    findMJRemainByGroup("Major Elective") -
    calculateRemainingCredits(remainGroup.majorRequirements["Major Elective"]);

  const remainFRtotal =
    remainingFreeElectives.remaining -
    calculateRemainingCredits(remainGroup.freeElective);

  // console.log(remainGroup)
  // console.log(remainLearner , remainCocre , remainAct , remainElec , remainCore , remainMJreq , remainMJelec , remainFRtotal)

  const remainGEtotal =
    remainingSubjectsForGE
      .map((group) => group.remaining)
      .reduce((a, b) => a + b, 0) -
    (remainLearner + remainCocre + remainAct + remainElec);
  const remainMJtotal =
    remainingSubjectsForMajor
      .map((group) => group.remaining)
      .reduce((a, b) => a + b, 0) -
    (remainCore + remainMJreq + remainMJelec);

  // console.log(remainGEtotal , remainMJtotal , remainFRtotal)

  function renderRemainTotalBox(credit: number, groupName: string) {
    let boxes = [];
    while (credit > 0) {
      let boxCredit;
      if (credit >= 3) {
        boxCredit = 3;
      } else if (credit === 2) {
        boxCredit = 3;
      } else {
        boxCredit = 1;
      }
      credit -= boxCredit;

      let box;
      switch (groupName) {
        case "Learner Person":
          box = (
            <div className="flex flex-col items-center justify-center my-1.5">
              <LearnerEnrollBox
                courseCredit={boxCredit}
                remain={true}
                dummy={true}
                courseTitleEng={"Learner Person"}
                courseNo={"000000"}
                courseFullName={"Learner Person Course"}
                courseCategory={groupName}
                courseRecommendedYear="ไม่มีข้อมูล"
              />
            </div>
          );
          break;
        case "Co-Creator":
          box = (
            <div className="flex flex-col items-center justify-center my-1.5">
              <CoCreEnrollBox
                courseCredit={boxCredit}
                remain={true}
                dummy={true}
                courseTitleEng={"Co-Creator"}
                courseNo={"000000"}
                courseFullName={"Co-Creator Course"}
                courseCategory={groupName}
                courseRecommendedYear={"ไม่มีข้อมูล"}
              />
            </div>
          );
          break;
        case "Active Citizen":
          box = (
            <div className="flex flex-col items-center justify-center my-1.5">
              <ActEnrollBox
                courseCredit={boxCredit}
                remain={true}
                dummy={true}
                courseTitleEng={"Active Citizen"}
                courseNo={"000000"}
                courseFullName={"Active Citizen Course"}
                courseCategory={groupName}
                courseRecommendedYear={"ไม่มีข้อมูล"}
              />
            </div>
          );
          break;
        case "Elective":
          box = (
            <div className="flex flex-col items-center justify-center my-1.5">
              <GEElecEnrollBox
                courseCredit={boxCredit}
                remain={true}
                dummy={true}
                courseNo={"000000"}
                courseTitleEng={"General Elective"}
                courseFullName={"General Elective Course"}
                courseCategory={groupName}
                courseRecommendedYear={"ไม่มีข้อมูล"}
              />
            </div>
          );
          break;
        case "Core":
          box = (
            <div className="flex flex-col items-center justify-center my-1.5">
              <CoreEnrollBox
                courseCredit={boxCredit}
                remain={true}
                dummy={true}
                courseTitleEng={"Core"}
                courseNo={"000000"}
                courseFullName={"Core Course"}
                courseCategory={groupName}
                courseRecommendedYear={"ไม่มีข้อมูล"}
              />
            </div>
          );
          break;
        case "Major Required":
          box = (
            <div className="flex flex-col items-center justify-center my-1.5">
              <MajorEnrollBox
                courseCredit={boxCredit}
                remain={true}
                dummy={true}
                courseTitleEng={"Major Required"}
                courseNo={"000000"}
                courseFullName={"Major Required Course"}
                courseCategory={groupName}
                courseRecommendedYear={"ไม่มีข้อมูล"}
              />
            </div>
          );
          break;
        case "Major Elective":
          box = (
            <div className="flex flex-col items-center justify-center my-1.5">
              <MajorEnrollBox
                courseCredit={boxCredit}
                remain={true}
                dummy={true}
                courseTitleEng={"Major Elective"}
                courseNo={"000000"}
                courseFullName={"Major Elective Course"}
                courseCategory={groupName}
                courseRecommendedYear={"ไม่มีข้อมูล"}
              />
            </div>
          );
          break;
        case "Free Elective":
          box = (
            <div className="flex flex-col items-center justify-center my-1.5">
              <FreeEnrollBox
                courseCredit={boxCredit}
                remain={true}
                dummy={true}
                courseTitleEng={"Free Elective"}
                courseNo={"000000"}
                courseFullName={"Free Elective Course"}
                courseCategory={groupName}
                courseRecommendedYear={"ไม่มีข้อมูล"}
              />
            </div>
          );
          break;
        default:
          box = <BlankBox courseNo={""} courseTitleEng={""} courseCredit={0} />;
      }

      boxes.push(box);
    }

    return boxes;
  }

  const heightDiv = 57.7;

  return (
    <div className={`flex flex-col items-center w-full pt-8 ml-10`}>
      {showPlanSetting && (
        <PlanSettingPopup onClose={handleClose} mode={true} />
      )}
      {showInfoBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <div className="flex flex-col bg-white py-8 px-8 rounded-[20px] shadow-lg w-[600px] text-center justify-center items-center h-[300px]">
            <h2 className="text-[24px] font-bold mb-4 text-black">
              กรุณาเลือกหลักสูตรที่ท่านกำลังศึกษาอยู่
            </h2>
            <div className="flex mb-8">
              <PlanSelection onPlanChange={setSelectedPlan} />
            </div>
            <button
              className="bg-blue-shadeb5 hover:bg-blue-shadeb4 text-white font-bold py-2 mt-8 rounded-full w-[200px]"
              onClick={() => setShowInfoBox(false)}
            >
              ปิด
            </button>
          </div>
        </div>
      )}
      {!showInfoBox && (
        <div>
          <PlanSelection onPlanChange={setSelectedPlan} />
        </div>
      )}
      <div className="pb-10"></div>
      <div className="flex flex-row items-start space-x-4">
        <div
          className={`flex items-center bg-white rounded-[20px] py-4 pr-4 mr-4 shadow-lg border border-gray-200`}
        >
          <div className="relative rounded-[20px] pr-[54px] py-8 w-[30px] h-full">
            <div className="mt-[58px] ml-4 flex flex-col h-full">
              {/* General Education Section */}
              <div
                style={{
                  height: `${maxGeneralEducationCourses * heightDiv + 26}px`, // Dynamic height based on the number of courses
                }}
                className="bg-yellow-50 border-r-0 border border-solid border-amber-300 flex items-center justify-center w-[40px] rounded-tl-[20px] rounded-bl-[20px] text-collection-1-yellow-shade-y7 text-sm"
              >
                <p className="[writing-mode:vertical-lr] [transform:rotate(180deg)] cursor-default">
                  General Education
                </p>
              </div>

              {/* Major Requirements Section */}
              <div
                style={{
                  height: `${maxMajorRequirementCourses * heightDiv + 34}px`, // Dynamic height for major requirements
                }}
                className="bg-blue-shadeb05 border-r-0 border border-solid border-blue-shadeb3 flex items-center justify-center w-[40px] rounded-tl-[20px] rounded-bl-[20px] text-blue-shadeb5 text-sm"
              >
                <p className="[writing-mode:vertical-lr] [transform:rotate(180deg)]  cursor-default">
                  Major Requirements
                </p>
              </div>

              {/* Free Electives Section */}
              {maxFreeElectiveCourses > 0 && (
                <div
                  style={{
                    height: `${
                      maxFreeElectiveCourses === 1
                        ? maxFreeElectiveCourses * heightDiv + 33.5
                        : maxFreeElectiveCourses * heightDiv + 32 + 2
                    }px`, // Dynamic height based on free electives
                  }}
                  className="bg-collection-1-black-sl border-r-0 border border-solid border-collection-1-black-shade-bl4 flex items-center justify-center w-[40px] rounded-tl-[20px] rounded-bl-[20px] text-black text-sm"
                >
                  <p className="[writing-mode:vertical-lr] [transform:rotate(180deg)] cursor-default">
                    {maxFreeElectiveCourses > 1 ? "Free Elective" : "Free"}
                  </p>
                </div>
              )}

              {/* Credits Section */}
              <div
                style={{ height: `${30 + 5}px` }}
                className="bg-blue-shadeb1 border-r-0 border border-solid border-blue-shadeb5 flex items-center justify-center w-[40px] rounded-tl-[20px] rounded-bl-[20px] text-blue-shadeb5 text-center"
              >
                <p className="cursor-default text-[10px] pr-2 font-bold text-center ml-2">
                  Credit
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[20px] w-full pb-12 cursor-default">
            <div className="flex justify-end pb-2 m-2 top-0 right-0 h-[30px]">
              <div className={`flex flex-cols justify-center items-center`}>
                <div className="flex border-[2px] border-solid border-blue-shadeb5 w-[30px] h-[10px] rounded-[20px] bg-blue-shadeb1 mr-2" />
                <p className={`text-sm text-gray mr-4`}>เรียนแล้ว</p>
              </div>
              <div className={`flex flex-cols justify-center items-center`}>
                <div className="flex border-[2px] border-solid border-blue-shadeb5 w-[30px] h-[10px] rounded-[20px] bg-white mr-2" />
                <p className={`text-sm text-gray mr-4`}>ยังไม่ได้เรียน</p>
              </div>
              <div className={`flex flex-cols justify-center items-center`}>
                <div className="flex border-[2px] border-solid border-gray-300 w-[30px] h-[10px] rounded-[20px] bg-gray-0 mr-2" />
                <p className={`text-sm text-gray mr-8`}>F/W</p>
              </div>
              <div className={`flex flex-cols justify-center items-center`}>
                <button
                  className={`flex border-[2px] bg-white border-solid border-blue-shadeb5 rounded-[20px] text-sm p-1 w-[20px] h-[20px] 
                    text-center justify-center items-center text-blue-shadeb5 transition-all duration-300 hover:scale-125`}
                  onClick={() => setShowInfo(true)}
                >
                  ?
                </button>
                {showInfo && (
                  <InfoModal
                    title="ข้อมูลชนิดกล่องวิชาในแต่ละหมวดหมู่"
                    imageUrl="/imgs/Subjectbox_Details.svg"
                    imageAlt="Subject Box Details"
                    onClose={() => setShowInfo(false)}
                  />
                )}
              </div>
            </div>
            <div className="overflow-auto hover:overflow-x-scroll overflow-y-hidden overscroll-x-contain border border-x-[1px] border-y-0 border-solid border-gray-100 rounded-t-[20px] rounded-br-[20px]">
              <div className="flex">
                {curriculumData &&
                  groupedEnrolls &&
                  Object.keys(groupedEnrolls).map((year) => (
                    <div
                      key={year}
                      className="flex-shrink-0"
                      style={{ minWidth: "25%", width: "auto" }}
                    >
                      <div
                        className={`bg-white rounded-tl-[20px] rounded-tr-[20px] py-2 border border-solid border-b-0 border-gray-200`}
                      >
                        <h2 className="text-center cursor-default">
                          {" "}
                          {numberToOrdinal(toInteger(year))} Year
                        </h2>
                      </div>

                      <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${
                          Object.keys(groupedEnrolls[year]).length > 2
                            ? "3"
                            : "2"
                        } xl:grid-cols-${
                          Object.keys(groupedEnrolls[year]).length > 2
                            ? "3"
                            : "2"
                        } gap-0 border border-solid border-x-1 border-y-0 border-gray-200`}
                      >
                        {Object.keys(groupedEnrolls[year]).map((semester) => (
                          <div key={semester}>
                            <p
                              className={`text-center text-[10px] text-blue-shadeb6 w-30 
                                    px-7 py-0.5 bg-blue-shadeb05 rounded-tl-2xl rounded-tr-2xl cursor-default`}
                            >
                              {semester === "3"
                                ? "Summer"
                                : `${numberToSemester(
                                    toInteger(semester)
                                  )} Semester`}
                            </p>
                            {(() => {
                              const coursesByGroup: {
                                generalEducation: Course[];
                                majorRequirements: Course[];
                                freeElective: Course[];
                              } = {
                                generalEducation: [],
                                majorRequirements: [],
                                freeElective: [],
                              };

                              // Classify courses into their respective groups
                              const sortedGroups = Object.keys(
                                groupedEnrolls[year][semester]
                              ).sort((a, b) => {
                                const groupA = findCourseTitle(
                                  groupedEnrolls[year][semester][toInteger(a)]
                                    .courseNo
                                ).groupName;
                                const groupB = findCourseTitle(
                                  groupedEnrolls[year][semester][toInteger(b)]
                                    .courseNo
                                ).groupName;
                                return (
                                  groupOrder.indexOf(groupA) -
                                  groupOrder.indexOf(groupB)
                                );
                              });

                              let totalCredits = 0;

                              sortedGroups.forEach((group) => {
                                const course =
                                  groupedEnrolls[year][semester][
                                    toInteger(group)
                                  ];
                                const { groupName } = findCourseTitle(
                                  course.courseNo
                                );
                                totalCredits += Math.floor(
                                  toInteger(course.credit)
                                );

                                switch (groupName) {
                                  case "Learner Person":
                                  case "Co-Creator":
                                  case "Active Citizen":
                                  case "Elective":
                                    coursesByGroup.generalEducation.push(
                                      course
                                    );
                                    break;
                                  case "Core":
                                  case "Major Required":
                                  case "Major Elective":
                                    coursesByGroup.majorRequirements.push(
                                      course
                                    );
                                    break;
                                  default:
                                    coursesByGroup.freeElective.push(course);
                                }
                              });

                              const renderCourse = (course: Course) => {
                                const { courseTitleEng, groupName } =
                                  findCourseTitle(course.courseNo);
                                if (
                                  course.grade !== "F" &&
                                  course.grade !== "W"
                                ) {
                                  let content;
                                  switch (groupName) {
                                    case "Learner Person":
                                      content = (
                                        <LearnerEnrollBox
                                          courseNo={course.courseNo}
                                          courseTitleEng={truncateTitle(
                                            courseTitleEng || ""
                                          )}
                                          courseCredit={Math.floor(
                                            course.credit
                                          )}
                                          courseFullName={courseTitleEng || ""}
                                          courseRecommendedYear={findCourseRecommendYearForCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCategory={groupName}
                                          coursePrerequisites={findPreReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCorequisite={findCoReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                        />
                                      );
                                      break;
                                    case "Co-Creator":
                                      content = (
                                        <CoCreEnrollBox
                                          courseNo={course.courseNo}
                                          courseTitleEng={truncateTitle(
                                            courseTitleEng || ""
                                          )}
                                          courseCredit={Math.floor(
                                            course.credit
                                          )}
                                          courseFullName={courseTitleEng || ""}
                                          courseRecommendedYear={findCourseRecommendYearForCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCategory={groupName}
                                          coursePrerequisites={findPreReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCorequisite={findCoReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                        />
                                      );
                                      break;
                                    case "Active Citizen":
                                      content = (
                                        <ActEnrollBox
                                          courseNo={course.courseNo}
                                          courseTitleEng={truncateTitle(
                                            courseTitleEng || ""
                                          )}
                                          courseCredit={Math.floor(
                                            course.credit
                                          )}
                                          courseFullName={courseTitleEng || ""}
                                          courseRecommendedYear={findCourseRecommendYearForCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCategory={groupName}
                                          coursePrerequisites={findPreReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCorequisite={findCoReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                        />
                                      );
                                      break;
                                    case "Elective":
                                      content = (
                                        <GEElecEnrollBox
                                          courseNo={course.courseNo}
                                          courseTitleEng={truncateTitle(
                                            courseTitleEng || ""
                                          )}
                                          courseCredit={Math.floor(
                                            course.credit
                                          )}
                                          courseFullName={courseTitleEng || ""}
                                          courseRecommendedYear={findCourseRecommendYearForCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCategory={groupName}
                                          coursePrerequisites={findPreReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCorequisite={findCoReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                        />
                                      );
                                      break;
                                    case "Core":
                                      content = (
                                        <CoreEnrollBox
                                          courseNo={course.courseNo}
                                          courseTitleEng={truncateTitle(
                                            courseTitleEng || ""
                                          )}
                                          courseCredit={Math.floor(
                                            course.credit
                                          )}
                                          courseFullName={courseTitleEng || ""}
                                          courseRecommendedYear={findCourseRecommendYearForCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCategory={groupName}
                                          coursePrerequisites={findPreReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCorequisite={findCoReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                        />
                                      );
                                      break;
                                    case "Major Required":
                                      content = (
                                        <MajorEnrollBox
                                          courseNo={course.courseNo}
                                          courseTitleEng={truncateTitle(
                                            courseTitleEng || ""
                                          )}
                                          courseCredit={Math.floor(
                                            course.credit
                                          )}
                                          courseFullName={courseTitleEng || ""}
                                          courseRecommendedYear={findCourseRecommendYearForCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCategory={groupName}
                                          coursePrerequisites={findPreReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCorequisite={findCoReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                        />
                                      );
                                      break;
                                    case "Major Elective":
                                      content = (
                                        <MajorEnrollBox
                                          courseNo={course.courseNo}
                                          courseTitleEng={truncateTitle(
                                            courseTitleEng || ""
                                          )}
                                          courseCredit={Math.floor(
                                            course.credit
                                          )}
                                          courseFullName={courseTitleEng || ""}
                                          courseRecommendedYear={findCourseRecommendYearForCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCategory={groupName}
                                          coursePrerequisites={findPreReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCorequisite={findCoReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                        />
                                      );
                                      break;
                                    default:
                                      content = (
                                        <FreeEnrollBox
                                          courseNo={course.courseNo}
                                          courseCredit={Math.floor(
                                            course.credit
                                          )}
                                          courseTitleEng={""}
                                          courseFullName={courseTitleEng || ""}
                                          courseRecommendedYear={findCourseRecommendYearForCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCategory={groupName}
                                          coursePrerequisites={findPreReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                          courseCorequisite={findCoReqFromCurriculumData(
                                            course.courseNo
                                          )}
                                        />
                                      );
                                  }
                                  return (
                                    <div
                                      key={course.courseNo}
                                      className="flex flex-col items-center justify-center my-1.5"
                                    >
                                      {content}
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div
                                      key={course.courseNo}
                                      className="flex flex-col items-center justify-center my-1.5"
                                    >
                                      <UncountBox
                                        courseNo={course.courseNo}
                                        courseTitleEng={truncateTitle(
                                          courseTitleEng || ""
                                        )}
                                        courseCredit={Math.floor(course.credit)}
                                        courseFullName={
                                          courseTitleEng || "Not found"
                                        }
                                        courseCategory={
                                          groupName || "Not found"
                                        }
                                        courseRecommendedYear={findCourseRecommendYearForCurriculumData(
                                          course.courseNo
                                        )}
                                      />
                                    </div>
                                  );
                                }
                              };

                              const renderPlaceholder = () => (
                                <div className="flex flex-col items-center justify-center my-1.5">
                                  <BlankBox
                                    courseNo={""}
                                    courseTitleEng={""}
                                    courseCredit={0}
                                  />
                                </div>
                              );

                              // Render all courses grouped by category and draw lines between groups
                              return (
                                <div
                                  className={`border border-solid ${
                                    semester === "1"
                                      ? "border-r-1 border-l-0"
                                      : "border-x-0"
                                  } border-y-0 border-gray-200 pt-[10px]`}
                                >
                                  <div className="flex flex-col items-center justify-center">
                                    {coursesByGroup.generalEducation.map(
                                      renderCourse
                                    )}
                                    {remainCoursesByGroup.generalEducation
                                      .filter(
                                        (course: Course) =>
                                          course.recommendYear?.toString() ===
                                            year &&
                                          course.recommendSemester?.toString() ===
                                            semester
                                      )
                                      .map(renderRemainCourse)}
                                    {Array.from({
                                      length:
                                        maxGeneralEducationCourses -
                                        coursesByGroup.generalEducation.length -
                                        remainCoursesByGroup.generalEducation.filter(
                                          (course: Course) =>
                                            course.recommendYear?.toString() ===
                                              year &&
                                            course.recommendSemester?.toString() ===
                                              semester
                                        ).length,
                                    }).map(() => renderPlaceholder())}
                                  </div>

                                  <div className="border border-dashed w-full my-4 border-y-1 border-blue-shadeb2"></div>
                                  {/* Line between groups */}
                                  <div className="flex flex-col items-center justify-center">
                                    {coursesByGroup.majorRequirements.map(
                                      renderCourse
                                    )}
                                    {remainCoursesByGroup.majorRequirements
                                      .filter(
                                        (course: Course) =>
                                          course.recommendYear?.toString() ===
                                            year &&
                                          course.recommendSemester?.toString() ===
                                            semester
                                      )
                                      .map(renderRemainCourse)}
                                    {Array.from({
                                      length:
                                        maxMajorRequirementCourses -
                                        coursesByGroup.majorRequirements
                                          .length -
                                        remainCoursesByGroup.majorRequirements.filter(
                                          (course: Course) =>
                                            course.recommendYear?.toString() ===
                                              year &&
                                            course.recommendSemester?.toString() ===
                                              semester
                                        ).length,
                                    }).map(() => renderPlaceholder())}
                                  </div>
                                  <div className="border border-dashed w-full my-4 border-y-1 border-blue-shadeb2"></div>
                                  {/* Line between groups */}
                                  <div className="flex flex-col items-center justify-center">
                                    {coursesByGroup.freeElective.map(
                                      renderCourse
                                    )}
                                    {remainCoursesByGroup.freeElective
                                      .filter(
                                        (course: Course) =>
                                          course.recommendYear.toString() ===
                                            year &&
                                          course.recommendSemester.toString() ===
                                            semester
                                      )
                                      .map(renderRemainCourse)}
                                    {Array.from({
                                      length:
                                        maxFreeElectiveCourses -
                                        coursesByGroup.freeElective.length -
                                        remainCoursesByGroup.freeElective.filter(
                                          (course: Course) =>
                                            course.recommendYear?.toString() ===
                                              year &&
                                            course.recommendSemester?.toString() ===
                                              semester
                                        ).length,
                                    }).map(() => renderPlaceholder())}
                                  </div>
                                  <div className="flex flex-col items-center justify-center mt-4 w-full bg-blue-shadeb05 pt-1.5 pb-1.5">
                                    {totalCredits > 0 ? (
                                      <CreditBox
                                        courseCredit={totalCredits}
                                        courseNo={""}
                                        courseTitleEng={""}
                                      />
                                    ) : (
                                      <PendingCreditBox
                                        courseCredit={totalCredits}
                                        courseNo={""}
                                        courseTitleEng={""}
                                      />
                                    )}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[20px] shadow-lg border border-gray-200">
          <div className="mb-6">
            <SummaryBox
              groupCredits={groupCredits}
              totalCredits={totalCredits}
              totalGeCredits={totalGeCredits}
              totalCoreAndMajorEarnedCredits={totalCoreAndMajorEarnedCredits}
              totalCoreAndMajorRequiredCredits={
                totalCoreAndMajorRequiredCredits
              }
              curriculumData={curriculumData}
            />
          </div>

          <div>
            <CourseRemainBox
              remainLearner={remainLearner}
              remainCocre={remainCocre}
              remainAct={remainAct}
              remainElec={remainElec}
              remainCore={remainCore}
              remainMJreq={remainMJreq}
              remainMJelec={remainMJelec}
              remainFRtotal={remainFRtotal}
              remainGEtotal={remainGEtotal}
              remainMJtotal={remainMJtotal}
              renderRemainTotalBox={function (
                remainValue: number,
                groupName: string
              ): JSX.Element {
                return <>{renderRemainTotalBox(remainValue, groupName)}</>;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollAndCredits;
