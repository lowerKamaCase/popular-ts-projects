import { Axios } from "axios";
import qs from 'querystring';

const AxiosInstance = new Axios({
  baseURL: "https://api.github.com",
});

export function requestRepos() {
  return AxiosInstance.get("/repositories", {
    params: {
      q: 'react',
      language: "typescript",
      sort: "stars",
      order: "desc",
    },
    paramsSerializer: {
      serialize: (params) => qs.stringify({...params, timestamp: Date.now() })
    }
  });
}
