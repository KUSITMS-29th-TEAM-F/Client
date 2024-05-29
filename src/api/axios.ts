import _axios from 'axios';

const axios = _axios.create();

const accessToken = localStorage.getItem('access-token');
const refreshToken = localStorage.getItem('refresh-token');

axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_API_URL}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Authorization =
  accessToken && refreshToken
    ? `Bearer ${localStorage.getItem('access-token')}`
    : '';
axios.defaults.paramsSerializer = (params) => {
  return new URLSearchParams(params).toString();
};

export default axios;
