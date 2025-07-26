# Nexora - Premium Electronics & Lifestyle Store

A modern, SEO-optimized e-commerce platform built with Next.js, featuring premium electronics, smartphones, gaming accessories, and lifestyle products.

## 🚀 Features

- **SEO Optimized**: Complete meta tags, structured data, sitemap, and robots.txt
- **Performance**: Image optimization, compression, and caching strategies
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **E-commerce**: Product catalog, cart, orders, and payment integration
- **Authentication**: User accounts and session management
- **PWA Ready**: Progressive Web App capabilities
- **Analytics Ready**: Google Analytics and search console integration

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 SEO Configuration

### Meta Tags
- Complete Open Graph tags for social media sharing
- Twitter Card optimization
- Structured data (JSON-LD) for products and organization
- Canonical URLs and proper meta descriptions

### Sitemap
- Dynamic sitemap generation including all product pages
- Proper priority and change frequency settings
- XML format with proper headers

### Robots.txt
- Search engine crawling instructions
- Sitemap reference
- Disallow rules for admin areas

### Performance
- Image optimization with WebP/AVIF support
- Compression and caching strategies
- Preconnect and DNS prefetch for external resources

## 🚀 Deployment on Vercel

### Prerequisites
1. GitHub repository with your code
2. Vercel account (free tier available)

### Steps
1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   # Deploy to Vercel
   vercel --prod
   ```

3. **Environment Variables**
   Set these in Vercel dashboard:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `MONGODB_URI`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`

### SEO Verification
After deployment, verify:
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Meta tags present in page source
- [ ] Structured data valid (use Google's Rich Results Test)
- [ ] Page speed optimized (use PageSpeed Insights)

## 📊 SEO Checklist

### Technical SEO
- [x] Meta title and description for all pages
- [x] Open Graph and Twitter Card tags
- [x] Structured data (JSON-LD)
- [x] XML sitemap
- [x] Robots.txt
- [x] Canonical URLs
- [x] Mobile-friendly design
- [x] Fast loading times
- [x] HTTPS enabled
- [x] Clean URL structure

### Content SEO
- [x] Keyword-optimized titles and descriptions
- [x] Alt text for images
- [x] Internal linking structure
- [x] Breadcrumb navigation
- [x] Product schema markup
- [x] Organization schema markup

### Performance
- [x] Image optimization
- [x] Code splitting
- [x] Compression enabled
- [x] Caching strategies
- [x] CDN integration (Vercel Edge Network)

## 🔍 Search Console Setup

1. **Google Search Console**
   - Add your domain
   - Verify ownership
   - Submit sitemap
   - Monitor performance

2. **Bing Webmaster Tools**
   - Add your domain
   - Submit sitemap
   - Monitor indexing

## 📱 PWA Features

- Web App Manifest
- Service Worker ready
- Offline capabilities
- App-like experience

## 🛠️ Customization

### Adding New Pages
1. Create page component in `app/` directory
2. Add to sitemap in `app/sitemap.ts`
3. Update navigation in `config/site.ts`
4. Add structured data if needed

### SEO for New Pages
```tsx
import SEOHead from '@/components/SEOHead'

export default function NewPage() {
  return (
    <>
      <SEOHead
        title="Page Title"
        description="Page description"
        keywords={["keyword1", "keyword2"]}
        type="website"
      />
      {/* Page content */}
    </>
  )
}
```

## 📈 Analytics

### Google Analytics
Add to `layout.tsx`:
```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## 🐛 Troubleshooting

### Common Issues
1. **Build Errors**: Check Node.js version (18+ recommended)
2. **SEO Issues**: Validate structured data with Google's Rich Results Test
3. **Performance**: Use Lighthouse for optimization suggestions
4. **Deployment**: Check Vercel build logs for errors

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support, email support@nexora.com or create an issue in the repository.
