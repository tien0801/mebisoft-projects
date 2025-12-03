/**
 * @file authStore.ts
 * @description Auth Store - Zustand
 * @author Kindy
 * @created 2025-11-16
 */

'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthUser, LoginCredentials, RegisterData } from '../types/auth.types';
import { authApi } from '../api/authApi';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginMock: (credentials: LoginCredentials) => void;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      login: async (credentials: LoginCredentials) => {
        set({ loading: true });
        try {
          // Call API using axios
          const response = await authApi.login(credentials);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      // Mock login - Không cần backend
      loginMock: (credentials: LoginCredentials) => {
        set({ loading: true });
        
        // Mock users data
        const mockUsers = [
          { email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' },
          { email: 'user@example.com', password: 'user123', name: 'Regular User', role: 'user' },
          { email: 'demo@mebisoft.com', password: 'demo123', name: 'Demo User', role: 'user' },
        ];

        // Tìm user
        const user = mockUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          // Login thành công
          set({
            user: {
              id: `mock-${Date.now()}`,
              email: user.email,
              name: user.name,
              role: user.role,
            },
            token: `mock-token-${Date.now()}`,
            isAuthenticated: true,
            loading: false,
          });
        } else {
          // Login thất bại
          set({ loading: false });
          throw new Error('Email hoặc mật khẩu không đúng');
        }
      },

      register: async (data: RegisterData) => {
        set({ loading: true });
        try {
          // Call API using axios
          const response = await authApi.register(data);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          // Call API to logout
          await authApi.logout();
        } catch (error) {
          // Even if API fails, clear local state
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

