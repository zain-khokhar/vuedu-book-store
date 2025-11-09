export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/seller/dashboard'],
    },
    sitemap: 'http://localhost:3000/sitemap.xml',
  };
}