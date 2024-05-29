import Axios from "axios";

const axios = Axios.create();

const accessToken = localStorage.getItem("access-token");
const refreshToken = localStorage.getItem("refresh-token");

axios.defaults.baseURL = `${import.meta.env.VITE_PUBLIC_SERVER_API_URL}`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Authorization =
  accessToken && refreshToken
    ? `Bearer ${localStorage.getItem("access-token")}`
    : "";

export default axios;
