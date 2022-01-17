import axios from 'axios';

const BASE_URL = 'http://localhost:9000';
export const client = axios.create({
  baseURL: BASE_URL,
});

export const useHttp = () => {
  const data = sessionStorage.getItem('data');
  const { token: authToken } = data ? JSON.parse(data) : { token: undefined };
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: authToken,
    },
  });
};
