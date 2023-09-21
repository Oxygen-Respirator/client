import axios from "axios";

const instance = axios.create({ baseURL: "https://api.oxygen-ai.site/api/" });

export default instance;
