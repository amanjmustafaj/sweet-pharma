'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { initialWebsiteData } from '@/data/websiteData';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin, 
  FaYoutube, 
  FaTiktok, 
  FaWhatsapp, 
  FaTelegram,
  FaSnapchat 
} from 'react-icons/fa';

const iconMap: { [key: string]: any } = {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
  FaSnapchat,
};

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState(initialWebsiteData.socialMedia);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('websiteContent');
    if (saved) {
      try {
        const content = JSON.parse(saved);
        if (content.socialMedia && content.socialMedia.length > 0) {
          setSocialLinks(content.socialMedia.filter((s: any) => s.isActive !== false));
        }
      } catch (e) {
        console.error('Failed to load social media:', e);
      }
    }

    // Listen for updates
    const handleUpdate = () => {
      const saved = localStorage.getItem('websiteContent');
      if (saved) {
        try {
          const content = JSON.parse(saved);
          if (content.socialMedia) {
            setSocialLinks(content.socialMedia.filter((s: any) => s.isActive !== false));
          }
        } catch (e) {
          console.error('Failed to load social media:', e);
        }
      }
    };

    window.addEventListener('contentUpdated', handleUpdate);
    return () => window.removeEventListener('contentUpdated', handleUpdate);
  }, []);

  const navLinks = [
    { href: '#home', label: t('home') },
    { href: '#services', label: t('services') },
    { href: '#branches', label: t('branches') },
    { href: '#about', label: t('about') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-10 w-auto object-contain"
              style={{ maxWidth: '150px' }}
            />
            <p className="text-gray-400 leading-relaxed">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('followUs')}</h4>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon] || FaFacebook;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    aria-label={social.platform}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            © {currentYear} Sweet Pharma. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
