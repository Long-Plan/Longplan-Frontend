import { getUserDataQuerySelector } from "common/apis/selectors";
import { LocalStorageKey } from "common/constants/keys";
import { coreApi } from "./connections";

export async function validateLocalToken() {
  try {
    const auth = localStorage.getItem(LocalStorageKey.Auth);
    if (!auth) {
      throw new Error();
    }
    coreApi.defaults.headers.common["Authorization"] = auth;
    const data = await getUserDataQuerySelector();
    return data;
  } catch (err) {
    coreApi.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem(LocalStorageKey.Auth);
  }

  return null;
}
