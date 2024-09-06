import React from "react";
import { BaseBoxProps } from "utils/BoxUtils";

const CoCreEnrollBox: React.FC<BaseBoxProps> = ({
  courseNo,
  courseTitleEng,
  courseCredit,
    dummy,
    remain
}) => {
  return (
    <div className={`inline-flex items-start justify-end gap-[10px] pl-0 pr-[5px] py-0 relative ${remain === true ? "bg-white" : "bg-collection-1-co-creator-orbg"} rounded-[10px] border border-solid border-collection-1-co-creator-or shadow-box-shadow`}>
      <div className="relative w-[7px] h-[43px] bg-collection-1-co-creator-or rounded-[10px_0px_0px_10px]" />
      <div className={`relative ${dummy !== true ? "w-[64px]" : "w-[50px]"} font-h7 text-collection-1-co-creator-or1 text-[16px] text-center tracking-[0] leading-[21px]`}>
          {dummy !== true ? (
              <><span className="font-h7 text-collection-1-co-creator-or1 text-[13px] tracking-[0] leading-[21px]">
                      {courseNo}
                  <br/>
                  </span><span className="text-[11px] text-collection-1-co-creator-or1 leading-[19.7px]">
                          {courseTitleEng?.substring(1,0) + courseTitleEng?.substring(1,100).toLowerCase()}
                      </span></>) : (
              <span className="text-collection-1-co-creator-or1 text-[13px] tracking-[0] leading-[21px]justify-center items-center text-center">{courseTitleEng}</span>)
          }
      </div>
        <div className="inline-flex flex-col h-[19px] items-start justify-end gap-[10px] relative flex-[0_0_auto]">
            <div
                className={`font-h2 text-collection-1-co-creator-or1 ${dummy !== true ? "text-[10px]" : "text-[12px]"} text-center tracking-[0] leading-[15.8px] whitespace-nowrap`}>
            {courseCredit}
        </div>
      </div>
    </div>
  );
};

export default CoCreEnrollBox;
