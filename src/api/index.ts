import { useAuthStore } from '@/stores';
import axios, { AxiosError } from 'axios';
import { AuthApi } from './auth';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(config => {
  const accessToken = useAuthStore.getState().tokens?.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = useAuthStore.getState().tokens?.refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const tokens = await AuthApi.refreshTokens({ refreshToken });
        useAuthStore.getState().setTokens(tokens);

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;

        processQueue();
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err);
        useAuthStore.getState().logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
