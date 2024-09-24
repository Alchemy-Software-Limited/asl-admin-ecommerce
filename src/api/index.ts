import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import axios from 'axios';

import { decrypt } from 'src/utils/decrypt';

import { validateJwt } from 'src/helpers/jwt-helper';

// base API URL
const envUrl = import.meta.env.VITE_APP_BASE_URL;
axios.defaults.baseURL = `${envUrl}`;

// axios client
const client = axios.create({
  baseURL: axios.defaults.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios request interceptor to add token
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const persistedData = localStorage.getItem('persist:asl-ecommerce');
    if (persistedData) {
      const currentUser = JSON.parse(JSON.parse(persistedData).auth).user;
      const token = validateJwt(decrypt(currentUser.token)) ? decrypt(currentUser.token) : null;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor
client.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error)
);

// API request methods
const requests = {
  get: async <T>(url: string, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> =>
    client.get(url, config),

  getProgress: async <T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> => client.get(url, config),

  post: async <T>(
    url: string,
    body: any = {},
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> => client.post(url, body, config),

  postProgress: async <T>(
    url: string,
    body: any,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> => client.post(url, body, config),

  put: async <T>(
    url: string,
    body: any,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> => client.put(url, body, config),

  patch: async <T>(
    url: string,
    body: any,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> => client.patch(url, body, config),

  del: async <T>(url: string, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> =>
    client.delete(url, config),

  postForm: async <T>(url: string, values: Record<string, any>): Promise<AxiosResponse<T>> => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    return client.patch(url, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
  },
};

// Types for request parameters and responses (you should adjust these based on your API schema)
interface UserInfo {
  email?: string;
  password?: string;
  token?: string;
}

// User API requests
const User = {
  UpdateAccount: (info: Record<string, any>) => requests.postForm('/user/update', info),
  LogOut: () => requests.post<void>(`/auth/logout`),
  ChangePassword: (info: Record<string, any>) =>
    requests.patch<void>('/auth/change-password', info),
  GetOtpVerification: (info: { email: string }) =>
    requests.postProgress<void>('/auth/get-otp', info),
  VerifyOtp: (info: { otp: string }) => requests.postProgress<void>('/auth/verify-otp', info),
  GetOwnOtp: () => requests.get<void>('/auth/own-otp'),
};

export default {
  User,
};
