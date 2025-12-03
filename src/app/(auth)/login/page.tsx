/**
 * @file page.tsx
 * @description Login page - Thiết kế theo mẫu Mebisoft
 * @author Kindy
 * @created 2025-11-16
 */

import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-[#001a4d] via-[#002366] to-[#003d82]">
      {/* Background Pattern - Animated dots/circles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}>
          </div>
        </div>

        {/* Glowing circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      {/* Left Illustration - 3D Isometric */}
      <div className="hidden lg:block absolute left-20 bottom-20 z-10">
        <div className="relative w-64 h-64">
          {/* Placeholder for 3D illustration - You can add actual image here */}
          <div className="absolute inset-0 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-white/10"></div>
        </div>
      </div>

      {/* Right Illustration - 3D Isometric */}
      <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 z-10">
        <div className="relative w-80 h-80">
          {/* Placeholder for 3D illustration - You can add actual image here */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-400/20 to-indigo-500/20 rounded-2xl backdrop-blur-sm border border-white/10"></div>
        </div>
      </div>

      {/* Login Form Container */}
      <div className="relative z-20 w-full max-w-md px-6">
        <LoginForm />
      </div>
    </div>
  );
}

