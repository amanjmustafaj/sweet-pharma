'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { initialWebsiteData } from '@/data/websiteData';

export default function Hero() {
  const { language, t } = useLanguage();
  const [heroData, setHeroData] = useState(initialWebsiteData.hero[language]);

  useEffect(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('websiteContent');
    if (saved) {
      try {
        const content = JSON.parse(saved);
        if (content.hero && content.hero.title) {
          setHeroData({
            title: content.hero.title[language] || initialWebsiteData.hero[language].title,
            subtitle: content.hero.subtitle[language] || initialWebsiteData.hero[language].subtitle,
            backgroundImage: content.hero.backgroundImage || '',
            videoUrl: content.hero.videoUrl || '',
          });
        }
      } catch (e) {
        console.error('Failed to load content:', e);
      }
    }

    // Listen for content updates
    const handleUpdate = () => {
      const saved = localStorage.getItem('websiteContent');
      if (saved) {
        try {
          const content = JSON.parse(saved);
          if (content.hero && content.hero.title) {
            setHeroData({
              title: content.hero.title[language] || initialWebsiteData.hero[language].title,
              subtitle: content.hero.subtitle[language] || initialWebsiteData.hero[language].subtitle,
              backgroundImage: content.hero.backgroundImage || '',
              videoUrl: content.hero.videoUrl || '',
            });
          }
        } catch (e) {
          console.error('Failed to load content:', e);
        }
      }
    };

    window.addEventListener('contentUpdated', handleUpdate);
    return () => window.removeEventListener('contentUpdated', handleUpdate);
  }, [language]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent dark:from-primary/30 dark:via-primary/20 dark:to-transparent" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white animate-slide-up">
            {heroData.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 animate-slide-up delay-200">
            {heroData.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-400">
            <a
              href="#contact"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('getStarted')}
            </a>
            <a
              href="#about"
              className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-primary border-2 border-primary rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('learnMore')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
