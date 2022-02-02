import axios from "axios";
import { BASE_URL } from "../config/config";

export const client = axios.create({
  baseURL: BASE_URL,
});

export const useHttp = () => {
  const data = sessionStorage.getItem("data");
  const { token: authToken } = data ? JSON.parse(data) : { token: undefined };
  let bearer = authToken ? `Bearer ${authToken}` : "";

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: bearer,
    },
  });
};
