/**
 * @file LoginForm.tsx
 * @description LoginForm component - Với mock data
 * @author Mebisoft Team
 * @created 2025-11-22
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Input, Button } from '@/shared/components/ui';

export function LoginForm() {
  const router = useRouter();
  const { loginMock, loading } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      // Sử dụng loginMock thay vì login
      loginMock({ email, password });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  // Quick login buttons
  const quickLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Mock accounts info */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm">
        <p className="font-semibold text-blue-800 mb-2">Tài khoản test (Mock):</p>
        <div className="space-y-1 text-blue-700">
          <p>• admin@example.com / admin123</p>
          <p>• user@example.com / user123</p>
          <p>• demo@mebisoft.com / demo123</p>
        </div>
      </div>

      {/* Quick login buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => quickLogin('admin@example.com', 'admin123')}
          className="px-3 py-2 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          Admin
        </button>
        <button
          type="button"
          onClick={() => quickLogin('user@example.com', 'user123')}
          className="px-3 py-2 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
        >
          User
        </button>
        <button
          type="button"
          onClick={() => quickLogin('demo@mebisoft.com', 'demo123')}
          className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
        >
          Demo
        </button>
      </div>
      
      <Input
        label="Email"
        type="email"
        placeholder="Nhập email của bạn"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <Input
        label="Mật Khẩu"
        type="password"
        placeholder="Nhập mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-600">Ghi nhớ đăng nhập</span>
        </label>
        <a href="#" className="text-blue-600 hover:text-blue-800">
          Quên mật khẩu?
        </a>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
      </Button>

      <div className="text-center text-sm text-gray-600">
        Chưa có tài khoản?{' '}
        <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
          Đăng ký ngay
        </a>
      </div>
    </form>
  );
}
