import { ApiRouteKey } from "common/constants/keys";
import { coreApi } from "core/connections";
import { nil } from "tsdef";

export function getLogout(): Promise<nil> {
  return new Promise((resolve, reject) => {
    coreApi
      .post(ApiRouteKey.SignOut)
      .then(() => resolve(null))
      .catch(reject);
  });
}
