import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://epsilon.amagi.tv/v1/api/', // EPSILON
  baseURL: '/v1/api/',
});

instance.interceptors.request.use(
  config => {
    // config.url += config.url.indexOf('?') === -1 ? '?token=vSjrGDEXYbG8wE8dZqjg' : '&token=vSjrGDEXYbG8wE8dZqjg'; // EPSILON
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(response => response, error => Promise.reject(error));

export default instance;
