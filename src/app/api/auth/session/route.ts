import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/middleware/auth';

export async function GET(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    try {
      return NextResponse.json(
        {
          authenticated: true,
          user: {
            id: user.userId,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Session check error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  });
}
