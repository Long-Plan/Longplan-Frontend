import React from "react";
import { BaseBoxProps } from "utils/BoxUtils";

interface StyledBoxProps extends BaseBoxProps {
  borderColor: string;
  bgColor: string;
  textColor: string;
  badgeColor: string;
}

const StyledBox: React.FC<StyledBoxProps> = ({
  courseNo,
  courseTitleEng,
  courseCredit,
  borderColor,
  bgColor,
  textColor,
  badgeColor,
}) => (
  <div
    className={`transition-all duration-300 transform group hover:scale-110 inline-flex items-start justify-end gap-[14px] pr-[5px] py-0 relative bg-white rounded-[10px] border border-solid ${borderColor} shadow-box-shadow mx-5`}
  >
    <div
      className={`relative w-[7px] h-[42px] ${bgColor} rounded-[10px_0px_0px_10px]`}
    />
    <div className="relative w-[75px] text-black text-[16px] text-center leading-[21px]">
      <span className="block font-h7">{courseNo}</span>
      <span className={`text-[13px] ${badgeColor} leading-[19.7px]`}>
        {courseTitleEng}
      </span>
    </div>
    <div className="inline-flex flex-col items-start justify-end relative">
      <div
        className={`text-[12px] ${textColor} text-center leading-[15.8px] whitespace-nowrap`}
      >
        {courseCredit}
      </div>
    </div>
  </div>
);

// Specific Box Components using StyledBox

export const ActSubjectBox: React.FC<BaseBoxProps> = (props) => (
  <StyledBox
    {...props}
    borderColor="border-collection-1-active-citizen-r2"
    bgColor="bg-collection-1-active-citizen-r2"
    textColor="text-collection-1-active-citizen-r2"
    badgeColor="text-collection-1-active-citizen-r2"
  />
);

export const CoCreSubjectBox: React.FC<BaseBoxProps> = (props) => (
  <StyledBox
    {...props}
    borderColor="border-collection-1-co-creator-or"
    bgColor="bg-collection-1-co-creator-or"
    textColor="text-collection-1-co-creator-or1"
    badgeColor="text-collection-1-co-creator-or1"
  />
);

export const CoreSubjectBox: React.FC<BaseBoxProps> = (props) => (
  <StyledBox
    {...props}
    borderColor="border-collection-1-core-sk2"
    bgColor="bg-collection-1-core-sk2"
    textColor="text-collection-1-core-sk1"
    badgeColor="text-collection-1-core-sk1"
  />
);

export const LearnerSubjectBox: React.FC<BaseBoxProps> = (props) => (
  <StyledBox
    {...props}
    borderColor="border-collection-1-yellow-shade-y5-5"
    bgColor="bg-collection-1-yellow-shade-y5-5"
    textColor="text-collection-1-yellow-shade-y5-5"
    badgeColor="text-collection-1-yellow-shade-y7"
  />
);

export const MajorSubjectBox: React.FC<BaseBoxProps> = (props) => (
  <StyledBox
    {...props}
    borderColor="border-blue-shadeb5"
    bgColor="bg-blue-shadeb5"
    textColor="text-blue-shadeb5"
    badgeColor="text-blue-shadeb5"
  />
);
