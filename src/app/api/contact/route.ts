import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';
import { strictRateLimit } from '@/middleware/rateLimit';
import { requireAuth } from '@/middleware/auth';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(5).max(20),
  message: z.string().min(10).max(1000),
});

export async function POST(request: NextRequest) {
  // Apply strict rate limiting for contact form
  return strictRateLimit(request, async (req) => {
    try {
      await connectDB();

      // Parse and validate request body
      const body = await req.json();
      const validation = contactSchema.safeParse(body);

      if (!validation.success) {
        return NextResponse.json(
          { error: 'Invalid input', details: validation.error.errors },
          { status: 400 }
        );
      }

      const { fullName, email, phone, message } = validation.data;

      // Get client info
      const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';
      const userAgent = req.headers.get('user-agent') || 'unknown';

      // Create contact message
      const contactMessage = await ContactMessage.create({
        fullName,
        email,
        phone,
        message,
        ipAddress,
        userAgent,
        status: 'new',
      });

      // TODO: Send email notification to admin
      // You can integrate with SendGrid, AWS SES, or SMTP here

      return NextResponse.json(
        {
          success: true,
          message: 'Message sent successfully. We will contact you soon.',
          id: contactMessage._id,
        },
        { status: 201 }
      );
    } catch (error: any) {
      console.error('Contact form error:', error);

      if (error.name === 'ValidationError') {
        return NextResponse.json(
          { error: 'Validation error', details: error.errors },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }
  });
}

// Get contact messages (admin only)
export async function GET(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    try {
      await connectDB();

      const { searchParams } = new URL(req.url);
      const status = searchParams.get('status');
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const skip = (page - 1) * limit;

      const query = status ? { status } : {};

      const [messages, total] = await Promise.all([
        ContactMessage.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        ContactMessage.countDocuments(query),
      ]);

      return NextResponse.json(
        {
          success: true,
          data: messages,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Get contact messages error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  });
}
