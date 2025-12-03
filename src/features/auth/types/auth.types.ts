/**
 * @file auth.types.ts
 * @description Auth types
 * @author Kindy
 * @created 2025-11-16
 */

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

