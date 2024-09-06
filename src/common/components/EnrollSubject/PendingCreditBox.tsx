import React from "react";
import { BaseBoxProps } from "utils/BoxUtils";

const PendingCreditBox: React.FC<BaseBoxProps> = ({  courseCredit}) => {
    return (
        <div className="flex items-center justify-center w-auto h-5 px-5 bg-white rounded-2xl border-2 border-solid border-blue-shadeb3 text-blue-shadeb3">
            <span className="text-xs">{courseCredit}</span>
        </div>
    );
};

export default PendingCreditBox;
