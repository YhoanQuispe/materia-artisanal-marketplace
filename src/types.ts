/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  title: string;
  category: 'Ceramics' | 'Textiles' | 'Woodwork';
  artisan: string;
  origin: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  stock: number;
  description: string;
  details: string[];
  dimensions: string;
  material: string;
  care: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  searchQuery: string;
  categories: string[];
  artisanOrigins: string[];
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  inStockOnly: boolean;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}
