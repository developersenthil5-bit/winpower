# Winpower Frontend

Modern, animated Next.js frontend for Winpower Solar Solutions platform.

## Features

✨ **Smooth Animations**: Framer Motion animations throughout
🎨 **Beautiful Design**: Tailwind CSS with custom solar theme
📱 **Responsive**: Mobile-first, fully responsive design
🔒 **Secure Billing**: Password-protected billing section
📊 **Portfolio**: Business and owner portfolio pages
💰 **Quotation Creator**: Interactive quotation generator
🎥 **Video Support**: Hero section with video banner integration
🌙 **Dark Mode Ready**: Gradient backgrounds and modern UI

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Icons**: Heroicons

## Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm build

# Start production server
npm start
```

Visit `http://localhost:3000`

## Project Structure

```
winpower/
├── app/
│   ├── layout.js          # Root layout
│   ├── globals.css        # Global styles
│   ├── page.js            # Home page
│   ├── business/
│   │   └── page.js        # Business portfolio
│   ├── owner/
│   │   └── page.js        # Owner profile
│   ├── quotation/
│   │   └── page.js        # Quotation creator
│   └── billing/
│       └── page.js        # Billing login
├── components/
│   ├── Navigation.js      # Top navigation
│   ├── Footer.js          # Footer
│   └── BillingDashboard.js # Billing dashboard
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js config
└── package.json
```

## Pages

### Home (`/`)
- Hero section with video banner
- Feature highlights
- Solar benefits section
- Call-to-action sections
- Animated scroll effects

### Business Portfolio (`/business`)
- Company overview
- Project statistics
- Featured projects showcase
- Project details and metrics

### Owner Portfolio (`/owner`)
- Owner profile
- Expertise areas
- Key achievements
- Vision and mission

### Quotation (`/quotation`)
- Interactive quotation creator
- Dynamic item management
- Automatic GST calculation
- Professional quotation preview
- Print/download functionality

### Billing (`/billing`)
- Secure login (username: `babu`, password: `123456babu`)
- Dashboard with statistics
- Invoice management
- Payment status tracking
- Add/edit/delete invoices

## Environment Variables

Create `.env.local` in the root:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Change API_URL for production deployment.

## Styling & Customization

### Colors
- Primary: Orange (#f97316)
- Secondary: Blue (#1e40af)
- Accent: Green (#10b981)

All solar-themed colors defined in `tailwind.config.js`

### Animations
- fadeIn, slideUp, slideInLeft, slideInRight
- float, pulse, glow effects
- Framer Motion variants for stagger effects

## Performance

- ✅ Image optimization with Next.js Image component
- ✅ Code splitting per route
- ✅ CSS-in-JS with Tailwind purging
- ✅ Lazy loading for components

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Netlify

```bash
npm run build
# Connect repo to Netlify for auto-deployment
```

## API Integration

All API calls use Axios with the backend at `NEXT_PUBLIC_API_URL`:

- `GET /api/portfolio/business` - Business info
- `GET /api/portfolio/owner` - Owner profile
- `POST /api/auth/login` - Billing login
- `GET /api/billing/records` - Billing records (protected)
- `POST /api/quotation/create` - Create quotation

## Troubleshooting

### API Connection Issues
- Check backend is running on port 5000
- Verify NEXT_PUBLIC_API_URL in .env.local
- Check browser console for CORS errors

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Styling Not Applied
```bash
# Rebuild Tailwind
npm run build
```

## Security Notes

⚠️ **Important**: 
- Default billing credentials are demo only
- Change credentials in production
- Never commit sensitive data to version control
- Use HTTPS in production
- Implement proper authentication/authorization

## License

MIT

---

**Support**: info@winpower.com | +91 98765 43210
