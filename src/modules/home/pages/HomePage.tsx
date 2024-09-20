import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
// import CurriculumBox from "common/components/CurriculumBox";
import FeedBack from "common/components/FeedBack";
import EnrollAndCredits from "common/components/enrollAndCredits";
import Curriculum from "common/components/Curriculum";
import CategoryTree from "common/components/CategoryTree";
import { PageContainer } from "common/components/Container/PageContainer";
import CurriculumBox from "common/components/CurriculumBox";
// import { PlanDiagram } from "common/components/PlanComponent/PlanningDiagram";
// import CheckPage from "common/components/checkPage";

function Home() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);
  return (
    <PageContainer>
      {/* <StudentCheckPage /> */}
      <EnrollAndCredits />
      {/* <CheckPage /> */}
      {/* <div className={`flex justify-center`}>
        <CurriculumBox />
      </div> */}
      <FeedBack />
      {/* <CourseTitleExtractor /> */}
    </PageContainer>
  );
}

export default Home;
