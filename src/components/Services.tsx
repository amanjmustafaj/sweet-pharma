'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { initialWebsiteData } from '@/data/websiteData';
import { FaHandHoldingHeart, FaClock, FaUsers, FaAward } from 'react-icons/fa';

const iconMap: { [key: string]: any } = {
  FaHandHoldingHeart,
  FaClock,
  FaUsers,
  FaAward,
};

export default function Services() {
  const { language, t } = useLanguage();
  const [services, setServices] = useState(initialWebsiteData.services);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('websiteContent');
    if (saved) {
      try {
        const content = JSON.parse(saved);
        if (content.services && content.services.length > 0) {
          setServices(content.services);
        }
      } catch (e) {
        console.error('Failed to load services:', e);
      }
    }

    // Listen for updates
    const handleUpdate = () => {
      const saved = localStorage.getItem('websiteContent');
      if (saved) {
        try {
          const content = JSON.parse(saved);
          if (content.services) {
            setServices(content.services);
          }
        } catch (e) {
          console.error('Failed to load services:', e);
        }
      }
    };

    window.addEventListener('contentUpdated', handleUpdate);
    return () => window.removeEventListener('contentUpdated', handleUpdate);
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {t('servicesTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('servicesDescription')}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.filter(s => s.isActive !== false).map((service, index) => {
            const Icon = iconMap[service.icon] || FaHandHoldingHeart;
            const serviceData = service.title ? service : service[language];
            const title = service.title?.[language] || service[language]?.title || 'Service';
            const description = service.description?.[language] || service[language]?.description || '';
            
            return (
              <div
                key={service.id}
                className="group bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div className="mb-6 inline-block">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="text-3xl text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
