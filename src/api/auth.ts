// eslint-disable-next-line import/no-extraneous-dependencies
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// base api url
const envUrl = import.meta.env.VITE_APP_BASE_URL as string;
axios.defaults.baseURL = `${envUrl}`;

// axios client
const client = axios.create({
  baseURL: axios.defaults.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define types for API requests
interface RequestBody {
  [key: string]: any;
}

interface FormValues {
  [key: string]: any;
}

// api requests
const requests = {
  get: async (url: string): Promise<AxiosResponse> => client.get(url),
  getProgress: async (url: string, request: AxiosRequestConfig): Promise<AxiosResponse> =>
    client.get(url, request),
  post: async (url: string, body: RequestBody): Promise<AxiosResponse> =>
    client.post(url, body),
  postProgress: async (
    url: string,
    body: RequestBody,
    getConfig: AxiosRequestConfig
  ): Promise<AxiosResponse> => client.post(url, body, getConfig),
  put: async (url: string, body: RequestBody): Promise<AxiosResponse> =>
    client.put(url, body),
  del: async (url: string): Promise<AxiosResponse> => client.delete(url),
  postForm: async (url: string, values: FormValues): Promise<AxiosResponse> => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    const response = await client.post(url, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    return response;
  },
};

// authentication requests
const Authentication = {
  SignUp: (info: RequestBody): Promise<AxiosResponse> => requests.post(`/auth/signup`, info),
  GoogleLogin: (info: RequestBody): Promise<AxiosResponse> => requests.post(`/auth/google`, info),
  Login: async (info: RequestBody): Promise<AxiosResponse> => requests.post('/auth/login', info),
  GetResetPasswordLink: (info: RequestBody): Promise<AxiosResponse> =>
    requests.post(`/auth/forgot-password`, info),
  ForgotPasswordChange: (info: RequestBody): Promise<AxiosResponse> =>
    requests.post(`/auth/reset-password`, info),
};

export default {
  Authentication,
};
