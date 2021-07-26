import axios from 'axios';
import router from '@/router';

const service = axios.create({
  baseURL: 'http://120.78.197.160:8080/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
});

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('AuthToken');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('AuthToken');
      router.push('/sign');
    }
    if (error.response.status === 400) {
      if (error.response.data.code === 1111) {
        localStorage.clear();
        router.push('/sign');
      }
    }
    return Promise.reject(error);
  }
);

export default service;
