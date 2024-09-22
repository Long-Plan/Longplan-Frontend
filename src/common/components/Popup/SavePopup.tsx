import React from "react";

type ConfirmPopupProps = {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const SavePopup: React.FC<ConfirmPopupProps> = ({
  show,
  onCancel,
  onConfirm,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20 ">
      <div className="bg-white pb-10 px-24 rounded-[20px] shadow-lg flex flex-col items-center">
        <img src="/imgs/Save.svg" alt="Warning" className="w-60 h-60" />
        <h1 className=" mb-4 font-bold">บันทึกแพลน</h1>
        <h5 className=" mb-12 font-normal">
          โปรดตรวจสอบความถูกต้อง ก่อนกดยืนยัน
        </h5>
        <div>
          <button
            className="bg-blue-shadeb05 px-4 py-2 rounded-[100px] mx-4"
            onClick={onCancel}
          >
            <h6 className="text-blue-shadeb4 w-20 h-8 px-4 py-2 rounded-xl flex items-center justify-center">
              ยกเลิก
            </h6>
          </button>
          <button
            className="bg-blue-shadeb5 px-4 py-2 rounded-[100px] mx-4 hover:bg-blue-shadeb6 transition duration-100 ease-in-out"
            onClick={onConfirm}
          >
            <h6 className="text-white w-20 h-8 px-4 py-2 rounded-xl flex items-center justify-center">
              ตกลง
            </h6>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavePopup;
