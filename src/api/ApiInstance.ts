import { Axios } from 'axios';

export const ApiInstance = new Axios({
  baseURL: "https://api.github.com",
});