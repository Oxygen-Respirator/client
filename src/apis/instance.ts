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
  