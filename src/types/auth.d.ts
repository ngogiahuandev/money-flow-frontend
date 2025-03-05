import { User } from '@/types/user';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  tokens: Tokens;
  user: User;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse extends LoginResponse {}

export interface RefreshTokensPayload {
  refreshToken: string;
}

export interface RefreshTokensResponse extends Tokens {}
export interface MeResponse extends User {}
