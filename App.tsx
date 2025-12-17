import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InsideBlueFlare from './components/InsideBlueFlare';
import Services from './components/Services';
import WhyBlueFlare from './components/WhyBlueFlare';
import GlobalReach from './components/GlobalReach';
import Gallery from './components/Gallery';
import Philosophy from './components/Philosophy';
import Projects from './components/Projects';
import FooterCTA from './components/FooterCTA';
import { StructuredData } from './components/SEO';
import GalleryPage from './components/GalleryPage';
import ContactPage from './components/ContactPage';
import BlueFlareOSPage from './components/BlueFlareOSPage';

function App() {
  const normalizedPath =
    typeof window !== 'undefined'
      ? (window.location.pathname.replace(/\/+$/, '') || '/')
      : '/';
  const isGalleryRoute = normalizedPath === '/gallery';
  const isContactRoute = normalizedPath === '/contact';
  const isBlueFlareOSRoute = normalizedPath === '/blueflare-os';

  // Test if React is mounting
  console.log('App component rendering');
  
  if (isGalleryRoute) {
    return (
      <>
        <StructuredData />
        <GalleryPage />
      </>
    );
  }

  if (isContactRoute) {
    return (
      <>
        <StructuredData />
        <ContactPage />
      </>
    );
  }

  if (isBlueFlareOSRoute) {
    return (
      <>
        <StructuredData 
          title="BlueFlare OS™ | BlueFlare"
          description="BlueFlare's operational technology platform built on the Ignition SCADA framework with integrated DCIM functionality for real-time monitoring, automation, and analytics."
        />
        <BlueFlareOSPage />
      </>
    );
  }

  return (
    <>
      <StructuredData />
      <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <InsideBlueFlare />
          <Services />
          <WhyBlueFlare />
          <GlobalReach />
          <Gallery />
          <Philosophy />
          <Projects />
        </main>
        <FooterCTA />
      </div>
    </>
  );
}

export default App;
