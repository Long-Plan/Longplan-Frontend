import useGlobalStore from "common/contexts/StoreContext";
import { coreApi } from "core/connections";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import TermPopup from "./term/termpopup";
import PlanSettingPopup from "./planselector/PlanSetting";
import CourseDetailsPopup from "./Dialog/Coursedetail";

type CurriculumPayload = {
  major: string;
  year: string;
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
};

type Plan = {
  major: string;
  year: string;
};

function getCurriculum({ major, year }: CurriculumPayload): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    coreApi
      .get(`/curriculum?major=${major}&year=${year}`)
      .then((res: { data: any }) => resolve(res.data))
      .catch(reject);
  });
}

function getEnrolledCourses(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    coreApi
      .get(`/student/enrolledData`)
      .then((res: { data: any }) => resolve(res.data))
      .catch(reject);
  });
}

export const CheckPage: React.FC = () => {
  interface groupedEnrolls {
    year: string;
    semester: string;
    Courses: Course[];
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
  const [selectedPlan, _] = useState<Plan>({
    major: "CPE",
    year: "2563",
  });

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

  console.log(curriculumData);
  console.log(groupedEnrolls);

  // Combine useEffects into a single useEffect for managing body overflow and refetching data
  useEffect(() => {
    if (userData) {
      refetch();
    }

    // Cleanup function to enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [userData, selectedPlan, refetch]);

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

  return (
    <div className="w-full">
      {/* Render your curriculumData and groupedEnrolls here */}
      {/* <pre>{JSON.stringify(curriculumData, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(groupedEnrolls, null, 2)}</pre> */}
      {/* <TermPopup /> */}
      {/* <PlanSettingPopup /> */}
    </div>
  );
};

export default CheckPage;
