export type CategorySlug = "achar" | "papad" | "juices" | "gifts";

export interface Variant {
  id: string;
  label: string;
  price: number;
  netQty: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  marathiName: string;
  category: CategorySlug;
  descriptor: string;
  description: string;
  story: string;
  variants: Variant[];
  rating: number;
  reviewCount: number;
  badge?: string;
  bestseller: boolean;
  seasonal?: boolean;
  inStock: boolean;
  stock: number;
  images: string[];
  ingredients: string[];
  allergens: string;
  shelfLife: string;
  storage: string;
  spice?: 1 | 2 | 3;
  createdAt: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  marathi: string;
  tagline: string;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  productId: string;
  variantId: string;
  qty: number;
}

export type OrderStatus = "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";

export interface OrderLine {
  productId: string;
  name: string;
  variant: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  city: string;
  country: string;
  date: string;
  status: OrderStatus;
  items: OrderLine[];
  total: number;
  timeline: { status: OrderStatus; date: string; note?: string }[];
}

export interface User {
  name: string;
  email: string;
}
