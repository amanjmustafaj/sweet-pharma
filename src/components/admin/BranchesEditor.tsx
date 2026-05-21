'use client';

import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import ImageUpload from './ImageUpload';

interface BranchesEditorProps {
  branches: any[];
  language: 'en' | 'ku' | 'ar';
  onChange: (branches: any[]) => void;
}

export default function BranchesEditor({ branches, language, onChange }: BranchesEditorProps) {
  const [editingBranch, setEditingBranch] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    const newBranch = {
      id: nanoid(),
      title: { en: '', ku: '', ar: '' },
      address: { en: '', ku: '', ar: '' },
      email: '',
      laboratory: { en: '', ku: '', ar: '' },
      phone: '',
      mapLink: '',
      images: [],
      order: branches.length + 1,
      isActive: true,
    };
    setEditingBranch(newBranch);
    setShowModal(true);
  };

  const handleEdit = (branch: any) => {
    setEditingBranch({ ...branch });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this branch?')) {
      onChange(branches.filter(b => b.id !== id));
    }
  };

  const handleSave = () => {
    if (!editingBranch) return;

    if (branches.find(b => b.id === editingBranch.id)) {
      onChange(branches.map(b => b.id === editingBranch.id ? editingBranch : b));
    } else {
      onChange([...branches, editingBranch]);
    }
    setShowModal(false);
    setEditingBranch(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Branches Management
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold shadow-lg"
        >
          <FaPlus />
          <span>Add Branch</span>
        </button>
      </div>

      {branches.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No branches yet. Click "Add Branch" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  {branch.title[language] || 'Untitled Branch'}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(branch)}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium"
                  >
                    <FaEdit className="inline mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(branch.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium"
                  >
                    <FaTrash className="inline mr-2" />
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div><strong>Address:</strong> {branch.address[language]}</div>
                <div><strong>Phone:</strong> {branch.phone}</div>
                <div><strong>Email:</strong> {branch.email || 'Not set'}</div>
                <div><strong>Laboratory:</strong> {branch.laboratory?.[language] || 'Not set'}</div>
                <div><strong>Images:</strong> {branch.images.length} / 3</div>
                <div><strong>Map:</strong> {branch.mapLink ? '✓' : '✗'}</div>
              </div>

              {/* Image Preview */}
              {branch.images.length > 0 && (
                <div className="flex space-x-2 mt-4">
                  {branch.images.slice(0, 3).map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Branch ${idx + 1}`}
                      className="w-20 h-20 object-cover rounded border-2 border-gray-300"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && editingBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {branches.find(b => b.id === editingBranch.id) ? 'Edit Branch' : 'Add Branch'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <FaTimes />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Language Note */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  📝 Currently editing in <strong>{language.toUpperCase()}</strong>. 
                  Switch language tabs at the top to edit in other languages.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Branch Name ({language.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={editingBranch.title[language]}
                  onChange={(e) => setEditingBranch({
                    ...editingBranch,
                    title: { ...editingBranch.title, [language]: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                  placeholder="Enter branch name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Address ({language.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={editingBranch.address[language]}
                  onChange={(e) => setEditingBranch({
                    ...editingBranch,
                    address: { ...editingBranch.address, [language]: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editingBranch.phone}
                  onChange={(e) => setEditingBranch({ ...editingBranch, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                  placeholder="+965 *** *** ** **"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editingBranch.email || ''}
                  onChange={(e) => setEditingBranch({ ...editingBranch, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                  placeholder="branch@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Laboratory ({language.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={editingBranch.laboratory?.[language] || ''}
                  onChange={(e) => setEditingBranch({
                    ...editingBranch,
                    laboratory: { 
                      ...editingBranch.laboratory, 
                      [language]: e.target.value 
                    }
                  })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                  placeholder="Laboratory name or services"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Google Maps Link
                </label>
                <input
                  type="url"
                  value={editingBranch.mapLink}
                  onChange={(e) => setEditingBranch({ ...editingBranch, mapLink: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                  placeholder="https://maps.google.com/?q=..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Branch Images (Up to 3 photos)
                </label>
                <ImageUpload
                  images={editingBranch.images}
                  maxImages={3}
                  onChange={(images) => setEditingBranch({ ...editingBranch, images })}
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold shadow-lg"
                >
                  💾 Save Branch
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
