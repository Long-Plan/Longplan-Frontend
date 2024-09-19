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
    className={`inline-flex items-start justify-end gap-[10px] pl-0 pr-[5px] py-0 relative bg-white rounded-[10px] border border-solid ${borderColor} shadow-box-shadow cursor-pointer transition-all duration-300 transform group hover:scale-110`} // Added cursor-pointer for visual feedback
  >
    <div
      className={`relative w-[7px] h-[45px] ${bgColor} rounded-[10px_0px_0px_10px]`}
    />
    <div
      className={`relative w-[64px] font-h7 ${textColor} text-[16px] text-center tracking-[0] leading-[21px]`}
    >
      <>
        <span
          className={`font-h7 ${textColor}  text-[13px] tracking-[0] leading-[21px] font-semibold`}
        >
          {courseNo}
          <br />
        </span>
        <span className={`text-[11px] leading-[19.7px] ${badgeColor}`}>
          {courseTitleEng?.substring(1, 0) +
            courseTitleEng?.substring(1, 100).toLowerCase()}
        </span>
      </>
    </div>
    <div className="inline-flex flex-col h-[19px] items-start justify-end gap-[10px] relative flex-[0_0_auto]">
      <div
        className={`font-h2 ${textColor} text-[10px]
        } text-center tracking-[0] leading-[15.8px] whitespace-nowrap font-semibold`}
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
    textColor="text-collection-1-yellow-shade-y7"
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
