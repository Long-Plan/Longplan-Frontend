import PlanSettingPopup from "common/components/PlanSelector/PlanSettingPopup";
import { useState } from "react";

function SettingsPage() {
  const [isPopupOpen, setPopupOpen] = useState(true);

  const handleClose = () => {
    setPopupOpen(false);
  };

  return (
    <div
      className="w-screen flex flex-col"
      style={{
        fontFamily: "IBM Plex Sans Thai, sans-serif",
        backgroundColor: "#F5F5F5",
        overflowX: "hidden",
      }}
    >
      {isPopupOpen && <PlanSettingPopup onClose={handleClose} mode={false} />}
      {/* <div className="flex justify-center items-center h-full">
        <button
          className="bg-white w-max h-max justify-center items-center rounded-[20px] border border-solid border-gray-300"
          onClick={() => setPopupOpen(true)}
        >
          setting
        </button>
      </div> */}
    </div>
  );
}

export default SettingsPage;
