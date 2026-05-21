'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaHome,
  FaCog,
  FaBuilding,
  FaShareAlt,
  FaSignOutAlt,
  FaSave,
  FaInfoCircle,
} from 'react-icons/fa';

// Import all editor components
import HeroEditor from '@/components/admin/HeroEditor';
import ServicesEditor from '@/components/admin/ServicesEditor';
import BranchesEditor from '@/components/admin/BranchesEditor';
import SocialEditor from '@/components/admin/SocialEditor';
import AboutEditor from '@/components/admin/AboutEditor';
import SEOEditor from '@/components/admin/SEOEditor';

type Section = 'hero' | 'services' | 'branches' | 'social' | 'about' | 'seo';
type Language = 'en' | 'ku' | 'ar';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const [activeLang, setActiveLang] = useState<Language>('en');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);

  // Website content state
  const [content, setContent] = useState<any>({
    hero: {
      title: { en: '', ku: '', ar: '' },
      subtitle: { en: '', ku: '', ar: '' },
      backgroundImage: '',
      videoUrl: '',
    },
    services: [],
    branches: [],
    socialMedia: [],
    about: {
      title: { en: '', ku: '', ar: '' },
      description: { en: '', ku: '', ar: '' },
      mission: { en: '', ku: '', ar: '' },
      vision: { en: '', ku: '', ar: '' },
      values: { en: '', ku: '', ar: '' },
    },
    seo: {
      title: { en: '', ku: '', ar: '' },
      description: { en: '', ku: '', ar: '' },
      keywords: { en: '', ku: '', ar: '' },
      ogImage: '',
    },
  });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/secret-admin-panel-2025/login');
      return;
    }

    // Load content from API
    loadContent();
  }, [router]);

  const loadContent = async () => {
    try {
      setLoadingContent(true);
      const response = await fetch('/api/website/content');
      const data = await response.json();

      if (data.success && data.data) {
        setContent(data.data);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoadingContent(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/secret-admin-panel-2025/login');
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Save to localStorage for immediate use (temporary)
      localStorage.setItem('websiteContent', JSON.stringify(content));

      // In production, you'd save to API here
      // const response = await fetch('/api/website/content', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(content),
      // });

      await new Promise(resolve => setTimeout(resolve, 1000));

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);

      // Trigger refresh on main website
      window.dispatchEvent(new Event('contentUpdated'));
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'hero' as Section, icon: FaHome, label: 'Hero Section' },
    { id: 'services' as Section, icon: FaCog, label: 'Services' },
    { id: 'branches' as Section, icon: FaBuilding, label: 'Branches' },
    { id: 'social' as Section, icon: FaShareAlt, label: 'Social Media' },
    { id: 'about' as Section, icon: FaInfoCircle, label: 'About Us' },
    { id: 'seo' as Section, icon: FaCog, label: 'SEO Settings' },
  ];

  if (loadingContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
              >
                👁️ View Site
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 min-h-[calc(100vh-73px)] shadow-lg">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Language Tabs & Save Button */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow">
                <button
                  onClick={() => setActiveLang('en')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    activeLang === 'en'
                      ? 'bg-primary text-white shadow'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => setActiveLang('ku')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    activeLang === 'ku'
                      ? 'bg-primary text-white shadow'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  🇮🇶 کوردی
                </button>
                <button
                  onClick={() => setActiveLang('ar')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    activeLang === 'ar'
                      ? 'bg-primary text-white shadow'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  🇸🇦 العربية
                </button>
              </div>

              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <FaSave />
                <span>{loading ? 'Saving...' : 'Save All Changes'}</span>
              </button>
            </div>

            {saved && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded-lg text-green-700 dark:text-green-400 animate-slide-down">
                <strong>✅ Success!</strong> All changes have been saved. Refresh the website to see updates.
              </div>
            )}

            {/* Content Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              {activeSection === 'hero' && (
                <HeroEditor
                  content={content.hero}
                  language={activeLang}
                  onChange={(hero) => setContent({ ...content, hero })}
                />
              )}

              {activeSection === 'services' && (
                <ServicesEditor
                  services={content.services}
                  language={activeLang}
                  onChange={(services) => setContent({ ...content, services })}
                />
              )}

              {activeSection === 'branches' && (
                <BranchesEditor
                  branches={content.branches}
                  language={activeLang}
                  onChange={(branches) => setContent({ ...content, branches })}
                />
              )}

              {activeSection === 'social' && (
                <SocialEditor
                  socialMedia={content.socialMedia}
                  onChange={(socialMedia) => setContent({ ...content, socialMedia })}
                />
              )}

              {activeSection === 'about' && (
                <AboutEditor
                  content={content.about}
                  language={activeLang}
                  onChange={(about) => setContent({ ...content, about })}
                />
              )}

              {activeSection === 'seo' && (
                <SEOEditor
                  content={content.seo}
                  language={activeLang}
                  onChange={(seo) => setContent({ ...content, seo })}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
