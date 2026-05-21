'use client';

import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { nanoid } from 'nanoid';

interface ServicesEditorProps {
  services: any[];
  language: 'en' | 'ku' | 'ar';
  onChange: (services: any[]) => void;
}

export default function ServicesEditor({ services, language, onChange }: ServicesEditorProps) {
  const [editingService, setEditingService] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const iconOptions = [
    'FaHandHoldingHeart',
    'FaClock',
    'FaUsers',
    'FaAward',
    'FaStar',
    'FaHeart',
    'FaCog',
    'FaRocket',
  ];

  const handleAdd = () => {
    const newService = {
      id: nanoid(),
      icon: 'FaHandHoldingHeart',
      title: { en: '', ku: '', ar: '' },
      description: { en: '', ku: '', ar: '' },
      order: services.length + 1,
      isActive: true,
    };
    setEditingService(newService);
    setShowModal(true);
  };

  const handleEdit = (service: any) => {
    setEditingService({ ...service });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      onChange(services.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (!editingService) return;

    if (services.find(s => s.id === editingService.id)) {
      onChange(services.map(s => s.id === editingService.id ? editingService : s));
    } else {
      onChange([...services, editingService]);
    }
    setShowModal(false);
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Services Management
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold shadow-lg"
        >
          <FaPlus />
          <span>Add Service</span>
        </button>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No services yet. Click "Add Service" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {service.title[language] || 'Untitled Service'}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {service.description[language]}
              </p>
              <p className="text-xs text-gray-500 mt-2">Icon: {service.icon}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {services.find(s => s.id === editingService.id) ? 'Edit Service' : 'Add Service'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <FaTimes />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Service Title ({language.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={editingService.title[language]}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    title: { ...editingService.title, [language]: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description ({language.toUpperCase()})
                </label>
                <textarea
                  value={editingService.description[language]}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    description: { ...editingService.description, [language]: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Icon
                </label>
                <select
                  value={editingService.icon}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold"
                >
                  Save Service
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
