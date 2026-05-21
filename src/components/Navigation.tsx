'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

export default function Navigation() {
  const { language, setLanguage, t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('home') },
    { href: '#services', label: t('services') },
    { href: '#branches', label: t('branches') },
    { href: '#about', label: t('about') },
    { href: '#contact', label: t('contact') },
  ];

  const handleLanguageChange = (lang: 'en' | 'ku' | 'ar') => {
    setLanguage(lang);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-gray-900 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center transition-transform hover:scale-105"
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-12 w-auto object-contain"
              style={{ maxWidth: '200px' }}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher */}
            <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 rounded transition-all duration-300 ${
                  language === 'en'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('ku')}
                className={`px-3 py-1 rounded transition-all duration-300 ${
                  language === 'ku'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white'
                }`}
              >
                کو
              </button>
              <button
                onClick={() => handleLanguageChange('ar')}
                className={`px-3 py-1 rounded transition-all duration-300 ${
                  language === 'ar'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white'
                }`}
              >
                ع
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-primary hover:text-white transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-2 py-4 animate-slide-down">
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 font-medium py-2"
                >
                  {link.label}
                </a>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('language')}:</span>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1 rounded transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('ku')}
                  className={`px-3 py-1 rounded transition-all duration-300 ${
                    language === 'ku'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  کو
                </button>
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className={`px-3 py-1 rounded transition-all duration-300 ${
                    language === 'ar'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  ع
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
