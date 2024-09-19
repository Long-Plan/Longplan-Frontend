import { PageContainer } from "common/components/Container/PageContainer";
// import CurriculumBox from "common/components/CurriculumBox";
// import EnrollAndCredits from "common/components/enrollAndCredits";
import { PlanDiagram } from "common/components/PlanComponent/PlanningDiagram";
import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";

function PlanPage() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <PageContainer
      className="flex flex-col justify-center items-center h-screen w-screen"
      style={{
        fontFamily: "IBM Plex Sans Thai, sans-serif",
        backgroundColor: "#F5F5F5",
        overflowX: "hidden",
      }}
    >
      <PlanDiagram />
    </PageContainer>
  );
}

export default PlanPage;
