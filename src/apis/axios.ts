import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

type Method = 'get';

interface AxiosParams {
  method: Method;
  requestBody?: unknown;
  queryParams?: unknown;
  url: string;
  config?: AxiosRequestConfig;
  contentType?: string;
}

const createRequest = (instance: AxiosInstance) => {
  return <T>({ method, queryParams, url, config }: AxiosParams) => {
    switch (method) {
      case 'get':
      default:
        return instance.get<T>(url, {
          params: queryParams,
          ...config,
        });
    }
  };
};

const mainInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || '',
  timeout: 60000,
});

const kakaoInstance = axios.create({
  baseURL: 'https://dapi.kakao.com',
  timeout: 60000,
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  },
});

export const request = createRequest(mainInstance);
export const kakaoRequest = createRequest(kakaoInstance);
