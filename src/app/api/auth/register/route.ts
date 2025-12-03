/**
 * @file route.ts
 * @description Mock Register API - No database needed
 * @author Kindy
 * @created 2025-11-22
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      );
    }

    // Mock: Create new user (không lưu vào DB)
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'user',
    };

    // Generate mock token
    const token = `mock-token-${newUser.id}`;

    // Return success response
    return NextResponse.json({
      user: newUser,
      token,
      refreshToken: `mock-refresh-${newUser.id}`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Lỗi server' },
      { status: 500 }
    );
  }
}
