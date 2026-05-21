'use client';

import React, { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [isComplete, setIsComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Prevent scrolling during splash
    document.body.style.overflow = 'hidden';

    // Start fade out after 3 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // Complete and allow scrolling after 4 seconds
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      document.body.style.overflow = 'auto';
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Don't render anything until splash is complete
  if (isComplete) {
    return null;
  }

  return (
    <div
      className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FBF4EC',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: '350px',
          height: '350px',
          maxWidth: '85vw',
          maxHeight: '85vw',
        }}
      >
        <img
          src="/images/sweet-logo.png"
          alt="Sweet Pharma Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            animation: fadeOut ? 'none' : 'fadeIn 1s ease-in-out',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
