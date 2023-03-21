import qs from "querystring";
import { ApiInstance } from './ApiInstance';

export function requestRepositories() {
  return ApiInstance.get("/repositories", {
    params: {
      q: "react",
      language: "typescript",
      sort: "stars",
      order: "desc",
    },
    paramsSerializer: {
      // Against caching
      serialize: (params) => qs.stringify({ ...params, timestamp: Date.now() }),
    },
  });
}
