# BlueFlare Energy

Modern website for BlueFlare Energy — powering the future of decentralized, resilient energy infrastructure.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for fast development and builds
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

Create a `.env.local` file in the project root for local development:

```bash
# Azure Function endpoint for contact form submissions
# Example: https://blueflare-functions.azurewebsites.net/api/contact
VITE_LEAD_CAPTURE_URL=https://your-function-app.azurewebsites.net/api/contact
```

### Contact Form Configuration

The contact form submits to an Azure Function HTTP trigger. The endpoint URL is configured via environment variable:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_LEAD_CAPTURE_URL` | Full URL to the Azure Function contact endpoint | Yes (for form submission) |

**For Azure Static Web Apps deployment:**
Add `VITE_LEAD_CAPTURE_URL` in Azure Portal:
- Static Web App → Settings → Configuration → Application settings

**Note:** If the environment variable is not set, the contact form will show a warning in development mode and disable submission.

## Build for Production

```bash
pnpm build
```

Output will be in the `dist/` directory, ready for static hosting.

## Project Structure

```
├── components/          # React components
│   ├── ContactForm.tsx  # Contact form with Azure Function integration
│   ├── ContactPage.tsx  # Contact page layout
│   ├── SEO.tsx          # SEO meta tags and structured data
│   ├── Navbar.tsx       # Navigation header
│   ├── FooterCTA.tsx    # Footer with CTA section
│   ├── Hero.tsx         # Hero section
│   └── ...
├── public/              # Static assets
│   ├── sitemap.xml      # XML sitemap for search engines
│   └── robots.txt       # Crawler directives
├── src/
│   ├── index.css        # Global styles
│   └── vite-env.d.ts    # TypeScript env declarations
├── App.tsx              # Main app with routing
└── index.tsx            # Entry point
```

## SEO Configuration

The site includes comprehensive SEO features for optimal search engine visibility.

### Sitemap

The XML sitemap (`public/sitemap.xml`) includes all 13 pages:
- Homepage, About, Contact, Gallery
- Solutions: Generator Solutions, Carbon Cube™, BlueFlare OS™, Power Projects
- Products: MineX™ 50, 125, 250, 500, 750

**Update the sitemap** when adding new pages or changing URLs.

### robots.txt

Located at `public/robots.txt`, controls crawler access:
- Allows all major search engines
- Blocks aggressive SEO bots (Ahrefs, Semrush, MJ12)
- Allows AI crawlers (GPTBot, Google-Extended, CCBot)
- Blocks duplicate content from URL parameters

### Structured Data (JSON-LD)

The `SEO.tsx` component provides schema.org structured data:

| Schema Type | Purpose |
|-------------|---------|
| Organization | Company info, logo, location |
| WebSite | Site name and URL |
| Service | Solutions catalog with offerings |
| BreadcrumbList | Dynamic navigation path per page |
| Product | MineX product pages with pricing |

### Meta Tags

Each page receives dynamic meta tags via the `StructuredData` component:
- `<title>` and `<meta name="description">`
- Open Graph tags (og:title, og:description, og:url, og:image)
- Twitter Card tags
- Canonical URL

### Adding SEO to New Pages

```tsx
import { StructuredData } from './components/SEO';

// For regular pages
<StructuredData 
  title="Page Title | BlueFlare Energy"
  description="Page description for search results."
  path="/page-url"
/>

// For product pages (adds Product schema)
<StructuredData 
  title="Product Name | BlueFlare Energy"
  description="Product description."
  path="/product-url"
  type="product"
  product={{
    name: "Product Name",
    description: "Detailed product description.",
    priceRange: "$10,000 – $20,000 USD",
    sku: "PRODUCT-SKU"
  }}
/>
```

### SEO Checklist for New Pages

1. Add page to `public/sitemap.xml` with appropriate priority
2. Add `StructuredData` component with title, description, and path
3. For products: Include `type="product"` and `product` props
4. Verify meta tags in browser DevTools or [Google Rich Results Test](https://search.google.com/test/rich-results)

## License

© BlueFlare Energy. All rights reserved.
