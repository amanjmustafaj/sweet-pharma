'use client';

import React, { useState } from 'react';
import { FaImage, FaTrash, FaSpinner } from 'react-icons/fa';

interface ImageUploadProps {
  images: string[];
  maxImages?: number;
  onChange: (images: string[]) => void;
}

export default function ImageUpload({ images, maxImages = 3, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    const filesToUpload = files.slice(0, remainingSlots);

    setUploading(true);
    try {
      // Convert files to base64
      const base64Images = await Promise.all(
        filesToUpload.map(file => fileToBase64(file))
      );

      // For demo, just add the base64 images directly
      // In production, you'd upload to Cloudinary via API
      onChange([...images, ...base64Images]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Upload ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
            />
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaTrash size={12} />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <label className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
            {uploading ? (
              <FaSpinner className="text-3xl text-gray-400 animate-spin" />
            ) : (
              <>
                <FaImage className="text-3xl text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Upload Image</span>
              </>
            )}
          </label>
        )}
      </div>
      <p className="text-sm text-gray-500">
        {images.length} / {maxImages} images uploaded
      </p>
    </div>
  );
}
