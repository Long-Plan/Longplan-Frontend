import "reactflow/dist/style.css";
import { Navigate } from "react-router-dom";
import { ClientRouteKey } from "common/constants/keys";
import useGlobalStore from "common/contexts/StoreContext";

function RootPage() {
  const { userData } = useGlobalStore();

  if (userData) {
    return <Navigate to={ClientRouteKey.Home} replace={true} />;
  }

  return <Navigate to={ClientRouteKey.Login} replace={true} />;
}

export default RootPage;
