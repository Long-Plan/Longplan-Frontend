import React from "react";

interface EnrollBoxProps {
  courseNo: string;
  courseTitleEng: string;
  courseCredit: number;
  dummy?: boolean;
  remain?: boolean;
  color: string;
  borderColor: string;
  textColor: string;
  highlightColor: string;
  onClick?: () => void; // Add onClick prop for click handling
}

const EnrollBox: React.FC<EnrollBoxProps> = ({
  courseNo,
  courseTitleEng,
  courseCredit,
  dummy = false,
  remain = false,
  color,
  borderColor,
  textColor,
  highlightColor,
  onClick,
}) => {
  return (
    <div
      className={`inline-flex items-start justify-end gap-[10px] pl-0 pr-[5px] py-0 relative ${
        remain ? "bg-white" : color
      } rounded-[10px] border border-solid ${borderColor} shadow-box-shadow cursor-pointer`} // Added cursor-pointer for visual feedback
      onClick={onClick} // Handle click event
    >
      <div
        className={`relative w-[7px] h-[43px] ${highlightColor} rounded-[10px_0px_0px_10px]`}
      />
      <div
        className={`relative ${
          dummy ? "w-[50px]" : "w-[64px]"
        } font-h7 ${textColor} text-[16px] text-center tracking-[0] leading-[21px]`}
      >
        {!dummy ? (
          <>
            <span
              className={`font-h7 ${textColor} text-[13px] tracking-[0] leading-[21px]`}
            >
              {courseNo}
              <br />
            </span>
            <span className="text-[11px] leading-[19.7px]">
              {courseTitleEng?.substring(1, 0) +
                courseTitleEng?.substring(1, 100).toLowerCase()}
            </span>
          </>
        ) : (
          <span
            className={`${textColor} text-[13px] tracking-[0] leading-[21px] justify-center items-center text-center`}
          >
            {courseTitleEng}
          </span>
        )}
      </div>
      <div className="inline-flex flex-col h-[19px] items-start justify-end gap-[10px] relative flex-[0_0_auto]">
        <div
          className={`font-h2 ${textColor} ${
            dummy ? "text-[12px]" : "text-[10px]"
          } text-center tracking-[0] leading-[15.8px] whitespace-nowrap`}
        >
          {courseCredit}
        </div>
      </div>
    </div>
  );
};

export default EnrollBox;
