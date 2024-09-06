import React, { useState } from "react";
import { useQuery } from "react-query";
import { coreApi } from "core/connections";
import {
  CoCreElecBox,
  GEElecBox,
  LearnerElecBox,
  MajorElecBox,
} from "./ElecSubject/ElecBoxGroup.tsx";
import ElecBoxs from "./ElecSubject/ElecBox.tsx";
import {
  ActSubjectBox,
  CoCreSubjectBox,
  CoreSubjectBox,
  LearnerSubjectBox,
  MajorSubjectBox,
} from "./SubjectBox/SubjectBoxGroup.tsx";
import SubjectBoxs from "./SubjectBox/SubjectBox.tsx";

interface Course {
  courseNo: string;
  courseTitleEng: string;
  recommendSemester: number;
  recommendYear: number;
  prerequisites: string[];
  corequisite: string | null;
  credits: number;
}

export interface CourseGroup {
  requiredCredits: number;
  groupName: string;
  requiredCourses: Course[];
  electiveCourses: Course[];
}

interface CurriculumData {
  curriculumProgram: string;
  year: number;
  isCOOPPlan: boolean;
  requiredCredits: number;
  freeElectiveCredits: number;
  coreAndMajorGroups: CourseGroup[];
  geGroups: CourseGroup[];
  // ... other properties
}

type CurriculumPayload = {
  major: string;
  year: string;
  plan: string;
};

function getCurriculum({ major, year, plan }: CurriculumPayload) {
  return new Promise<CurriculumData>((resolve, reject) => {
    coreApi
      .get(`/curriculum?major=${major}&year=${year}&plan=${plan}`)
      .then((res) => resolve(res.data))
      .catch(reject);
  });
}

