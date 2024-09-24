import { useState, ChangeEvent } from "react";
import { DocumentCheckIcon } from "@heroicons/react/20/solid";
import SavePopup from "../Popup/SavePopup"; // Make sure to import SavePopup

interface PlanNameProps {
  onSave?: (planName: string) => void; // Callback when the plan is saved
}

export default function PlanName({ onSave }: PlanNameProps) {
  const [planName, setPlanName] = useState<string>(""); // For storing the input value
  const [hasError, setHasError] = useState<boolean>(false); // Error state for empty name
  const [isFocused, setIsFocused] = useState<boolean>(false); // To track if input is focused
  const [charLimitExceeded, setCharLimitExceeded] = useState<boolean>(false); // Check if character limit is exceeded
  const [showSavePopup, setShowSavePopup] = useState<boolean>(false); // State to control the SavePopup visibility

  const maxLength = 50; // Maximum character limit for plan name

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const length = Array.from(input).length; // Properly count complex characters like Thai or emojis

    // Validate character length
    if (length <= maxLength) {
      setPlanName(input);
      setCharLimitExceeded(false); // Reset if within limit
      if (input) {
        setHasError(false); // Reset error if there is valid input
      }
    } else {
      setCharLimitExceeded(true); // Set error if character limit is exceeded
    }
  };

  // Show confirmation popup when the user presses save
  const handleSave = () => {
    if (!planName) {
      setHasError(true); // Set error if the plan name is empty
    } else if (!charLimitExceeded) {
      setHasError(false);
      setShowSavePopup(true); // Show the confirmation popup
    }
  };

  // Confirm save action in the popup
  const handleConfirmSave = () => {
    setShowSavePopup(false); // Hide the popup
    if (onSave) {
      onSave(planName); // Trigger save callback if provided
    }
    console.log("Saving plan:", planName); // Debug or save to database
    // Add API call or logic to save the plan name here
  };

  // Cancel save in the popup
  const handleCancelSave = () => {
    setShowSavePopup(false); // Hide the popup without saving
  };

  return (
    <div className="w-screen flex pr-16">
      <div className="flex justify-between items-baseline mx-auto gap-6 pb-10 ">
        <h1>ลองแพลนใหม่, </h1>

        <div className="relative">
          <input
            type="text"
            placeholder="ชื่อแพลน..."
            value={planName}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`rounded-full w-[412px] h-[48px] p-3 outline-none transition-all duration-300 ${
              hasError ? "border-red-500" : "border-blue-shadeb5"
            } ${isFocused ? "border-4 " : "border-2"} ${
              hasError || charLimitExceeded ? "text-red-500" : "text-gray-800"
            }`}
            style={{
              backgroundColor: "#FFFFFF",
              transition: "border-blue-shadeb5 0.3s ease",
            }}
          />
          {hasError && (
            <p className="text-red-500 text-sm mt-2">
              โปรดตั้งชื่อแพลนก่อนบันทึก
            </p>
          )}
          {charLimitExceeded && (
            <p className="text-red-500 text-sm mt-2">
              คุณใส่เกินจำนวนตัวอักษรสูงสุด ({maxLength} ตัว)
            </p>
          )}
        </div>
      </div>
      <button
        onClick={handleSave}
        className="flex items-center justify-center bg-blue-shadeb5 text-white h-[48px] px-4 p-2 rounded-full  transition-all duration-300 transform hover:scale-105"
      >
        <DocumentCheckIcon className="h-6 w-6 mr-2" />
        บันทึก
      </button>

      {/* Show SavePopup if showSavePopup is true */}
      <SavePopup
        show={showSavePopup}
        onCancel={handleCancelSave}
        onConfirm={handleConfirmSave}
      />
    </div>
  );
}
