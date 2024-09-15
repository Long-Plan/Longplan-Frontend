import React from "react";
import { BaseBoxProps } from "utils/BoxUtils";

const CreditBox: React.FC<BaseBoxProps> = ({ courseCredit }) => {
  return (
    <div className="flex items-center justify-center w-auto h-6 px-4 bg-blue-shadeb3 rounded-2xl border border-solid border-blue-shadeb4 text-white hover:scale-150 transition-all duration-300">
      <span className="text-sm">{courseCredit}</span>
    </div>
  );
};

export default CreditBox;
