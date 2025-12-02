import React from 'react';

export const StructuredData: React.FC = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BlueFlare Energy",
    "url": "https://blueflareenergy.com",
    "logo": "https://blueflareenergy.com/blueflare-logo.webp",
    "description": "BlueFlare Energy delivers next-generation energy solutions—from infrastructure development to smart optimization—for a resilient, decentralized, and sustainable future.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Calgary",
      "addressRegion": "AB",
      "addressCountry": "CA"
    },
    "sameAs": [
      // Add social media links when available
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BlueFlare Energy",
    "url": "https://blueflareenergy.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://blueflareenergy.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Energy Solutions",
    "provider": {
      "@type": "Organization",
      "name": "BlueFlare Energy"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Global"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Energy Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Generator Sales & Install",
            "description": "Industrial-grade power generation procurement, installation, and lifecycle maintenance for mission-critical uptime."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Carbon Cube",
            "description": "Modular, carbon-capture-ready energy units designed to minimize footprint while maximizing output."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "BlueFlare OS",
            "description": "Intelligent load-balancing AI software that optimizes grid performance and predictive maintenance in real-time."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Power Projects",
            "description": "End-to-end infrastructure development, from site acquisition and permitting to construction and commissioning."
          }
        }
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://blueflareenergy.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Solutions",
        "item": "https://blueflareenergy.com/#solutions"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Projects",
        "item": "https://blueflareenergy.com/#projects"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};