const CurriculumBox: React.FC = () => {
  const [curriculumData, setCurriculumData] = useState<CurriculumData | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [isExpanded, setIsExpanded] = useState(true);

  useQuery(
    "curriculum-box",
    async () =>
      await getCurriculum({ major: "CPE", year: "2563", plan: "normal" }),
    {
      onSuccess: (data) => {
        if (data) {
          console.log(data);
          setCurriculumData(data);
        }
      },
    }
  );

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const filterCourses = (courseGroup: CourseGroup) => {
    return {
      ...courseGroup,
      requiredCourses: courseGroup.requiredCourses.filter((course) =>
        course.courseNo.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      electiveCourses: courseGroup.electiveCourses.filter((course) =>
        course.courseNo.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    };
  };

  if (!curriculumData) {
    return <div>Loading...</div>;
  }

  const filteredGeGroups = curriculumData.geGroups
    .map(filterCourses)
    .filter(
      (group) => selectedGroup === "All" || group.groupName === selectedGroup
    ); // Filter here instead

  const filteredCoreAndMajorGroups = curriculumData.coreAndMajorGroups
    .map(filterCourses)
    .filter(
      (group) => selectedGroup === "All" || group.groupName === selectedGroup
    ); // Filter here instead

  const combinedGroups: CourseGroup[] = isExpanded
    ? [...filteredGeGroups, ...filteredCoreAndMajorGroups]
    : [];

  return (
    <div className="flex flex-col justify-center text-center items-center bg-[#ffffff] w-max my-4 rounded-2xl ml-20">
      <div className=" bg-[#ECEEFA] rounded-t-2xl w-[1400px] bg-[url('/imgs/AngkaewBG.svg')] bg-cover bg-bottom p-6 mb-2 ">
        <h1 className="mt-10 mb-12">วิชาทั้งหมดจากแผนการเรียน</h1>

        <div className="flex mb-4 justify-center">
          <input
            type="text"
            placeholder="Search by Course Number 6 digits"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[260px] h-[40px]  px-4 bg-white rounded-3xl border-2 border-solid border-blue-shadeb2 justify-center items-center gap-2.5 inline-flex"
            style={{
              fontFamily: "IBM Plex Sans Thai, sans-serif",
              fontWeight: "normal",
              fontSize: "16px",
              color: "#000000",
            }}
          />{" "}
          <div className="mb-4 ml-5">
            <select
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-[180px] h-[40px]  px-4 bg-blue-shadeb4 rounded-3xl border-2 border-solid border-blue-shadeb5 justify-center items-center gap-2.5 inline-flex"
              style={{
                fontFamily: "IBM Plex Sans Thai, sans-serif",
                fontWeight: "bold",
                fontSize: "16px",
                color: "#FFFFFF",
              }}
            >
              <option value="All">All Groups</option>
              <option value="Learner Person">Learner Person</option>
              <option value="Co-Creator">Co-Creator</option>
              <option value="Active Citizen">Active Citizen</option>
              <option value="Elective">Elective</option>
              <option value="Core">Core</option>
              <option value="Major Required">Major Required</option>
              <option value="Major Elective">Major Elective</option>
            </select>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
        }}
      >
        <div
          onClick={toggleExpansion}
          style={{
            cursor: "pointer",
            padding: "10px",
            margin: "10px 0",
            backgroundColor: "#ECEEFA",
            opacity: "0.8",
            // hover: "pointer",
            textAlign: "center",
            borderRadius: "70px",
            width: "1000px",
            fontWeight: "bold",
            fontFamily: "IBM Plex Sans Thai, sans-serif",
            userSelect: "none", // Prevent text selection on double click
          }}
        >
          {isExpanded ? "Collapse" : "Expand"} Courses
        </div>
      </div>
      {/* Flex container for the content, visibility controlled by isExpanded */}
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
        }}
      >
        <div
          style={{
            display: isExpanded ? "flex" : "none", // Control visibility
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            width: "1260px", // Adjusted width to fill container
          }}
        >
          {/*{(combinedGroups).map((group, index) => (*/}
          {/*    <div key={index} className="bg-white rounded-[30px] px-4" style={{marginTop: "20px" , padding: "20px"}} >*/}
          {/*        {group.groupName + " - " +group.requiredCredits + " credits"}*/}
          {/*        <div className={"grid grid-cols-1"} style={{marginTop: '20px'}}>*/}
          {/*            {group.groupName === "Major Elective" && (<div style={{height:"500px"}}><MajorElec data={group}/></div>)}*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*))}*/}

          {combinedGroups.map((group) => (
            <div key={group.groupName}>
              {group.groupName === "Learner Person" && (
                <div
                  className="text-[#8B8C8D] bg-white rounded-[20px] pb-10 mt-5 pt-1 shadow-box-shadow "
                  style={{ marginBottom: "20px", width: "400px" }}
                >
                  <div className="flex justify-center items-center">
                    <h5 className="text-collection-1-yellow-shade-y7">{`${group.groupName}`}</h5>
                    <h5 className="text-collection-1-yellow-shade-y7 ml-2 text-sm font-normal border border-solid rounded-2xl px-2 w-max">{`${group.requiredCredits} credits`}</h5>
                  </div>
                  <div className={"grid grid-cols-2"}>
                    <div>
                      <div style={{ marginBottom: "10px" }}>
                        {"วิชาบังคับ\n"}
                      </div>
                      <SubjectBoxs
                        data={group}
                        BoxComponent={LearnerSubjectBox}
                      />
                    </div>
                    <div>
                      <div style={{ marginBottom: "10px" }}>
                        {"วิชาเลือก\n"}
                      </div>
                      <ElecBoxs data={group} BoxComponent={LearnerElecBox} />
                    </div>
                  </div>
                </div>
              )}
              {group.groupName === "Co-Creator" && (
                <div
                  className="text-[#8B8C8D] bg-white rounded-[20px] pb-10 mt-5 pt-1 shadow-box-shadow "
                  style={{ marginBottom: "20px", width: "400px" }}
                >
                  <div className="flex justify-center items-center">
                    <h5 className="text-collection-1-co-creator-or1">{`${group.groupName}`}</h5>
                    <h5 className="text-collection-1-co-creator-or1 ml-2 text-sm font-normal border border-solid rounded-2xl px-2 w-max">{`${group.requiredCredits} credits`}</h5>
                  </div>

                  <div className={"grid grid-cols-2"}>
                    <div>
                      <div style={{ marginBottom: "10px" }}>
                        {"วิชาบังคับ\n"}
                      </div>
                      <SubjectBoxs
                        data={group}
                        BoxComponent={CoCreSubjectBox}
                      />
                    </div>
                    <div>
                      <div style={{ marginBottom: "10px" }}>
                        {"วิชาเลือก\n"}
                      </div>
                      <ElecBoxs data={group} BoxComponent={CoCreElecBox} />
                    </div>
                  </div>
                </div>
              )}
              {group.groupName === "Active Citizen" && (
                <div
                  className="text-[#8B8C8D] bg-white rounded-[20px] pb-10 mt-5 pt-1 shadow-box-shadow grid grid-cols-1"
                  style={{ marginBottom: "20px", width: "400px" }}
                >
                  <div className="flex justify-center items-center">
                    <h5 className="text-collection-1-active-citizen-r2">{`${group.groupName}`}</h5>
                    <h5 className="text-collection-1-active-citizen-r2 ml-2 text-sm font-normal border border-solid rounded-2xl px-2 w-max">{`${group.requiredCredits} credits`}</h5>
                  </div>{" "}
                  <div style={{ marginBottom: "10px" }}>{"วิชาบังคับ\n"}</div>
                  <SubjectBoxs data={group} BoxComponent={ActSubjectBox} />
                </div>
              )}
              {group.groupName === "Elective" && (
                <div
                  className="text-[#8B8C8D] bg-white rounded-[20px] pb-10 mt-5 pt-1 shadow-box-shadow grid grid-cols-1"
                  style={{ marginBottom: "20px", width: "400px" }}
                >
                  <div className="flex justify-center items-center">
                    <h5 className="text-collection-1-electives-brown1">{`${group.groupName}`}</h5>
                    <h5 className="text-collection-1-electives-brown1 ml-2 text-sm font-normal border border-solid rounded-2xl px-2 w-max">{`${group.requiredCredits} credits`}</h5>
                  </div>{" "}
                  <div style={{ marginBottom: "10px" }}>{"วิชาเลือก\n"}</div>
                  <ElecBoxs data={group} BoxComponent={GEElecBox} />
                </div>
              )}
              {group.groupName === "Core" && (
                <div
                  className="text-[#8B8C8D] bg-white rounded-[20px] pb-10 mt-5 pt-1 shadow-box-shadow grid grid-cols-1"
                  style={{ marginBottom: "20px", width: "400px" }}
                >
                  <div className="flex justify-center items-center">
                    <h5 className="text-collection-1-core-sk2">{`${group.groupName}`}</h5>
                    <h5 className="text-collection-1-core-sk2 ml-2 text-sm font-normal border border-solid rounded-2xl px-2 w-max">{`${group.requiredCredits} credits`}</h5>
                  </div>{" "}
                  <div style={{ marginBottom: "10px" }}>{"วิชาบังคับ\n"}</div>
                  <SubjectBoxs data={group} BoxComponent={CoreSubjectBox} />
                </div>
              )}
              {group.groupName === "Major Required" && (
                <div
                  className="text-[#8B8C8D] bg-white rounded-[20px] pb-10 mt-5 pt-1 shadow-box-shadow grid grid-cols-1"
                  style={{ marginBottom: "20px", width: "400px" }}
                >
                  <div className="flex justify-center items-center ">
                    <h5 className="text-blue-shadeb5">{`${group.groupName}`}</h5>
                    <h5 className="text-blue-shadeb5 ml-2 text-sm font-normal border border-solid rounded-2xl px-2 w-max">{`${group.requiredCredits} credits`}</h5>
                  </div>{" "}
                  <div style={{ marginBottom: "10px" }}>{"วิชาบังคับ\n"}</div>
                  <SubjectBoxs data={group} BoxComponent={MajorSubjectBox} />
                </div>
              )}
              {group.groupName === "Major Elective" && (
                <div
                  className="text-[#8B8C8D] bg-white rounded-[20px] pb-10 mt-5 pt-1 shadow-box-shadow grid grid-cols-1"
                  style={{ marginBottom: "20px", width: "1200px" }}
                >
                  <div className="flex justify-center items-center">
                    <h5 className="text-blue-shadeb5">{`${group.groupName}`}</h5>
                    <h5 className="text-blue-shadeb5 ml-2 text-sm font-normal border border-solid rounded-2xl px-2 w-max">{`${group.requiredCredits} credits`}</h5>
                  </div>{" "}
                  <div style={{ marginBottom: "10px" }}>{"วิชาเลือก\n"}</div>
                  <ElecBoxs data={group} BoxComponent={MajorElecBox} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurriculumBox;
