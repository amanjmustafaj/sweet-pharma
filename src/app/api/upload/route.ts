import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/middleware/auth';
import { csrfProtection } from '@/middleware/csrf';
import { uploadImage, uploadMultipleImages } from '@/lib/cloudinary';
import { z } from 'zod';

// Validation schema
const uploadSchema = z.object({
  images: z.array(z.string()).min(1).max(5), // Array of base64 strings
  folder: z.string().optional(),
});

export async function POST(request: NextRequest) {
  return csrfProtection(request, async (req) => {
    return requireAuth(req, async (req, user) => {
      try {
        const body = await req.json();
        const validation = uploadSchema.safeParse(body);

        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid input', details: validation.error.errors },
            { status: 400 }
          );
        }

        const { images, folder = 'sweet-platform' } = validation.data;

        // Validate base64 images
        const validImages = images.filter((img) => {
          // Check if it's a valid base64 data URL
          return img.startsWith('data:image/');
        });

        if (validImages.length === 0) {
          return NextResponse.json(
            { error: 'No valid images provided' },
            { status: 400 }
          );
        }

        // Upload images to Cloudinary
        let results;
        if (validImages.length === 1) {
          const result = await uploadImage(validImages[0], folder);
          results = [result];
        } else {
          results = await uploadMultipleImages(validImages, folder);
        }

        return NextResponse.json(
          {
            success: true,
            message: 'Images uploaded successfully',
            data: results,
          },
          { status: 200 }
        );
      } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json(
          { error: error.message || 'Failed to upload images' },
          { status: 500 }
        );
      }
    });
  });
}

// Maximum file size: 5MB per image
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};
