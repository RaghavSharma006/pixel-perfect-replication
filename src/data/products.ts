import kairi from "@/assets/kairi.jpg";
import limbu from "@/assets/limbu.jpg";
import mirchi from "@/assets/mirchi.jpg";
import papad from "@/assets/papad.jpg";
import kokum from "@/assets/kokum.jpg";
import panha from "@/assets/panha.jpg";
import giftbox from "@/assets/giftbox.jpg";
import festive from "@/assets/festive.jpg";
import spices from "@/assets/spices.jpg";
import hands from "@/assets/kitchen-hands.jpg";
import type { Category, Product } from "@/types";

export const images = { kairi, limbu, mirchi, papad, kokum, panha, giftbox, festive, spices, hands };

const acharStorage = "Store in a cool, dry place. Always use a clean, dry spoon. Refrigerate after opening in hot, humid climates.";

export const products: Product[] = [
  {
    id: "p1", slug: "kairi-loncha", name: "Kairi Loncha", marathiName: "कैरीचे लोणचे", category: "achar",
    descriptor: "Raw mango, cold-pressed groundnut oil, hand-pounded masala",
    description: "Firm Konkan raw mangoes, cut by hand and cured for three weeks in a slow-sunned masala of mustard, fenugreek, hing and Byadgi chilli.",
    story: "Aai makes this the week the first kairi arrives at the market. The mangoes are washed, dried in shade for a full day, and only then cut — never wet, never rushed. The masala is pounded, not ground, so every piece carries texture.",
    variants: [
      { id: "250", label: "250 g", price: 349, netQty: "250 g" },
      { id: "500", label: "500 g", price: 649, netQty: "500 g" },
    ],
    rating: 4.9, reviewCount: 38, badge: "Bestseller", bestseller: true, inStock: true, stock: 64,
    images: [kairi, spices, hands], spice: 2, createdAt: "2026-03-02",
    ingredients: ["Raw mango", "Groundnut oil", "Salt", "Red chilli", "Mustard seed", "Fenugreek", "Turmeric", "Hing"],
    allergens: "Contains groundnut (peanut) oil. Hing may contain traces of wheat.", shelfLife: "12 months unopened", storage: acharStorage,
  },
  {
    id: "p2", slug: "limbacha-loncha", name: "Limbacha Loncha", marathiName: "लिंबाचे लोणचे", category: "achar",
    descriptor: "Sweet-sour lemon, jaggery, matured in stoneware",
    description: "Thin-skinned lemons matured for forty days in a stoneware barni with jaggery, salt and a whisper of chilli until the rind turns soft and glossy.",
    story: "A pickle of patience. The jar sits in the sun every afternoon and is turned every evening — the way it was done on Aai's terrace in Pune.",
    variants: [
      { id: "250", label: "250 g", price: 299, netQty: "250 g" },
      { id: "500", label: "500 g", price: 549, netQty: "500 g" },
    ],
    rating: 4.8, reviewCount: 24, badge: "Aai's favourite", bestseller: true, inStock: true, stock: 41,
    images: [limbu, spices], spice: 1, createdAt: "2026-02-10",
    ingredients: ["Lemon", "Jaggery", "Salt", "Red chilli", "Turmeric", "Fenugreek"],
    allergens: "No major allergens. Made in a kitchen that handles groundnut and sesame.", shelfLife: "18 months unopened", storage: acharStorage,
  },
  {
    id: "p3", slug: "mirchi-achar", name: "Mirchi Achar", marathiName: "मिरचीचे लोणचे", category: "achar",
    descriptor: "Stuffed green chilli, mustard, lemon",
    description: "Plump green chillies slit and stuffed with crushed mustard, fenugreek and lemon — bright, sharp and made for bhakri and varan-bhaat.",
    story: "Made in batches of only forty jars, because each chilli is stuffed by hand.",
    variants: [{ id: "200", label: "200 g", price: 279, netQty: "200 g" }],
    rating: 4.7, reviewCount: 19, badge: "Hot", bestseller: true, inStock: true, stock: 9,
    images: [mirchi, spices], spice: 3, createdAt: "2026-04-14",
    ingredients: ["Green chilli", "Mustard seed", "Fenugreek", "Lemon juice", "Salt", "Groundnut oil", "Turmeric"],
    allergens: "Contains groundnut (peanut) oil and mustard.", shelfLife: "6 months unopened", storage: acharStorage,
  },
  {
    id: "p4", slug: "methamba", name: "Methamba", marathiName: "मेथांबा", category: "achar",
    descriptor: "Seasonal sweet mango relish, fenugreek, jaggery",
    description: "A summer-only sweet and spiced mango relish tempered with fenugreek and finished with jaggery. Made fresh for the season.",
    story: "Methamba only exists while kairi is in season. When it's gone, it's gone until next April.",
    variants: [{ id: "250", label: "250 g", price: 319, netQty: "250 g" }],
    rating: 4.8, reviewCount: 12, badge: "Limited batch", bestseller: false, seasonal: true, inStock: true, stock: 18,
    images: [kairi, hands], spice: 1, createdAt: "2026-05-01",
    ingredients: ["Raw mango", "Jaggery", "Fenugreek", "Mustard", "Red chilli", "Groundnut oil", "Salt"],
    allergens: "Contains groundnut (peanut) oil and mustard.", shelfLife: "3 months, refrigerated", storage: "Keep refrigerated. Use a clean, dry spoon.",
  },
  {
    id: "p5", slug: "batata-papad", name: "Batata Papad", marathiName: "बटाट्याचे पापड", category: "papad",
    descriptor: "Sun-dried potato papad with cumin and chilli",
    description: "Thin, crisp potato papad rolled by hand and dried on cotton under the March sun. Roast or fry — they bloom in seconds.",
    story: "Papad-making used to be a neighbourhood affair. We still roll ours in small circles of women, a few hundred at a time.",
    variants: [
      { id: "200", label: "200 g · approx 20 pcs", price: 189, netQty: "200 g" },
      { id: "400", label: "400 g · approx 40 pcs", price: 349, netQty: "400 g" },
    ],
    rating: 4.8, reviewCount: 27, badge: "Bestseller", bestseller: true, inStock: true, stock: 120,
    images: [papad], createdAt: "2026-01-20",
    ingredients: ["Potato", "Salt", "Cumin", "Red chilli", "Sabudana"],
    allergens: "No major allergens.", shelfLife: "9 months", storage: "Keep in an airtight container away from moisture.",
  },
  {
    id: "p6", slug: "nachni-papad", name: "Nachni Papad", marathiName: "नाचणीचे पापड", category: "papad",
    descriptor: "Finger millet papad, hand-rolled",
    description: "Earthy ragi papad with a gentle green chilli warmth. Wholesome, crisp and a little rustic.",
    story: "A recipe from the Sahyadri villages where nachni is the everyday grain.",
    variants: [{ id: "200", label: "200 g", price: 199, netQty: "200 g" }],
    rating: 4.6, reviewCount: 11, bestseller: false, inStock: false, stock: 0,
    images: [papad], createdAt: "2026-03-15",
    ingredients: ["Finger millet (nachni)", "Green chilli", "Cumin", "Salt"],
    allergens: "No major allergens.", shelfLife: "9 months", storage: "Keep in an airtight container away from moisture.",
  },
  {
    id: "p7", slug: "kokum-sharbat", name: "Kokum Sharbat", marathiName: "कोकम सरबत", category: "juices",
    descriptor: "Konkan kokum concentrate, cumin, rock salt",
    description: "Deep-ruby concentrate from sun-dried Konkan kokum. Dilute 1:5 with chilled water for the most cooling glass of summer.",
    story: "Every Konkan home keeps a bottle of this through May. Ours is made from kokum dried on our family's own terrace in Devgad.",
    variants: [
      { id: "500", label: "500 ml", price: 299, netQty: "500 ml" },
      { id: "750", label: "750 ml", price: 419, netQty: "750 ml" },
    ],
    rating: 4.9, reviewCount: 31, badge: "Summer pick", bestseller: true, inStock: true, stock: 52,
    images: [kokum], createdAt: "2026-04-01",
    ingredients: ["Kokum", "Cane sugar", "Rock salt", "Roasted cumin"],
    allergens: "No major allergens.", shelfLife: "9 months unopened; 6 weeks refrigerated after opening", storage: "Refrigerate after opening. Shake well.",
  },
  {
    id: "p8", slug: "kairi-panha", name: "Kairi Panha", marathiName: "कैरीचे पन्हे", category: "juices",
    descriptor: "Roasted raw mango, cardamom, saffron",
    description: "Raw mangoes roasted over coals, pulped and sweetened with jaggery, then scented with green cardamom and Kashmiri saffron.",
    story: "The drink Aai pours when you arrive home in the heat — before anyone asks anything.",
    variants: [{ id: "500", label: "500 ml", price: 279, netQty: "500 ml" }],
    rating: 4.7, reviewCount: 16, badge: "Seasonal", bestseller: false, seasonal: true, inStock: true, stock: 22,
    images: [panha], createdAt: "2026-04-20",
    ingredients: ["Raw mango", "Jaggery", "Cardamom", "Saffron", "Salt"],
    allergens: "No major allergens.", shelfLife: "6 months unopened; 3 weeks refrigerated", storage: "Refrigerate after opening.",
  },
  {
    id: "p9", slug: "tasting-box", name: "M-Aai Tasting Box", marathiName: "चव पेटी", category: "gifts",
    descriptor: "Three achars, papad and a sharbat",
    description: "Our most loved flavours in one keepsake box: Kairi Loncha, Limbacha Loncha, Mirchi Achar (100 g each), Batata Papad and Kokum Sharbat.",
    story: "The easiest way to meet M-Aai — or to send a taste of home to someone far from it.",
    variants: [{ id: "std", label: "Standard", price: 1199, netQty: "Approx 1.1 kg" }],
    rating: 4.9, reviewCount: 22, badge: "Gift favourite", bestseller: true, inStock: true, stock: 30,
    images: [giftbox, kairi, papad], createdAt: "2026-02-01",
    ingredients: ["See individual products"], allergens: "Contains groundnut oil and mustard.", shelfLife: "6 months minimum", storage: "See individual products.",
  },
  {
    id: "p10", slug: "festive-box", name: "Festive Box", marathiName: "सण पेटी", category: "gifts",
    descriptor: "Cloth-wrapped, brass diya, four achars",
    description: "Wrapped in handloom khann fabric with a small brass diya — four achars and a festive note, ready for Diwali and Gudhi Padwa.",
    story: "Made only around festivals, in quantities we can wrap by hand.",
    variants: [{ id: "std", label: "Standard", price: 1899, netQty: "Approx 1.4 kg" }],
    rating: 5.0, reviewCount: 9, badge: "Limited batch", bestseller: false, seasonal: true, inStock: true, stock: 14,
    images: [festive, giftbox], createdAt: "2026-09-15",
    ingredients: ["See individual products"], allergens: "Contains groundnut oil and mustard.", shelfLife: "6 months minimum", storage: "See individual products.",
  },
  {
    id: "p11", slug: "heritage-box", name: "Marathi Heritage Box", marathiName: "वारसा पेटी", category: "gifts",
    descriptor: "Six regional recipes with a printed recipe card",
    description: "A journey across Maharashtra — Konkan, Desh, Vidarbha — in six jars, with a letterpress card telling each recipe's story.",
    story: "For the person who wants to understand the food, not just taste it.",
    variants: [{ id: "std", label: "Standard", price: 2499, netQty: "Approx 1.8 kg" }],
    rating: 4.9, reviewCount: 7, badge: "New", bestseller: false, inStock: true, stock: 20,
    images: [giftbox, spices], createdAt: "2026-08-01",
    ingredients: ["See individual products"], allergens: "Contains groundnut oil, mustard and sesame.", shelfLife: "6 months minimum", storage: "See individual products.",
  },
  {
    id: "p12", slug: "build-your-own-box", name: "Build Your Own Box", marathiName: "तुमची पेटी", category: "gifts",
    descriptor: "Choose any four, we wrap it",
    description: "Pick any four products and we'll pack them in our signature box with a handwritten note.",
    story: "Your selection, Aai's wrapping.",
    variants: [{ id: "std", label: "Box of 4", price: 999, netQty: "Varies" }],
    rating: 4.8, reviewCount: 14, bestseller: false, inStock: true, stock: 50,
    images: [giftbox], createdAt: "2026-01-05",
    ingredients: ["Depends on selection"], allergens: "Depends on selection.", shelfLife: "Varies", storage: "See individual products.",
  },
];

export const categories: Category[] = [
  { slug: "achar", name: "Achar", marathi: "लोणचे", tagline: "Sun-cured, hand-pounded, oil-sealed.", image: kairi },
  { slug: "papad", name: "Papad", marathi: "पापड", tagline: "Rolled by hand, dried under the March sun.", image: papad },
  { slug: "juices", name: "Sharbat", marathi: "सरबत", tagline: "Konkan summers, bottled.", image: kokum },
  { slug: "gifts", name: "Gifts", marathi: "भेट", tagline: "A taste of home, wrapped by hand.", image: giftbox },
];
