import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface AxiosInstance {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R>;
}

export interface AxiosCustomResponse {
  data: {
    status: string;
    message: string;
  };
}

export interface AxiosCustomAuthResponse extends AxiosCustomResponse {
  data: {
    status: string;
    message: string;

    jwt: {
      token: string;
      tokenType: string | "Bearer";
      expiresIn: number;
    },
    
    user: {
      username: string;
      email: string;
      uuid: string;
    };
  };
}
