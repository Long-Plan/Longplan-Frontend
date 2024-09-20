import { CheckBadgeIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { MainContainer } from "../Container/MainContainer";
import { MajorElecBox } from "../ElecSubject/ElecBoxGroup";
import ElecBoxIsolate from "../ElecSubject/ElecBoxIsolate";

export function PlanDiagram() {
  return (
    <div className="flex items-start space-x-4">
      <MainContainer>
        <div className="p-4">
          <h2 className="text-center p-4">เลือกวิชาที่ต้องการแสดงข้อมูล</h2>
          {/* Main container for the course information */}
          <div className="flex flex-col space-y-4 w-[512px] rounded-[20px] p-4 border border-blue-shadeb3">
            <div className="flex items-center space-x-4 rounded-[12px] border border-blue-shadeb5 pr-4">
              {/* Left side - Course Number */}
              <div className="flex items-center gap-4 mr-8">
                <div className="relative w-[10px] h-11 bg-blue-shadeb5 rounded-l-[10px]" />
                <p className="text-lg font-semibold ">261102</p>
              </div>

              {/* Center - Course Title */}
              <h2 className="text-base flex-grow">Computer Programming</h2>

              {/* Right side - Units or credits */}
              <div className="text-blue-shadeb5 font-bold">3</div>
            </div>

            {/* Recommended Year and Term */}
            <div className="flex items-center space-x-2">
              <p className="text-black">ปีและภาคเรียนที่แนะนำ :</p>
              <div className="px-2 py-1 bg-white border border-blue-shadeb5 text-blue-shadeb5 rounded-full text-xs">
                ปี 1 เทอม 2
              </div>
            </div>

            <div className="flex flex-row items-center justify-center">
              วิชาที่ต้องเรียนตัวถัดไป (Next-requisite)
            </div>

            {/* Next requisites section can be added here if needed */}
          </div>

          {/* Remaining Courses Section */}
          <h3 className="text-center mt-4">ลากวิชาไปวางในแพลน</h3>
          <div className="flex flex-row items-center justify-center gap-4 my-4">
            <div
              className="flex flex-row border-2 border-collection-1-yellow-shade-y1 p-1 rounded-[20px] 
            text-xs bg-collection-1-yellow-shade-y1 hover:scale-110 transition-all duration-300 cursor-default"
            >
              <p className="pl-4 text-collection-1-yellow-shade-y7">GE</p>
              <p className="px-1 text-blue-shadeb3 font-semibold">|</p>
              <p className="pr-4">Free Elective</p>
            </div>
            <div
              className="flex flex-row border-2 border-blue-shadeb5 p-1 rounded-[20px] 
            text-xs bg-blue-shadeb5 hover:scale-110 transition-all duration-300 cursor-default"
            >
              <p className="px-4 text-white">Major</p>
            </div>
          </div>
          <div className="w-[512px]">
            <div className="flex flex-col space-y-2 rounded-[20px] border border-blue-shadeb3">
              <div className="flex flex-row w-full h-full bg-blue-shadeb05 rounded-t-[20px] pl-4 text-sm py-2 text-blue-shadeb5 gap-2">
                <CheckBadgeIcon className="text-blue-shadeb5 w-8 h-8" />
                <div className="flex flex-col flex-grow">
                  <p className="font-semibold">หมวดวิชาเฉพาะ</p>
                  <p className="font-semibold">(Major Requirements)</p>
                </div>
                <div className="p-1 rounded-[10px] border border-blue-shadeb5 bg-blue-shadeb4 w-max h-full text-white mr-4 font-bold text-base">
                  103/103
                </div>
              </div>

              {/* Recommended Year and Term */}
              <div className="flex flex-col items-start space-x-2 p-2">
                <ol className="list-item list-inside ml-2 gap w-full h-full mb-2">
                  <li className="flex flex-row gap-2 text-collection-1-core-sk1 m-2 w-full h-full">
                    <CheckCircleIcon className="w-5 h-5" />
                    <div className="flex-grow font-semibold">Core</div>
                    <div className="mr-7 font-semibold">33/33</div>
                  </li>
                  <li className="flex flex-row gap-2 text-blue-shadeb5 m-2 w-full h-full">
                    <CheckCircleIcon className="w-5 h-5" />
                    <div className="flex-grow font-semibold">Required</div>
                    <div className="mr-7 font-semibold">52/52</div>
                  </li>
                  <li className="flex flex-row gap-2 text-blue-shadeb5 m-2 w-full h-full">
                    <CheckCircleIcon className="w-5 h-5" />
                    <div className="flex-grow font-semibold">Elective</div>
                    <div className="mr-7 font-semibold">18/18</div>
                  </li>
                </ol>
                <ElecBoxIsolate
                  courseNo={"261200"}
                  courseTitleEng={"Elective"}
                  courseCredit={3}
                  courseFullName={"Major Elective"}
                  courseCategory={"Major Elective"}
                  coursePrerequisites={[]}
                  BoxComponent={MajorElecBox}
                  recommendYear={0}
                  recommendSemester={0}
                />
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
