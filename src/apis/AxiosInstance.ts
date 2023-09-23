import axios, { AxiosInstance } from "axios";

interface Headers {
  [key: string]: string;
}

const baseHeaders: Headers = {
  "Content-Type": "application/json",
};

const createAxiosInstance = (headers: Headers): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers,
  });

  instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem("ptToken");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => response,
    error => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.remove("ptToken");
        alert("다시 로그인해주세요");

        window.location.href = "/";
      } else {
        console.log(error);
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const axiosInstance = createAxiosInstance(baseHeaders);
