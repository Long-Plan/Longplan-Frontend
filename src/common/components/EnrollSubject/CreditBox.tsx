import React from "react";
import { BaseBoxProps } from "utils/BoxUtils";

const CreditBox: React.FC<BaseBoxProps> = ({  courseCredit}) => {
    return (
        <div className="flex items-center justify-center w-auto h-5 px-5 bg-blue-shadeb3 rounded-2xl border-2 border-solid border-blue-shadeb5 text-white">
            <span className="text-xs">{courseCredit}</span>
        </div>
    );
};

export default CreditBox;
