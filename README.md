# MTN MoMo QR Merchant System

A complete QR code generation and management system for MTN Mobile Money merchants in Cameroon. This application allows merchants to generate, retrieve, and print professional QR code posters for accepting MoMo payments.

## Features

### Landing Page
- Professional MTN-branded landing page with animations
- Responsive design with blue/yellow color scheme
- Navigation to merchant form

### Merchant Portal (Form Page)
- **New Merchants**: Register and generate QR codes
- **Existing Merchants**: Retrieve saved QR codes using merchant code
- Real-time QR code preview
- **Supabase Integration**: All data stored in cloud database
- **Print Functionality**: Generate print-ready posters
- Form validation and error handling

### Admin Dashboard (`/admin`)
- Secure login (default: admin/admin)
- View all registered merchants
- **Edit**: Update merchant information
- **Delete**: Remove merchants with confirmation
- **Print**: Generate QR codes for any merchant
- **Export**: Excel and PDF reports
- Search and filter functionality

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tool**: Vite 8.0.8
- **Database**: Supabase (PostgreSQL)
- **QR Generation**: QRCode.js
- **Animations**: GSAP
- **Styling**: Tailwind CSS (form page), Custom CSS (landing/admin)
- **Exports**: SheetJS (Excel), jsPDF (PDF)

## Project Structure

```
my-app/
├── index.html          # Landing page
├── form.html           # Merchant registration/retrieval
├── admin.html          # Admin dashboard
├── src/
│   ├── main.ts         # Landing page JS
│   ├── style.css       # Landing page styles
│   ├── lib/
│   │   └── supabase.ts # Supabase client config
│   └── assets/
│       ├── logo.png    # MTN logo
│       └── favicon.svg
├── .env                # Environment variables (Supabase keys)
├── vite.config.ts      # Vite configuration
└── package.json
```

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd my-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

4. **Set up Supabase Database**

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE merchant_qr_codes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    merchant_name VARCHAR(100) NOT NULL,
    merchant_code VARCHAR(20) NOT NULL UNIQUE,
    city VARCHAR(50) NOT NULL,
    qr_payload TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS for public access (or configure policies)
ALTER TABLE merchant_qr_codes DISABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX idx_merchant_code ON merchant_qr_codes(merchant_code);
CREATE INDEX idx_created_at ON merchant_qr_codes(created_at);
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

**Available pages:**
- Landing: `http://localhost:5173/`
- Merchant Form: `http://localhost:5173/form.html`
- Admin Dashboard: `http://localhost:5173/admin.html`

## Building for Production

Create optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Option 1: Static Hosting (Netlify/Vercel)

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your preferred hosting platform

### Option 2: Self-hosted

1. Upload contents of `dist/` folder to your web server
2. Ensure all files are served with correct MIME types
3. Configure redirects for SPA routing if needed

## Usage Guide

### For Merchants

1. Visit the landing page
2. Click "Generate My QR Code"
3. Enter your merchant code if you have one (retrieves existing data)
4. Or fill the form as a new merchant
5. Save your data to database
6. Print your QR poster

### For Admins

1. Navigate to `/admin.html`
2. Login with credentials: **admin** / **admin**
3. View all merchants in the dashboard
4. Use action buttons to:
   - **Edit**: Update merchant details
   - **Delete**: Remove merchant
   - **Print**: Generate QR poster
5. Export data as Excel or PDF reports

## Security Considerations

⚠️ **Important for Production:**

1. **Change default admin password** in production
2. **Enable RLS** on Supabase table with proper policies
3. **Use environment variables** for sensitive keys
4. **Add rate limiting** to prevent abuse
5. **Validate inputs** on both client and server
6. **Use HTTPS** in production

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Dependencies

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0"
  },
  "devDependencies": {
    "vite": "^8.0.0",
    "vue-tsc": "^2.0.0"
  }
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - Feel free to use and modify for your needs.

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Vite documentation: https://vitejs.dev/guide/

---

**Built with ❤️ for MTN Cameroon Merchants**
