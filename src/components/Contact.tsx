'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Force English numerals in phone input
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Convert any non-Latin numerals to Latin (0-9)
    const latinNumerals = value.replace(/[٠-٩]/g, (d) => 
      String.fromCharCode(d.charCodeAt(0) - 1632 + 48)
    );
    // Only allow +, digits, spaces, and basic formatting characters
    const cleaned = latinNumerals.replace(/[^\d\s+\-()]/g, '');
    
    setFormData({ ...formData, phone: cleaned });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({ fullName: '', email: '', phone: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {t('contactTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contactDescription')}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact')}
              </h3>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('phone')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 phone-input">
                    +965 2222 3333
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('email')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    info@company.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('branches')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Kuwait City, Al-Salhiya
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t('phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder={t('phonePlaceholder')}
                  required
                  className="phone-input w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {status === 'loading' ? t('loading') : t('send')}
              </button>

              {status === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-lg text-green-700 dark:text-green-400 text-center animate-slide-up">
                  {t('messageSent')}
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-500 rounded-lg text-red-700 dark:text-red-400 text-center animate-slide-up">
                  {t('messageFailed')}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
