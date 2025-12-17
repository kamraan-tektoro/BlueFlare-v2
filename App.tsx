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
import CarbonCubePage from './components/CarbonCubePage';
import GeneratorSolutionsPage from './components/GeneratorSolutionsPage';
import PowerProjectsPage from './components/PowerProjectsPage';
import AboutPage from './components/AboutPage';

function App() {
  const normalizedPath =
    typeof window !== 'undefined'
      ? (window.location.pathname.replace(/\/+$/, '') || '/')
      : '/';
  const isGalleryRoute = normalizedPath === '/gallery';
  const isContactRoute = normalizedPath === '/contact';
  const isBlueFlareOSRoute = normalizedPath === '/blueflare-os';
  const isCarbonCubeRoute = normalizedPath === '/carbon-cube';
  const isGeneratorSolutionsRoute = normalizedPath === '/generator-solutions';
  const isPowerProjectsRoute = normalizedPath === '/power-projects';
  const isAboutRoute = normalizedPath === '/about';

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

  if (isCarbonCubeRoute) {
    return (
      <>
        <StructuredData 
          title="Carbon Cube™ | BlueFlare"
          description="Portable methane mitigation and instrument air system for oil & gas field deployment."
        />
        <CarbonCubePage />
      </>
    );
  }

  if (isGeneratorSolutionsRoute) {
    return (
      <>
        <StructuredData 
          title="Generator Solutions | BlueFlare"
          description="Turnkey generator sales, installation, commissioning, and maintenance for industrial and remote applications."
        />
        <GeneratorSolutionsPage />
      </>
    );
  }

  if (isPowerProjectsRoute) {
    return (
      <>
        <StructuredData 
          title="Power Projects | BlueFlare"
          description="Industrial, utility, and large-scale energy infrastructure projects focused on reliability, speed, and efficiency."
        />
        <PowerProjectsPage />
      </>
    );
  }

  if (isAboutRoute) {
    return (
      <>
        <StructuredData 
          title="About Us | BlueFlare"
          description="BlueFlare is an energy infrastructure company delivering intelligent, modular, and scalable power solutions for industrial, energy, and remote environments."
        />
        <AboutPage />
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
