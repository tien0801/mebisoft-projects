/**
 * @file route.ts
 * @description Mock Login API - No database needed
 * @author Kindy
 * @created 2025-11-22
 */

import { NextRequest, NextResponse } from 'next/server';

// Mock users (thay thế database)
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email và mật khẩu là bắt buộc' },
        { status: 400 }
      );
    }

    // Find user
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    // Generate mock token
    const token = `mock-token-${user.id}-${Date.now()}`;

    // Return success response
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
      refreshToken: `mock-refresh-${user.id}`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Lỗi server' },
      { status: 500 }
    );
  }
}
