import axios from "axios";

import { config } from "./config";

export const coreApi = axios.create({
  baseURL: config.apiEndpointUrl,
  withCredentials: true
});
