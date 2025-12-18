import React, { useEffect } from 'react';

const BASE_URL = 'https://www.goblueflare.com';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  // Product-specific props for MineX pages
  product?: {
    name: string;
    description: string;
    priceRange: string;
    sku: string;
  };
}

/**
 * SEO Component - Manages page-level SEO meta tags and structured data
 * 
 * Features:
 * - Dynamic title and description
 * - Open Graph meta tags (Facebook, LinkedIn)
 * - Twitter Card meta tags
 * - Canonical URL management
 * - Structured data (Organization, Website, Services, Products)
 */
export const StructuredData: React.FC<SEOProps> = ({ 
  title, 
  description, 
  path = '/',
  image = '/blueflare-logo.webp',
  type = 'website',
  product
}) => {
  const fullUrl = `${BASE_URL}${path}`;
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;
  
  const defaultTitle = 'BlueFlare Energy | Next-Gen Energy Solutions & Infrastructure';
  const defaultDescription = 'BlueFlare Energy delivers next-generation energy solutions—from infrastructure development to smart optimization—for a resilient, decentralized, and sustainable future.';
  
  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;

  useEffect(() => {
    // Update document title
    document.title = pageTitle;

    // Helper to update or create meta tags
    const updateMeta = (selector: string, attribute: string, content: string) => {
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (meta) {
        meta.setAttribute(attribute === 'property' ? 'content' : 'content', content);
      } else {
        meta = document.createElement('meta');
        if (selector.includes('property=')) {
          meta.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        } else if (selector.includes('name=')) {
          meta.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        }
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = fullUrl;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = fullUrl;
      document.head.appendChild(canonical);
    }

    // Update primary meta tags
    updateMeta('meta[name="description"]', 'name', pageDescription);
    updateMeta('meta[name="title"]', 'name', pageTitle);

    // Update Open Graph tags
    updateMeta('meta[property="og:title"]', 'property', pageTitle);
    updateMeta('meta[property="og:description"]', 'property', pageDescription);
    updateMeta('meta[property="og:url"]', 'property', fullUrl);
    updateMeta('meta[property="og:image"]', 'property', fullImageUrl);
    updateMeta('meta[property="og:type"]', 'property', type === 'product' ? 'product' : 'website');

    // Update Twitter tags
    updateMeta('meta[name="twitter:title"]', 'name', pageTitle);
    updateMeta('meta[name="twitter:description"]', 'name', pageDescription);
    updateMeta('meta[name="twitter:url"]', 'name', fullUrl);
    updateMeta('meta[name="twitter:image"]', 'name', fullImageUrl);

  }, [pageTitle, pageDescription, fullUrl, fullImageUrl, type]);

  // Organization Schema - Always present
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BlueFlare Energy",
    "url": BASE_URL,
    "logo": `${BASE_URL}/blueflare-logo.webp`,
    "description": defaultDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Calgary",
      "addressRegion": "AB",
      "addressCountry": "CA"
    },
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": `${BASE_URL}/contact`
    }
  };

  // Website Schema - Always present
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BlueFlare Energy",
    "url": BASE_URL
  };

  // Services Schema - Includes all solutions and MineX products
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
      "name": "North America"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Energy Solutions & Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Generator Solutions",
            "description": "Turnkey generator sales, installation, commissioning, and maintenance for industrial and remote applications.",
            "url": `${BASE_URL}/generator-solutions`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Carbon Cube™",
            "description": "Portable methane mitigation and instrument air system for oil & gas field deployment.",
            "url": `${BASE_URL}/carbon-cube`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "BlueFlare OS™",
            "description": "Operational technology platform built on Ignition SCADA with integrated DCIM for real-time monitoring and automation.",
            "url": `${BASE_URL}/blueflare-os`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Power Projects",
            "description": "Industrial, utility, and large-scale energy infrastructure projects focused on reliability, speed, and efficiency.",
            "url": `${BASE_URL}/power-projects`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "MineX™ Series",
            "description": "Modular Bitcoin mining systems for natural gas monetization, ranging from 50kW to 750kW capacity.",
            "brand": { "@type": "Brand", "name": "BlueFlare Energy" }
          }
        }
      ]
    }
  };

  // Dynamic Breadcrumb Schema based on current page
  const getBreadcrumbSchema = () => {
    const breadcrumbs: Array<{ name: string; item: string }> = [
      { name: "Home", item: BASE_URL }
    ];

    if (path !== '/') {
      // Map paths to readable names
      const pathNames: Record<string, string> = {
        '/about': 'About',
        '/contact': 'Contact',
        '/gallery': 'Gallery',
        '/generator-solutions': 'Generator Solutions',
        '/carbon-cube': 'Carbon Cube™',
        '/blueflare-os': 'BlueFlare OS™',
        '/power-projects': 'Power Projects',
        '/minex-50': 'MineX™ 50',
        '/minex-125': 'MineX™ 125',
        '/minex-250': 'MineX™ 250',
        '/minex-500': 'MineX™ 500',
        '/minex-750': 'MineX™ 750',
      };

      // Add Products category for MineX pages
      if (path.startsWith('/minex-')) {
        breadcrumbs.push({ name: "Products", item: `${BASE_URL}/#minex` });
      }

      // Add Solutions category for solution pages
      if (['/generator-solutions', '/carbon-cube', '/blueflare-os', '/power-projects'].includes(path)) {
        breadcrumbs.push({ name: "Solutions", item: `${BASE_URL}/#solutions` });
      }

      // Add current page
      const pageName = pathNames[path] || path.replace('/', '').replace(/-/g, ' ');
      breadcrumbs.push({ name: pageName, item: fullUrl });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.item
      }))
    };
  };

  // Product Schema - Only for MineX product pages
  const getProductSchema = () => {
    if (!product) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "sku": product.sku,
      "brand": {
        "@type": "Brand",
        "name": "BlueFlare Energy"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "BlueFlare Energy"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": product.priceRange.split('–')[0].replace(/[^0-9]/g, ''),
        "highPrice": product.priceRange.split('–')[1]?.replace(/[^0-9]/g, '') || product.priceRange.replace(/[^0-9]/g, ''),
        "offerCount": "1",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "BlueFlare Energy"
        }
      },
      "url": fullUrl
    };
  };

  const productSchema = getProductSchema();
  const breadcrumbSchema = getBreadcrumbSchema();

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
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
    </>
  );
};
