import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

/**
 * Upload image to Cloudinary
 * @param file - Base64 string or file path
 * @param folder - Cloudinary folder name
 * @returns Upload result with URL and metadata
 */
export async function uploadImage(
  file: string,
  folder: string = 'sweet-platform'
): Promise<UploadResult> {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 1920, crop: 'limit' }, // Max width 1920px
      ],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Delete image from Cloudinary
 * @param publicId - Cloudinary public ID
 */
export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
}

/**
 * Upload multiple images
 * @param files - Array of base64 strings or file paths
 * @param folder - Cloudinary folder name
 * @returns Array of upload results
 */
export async function uploadMultipleImages(
  files: string[],
  folder: string = 'sweet-platform'
): Promise<UploadResult[]> {
  try {
    const uploadPromises = files.map((file) => uploadImage(file, folder));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw new Error('Failed to upload images');
  }
}

/**
 * Delete multiple images
 * @param publicIds - Array of Cloudinary public IDs
 */
export async function deleteMultipleImages(publicIds: string[]): Promise<void> {
  try {
    const deletePromises = publicIds.map((id) => deleteImage(id));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Multiple delete error:', error);
    throw new Error('Failed to delete images');
  }
}

/**
 * Generate optimized image URL with transformations
 * @param publicId - Cloudinary public ID
 * @param width - Desired width
 * @param height - Desired height (optional)
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  publicId: string,
  width: number,
  height?: number
): string {
  const transformation = height
    ? `w_${width},h_${height},c_fill,q_auto,f_auto`
    : `w_${width},c_scale,q_auto,f_auto`;

  return cloudinary.url(publicId, {
    transformation,
    secure: true,
  });
}

export default cloudinary;
