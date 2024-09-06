import { AuthKey, ClientRouteKey } from "common/constants/keys";
import withAuth from "common/hoc/withAuth";
import OAuthPage from "modules/callback/pages/OAuthPage";
import Home from "modules/home/pages/HomePage";
import LoginPage from "modules/login/pages/LoginPage";
import RootPage from "modules/root/pages/RootPage";
import UserPage from "modules/user/pages/UserPage";
// import DocPage from "modules/home/pages/DocPage";
import CreatePage from "../modules/CreatePlan/CreatePage.tsx";

const routes = [
  {
    path: ClientRouteKey.Root,
    component: RootPage,
  },
  {
    path: ClientRouteKey.Login,
    component: LoginPage,
  },
  {
    path: ClientRouteKey.User,
    component: withAuth(AuthKey.UserAuth)(UserPage),
  },
  {
    path: ClientRouteKey.Home,
    component: withAuth(AuthKey.UserAuth)(Home),
    loading: true,
  },
  {
    path: ClientRouteKey.Create,
    component: withAuth(AuthKey.UserAuth)(CreatePage),
    loading: true,
  },
  {
    path: ClientRouteKey.OAuth,
    component: OAuthPage,
    loading: true,
  },
];

export default routes;
