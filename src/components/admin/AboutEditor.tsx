'use client';

import React from 'react';

interface AboutEditorProps {
  content: any;
  language: 'en' | 'ku' | 'ar';
  onChange: (content: any) => void;
}

export default function AboutEditor({ content, language, onChange }: AboutEditorProps) {
  const updateField = (field: string, value: string) => {
    onChange({
      ...content,
      [field]: {
        ...content[field],
        [language]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        About Us - {language.toUpperCase()}
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
          placeholder="Enter title"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Description ({language.toUpperCase()})
        </label>
        <textarea
          value={content.description?.[language] || ''}
          onChange={(e) => updateField('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          placeholder="Enter description"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Mission Statement ({language.toUpperCase()})
        </label>
        <textarea
          value={content.mission?.[language] || ''}
          onChange={(e) => updateField('mission', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          placeholder="Enter mission statement"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Vision Statement ({language.toUpperCase()})
        </label>
        <textarea
          value={content.vision?.[language] || ''}
          onChange={(e) => updateField('vision', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          placeholder="Enter vision statement"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Values ({language.toUpperCase()})
        </label>
        <textarea
          value={content.values?.[language] || ''}
          onChange={(e) => updateField('values', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          placeholder="Enter company values"
        />
      </div>
    </div>
  );
}
