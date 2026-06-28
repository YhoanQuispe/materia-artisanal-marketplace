/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

// Define __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy-initialized Stripe instance
  let stripeInstance: Stripe | null = null;
  const getStripe = (): Stripe | null => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return null;
    }
    if (!stripeInstance) {
      stripeInstance = new Stripe(key, {
        apiVersion: '2025-01-27.accl' as any, // Use safe default API version
      });
    }
    return stripeInstance;
  };

  // API Routes first
  app.post('/api/checkout', async (req, res) => {
    try {
      const { items, discountAmount, shippingCost, taxCost, totalCost } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty or invalid' });
      }

      const stripe = getStripe();
      if (!stripe) {
        // Return clear status indicating Stripe keys are not configured.
        // This will allow the front-end to trigger the beautiful, custom-designed, 
        // fully responsive simulator, preserving an impeccable UX out of the box!
        return res.status(200).json({ 
          error: 'Stripe is in simulation mode', 
          message: 'To activate live payments, configure STRIPE_SECRET_KEY in your env secrets.' 
        });
      }

      const origin = process.env.APP_URL || req.headers.origin || `http://localhost:${PORT}`;

      // Create high-fidelity Stripe Session Line Items
      const lineItems: any[] = items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // convert to cents
        },
        quantity: item.quantity,
      }));

      // If there are shipping costs, add them as a line item
      if (shippingCost > 0) {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Artisanal Care Shipping & Handling',
              description: 'Insured premium shipping for fragile works',
            },
            unit_amount: Math.round(shippingCost * 100),
          },
          quantity: 1,
        });
      }

      // If there are taxes, add them as a line item
      if (taxCost > 0) {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Estimated Local Sales Tax',
            },
            unit_amount: Math.round(taxCost * 100),
          },
          quantity: 1,
        });
      }

      // Create the Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${origin}?checkout_success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}?checkout_cancel=true`,
        metadata: {
          original_total: totalCost.toString(),
          discount_applied: discountAmount.toString(),
        }
      });

      return res.status(200).json({ url: session.url });
    } catch (error: any) {
      console.error('Stripe session creation error:', error);
      return res.status(500).json({ 
        error: 'Stripe Integration Error', 
        message: error.message 
      });
    }
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express + Vite server booted successfully on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start full-stack server:', err);
});
