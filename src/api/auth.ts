import axiosInstance from '@/api';
import {
  LoginPayload,
  LoginResponse,
  MeResponse,
  RefreshTokensPayload,
  RefreshTokensResponse,
  RegisterPayload,
  RegisterResponse,
  User,
} from '@/types';
export const AuthApi = {
  async login(payload: LoginPayload) {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', payload);
    return response.data;
  },

  async register(payload: RegisterPayload) {
    const response = await axiosInstance.post<RegisterResponse>('/auth/register', payload);
    return response.data;
  },

  async refreshTokens(payload: RefreshTokensPayload) {
    const response = await axiosInstance.post<RefreshTokensResponse>(
      '/auth/refresh-tokens',
      payload
    );
    return response.data;
  },

  async me() {
    const response = await axiosInstance.get<MeResponse>('/auth/me');
    return response.data;
  },

  async logout() {
    const response = await axiosInstance.post<null>('/auth/logout');
    return response.data;
  },
};
