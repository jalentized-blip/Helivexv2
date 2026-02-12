import { products } from '@/data/products';

export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://helivexlabs.com';

  // Static routes
  const routes = [
    '',
    '/products',
    '/cart',
    '/coa',
    '/about',
    '/faq',
    '/contact',
    '/login',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...productRoutes];
}
