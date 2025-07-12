import axios, { AxiosRequestConfig, AxiosError } from 'axios';
// import useStore from '@/context/store';
import { requestQueue } from './requestQueue';
import { refreshTokens } from './refreshService';
// import { getTokens } from '@/utils/tokens';
import { API_URL } from '../constants/indes';
import useStore from '../context/store';

// Extend AxiosRequestConfig to include custom _retry flag
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const request = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
  const { accessToken } = getTokens();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (originalRequest?.url?.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (requestQueue.refreshing) {
        return requestQueue.add({
          config: originalRequest,
          retry: () => request(originalRequest),
        });
      }

      try {
        requestQueue.refreshing = true;
        const newAccessToken = await refreshTokens();

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        requestQueue.processAll(newAccessToken);
        return request(originalRequest);
      } catch (refreshError) {
        requestQueue.rejectAll(refreshError);
        useStore.getState().logOut();
        window.location.href = '/auth/signin';
        return Promise.reject(refreshError);
      } finally {
        requestQueue.refreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default request;
