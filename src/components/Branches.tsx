'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { initialWebsiteData } from '@/data/websiteData';
import { FaMapMarkerAlt, FaPhone, FaChevronLeft, FaChevronRight, FaEnvelope, FaFlask } from 'react-icons/fa';

interface BranchCardProps {
  branch: any;
  isCenter?: boolean;
}

function BranchCard({ branch, isCenter = false }: BranchCardProps) {
  const { language, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const title = branch.title?.[language] || branch[language]?.title || 'Branch';
  const address = branch.address?.[language] || branch[language]?.address || '';
  const laboratory = branch.laboratory?.[language] || branch[language]?.laboratory || '';
  const email = branch.email || '';
  const phone = branch.phone || branch[language]?.phone || '';
  
  const nextImage = () => {
    const images = branch.images || [];
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    const images = branch.images || [];
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const images = branch.images || [];

  return (
    <div 
      className={`bg-white dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 ${
        isCenter 
          ? 'shadow-2xl border-4 border-primary w-full h-[750px]' 
          : 'shadow-xl hover:shadow-2xl opacity-95 w-full h-[750px]'
      }`}
      style={{
        minHeight: isCenter ? '750px' : '750px',
        maxHeight: isCenter ? '750px' : '750px',
        height: '750px',
      }}
    >
      {/* Image Gallery - Strict Fixed Height */}
      <div 
        className={`relative bg-gray-200 dark:bg-gray-700 overflow-hidden group ${
          isCenter ? 'h-80' : 'h-80'
        }`}
        style={{
          minHeight: '320px',
          maxHeight: '320px',
          height: '320px',
        }}
      >
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={title}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                  aria-label="Previous image"
                >
                  <FaChevronLeft size={18} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                  aria-label="Next image"
                >
                  <FaChevronRight size={18} />
                </button>
              </>
            )}
            
            {/* Image Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-white w-8 h-3 shadow-lg'
                        : 'bg-white/60 hover:bg-white/90 w-3 h-3'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <FaMapMarkerAlt size={isCenter ? 90 : 90} />
          </div>
        )}
      </div>

      {/* Content Section - Strict Fixed Layout */}
      <div 
        className={`${isCenter ? 'p-8' : 'p-8'}`}
        style={{
          height: 'calc(750px - 320px)', // Exact remaining space
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title - Strict Fixed Height with Ellipsis */}
        <div 
          className="flex-shrink-0 mb-4"
          style={{
            height: '72px',
            minHeight: '72px',
            maxHeight: '72px',
            overflow: 'hidden',
          }}
        >
          <h3 className={`font-bold text-gray-900 dark:text-white ${
            isCenter ? 'text-3xl' : 'text-3xl'
          } line-clamp-2`}>
            {title}
          </h3>
        </div>
        
        {/* Details - Strict Fixed Height with Scroll */}
        <div 
          className="flex-shrink-0 mb-4 overflow-y-auto custom-scrollbar"
          style={{
            height: '180px',
            minHeight: '180px',
            maxHeight: '180px',
          }}
        >
          <div className="space-y-3">
            {/* Address */}
            <div className="flex items-start space-x-3 rtl:space-x-reverse text-gray-600 dark:text-gray-300">
              <FaMapMarkerAlt className="mt-1 text-primary flex-shrink-0" size={18} />
              <span className={`${isCenter ? 'text-base' : 'text-base'} leading-relaxed`}>{address}</span>
            </div>
            
            {/* Phone */}
            {phone && (
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-gray-600 dark:text-gray-300">
                <FaPhone className="text-primary flex-shrink-0" size={16} />
                <span className={`phone-input ${isCenter ? 'text-base' : 'text-base'}`}>{phone}</span>
              </div>
            )}

            {/* Email */}
            {email && (
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-gray-600 dark:text-gray-300">
                <FaEnvelope className="text-primary flex-shrink-0" size={16} />
                <a 
                  href={`mailto:${email}`} 
                  className={`hover:text-primary transition-colors ${isCenter ? 'text-base' : 'text-base'} break-all`}
                >
                  {email}
                </a>
              </div>
            )}

            {/* Laboratory */}
            {laboratory && (
              <div className="flex items-start space-x-3 rtl:space-x-reverse text-gray-600 dark:text-gray-300">
                <FaFlask className="mt-1 text-primary flex-shrink-0" size={16} />
                <span className={`${isCenter ? 'text-base' : 'text-base'} leading-relaxed`}>{laboratory}</span>
              </div>
            )}
          </div>
        </div>

        {/* Spacer - Takes exactly remaining space */}
        <div style={{ flex: 1 }}></div>

        {/* Map Button - Fixed at Bottom */}
        <div 
          className="flex-shrink-0"
          style={{
            height: '64px',
            minHeight: '64px',
            maxHeight: '64px',
          }}
        >
          {branch.mapLink && (
            <a
              href={branch.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-full h-full bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                isCenter ? 'text-lg' : 'text-lg'
              }`}
            >
              {t('viewOnMap')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Branches() {
  const { t } = useLanguage();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [branches, setBranches] = useState(initialWebsiteData.branches);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('websiteContent');
    if (saved) {
      try {
        const content = JSON.parse(saved);
        if (content.branches && content.branches.length > 0) {
          setBranches(content.branches.filter((b: any) => b.isActive !== false));
        }
      } catch (e) {
        console.error('Failed to load branches:', e);
      }
    }

    // Listen for updates
    const handleUpdate = () => {
      const saved = localStorage.getItem('websiteContent');
      if (saved) {
        try {
          const content = JSON.parse(saved);
          if (content.branches) {
            setBranches(content.branches.filter((b: any) => b.isActive !== false));
          }
        } catch (e) {
          console.error('Failed to load branches:', e);
        }
      }
    };

    window.addEventListener('contentUpdated', handleUpdate);
    return () => window.removeEventListener('contentUpdated', handleUpdate);
  }, []);
  
  const useCarousel = branches.length > 3;

  // Get 3 visible branches for carousel with looping
  const getVisibleBranches = () => {
    if (branches.length === 0) return [];
    if (branches.length <= 3) return branches;
    
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (carouselIndex + i) % branches.length;
      visible.push({ ...branches[index], displayIndex: i });
    }
    return visible;
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % branches.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + branches.length) % branches.length);
  };

  return (
    <section id="branches" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {t('branchesTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('branchesDescription')}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Grid Layout (≤3 branches) - STRICT UNIFORM SIZES */}
        {!useCarousel && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {branches.map((branch) => (
              <div 
                key={branch.id}
                style={{
                  height: '750px',
                  minHeight: '750px',
                  maxHeight: '750px',
                }}
              >
                <BranchCard branch={branch} isCenter={false} />
              </div>
            ))}
          </div>
        )}

        {/* 3-Item Carousel with Center Focus (>3 branches) - STRICT UNIFORM SIZES! */}
        {useCarousel && (
          <div className="relative max-w-[95%] mx-auto">
            {/* Branches Container - ALL CARDS SAME HEIGHT */}
            <div className="flex items-center justify-center gap-6 md:gap-8 px-2 md:px-16" style={{ minHeight: '780px' }}>
              {getVisibleBranches().map((branch, idx) => (
                <div
                  key={`${branch.id}-${carouselIndex}-${idx}`}
                  className={`transition-all duration-700 ease-out ${
                    idx === 1
                      ? 'w-full md:w-[46%] lg:w-[44%] scale-100 md:scale-110 z-20' // Center: WIDER
                      : 'w-full md:w-[35%] lg:w-[34%] scale-90 md:scale-95 z-10' // Sides: SAME HEIGHT!
                  }`}
                  style={{
                    transformOrigin: 'center center',
                    height: '750px', // FORCE EXACT HEIGHT!
                    minHeight: '750px',
                    maxHeight: '750px',
                  }}
                >
                  <BranchCard branch={branch} isCenter={idx === 1} />
                </div>
              ))}
            </div>

            {/* Navigation Arrows - LARGER */}
            <button
              onClick={prevSlide}
              className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary text-gray-800 dark:text-white hover:text-white p-4 md:p-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-30 border-2 border-gray-200 dark:border-gray-700"
              aria-label="Previous branches"
            >
              <FaChevronLeft size={24} className="md:w-7 md:h-7" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary text-gray-800 dark:text-white hover:text-white p-4 md:p-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-30 border-2 border-gray-200 dark:border-gray-700"
              aria-label="Next branches"
            >
              <FaChevronRight size={24} className="md:w-7 md:h-7" />
            </button>

            {/* Indicators - LARGER */}
            <div className="flex justify-center mt-10 space-x-3">
              {branches.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === carouselIndex
                      ? 'w-12 h-4 bg-primary shadow-lg'
                      : 'w-4 h-4 bg-gray-300 dark:bg-gray-600 hover:bg-primary/50 hover:w-8'
                  }`}
                  aria-label={`Go to branch ${index + 1}`}
                />
              ))}
            </div>

            {/* Branch Counter */}
            <div className="text-center mt-6">
              <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                <span className="text-primary font-bold text-2xl">{carouselIndex + 1}</span>
                <span className="mx-3">/</span>
                <span className="text-xl">{branches.length}</span>
                <span className="mx-3">|</span>
                <span className="text-base">Showing 3 at a time</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
