import React from "react";

import { AuthKey } from "common/constants/keys";
import Unauth from "common/components/middleware/Unauth";
import { useLoadingContext } from "react-router-loading";
import useGlobalStore from "common/contexts/StoreContext";
import Navbar from "common/components/Navbar/Navbar";

function withAuth(authType: AuthKey) {
  return <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return function WithAuthComponent(props: P) {
      const loadingContext = useLoadingContext();
      const { userData } = useGlobalStore();

      // for dev
      // if (authType === AuthKey.UserAuth) {
      //   return (
      //     <>
      //       <Navbar />
      //       <WrappedComponent {...props} />
      //     </>
      //   );
      // }

      // for prod
      if (authType === AuthKey.UserAuth && userData) {
        return (
          <>
            <Navbar />
            <WrappedComponent {...props} />
          </>
        );
      }
      loadingContext.done();
      return <Unauth />;
    };
  };
}

export default withAuth;
