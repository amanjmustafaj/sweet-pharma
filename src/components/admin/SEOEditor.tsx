'use client';

import React from 'react';

interface SEOEditorProps {
  content: any;
  language: 'en' | 'ku' | 'ar';
  onChange: (content: any) => void;
}

export default function SEOEditor({ content, language, onChange }: SEOEditorProps) {
  const updateField = (field: string, value: string) => {
    if (field === 'ogImage') {
      onChange({ ...content, ogImage: value });
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
        SEO Settings - {language.toUpperCase()}
      </h2>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>SEO Tip:</strong> Keep titles under 60 characters and descriptions under 160 characters for best results in search engines.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Page Title ({language.toUpperCase()})
        </label>
        <input
          type="text"
          value={content.title?.[language] || ''}
          onChange={(e) => updateField('title', e.target.value)}
          maxLength={60}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          placeholder="Enter page title (max 60 characters)"
        />
        <p className="text-xs text-gray-500 mt-1">
          {content.title?.[language]?.length || 0} / 60 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Meta Description ({language.toUpperCase()})
        </label>
        <textarea
          value={content.description?.[language] || ''}
          onChange={(e) => updateField('description', e.target.value)}
          maxLength={160}
          rows={3}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          placeholder="Enter meta description (max 160 characters)"
        />
        <p className="text-xs text-gray-500 mt-1">
          {content.description?.[language]?.length || 0} / 160 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Keywords ({language.toUpperCase()})
        </label>
        <input
          type="text"
          value={content.keywords?.[language] || ''}
          onChange={(e) => updateField('keywords', e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          placeholder="keyword1, keyword2, keyword3"
        />
        <p className="text-xs text-gray-500 mt-1">
          Separate keywords with commas
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Open Graph Image URL
        </label>
        <input
          type="url"
          value={content.ogImage || ''}
          onChange={(e) => updateField('ogImage', e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          placeholder="https://example.com/og-image.jpg"
        />
        <p className="text-xs text-gray-500 mt-1">
          This image appears when sharing your site on social media (recommended: 1200x630px)
        </p>
      </div>
    </div>
  );
}
