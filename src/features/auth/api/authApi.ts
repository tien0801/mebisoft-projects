/**
 * @file authApi.ts
 * @description Auth API
 * @author Kindy
 * @created 2025-11-16
 */

import { apiClient } from '@/core/api/client';
import { API_ENDPOINTS } from '@/core/api/endpoints';
import { LoginCredentials, RegisterData, AuthUser } from '../types/auth.types';

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken?: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const { data: response } = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response;
  },

  logout: async (): Promise<void> => {
    // Mock logout - không cần call API
    // Khi có backend thật, uncomment dòng dưới:
    // await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    return Promise.resolve();
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );
    return data;
  },
};
