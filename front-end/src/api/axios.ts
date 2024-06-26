import axios, { AxiosError } from 'axios';

export const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log(BASE_URL)

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// request interceptors
axiosInstance.interceptors.request.use(async (request) => {
  const token = localStorage.getItem("access_token");
  request.headers.set('authorization', `Bearer ${token}`);

  return request;
});

// response interceptors
axiosInstance.interceptors.response.use((result) => result.data, (error: AxiosError) => {
  if (
    error.response?.status === 401
  ) {
    localStorage.setItem("access_token", '');
    window.location.reload();
    return Promise.reject();
  }
  return Promise.reject(error);
});

export { axiosInstance };
