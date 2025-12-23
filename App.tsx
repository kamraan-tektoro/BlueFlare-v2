import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InsideBlueFlare from './components/InsideBlueFlare';
import Services from './components/Services';
import MineXSeries from './components/MineXSeries';
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
import MineX50Page from './components/MineX50Page';
import MineX125Page from './components/MineX125Page';
import MineX250Page from './components/MineX250Page';
import MineX500Page from './components/MineX500Page';
import MineX750Page from './components/MineX750Page';
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
            
            // Always prevent default for same-origin links to avoid full page reload
            e.preventDefault();
            
            // If it's the same path without a hash, do nothing (already on that page)
            if (normalizedHref === currentPath && !hash) {
              return;
            }
            
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
  const isMineX50Route = normalizedPath === '/minex-50';
  const isMineX125Route = normalizedPath === '/minex-125';
  const isMineX250Route = normalizedPath === '/minex-250';
  const isMineX500Route = normalizedPath === '/minex-500';
  const isMineX750Route = normalizedPath === '/minex-750';
  
  // Show loader during route transitions
  if (isLoading) {
    return <PageLoader />;
  }
  
  if (isGalleryRoute) {
    return (
      <>
        <StructuredData 
          title="Gallery | BlueFlare Energy"
          description="Browse photos and videos of BlueFlare Energy's installations, generators, Bitcoin miners, and energy infrastructure projects."
          path="/gallery"
        />
        <GalleryPage />
      </>
    );
  }

  if (isContactRoute) {
    return (
      <>
        <StructuredData 
          title="Contact Us | BlueFlare Energy"
          description="Get in touch with BlueFlare Energy for energy solutions, generator systems, and modular Bitcoin mining infrastructure."
          path="/contact"
        />
        <ContactPage />
      </>
    );
  }

  if (isBlueFlareOSRoute) {
    return (
      <>
        <StructuredData 
          title="BlueFlare OS | BlueFlare Energy"
          description="BlueFlare's operational technology platform built on the Ignition SCADA framework with integrated DCIM functionality for real-time monitoring, automation, and analytics."
          path="/blueflare-os"
        />
        <BlueFlareOSPage />
      </>
    );
  }

  if (isCarbonCubeRoute) {
    return (
      <>
        <StructuredData 
          title="Carbon Cube | BlueFlare Energy"
          description="Portable methane mitigation and instrument air system for oil & gas field deployment."
          path="/carbon-cube"
        />
        <CarbonCubePage />
      </>
    );
  }

  if (isGeneratorSolutionsRoute) {
    return (
      <>
        <StructuredData 
          title="Generator Solutions | BlueFlare Energy"
          description="Turnkey generator sales, installation, commissioning, and maintenance for industrial and remote applications."
          path="/generator-solutions"
        />
        <GeneratorSolutionsPage />
      </>
    );
  }

  if (isPowerProjectsRoute) {
    return (
      <>
        <StructuredData 
          title="Power Projects | BlueFlare Energy"
          description="Industrial, utility, and large-scale energy infrastructure projects focused on reliability, speed, and efficiency."
          path="/power-projects"
        />
        <PowerProjectsPage />
      </>
    );
  }

  if (isAboutRoute) {
    return (
      <>
        <StructuredData 
          title="About Us | BlueFlare Energy"
          description="BlueFlare is an energy infrastructure company delivering intelligent, modular, and scalable power solutions for industrial, energy, and remote environments."
          path="/about"
        />
        <AboutPage />
      </>
    );
  }

  if (isMineX50Route) {
    return (
      <>
        <StructuredData 
          title="MineX™ 50 | BlueFlare Energy"
          description="BlueFlare's smallest turnkey modular Bitcoin mining system, engineered for low-volume natural gas wells producing 12–20 mcf/d."
          path="/minex-50"
          type="product"
          product={{
            name: "MineX™ 50",
            description: "Turnkey modular Bitcoin mining system for 12-20mcf/d gas wells with 50–75 kW power output and 12–18 ASIC capacity.",
            priceRange: "$48,100 – $76,350 USD",
            sku: "MINEX-50"
          }}
        />
        <MineX50Page />
      </>
    );
  }

  if (isMineX125Route) {
    return (
      <>
        <StructuredData 
          title="MineX™ 125 | BlueFlare Energy"
          description="Modular mining system for 25-35 mcf/d gas wells, balancing compact footprint with strong economic output."
          path="/minex-125"
          type="product"
          product={{
            name: "MineX™ 125",
            description: "Modular Bitcoin mining system for 25-35 mcf/d gas wells with 100–150 kW power output and 24–36 ASIC capacity.",
            priceRange: "$76,600 – $119,100 USD",
            sku: "MINEX-125"
          }}
        />
        <MineX125Page />
      </>
    );
  }

  if (isMineX250Route) {
    return (
      <>
        <StructuredData 
          title="MineX™ 250 | BlueFlare Energy"
          description="BlueFlare's flagship modular mining system for 50-65 mcf/d wells — the optimal economic sweet spot."
          path="/minex-250"
          type="product"
          product={{
            name: "MineX™ 250",
            description: "Flagship modular Bitcoin mining system for 50-65 mcf/d gas wells with 200–300 kW power output and 48–72 ASIC capacity.",
            priceRange: "$137,600 – $163,100 USD",
            sku: "MINEX-250"
          }}
        />
        <MineX250Page />
      </>
    );
  }

  if (isMineX500Route) {
    return (
      <>
        <StructuredData 
          title="MineX™ 500 | BlueFlare Energy"
          description="High-capacity modular Bitcoin mining system for wells producing 85-115 mcf/d with air or hydro cooling."
          path="/minex-500"
          type="product"
          product={{
            name: "MineX™ 500",
            description: "High-capacity modular Bitcoin mining system for 85-115mcf/d gas wells with 400–550 kW power output and 96–126 ASIC capacity.",
            priceRange: "$206,350 – $300,600 USD",
            sku: "MINEX-500"
          }}
        />
        <MineX500Page />
      </>
    );
  }

  if (isMineX750Route) {
    return (
      <>
        <StructuredData 
          title="MineX™ 750 | BlueFlare Energy"
          description="BlueFlare's highest-capacity modular Bitcoin mining system for industrial-scale gas monetization at 150-185 mcf/d."
          path="/minex-750"
          type="product"
          product={{
            name: "MineX™ 750",
            description: "Industrial-scale modular Bitcoin mining system for 150-185 mcf/d gas wells with 700–750 kW power output and 168–180 ASIC capacity.",
            priceRange: "$323,100 – $439,350 USD",
            sku: "MINEX-750"
          }}
        />
        <MineX750Page />
      </>
    );
  }

  return (
    <>
      <StructuredData path="/" />
      <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <InsideBlueFlare />
          <Services />
          <MineXSeries />
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
