# Aulawell - Premium Tutoring Website

A professional Next.js website for Aulawell, an elite tutoring service specializing in British and American curriculum education.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Fonts**: Inter & Playfair Display (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Update `.env.local` with your values:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: WhatsApp number for the floating button (e.g., 34123456789)
   - `CONTACT_EMAIL`: Email address to receive form submissions
   - Additional email/Sanity CMS variables as needed

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
app/
├── components/         # Reusable components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx
│   ├── ServiceCard.tsx
│   ├── TestimonialCard.tsx
│   └── WhatsAppButton.tsx
├── api/               # API routes
│   └── contact/       # Contact form handler
├── about/             # About page
├── services/          # Services page
├── success-stories/   # Success stories page
├── contact/           # Contact page
├── layout.tsx         # Root layout
├── page.tsx           # Homepage
├── globals.css        # Global styles
├── sitemap.ts         # Sitemap generator
└── robots.ts          # Robots.txt
```

## Features

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized with metadata
- ✅ Contact form with spam protection
- ✅ WhatsApp floating button
- ✅ Smooth animations
- ✅ Accessibility features
- ✅ Sitemap generation
- ✅ Professional design with brand colors

## Color Palette

- **Navy Blue**: #1e3a5f
- **Gold/Amber**: #f59e0b
- **White**: #ffffff
- **Gray shades**: Tailwind defaults

## Deployment

The site is configured for easy deployment on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

## Contact Form Integration

The contact form is set up to work with multiple backends:

1. **Basic**: Logs submissions (current implementation)
2. **Email**: Can integrate with Nodemailer or similar
3. **Sanity CMS**: Ready for Sanity form storage
4. **Other**: Easy to adapt for any backend

## Future Enhancements

- Blog/Resources section
- Student portal
- Online booking system
- Payment integration
- Multi-language support

## License

© 2025 Aulawell. All rights reserved.
