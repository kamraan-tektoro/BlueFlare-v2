import React, { useState, useEffect, useRef } from 'react';
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
import PageLoader from './src/components/PageLoader';

// Helper function to scroll to an element by ID with header offset
const scrollToId = (id: string, offset: number = 112) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' 
      ? window.location.pathname.replace(/\/+$/, '') || '/' 
      : '/'
  );
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hashScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle hash scrolling - runs after route changes and on initial load
  useEffect(() => {
    const handleHashScroll = () => {
      // Clear any existing hash scroll timeout
      if (hashScrollTimeoutRef.current) {
        clearTimeout(hashScrollTimeoutRef.current);
      }

      const hash = window.location.hash.slice(1); // Remove the #
      if (!hash) return;

      // Wait for content to render, then scroll to hash
      // Longer delay if loading to ensure content is rendered
      const delay = isLoading ? 300 : 100;
      
      hashScrollTimeoutRef.current = setTimeout(() => {
        // Double-check element exists before scrolling
        const element = document.getElementById(hash);
        if (element) {
          scrollToId(hash);
        } else {
          // If element doesn't exist yet, try again after a short delay
          setTimeout(() => {
            const retryElement = document.getElementById(hash);
            if (retryElement) {
              scrollToId(hash);
            }
          }, 100);
        }
      }, delay);
    };

    // Only handle hash scroll on home page
    if (currentPath === '/' && !isLoading) {
      handleHashScroll();
    }

    return () => {
      if (hashScrollTimeoutRef.current) {
        clearTimeout(hashScrollTimeoutRef.current);
      }
    };
  }, [currentPath, isLoading]);

  // Handle route changes and initial load
  useEffect(() => {
    // Check for hash on initial load
    const initialHash = window.location.hash.slice(1);
    const isInitialLoadWithHash = initialHash && currentPath === '/';
    
    // Initial load - hide loader after content is ready
    loadingTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      
      // If initial load had a hash, scroll to it after content renders
      if (isInitialLoadWithHash) {
        setTimeout(() => {
          scrollToId(initialHash);
        }, 100);
      }
    }, 150);

    // Cleanup function for loading timer
    const clearLoadingTimer = () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
    };

    // Listen for popstate (back/forward navigation)
    const handlePopState = () => {
      const newPath = window.location.pathname.replace(/\/+$/, '') || '/';
      const normalizedPath = newPath;
      
      if (normalizedPath !== currentPath) {
        clearLoadingTimer();
        setIsLoading(true);
        setCurrentPath(normalizedPath);
        
        // Hide loader after content renders
        loadingTimerRef.current = setTimeout(() => {
          setIsLoading(false);
        }, 150);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Intercept link clicks for client-side navigation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href) {
        try {
          const url = new URL(link.href);
          
          // Only handle same-origin links
          if (url.origin === window.location.origin) {
            const href = url.pathname + url.hash; // Include hash
            const normalizedHref = url.pathname.replace(/\/+$/, '') || '/';
            const hash = url.hash;
            
            // Handle hash links on home page (smooth scroll)
            if (normalizedHref === '/' && hash && currentPath === '/') {
              e.preventDefault();
              scrollToId(hash.slice(1)); // Remove the #
              return;
            }
            
            // Don't intercept if it's the same path (unless it has a hash)
            if (normalizedHref !== currentPath || hash) {
              e.preventDefault();
              
              // Clear any existing timer
              clearLoadingTimer();
              
              // Show loader immediately (unless staying on home page with hash)
              if (normalizedHref !== currentPath) {
                setIsLoading(true);
              }
              
              // Update URL without reload
              window.history.pushState({}, '', href);
              
              // Update path and hide loader after render
              if (normalizedHref !== currentPath) {
                setCurrentPath(normalizedHref);
                
                loadingTimerRef.current = setTimeout(() => {
                  setIsLoading(false);
                }, 150);
              } else if (hash) {
                // Same page, just scroll to hash
                setTimeout(() => {
                  scrollToId(hash.slice(1));
                }, 50);
              }
            }
          }
        } catch (err) {
          // Invalid URL, let browser handle it
        }
      }
    };

    document.addEventListener('click', handleClick, true); // Use capture phase

    return () => {
      clearLoadingTimer();
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick, true);
    };
  }, [currentPath]);

  const normalizedPath = currentPath;
  const isGalleryRoute = normalizedPath === '/gallery';
  const isContactRoute = normalizedPath === '/contact';
  const isBlueFlareOSRoute = normalizedPath === '/blueflare-os';
  const isCarbonCubeRoute = normalizedPath === '/carbon-cube';
  const isGeneratorSolutionsRoute = normalizedPath === '/generator-solutions';
  const isPowerProjectsRoute = normalizedPath === '/power-projects';
  const isAboutRoute = normalizedPath === '/about';
  
  // Show loader during route transitions
  if (isLoading) {
    return <PageLoader />;
  }
  
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
