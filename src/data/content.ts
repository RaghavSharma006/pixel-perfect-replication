import type { Order, Review } from "@/types";

// Demo reviews — replace with backend data. Shape matches Review type.
export const reviews: Review[] = [
  { id: "r1", productId: "p1", author: "Snehal K.", location: "Pune", rating: 5, title: "Exactly like my aaji's", body: "The masala has that coarse, hand-pounded texture you never get in shop pickles. Gone in two weeks.", date: "2026-08-12", verified: true },
  { id: "r2", productId: "p7", author: "Rohan D.", location: "London, UK", rating: 5, title: "Summer in a bottle", body: "Arrived well packed. Kokum is deep and not too sweet — my kids now ask for it every day.", date: "2026-07-03", verified: true },
  { id: "r3", productId: "p9", author: "Aditi P.", location: "New Jersey, USA", rating: 5, title: "Sent to my parents", body: "Gifted the tasting box for their anniversary. The packaging felt genuinely special.", date: "2026-06-21", verified: true },
  { id: "r4", productId: "p5", author: "Meera S.", location: "Dubai, UAE", rating: 4, title: "Crisp and light", body: "Roasts beautifully on the flame. Would love a bigger pack size.", date: "2026-05-30", verified: true },
  { id: "r5", productId: "p2", author: "Vikram J.", location: "Mumbai", rating: 5, title: "Perfect balance", body: "Sweet, sour and soft lemon rind. Tastes like it was made slowly — because it was.", date: "2026-08-28", verified: true },
  { id: "r6", productId: "p3", author: "Kavya N.", location: "Toronto, Canada", rating: 5, title: "Proper heat", body: "Finally a mirchi achar with real bite. Pairs perfectly with dal-rice.", date: "2026-09-02", verified: false },
];

export const faqs = [
  { q: "How is M-Aai made?", a: "Every product is made in small batches in our home kitchen in Pune, using family recipes, hand-cut produce and spices we roast and pound ourselves. No preservatives beyond salt, oil, sugar and sun." },
  { q: "How should achar be stored?", a: "Keep the jar in a cool, dry place and always use a clean, dry spoon. Make sure the pieces stay under the oil. In hot or humid climates, refrigerate after opening." },
  { q: "How long does it last?", a: "Most achars keep 6–18 months unopened. Seasonal relishes like Methamba and our sharbats have shorter lives — each product page lists its exact shelf life." },
  { q: "Do you ship internationally?", a: "Yes, shipping is available to supported destinations including the USA, UK, UAE, Australia, Canada and more. Some products may be restricted by local import rules; we'll confirm at checkout." },
  { q: "How are products packed?", a: "Jars are sealed, wrapped in recycled paper and packed in moulded pulp inserts inside a double-wall box. Liquids are double-sealed for travel." },
  { q: "Can I order gifts?", a: "Absolutely. Choose a curated box or build your own, add a handwritten note, and we can ship directly to the recipient." },
];

export const shippingDestinations = [
  { country: "India", eta: "2–5 days" },
  { country: "USA", eta: "7–12 days" },
  { country: "United Kingdom", eta: "6–10 days" },
  { country: "UAE", eta: "4–7 days" },
  { country: "Australia", eta: "8–14 days" },
  { country: "Canada", eta: "8–12 days" },
  { country: "Singapore", eta: "5–8 days" },
  { country: "Germany", eta: "7–12 days" },
];

const tl = (s: Order["status"], d: string) => {
  const steps: Order["status"][] = ["pending", "confirmed", "packed", "shipped", "delivered"];
  if (s === "cancelled") return [{ status: "pending" as const, date: d }, { status: "cancelled" as const, date: d, note: "Cancelled by customer" }];
  return steps.slice(0, steps.indexOf(s) + 1).map((status) => ({ status, date: d }));
};

export const orders: Order[] = [
  { id: "MA-10428", customer: "Snehal Kulkarni", email: "snehal@example.com", city: "Pune", country: "India", date: "2026-10-07", status: "pending", total: 997, items: [{ productId: "p1", name: "Kairi Loncha", variant: "500 g", qty: 1, price: 649 }, { productId: "p5", name: "Batata Papad", variant: "400 g", qty: 1, price: 349 }], timeline: tl("pending", "2026-10-07") },
  { id: "MA-10427", customer: "Rohan Deshpande", email: "rohan@example.com", city: "London", country: "UK", date: "2026-10-07", status: "confirmed", total: 1199, items: [{ productId: "p9", name: "M-Aai Tasting Box", variant: "Standard", qty: 1, price: 1199 }], timeline: tl("confirmed", "2026-10-07") },
  { id: "MA-10426", customer: "Aditi Patil", email: "aditi@example.com", city: "Jersey City", country: "USA", date: "2026-10-06", status: "packed", total: 2498, items: [{ productId: "p10", name: "Festive Box", variant: "Standard", qty: 1, price: 1899 }, { productId: "p7", name: "Kokum Sharbat", variant: "500 ml", qty: 2, price: 299 }], timeline: tl("packed", "2026-10-06") },
  { id: "MA-10425", customer: "Meera Shah", email: "meera@example.com", city: "Dubai", country: "UAE", date: "2026-10-05", status: "shipped", total: 628, items: [{ productId: "p2", name: "Limbacha Loncha", variant: "250 g", qty: 1, price: 299 }, { productId: "p3", name: "Mirchi Achar", variant: "200 g", qty: 1, price: 279 }], timeline: tl("shipped", "2026-10-05") },
  { id: "MA-10424", customer: "Vikram Joshi", email: "vikram@example.com", city: "Mumbai", country: "India", date: "2026-10-03", status: "delivered", total: 1297, items: [{ productId: "p1", name: "Kairi Loncha", variant: "500 g", qty: 2, price: 649 }], timeline: tl("delivered", "2026-10-03") },
  { id: "MA-10423", customer: "Kavya Nair", email: "kavya@example.com", city: "Toronto", country: "Canada", date: "2026-10-02", status: "cancelled", total: 419, items: [{ productId: "p7", name: "Kokum Sharbat", variant: "750 ml", qty: 1, price: 419 }], timeline: tl("cancelled", "2026-10-02") },
  { id: "MA-10422", customer: "Neha Gokhale", email: "neha@example.com", city: "Sydney", country: "Australia", date: "2026-09-30", status: "delivered", total: 2499, items: [{ productId: "p11", name: "Marathi Heritage Box", variant: "Standard", qty: 1, price: 2499 }], timeline: tl("delivered", "2026-09-30") },
  { id: "MA-10421", customer: "Amit Bhosale", email: "amit@example.com", city: "Nashik", country: "India", date: "2026-09-29", status: "shipped", total: 568, items: [{ productId: "p5", name: "Batata Papad", variant: "200 g", qty: 3, price: 189 }], timeline: tl("shipped", "2026-09-29") },
];

export const salesSeries = [
  { day: "Oct 1", sales: 8200, orders: 11 }, { day: "Oct 2", sales: 6400, orders: 9 }, { day: "Oct 3", sales: 9900, orders: 14 },
  { day: "Oct 4", sales: 12100, orders: 16 }, { day: "Oct 5", sales: 10400, orders: 13 }, { day: "Oct 6", sales: 13800, orders: 18 },
  { day: "Oct 7", sales: 11250, orders: 15 },
];
