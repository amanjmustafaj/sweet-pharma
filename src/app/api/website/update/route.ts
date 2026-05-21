import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import WebsiteContent from '@/models/WebsiteContent';
import { requireAuth } from '@/middleware/auth';
import { csrfProtection } from '@/middleware/csrf';
import { standardRateLimit } from '@/middleware/rateLimit';

export async function PUT(request: NextRequest) {
  // Apply middlewares: rate limit -> CSRF -> auth
  return standardRateLimit(request, async (req) => {
    return csrfProtection(req, async (req) => {
      return requireAuth(req, async (req, user) => {
        try {
          await connectDB();

          const body = await req.json();

          // Find and update or create new content
          const content = await WebsiteContent.findOneAndUpdate(
            {},
            {
              ...body,
              updatedBy: user.userId,
            },
            {
              new: true,
              upsert: true,
              runValidators: true,
            }
          );

          return NextResponse.json(
            {
              success: true,
              message: 'Website content updated successfully',
              data: content,
            },
            { status: 200 }
          );
        } catch (error: any) {
          console.error('Update website content error:', error);
          
          if (error.name === 'ValidationError') {
            return NextResponse.json(
              { error: 'Validation error', details: error.errors },
              { status: 400 }
            );
          }

          return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
          );
        }
      });
    });
  });
}
