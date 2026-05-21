import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken, setAuthCookie } from '@/middleware/auth';
import { strictRateLimit } from '@/middleware/rateLimit';
import { z } from 'zod';

// Validation schema
const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  // Apply rate limiting
  return strictRateLimit(request, async (req) => {
    try {
      await connectDB();

      // Parse and validate request body
      const body = await req.json();
      const validation = loginSchema.safeParse(body);

      if (!validation.success) {
        return NextResponse.json(
          { error: 'Invalid input', details: validation.error.errors },
          { status: 400 }
        );
      }

      const { username, password } = validation.data;

      // Find user with password field
      const user = await User.findOne({ username }).select('+password');

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Check if user is active
      if (!user.isActive) {
        return NextResponse.json(
          { error: 'Account is disabled' },
          { status: 403 }
        );
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate JWT token
      const token = generateToken({
        userId: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      });

      // Create response with user data
      const response = NextResponse.json(
        {
          success: true,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        },
        { status: 200 }
      );

      // Set httpOnly cookie with token
      return setAuthCookie(response, token);
    } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  });
}
