import { ApiRouteKey } from "common/constants/keys";
import { coreApi } from "core/connections";

export function getLoginValidationQuery(code: string) {
  return new Promise((resolve, reject) => {
    coreApi
      .post(ApiRouteKey.OAuth, null, {
        params: new URLSearchParams({ code })
      })
      .then((res) => resolve(res.data))
      .catch(reject);
  });
}
