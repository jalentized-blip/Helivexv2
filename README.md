# Helivex Labs Storefront

A state-of-the-art research peptide storefront built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Automated Crypto Checkout**: Real-time blockchain monitoring simulation for Bitcoin, Ethereum, and USDT payments.
- **Premium Design**: Clean, high-conversion layout inspired by industry leaders, utilizing the Helivex Labs brand colors (Deep Red & Pink Salmon).
- **Responsive Storefront**: Fully optimized for mobile, tablet, and desktop.
- **Fast Performance**: Built on Next.js 16 with Tailwind v4 for lightning-fast load times.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Deployment

To push this to GitHub and deploy:

1. Create a new repository on GitHub.
2. Run the following commands in your terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Helivex Labs Storefront"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

## WooCommerce Integration

This storefront is designed as a headless frontend. To connect it to your WooCommerce backend:

1. Install the WooCommerce REST API on your WordPress site.
2. Update the `src/data/products.ts` to fetch from the `/wp-json/wc/v3/products` endpoint.
3. Update the `CheckoutPage` to create an order via the API once crypto payment is confirmed.

## License

Research Use Only. Not for human consumption.
