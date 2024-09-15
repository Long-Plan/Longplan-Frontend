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

export const CoCreElecBox: React.FC<BaseBoxProps> = (props) => (
  <StyledBox
    {...props}
    borderColor="border-collection-1-co-creator-or"
    bgColor="bg-collection-1-co-creator-or"
    textColor="text-collection-1-co-creator-or1"
    badgeColor="text-collection-1-co-creator-or1"
  />
);

export const GEElecBox: React.FC<BaseBoxProps> = (props) => (
  <StyledBox
    {...props}
    borderColor="border-collection-1-electives-brown"
    bgColor="bg-collection-1-electives-brown"
    textColor="text-collection-1-electives-brown"
    badgeColor="text-collection-1-electives-brown"
  />
);

export const LearnerElecBox: React.FC<BaseBoxProps> = (props) => (
  <StyledBox
    {...props}
    borderColor="border-collection-1-yellow-shade-y5"
    bgColor="bg-collection-1-yellow-shade-y5"
    textColor="text-collection-1-yellow-shade-y5"
    badgeColor="text-collection-1-yellow-shade-y7"
  />
);

export const MajorElecBox: React.FC<BaseBoxProps> = (props) => (
  <StyledBox
    {...props}
    borderColor="border-blue-shadeb5"
    bgColor="bg-blue-shadeb5"
    textColor="text-blue-shadeb5"
    badgeColor="text-blue-shadeb5"
  />
);

export const FreeBox: React.FC = () => (
  <StyledBox
    courseNo="000000"
    courseTitleEng="Free Elective"
    courseCredit={0}
    borderColor="border-collection-1-black-shade-bl4"
    bgColor="bg-collection-1-black-shade-bl4"
    textColor="text-collection-1-black-shade-bl4"
    badgeColor="text-collection-1-black-shade-bl4"
  />
);
