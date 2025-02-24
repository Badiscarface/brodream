import axios from 'axios';

const baseURL = process.env.BASE_URL || 'https://brodream-be.vercel.app';
const http = axios.create({
  baseURL: baseURL + `/api`,
  timeout: 30000,
});

http.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
