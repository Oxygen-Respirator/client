import axios from "axios";

const instance = axios.create({ baseURL: "https://api.oxygen-ai.site/api/" });

export default instance;

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("ptToken");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
      return config;
    }
    return config;
  },
  error => {
    return error;
  },
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("ptToken");
      alert("다시 로그인해 주세요");

      window.location.href = "/";
    } else {
      console.log(error);
    }
    return Promise.reject(error);
  },
);
