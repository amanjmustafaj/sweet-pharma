'use client';

import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { nanoid } from 'nanoid';

interface SocialEditorProps {
  socialMedia: any[];
  onChange: (socialMedia: any[]) => void;
}

export default function SocialEditor({ socialMedia, onChange }: SocialEditorProps) {
  const [editingSocial, setEditingSocial] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const iconOptions = [
    'FaFacebook', 'FaInstagram', 'FaTwitter', 'FaLinkedin',
    'FaYoutube', 'FaTiktok', 'FaWhatsapp', 'FaTelegram', 'FaSnapchat'
  ];

  const handleAdd = () => {
    const newSocial = {
      id: nanoid(),
      platform: '',
      icon: 'FaFacebook',
      url: '',
      order: socialMedia.length + 1,
      isActive: true,
    };
    setEditingSocial(newSocial);
    setShowModal(true);
  };

  const handleEdit = (social: any) => {
    setEditingSocial({ ...social });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this social media link?')) {
      onChange(socialMedia.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (!editingSocial) return;

    if (socialMedia.find(s => s.id === editingSocial.id)) {
      onChange(socialMedia.map(s => s.id === editingSocial.id ? editingSocial : s));
    } else {
      onChange([...socialMedia, editingSocial]);
    }
    setShowModal(false);
    setEditingSocial(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Social Media Links
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold shadow-lg"
        >
          <FaPlus />
          <span>Add Link</span>
        </button>
      </div>

      {socialMedia.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No social media links yet. Click "Add Link" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialMedia.map((social) => (
            <div
              key={social.id}
              className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  {social.platform || 'Unnamed Platform'}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(social)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(social.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 break-all mb-2">
                <strong>URL:</strong> {social.url}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Icon:</strong> {social.icon}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && editingSocial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {socialMedia.find(s => s.id === editingSocial.id) ? 'Edit Social Link' : 'Add Social Link'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <FaTimes />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={editingSocial.platform}
                  onChange={(e) => setEditingSocial({ ...editingSocial, platform: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Facebook"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Icon
                </label>
                <select
                  value={editingSocial.icon}
                  onChange={(e) => setEditingSocial({ ...editingSocial, icon: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon.replace('Fa', '')}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={editingSocial.url}
                  onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold"
                >
                  Save Link
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
