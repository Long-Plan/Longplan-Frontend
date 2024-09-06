import React from 'react';

const FeedBack: React.FC = () => {
    return (
        <a
            href="https://docs.google.com/spreadsheets/d/1p1P_x4op-EsioJxqPyRJTR9pqsWjEgRxEYXUR2d-r2w/edit?gid=0#gid=0"
            target="_blank"
            rel="noopener noreferrer"
        >
        <div className="flex flex-col justify-center items-center text-sm bg-blue-shadeb5 rounded-t-2xl w-screen h-[150px] pt-10 pb-4 mt-4">
            <div className="flex items-center gap-4 mb-2 text-white">
                    <img src="/imgs/feedback.svg" alt="Feedback" style={{ width: "80px" }} />

                <span className="text-xl font-medium">
          Give us Feedback and Bugs report
        </span>
            </div>
            <p className="text-blue-shadeb3">LongPlan 2024</p>
        </div>
        </a>
    );
};

export default FeedBack;
