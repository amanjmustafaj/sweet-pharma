'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Branches from '@/components/Branches';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <Hero />
      <Services />
      <Branches />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
