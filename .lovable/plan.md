# M-AAI — घरची चव : Frontend Build Plan

Frontend only, local mock data, no backend. Note: the brief asks for Next.js; this project runs on TanStack Start (React + TypeScript + Tailwind + shadcn), which gives the same result — file-based routes, SSR, metadata. Folder layout mirrors the brief (routes / components / lib / data / types) so the Spring Boot API can replace mock data later.

## Art direction
- Palette: cream / warm ivory base, dark brown ink, terracotta and chilli red accents, mango and kokum as product highlights, muted green as a calm secondary. Orange used sparingly.
- Type: Fraunces (editorial serif headlines), Manrope (UI), Tiro Devanagari Marathi for "घरची चव" and small Marathi touches.
- Editorial magazine layouts: asymmetric splits, large photography, thin rules, numbered sections, minimal radius, soft shadows only.
- Generated photography (warm, natural light, brass/steel/clay props): jars of kairi loncha, limbu loncha, mirchi achar, papad stacks, kokum sharbat bottles, gift boxes, kitchen process shots, story portrait-style hands.
- Admin uses a separate neutral, dense operational theme.

## Customer pages
- `/` Homepage: navbar (desktop + full-screen mobile menu), hero "Aai's recipes. Marathi soul." with lightweight 3D jar (React Three Fiber, lazy-loaded, procedural geometry, mouse parallax, disabled on mobile/reduced motion with a layered image fallback), trust line, bestsellers (6), editorial category sections, Kairi Loncha feature story, "A little piece of home", small-batch kitchen process, gift collection (4 boxes), reviews, global shipping ("Shipping available to supported destinations"), FAQ accordion, newsletter, footer.
- `/shop`: filters (category, bestseller, in-stock), search, sort, responsive grid.
- `/products/$slug`: gallery, rating, price, variants, quantity, Add to Cart / Buy Now, ingredients, allergens, net qty, shelf life, storage, story, reviews, shipping, related, FAQ, Product + Breadcrumb JSON-LD.
- Cart drawer + `/cart` (qty, remove, subtotal, discount and shipping placeholders, recommendations, empty state).
- `/checkout`: 5-step flow (Contact, Address, Shipping, Payment placeholder via a `paymentProvider` stub, Confirmation).
- `/login`, `/register` mock auth; `/account`, `/account/orders`, `/account/orders/$id`, `/wishlist`.
- Info pages: `/our-story`, `/shipping`, `/returns`, `/privacy`, `/terms`, `/contact`.

## Admin `/admin`
Sidebar layout: Dashboard (KPIs, sales chart, top products, recent orders, low stock), Orders (search, filters, status badges, detail sheet with timeline and status editing), Products (table, add/edit dialog, archive), Inventory (stock, low stock, adjustments), plus Customers, Coupons, Shipping, Reviews, Analytics, Settings as lighter mock tables/forms.

## Cross-cutting
- Cart, wishlist, auth in client stores persisted to localStorage (hydration-safe).
- Framer Motion: page entrance, scroll reveals, hover, cart animations; respects reduced motion.
- Accessibility: semantic landmarks, focus rings, labelled forms, keyboard-friendly menus.
- SEO: per-route head() titles/descriptions/OG, canonical, Organization JSON-LD, `sitemap.xml` server route, robots.txt.
- Responsive tested at 320 to 1440+ with no horizontal overflow.

## Technical details
- Data: `src/data/products.ts`, `categories.ts`, `reviews.ts`, `orders.ts`, `admin.ts`; types in `src/types`; access through `src/lib/api.ts` functions (single swap point for Spring Boot).
- Packages: `framer-motion`, `three`, `@react-three/fiber@^9`, `@react-three/drei@^10`, `recharts` (admin chart), `zustand`.
- Tokens in `src/styles.css` (oklch); fonts via `<link>` in __root.
- Admin under `src/routes/admin/` with its own layout and `.admin` theme scope.
- Verify with Playwright screenshots at mobile and desktop widths.
