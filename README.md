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
│   ├── Navbar.tsx       # Navigation header
│   ├── FooterCTA.tsx    # Footer with CTA section
│   ├── Hero.tsx         # Hero section
│   └── ...
├── public/              # Static assets
├── src/
│   ├── index.css        # Global styles
│   └── vite-env.d.ts    # TypeScript env declarations
├── App.tsx              # Main app with routing
└── index.tsx            # Entry point
```

## License

© BlueFlare Energy. All rights reserved.
