import { PageContainer } from "common/components/Container/PageContainer";
import { PlanDiagram } from "common/components/PlanComponent/PlanningDiagram";
import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";

function PlanPage() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <PageContainer>
      <PlanDiagram />
    </PageContainer>
  );
}

export default PlanPage;
