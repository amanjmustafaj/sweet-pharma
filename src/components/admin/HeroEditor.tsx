'use client';

import React from 'react';

interface HeroEditorProps {
  content: any;
  language: 'en' | 'ku' | 'ar';
  onChange: (content: any) => void;
}

export default function HeroEditor({ content, language, onChange }: HeroEditorProps) {
  const updateField = (field: string, value: string) => {
    if (field === 'backgroundImage' || field === 'videoUrl') {
      onChange({ ...content, [field]: value });
    } else {
      onChange({
        ...content,
        [field]: {
          ...content[field],
          [language]: value,
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Hero Section - {language.toUpperCase()}
      </h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Title ({language.toUpperCase()})
        </label>
        <input
          type="text"
          value={content.title?.[language] || ''}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          placeholder="Enter hero title"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Subtitle ({language.toUpperCase()})
        </label>
        <textarea
          value={content.subtitle?.[language] || ''}
          onChange={(e) => updateField('subtitle', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          placeholder="Enter hero subtitle"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Background Image URL
        </label>
        <input
          type="text"
          value={content.backgroundImage || ''}
          onChange={(e) => updateField('backgroundImage', e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Video URL (Optional)
        </label>
        <input
          type="text"
          value={content.videoUrl || ''}
          onChange={(e) => updateField('videoUrl', e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          placeholder="https://youtube.com/..."
        />
      </div>
    </div>
  );
}
