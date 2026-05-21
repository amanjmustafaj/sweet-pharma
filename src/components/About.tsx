'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { initialWebsiteData } from '@/data/websiteData';
import { FaBullseye, FaEye, FaHeart } from 'react-icons/fa';

export default function About() {
  const { language, t } = useLanguage();
  const [aboutData, setAboutData] = useState(initialWebsiteData.about[language]);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('websiteContent');
    if (saved) {
      try {
        const content = JSON.parse(saved);
        if (content.about && content.about.title) {
          setAboutData({
            title: content.about.title[language] || initialWebsiteData.about[language].title,
            description: content.about.description[language] || initialWebsiteData.about[language].description,
            mission: content.about.mission[language] || initialWebsiteData.about[language].mission,
            vision: content.about.vision[language] || initialWebsiteData.about[language].vision,
            values: content.about.values[language] || initialWebsiteData.about[language].values,
          });
        }
      } catch (e) {
        console.error('Failed to load about content:', e);
      }
    }

    // Listen for updates
    const handleUpdate = () => {
      const saved = localStorage.getItem('websiteContent');
      if (saved) {
        try {
          const content = JSON.parse(saved);
          if (content.about && content.about.title) {
            setAboutData({
              title: content.about.title[language] || initialWebsiteData.about[language].title,
              description: content.about.description[language] || initialWebsiteData.about[language].description,
              mission: content.about.mission[language] || initialWebsiteData.about[language].mission,
              vision: content.about.vision[language] || initialWebsiteData.about[language].vision,
              values: content.about.values[language] || initialWebsiteData.about[language].values,
            });
          }
        } catch (e) {
          console.error('Failed to load about content:', e);
        }
      }
    };

    window.addEventListener('contentUpdated', handleUpdate);
    return () => window.removeEventListener('contentUpdated', handleUpdate);
  }, [language]);

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {t('aboutTitle')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Description */}
          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {aboutData.description}
            </p>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="mb-6 inline-block">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <FaBullseye className="text-3xl text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t('ourMission')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {aboutData.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="mb-6 inline-block">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <FaEye className="text-3xl text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t('ourVision')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {aboutData.vision}
              </p>
            </div>

            {/* Values */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="mb-6 inline-block">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <FaHeart className="text-3xl text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t('ourValues')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {aboutData.values}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
