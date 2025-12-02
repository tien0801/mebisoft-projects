/**
 * @file route.ts
 * @description Mock Logout API
 * @author Kindy
 * @created 2025-11-22
 */

import { NextResponse } from 'next/server';

export async function POST() {
  // Mock logout - just return success
  return NextResponse.json({ message: 'Đăng xuất thành công' });
}
