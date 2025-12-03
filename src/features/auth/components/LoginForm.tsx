/**
 * @file LoginForm.tsx
 * @description LoginForm component
 * @author Kindy
 * @created 2025-11-16
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../hooks/useAuth';

export function LoginForm() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
      {/* Logo and Title */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <Image
            src="/images/logo/logo.png"
            alt="Mebisoft Logo"
            width={200}
            height={80}
            className="h-20 w-auto"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Đăng nhập</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Mock accounts info - Compact version */}
        

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            placeholder="Nhập email của bạn"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Mật khẩu
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <span className="ml-2 text-gray-700">Ghi nhớ đăng nhập</span>
          </label>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Quên mật khẩu?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
        </button>

        {/* Register Link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <a href="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
            Đăng ký ngay
          </a>
        </div>
      </form>
    </div>
  );
}
