import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface AxiosInstance {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R>;
  }

  export interface AxiosCustomResponse {
    data: {
      status: string;
      message: string;
      token?: string;
      user?: {
        username: string;
        email: string;
        role: string;
      };
    }
  }