import React from "react";
import { BaseBoxProps } from "utils/BoxUtils";

export const ActSubjectBox: React.FC<BaseBoxProps> = ({
  courseNo,
  courseTitleEng,
  courseCredit,
}) => {
  return (
    <button className="hover:bg-gray-100 transition-colors duration-200 inline-flex items-start justify-end gap-[14px] pl-0 pr-[5px] py-0 relative bg-white rounded-[10px] border border-solid border-collection-1-active-citizen-r2 shadow-box-shadow mx-5">
      <div className="relative w-[7px] h-[42px] bg-collection-1-active-citizen-r2 rounded-[10px_0px_0px_10px]" />
      <div className="relative w-[75px] font-h7 text-black text-[16px] text-center tracking-[0] leading-[21px]">
        <span className="font-h7 text-black text-[15px] tracking-[0] leading-[21px]">
          {courseNo}
          <br />
        </span>
        <span className="text-[14px] leading-[19.7px]">{courseTitleEng}</span>
      </div>
      <div className="inline-flex flex-col h-[19px] items-start justify-end gap-[10px] relative flex-[0_0_auto]">
        <div className="font-h2 text-collection-1-active-citizen-r2 text-[12px] text-center tracking-[0] leading-[15.8px] whitespace-nowrap">
          {courseCredit}
        </div>
      </div>
    </button>
  );
};

export const CoCreSubjectBox: React.FC<BaseBoxProps> = ({
  courseNo,
  courseTitleEng,
  courseCredit,
}) => {
  return (
    <button className="hover:bg-gray-100 transition-colors duration-200 inline-flex items-start justify-end gap-[14px] pl-0 pr-[5px] py-0 relative bg-white rounded-[10px] border border-solid border-collection-1-co-creator-or shadow-box-shadow mx-5">
      <div className="relative w-[7px] h-[42px] bg-collection-1-co-creator-or rounded-[10px_0px_0px_10px]" />
      <div className="relative w-[75px] font-h7 text-black text-[16px] text-center tracking-[0] leading-[21px]">
        <span className="font-h7 text-black text-[15px] tracking-[0] leading-[21px]">
          {courseNo}
          <br />
        </span>
        <span className="text-[15px] leading-[19.7px]">{courseTitleEng}</span>
      </div>
      <div className="inline-flex flex-col h-[19px] items-start justify-end gap-[10px] relative flex-[0_0_auto]">
        <div className="font-h2 text-collection-1-co-creator-or1 text-[12px] text-center tracking-[0] leading-[15.8px] whitespace-nowrap">
          {courseCredit}
        </div>
      </div>
    </button>
  );
};

export const CoreSubjectBox: React.FC<BaseBoxProps> = ({
  courseNo,
  courseTitleEng,
  courseCredit,
}) => {
  return (
    <button className="hover:bg-gray-100 transition-colors duration-200 inline-flex items-start justify-end gap-[14px] pl-0 pr-[5px] py-0 relative bg-white rounded-[10px] border border-solid border-collection-1-core-sk2 shadow-box-shadow mx-5">
      <div className="relative w-[7px] h-[42px] bg-collection-1-core-sk2 rounded-[10px_0px_0px_10px]" />
      <div className="relative w-[75px] font-h7 text-black text-[16px] text-center tracking-[0] leading-[21px]">
        <span className="font-h7 text-black text-[15px] tracking-[0] leading-[21px]">
          {courseNo}
          <br />
        </span>
        <span className="text-[13px] leading-[19.7px]">{courseTitleEng}</span>
      </div>
      <div className="inline-flex flex-col h-[19px] items-start justify-end gap-[10px] relative flex-[0_0_auto]">
        <div className="font-h2 text-collection-1-core-sk1 text-[12px] text-center tracking-[0] leading-[15.8px] whitespace-nowrap">
          {courseCredit}
        </div>
      </div>
    </button>
  );
};

export const LearnerSubjectBox: React.FC<BaseBoxProps> = ({
  courseNo,
  courseTitleEng,
  courseCredit,
}) => {
  return (
    <button className="hover:bg-gray-100 transition-colors duration-200 inline-flex items-start justify-end gap-[14px] pl-0 pr-[5px] py-0 relative bg-white rounded-[10px] border border-solid border-collection-1-yellow-shade-y5-5 shadow-box-shadow mx-5">
      <div className="relative w-[7px] h-[42px] bg-collection-1-yellow-shade-y5-5 rounded-[10px_0px_0px_10px]" />
      <div className="relative w-[75px] font-h7 text-black text-[16px] text-center tracking-[0] leading-[21px]">
        <span className="font-h7 text-black text-[15px] tracking-[0] leading-[21px]">
          {courseNo}
          <br />
        </span>
        <span className="text-[13px] leading-[19.7px]">{courseTitleEng}</span>
      </div>
      <div className="inline-flex flex-col h-[19px] items-start justify-end gap-[10px] relative flex-[0_0_auto]">
        <div className="font-h2 text-collection-1-yellow-shade-y5-5 text-[12px] text-center tracking-[0] leading-[15.8px] whitespace-nowrap">
          {courseCredit}
        </div>
      </div>
    </button>
  );
};

export const MajorSubjectBox: React.FC<BaseBoxProps> = ({
  courseNo,
  courseTitleEng,
  courseCredit,
}) => {
  return (
    <button className="hover:bg-gray-100 transition-colors duration-200 inline-flex items-start justify-end gap-[14px] pl-0 pr-[5px] py-0 relative bg-white rounded-[10px] border border-solid border-blue-shadeb5 shadow-box-shadow mx-5">
      <div className="relative w-[7px] h-[42px] bg-blue-shadeb5 rounded-[10px_0px_0px_10px]" />
      <div className="relative w-[75px] font-h7 text-black text-[16px] text-center tracking-[0] leading-[21px]">
        <span className="font-h7 text-black text-[15px] tracking-[0] leading-[21px]">
          {courseNo}
          <br />
        </span>
        <span className="text-[13px] leading-[19.7px]">{courseTitleEng}</span>
      </div>
      <div className="inline-flex flex-col h-[19px] items-start justify-end gap-[10px] relative flex-[0_0_auto]">
        <div className="font-h2 text-blue-shadeb5 text-[12px] text-center tracking-[0] leading-[15.8px] whitespace-nowrap">
          {courseCredit}
        </div>
      </div>
    </button>
  );
};
