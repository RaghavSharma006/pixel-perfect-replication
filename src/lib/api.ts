// Single data-access layer. Swap these implementations for Spring Boot REST calls later.
import { categories, products } from "@/data/products";
import { orders, reviews } from "@/data/content";
import type { CategorySlug } from "@/types";

export const getProducts = () => products;
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getBestsellers = () => products.filter((p) => p.bestseller).slice(0, 6);
export const getByCategory = (c: CategorySlug) => products.filter((p) => p.category === c);
export const getCategories = () => categories;
export const getReviews = (productId?: string) => (productId ? reviews.filter((r) => r.productId === productId) : reviews);
export const getOrders = () => orders;
export const getOrder = (id: string) => orders.find((o) => o.id === id);
export const getRelated = (slug: string) => {
  const p = getProduct(slug);
  return products.filter((x) => x.slug !== slug && x.category === p?.category).concat(products.filter((x) => x.bestseller && x.slug !== slug)).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);
};

export const formatPrice = (n: number) => "₹" + n.toLocaleString("en-IN");
