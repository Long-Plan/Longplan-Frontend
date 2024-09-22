import { PageContainer } from "common/components/Container/PageContainer";
// import CurriculumBox from "common/components/CurriculumBox";
// import EnrollAndCredits from "common/components/enrollAndCredits";
import { PlanDiagram } from "common/components/PlanComponent/PlanningDiagram";
import { useEffect, useState } from "react";
import { useLoadingContext } from "react-router-loading";
import { ChevronLeftIcon } from "@heroicons/react/20/solid"; // Import the Heroicon arrow icon
import ConfirmPopup from "common/components/Popup/ConfirmPopup";
import { useNavigate } from "react-router-dom"; // For routing navigation
import Navbar from "common/components/Navbar/Navbar";
import PlanName from "common/components/PlanName/PlanName";

function PlanPage() {
  const loadingContext = useLoadingContext();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [showPopup, setShowPopup] = useState(false); // New state for popup
  const [nextPage, setNextPage] = useState<string | null>(null); // State to store the next page

  useEffect(() => {
    loadingContext.done();
  }, []);

  const handleShowExitPopup = (page: string) => {
    setNextPage(page); // Store the next page the user wants to navigate to
    setShowPopup(true); // Show the confirmation popup
  };

  const handleBackClick = () => {
    handleShowExitPopup("back"); // Handle the back button as a navigation action
  };

  const handleConfirmExit = () => {
    setShowPopup(false); // Close the popup
    if (nextPage) {
      if (nextPage === "back") {
        navigate(-1); // Go back to the previous page
      } else {
        navigate(nextPage); // Navigate to the stored page
      }
    }
  };

  const handleCancelExit = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <PageContainer
      className="flex flex-col justify-center items-center h-screen w-screen"
      style={{
        fontFamily: "IBM Plex Sans Thai, sans-serif",
        backgroundColor: "#F5F5F5",
        overflowX: "hidden",
      }}
    >
      <div className="w-full h-16 flex flex-row pl-24">
        <Navbar showExitPopup={handleShowExitPopup} />
        {/* Back Button */}
        <div className="relative">
          <button
            className="w-20 h-8 bg-[#ecedf9] rounded-[20px] flex justify-left items-center"
            onClick={handleBackClick}
          >
            <ChevronLeftIcon className="w-7 h-7 text-[#7b83eb] ml-0" />
          </button>
        </div>

        {/* Render the ConfirmationPopup component */}
        <ConfirmPopup
          show={showPopup}
          onCancel={handleCancelExit}
          onConfirm={handleConfirmExit}
        />
        <PlanName />
      </div>
      <PlanDiagram />
    </PageContainer>
  );
}

export default PlanPage;
