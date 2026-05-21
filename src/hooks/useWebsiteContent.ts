'use client';

import { useState, useEffect } from 'react';

interface WebsiteContent {
  hero: any;
  services: any[];
  branches: any[];
  about: any;
  socialMedia: any[];
  seo: any;
}

export function useWebsiteContent() {
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/website/content');
      const data = await response.json();
      
      if (data.success) {
        setContent(data.data);
      } else {
        setError('Failed to load content');
      }
    } catch (err) {
      setError('Network error');
      console.error('Load content error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  return { content, loading, error, refresh: loadContent };
}
