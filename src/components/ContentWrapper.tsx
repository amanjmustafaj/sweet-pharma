'use client';

import React, { useState, useEffect } from 'react';

export default function ContentWrapper({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Wait for splash screen to complete (4 seconds)
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Don't render content until splash is done
  if (!showContent) {
    return null;
  }

  return <>{children}</>;
}
