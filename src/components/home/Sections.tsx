import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getBestsellers, getCategories, getProduct, formatPrice } from "@/lib/api";
import { images, products } from "@/data/products";
import { faqs, reviews, shippingDestinations } from "@/data/content";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal, SectionHead, Stars } from "@/components/site/primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

export function TrustLine() {
  const items = ["Small batch", "Homemade", "Marathi recipes", "Made with care"];
  return (
    <div className="border-y border-ink/10 bg-ink text-ivory">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-5 md:justify-between">
        {items.map((t, i) => (
          <span key={t} className="flex items-center gap-8 font-serif text-lg italic md:text-2xl">
            {t}
            {i < items.length - 1 && <span className="hidden text-mango md:inline" aria-hidden>✦</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Bestsellers() {
  const list = getBestsellers();
  return (
    <section className="container-x py-20 md:py-32" aria-labelledby="best">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHead index="01" eyebrow="Bestsellers" title={<span id="best">From Aai's <em className="text-primary">shelf</em></span>} intro="The jars our customers reorder most — each one made the slow way." />
        <Link to="/shop" className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-primary">
          View all products <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="-mx-5 mt-12 flex snap-x gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-14 md:overflow-visible md:px-0 lg:grid-cols-3">
        {list.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.08} className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-auto">
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Categories() {
  const cats = getCategories();
  const [achar, papad, juices, gifts] = cats as [typeof cats[number], typeof cats[number], typeof cats[number], typeof cats[number]];
  const Tile = ({ c, className, imgClass }: { c: (typeof cats)[number]; className?: string; imgClass?: string }) => (
    <Link to="/shop" search={{ category: c.slug }} className={cn("group relative block overflow-hidden bg-sand", className)}>
      <img src={c.image} alt="" loading="lazy" className={cn("h-full w-full object-cover transition duration-[1.4s] group-hover:scale-105", imgClass)} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-ivory md:p-8">
        <div>
          <p className="font-marathi text-lg text-ivory/80">{c.marathi}</p>
          <h3 className="font-serif text-4xl md:text-5xl">{c.name}</h3>
          <p className="mt-1 max-w-xs text-sm text-ivory/80">{c.tagline}</p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ivory/40 transition group-hover:bg-ivory group-hover:text-ink"><ArrowUpRight className="h-4 w-4" /></span>
      </div>
    </Link>
  );
  return (
    <section className="bg-ivory py-20 md:py-32" aria-labelledby="cats">
      <div className="container-x">
        <SectionHead index="02" eyebrow="Shop by category" title={<span id="cats">Four corners of a <em className="text-primary">Marathi</em> kitchen</span>} />
        <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-[340px_340px] md:gap-5">
          <Reveal className="md:col-span-7 md:row-span-2"><Tile c={achar} className="h-[440px] md:h-full" /></Reveal>
          <Reveal delay={0.1} className="md:col-span-5"><Tile c={juices} className="h-[300px] md:h-full" /></Reveal>
          <Reveal delay={0.15} className="md:col-span-2"><Tile c={papad} className="h-[300px] md:h-full" /></Reveal>
          <Reveal delay={0.2} className="md:col-span-3"><Tile c={gifts} className="h-[300px] md:h-full" /></Reveal>
        </div>
      </div>
    </section>
  );
}

export function FeaturedStory() {
  const p = getProduct("kairi-loncha")!;
  const add = useShop((s) => s.add);
  const steps = [
    ["Choose", "Firm, sour Konkan kairi — only from the first fortnight of the season."],
    ["Dry", "Washed and shade-dried for a full day. Water is the enemy of achar."],
    ["Pound", "Mustard, fenugreek and chilli roasted, cooled and pounded by hand."],
    ["Mature", "Sealed under oil and turned daily for three weeks before it leaves us."],
  ] as const;
  return (
    <section className="relative overflow-hidden bg-kokum text-ivory" aria-labelledby="feat">
      <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <img src={images.kairi} alt="Kairi Loncha jar with raw mangoes" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          <div className="absolute -bottom-5 right-4 bg-mango px-5 py-4 text-ink md:-right-6">
            <p className="eyebrow">Batch 214</p>
            <p className="font-serif text-2xl">40 jars only</p>
          </div>
        </Reveal>
        <div className="flex flex-col justify-center">
          <p className="eyebrow text-mango">03 · The featured jar</p>
          <h2 id="feat" className="mt-4 text-5xl leading-[1] md:text-7xl">Kairi <em>Loncha</em></h2>
          <p className="mt-2 font-marathi text-2xl text-ivory/70">{p.marathiName}</p>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/80">{p.story}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {p.ingredients.map((i) => <span key={i} className="border border-ivory/25 px-3 py-1 text-xs text-ivory/85">{i}</span>)}
          </div>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2">
            {steps.map(([t, d], i) => (
              <li key={t} className="border-t border-ivory/20 pt-4">
                <p className="font-serif text-xl"><span className="mr-2 text-mango">0{i + 1}</span>{t}</p>
                <p className="mt-1 text-sm text-ivory/70">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button onClick={() => { add(p.id, p.variants[0]!.id); toast.success("Kairi Loncha added"); }} className="bg-ivory px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink hover:bg-mango">
              Add to basket · {formatPrice(p.variants[0]!.price)}
            </button>
            <Link to="/products/$slug" params={{ slug: p.slug }} className="text-sm font-semibold underline-offset-4 hover:underline">Read the full recipe story</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section className="container-x py-24 md:py-36" aria-labelledby="story">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-primary">04 · Our story</p>
          <h2 id="story" className="mt-4 text-5xl leading-[1] text-ink md:text-7xl">A little piece of <em className="text-primary">home.</em></h2>
          <p className="mt-8 text-lg leading-relaxed text-ink/75">
            Every Marathi home has a shelf of barnis — glazed jars of lonche, stacks of papad wrapped in cloth, a bottle of kokum waiting for summer. M-Aai began when friends abroad kept asking us to pack "just one more jar" from Aai's kitchen.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            We still cook the same way: in a home kitchen, in small batches, with recipes passed from aaji to aai to us. Only now, the jars travel further.
          </p>
          <blockquote className="mt-10 border-l-2 border-primary pl-6">
            <p className="font-marathi text-2xl text-ink">"चव घाईत येत नाही."</p>
            <p className="mt-1 text-sm text-muted-foreground">Flavour doesn't come in a hurry. — Aai</p>
          </blockquote>
          <Link to="/our-story" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-primary">Read our story <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <div className="relative lg:col-span-7">
          <Reveal><img src={images.hands} alt="Hands in a green saree mixing mango pickle in a steel bowl" loading="lazy" className="aspect-[4/3] w-full object-cover" /></Reveal>
          <Reveal delay={0.2} className="absolute -bottom-10 -left-4 w-2/5 border-8 border-background md:-left-10">
            <img src={images.spices} alt="Pickle spices in brass bowls" loading="lazy" className="aspect-square w-full object-cover" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Kitchen() {
  const steps = [
    { t: "Handmade", d: "Every mango cut, every papad rolled, by hand — never by machine.", img: images.hands },
    { t: "Ingredients", d: "Cold-pressed groundnut oil, Byadgi chilli, Konkan kokum, Pune jaggery.", img: images.spices },
    { t: "Small batches", d: "Forty jars at a time, so we can taste and correct every one.", img: images.limbu },
    { t: "Packed with care", d: "Sealed, wrapped in recycled paper and cushioned for long journeys.", img: images.giftbox },
  ];
  return (
    <section className="border-t border-border bg-sand/50 py-20 md:py-32" aria-labelledby="kitchen">
      <div className="container-x">
        <SectionHead index="05" eyebrow="The small-batch kitchen" title={<span id="kitchen">How a jar of M-Aai is <em className="text-primary">made</em></span>} intro="No factory floor. A home kitchen, a terrace for sun-curing, and a lot of patience." />
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08} className="group bg-background">
              <div className="overflow-hidden"><img src={s.img} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover grayscale-[30%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" /></div>
              <div className="p-6">
                <p className="font-serif text-5xl text-primary/30">0{i + 1}</p>
                <h3 className="mt-2 font-serif text-2xl text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gifts() {
  const gifts = products.filter((p) => p.category === "gifts");
  const feat = gifts[0]!; const rest = gifts.slice(1);
  return (
    <section className="container-x py-20 md:py-32" aria-labelledby="gifts">
      <SectionHead index="06" eyebrow="Gifting" title={<span id="gifts">Send a taste of <em className="text-primary">home</em></span>} intro="Curated boxes, wrapped by hand, with a note in your words." />
      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Link to="/products/$slug" params={{ slug: feat.slug }} className="group block">
            <div className="overflow-hidden"><img src={images.festive} alt="Festive Box wrapped in red cloth with brass diya" loading="lazy" className="aspect-[5/4] w-full object-cover transition duration-1000 group-hover:scale-105" /></div>
            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-primary">Most gifted</p>
                <h3 className="mt-1 font-serif text-3xl text-ink">{feat.name}</h3>
                <p className="text-sm text-muted-foreground">{feat.descriptor}</p>
              </div>
              <p className="font-semibold">{formatPrice(feat.variants[0]!.price)}</p>
            </div>
          </Link>
        </Reveal>
        <div className="grid gap-6 lg:col-span-5">
          {rest.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.08}>
              <Link to="/products/$slug" params={{ slug: g.slug }} className="group flex gap-5 border-b border-border pb-6">
                <img src={g.images[0]} alt="" loading="lazy" className="h-28 w-28 shrink-0 object-cover" />
                <div className="flex flex-1 flex-col">
                  <h3 className="font-serif text-2xl text-ink group-hover:text-primary">{g.name}</h3>
                  <p className="text-sm text-muted-foreground">{g.descriptor}</p>
                  <p className="mt-auto text-sm font-semibold">{formatPrice(g.variants[0]!.price)}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-primary" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="bg-ivory py-20 md:py-32" aria-labelledby="reviews">
      <div className="container-x">
        <SectionHead index="07" eyebrow="Kind words" title={<span id="reviews">From kitchens <em className="text-primary">around the world</em></span>} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 0.08}>
              <figure className={cn("flex h-full flex-col border border-border bg-background p-7", i === 1 && "lg:translate-y-8", i === 4 && "lg:translate-y-8")}>
                <Stars rating={r.rating} />
                <blockquote className="mt-4 flex-1">
                  <p className="font-serif text-xl leading-snug text-ink">"{r.title}"</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
                  <span><span className="font-semibold text-ink">{r.author}</span> · {r.location}</span>
                  {r.verified && <span className="flex items-center gap-1 text-leaf"><Check className="h-3 w-3" /> Verified</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GlobalShipping() {
  return (
    <section className="relative overflow-hidden bg-leaf text-ivory" aria-labelledby="ship">
      <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-mango">08 · Worldwide</p>
          <h2 id="ship" className="mt-4 text-5xl leading-[1] md:text-7xl">From our kitchen to wherever <em>home</em> is.</h2>
          <p className="mt-6 max-w-md text-lg text-ivory/80">Shipping available to supported destinations. Some products may be limited by local import rules — we'll always confirm at checkout.</p>
          <Link to="/shipping" className="mt-8 inline-flex items-center gap-2 border-b border-ivory/50 pb-1 text-sm font-semibold hover:border-ivory">Shipping details <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="divide-y divide-ivory/15 border-y border-ivory/15">
            {shippingDestinations.map((d) => (
              <li key={d.country} className="flex items-baseline justify-between py-4">
                <span className="font-serif text-2xl md:text-3xl">{d.country}</span>
                <span className="text-sm text-ivory/70">{d.eta}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function FAQSection({ items = faqs, title = "Questions, answered" }: { items?: typeof faqs; title?: string }) {
  return (
    <section className="container-x grid gap-10 py-20 md:py-32 lg:grid-cols-12" aria-labelledby="faq">
      <div className="lg:col-span-4">
        <p className="eyebrow text-primary">09 · FAQ</p>
        <h2 id="faq" className="mt-4 text-4xl text-ink md:text-5xl">{title}</h2>
        <p className="mt-4 text-muted-foreground">Can't find what you need? <Link to="/contact" className="text-ink underline underline-offset-4">Write to us</Link>.</p>
      </div>
      <Accordion type="single" collapsible className="lg:col-span-8">
        {items.map((f, i) => (
          <AccordionItem key={f.q} value={`f${i}`} className="border-border">
            <AccordionTrigger className="py-6 text-left font-serif text-xl font-normal text-ink hover:no-underline md:text-2xl">{f.q}</AccordionTrigger>
            <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="border-t border-border bg-sand/60" aria-labelledby="news">
      <div className="container-x grid items-center gap-8 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <h2 id="news" className="text-4xl text-ink md:text-5xl">Letters from <em className="text-primary">Aai's kitchen</em></h2>
          <p className="mt-3 max-w-md text-muted-foreground">Seasonal batch alerts, family recipes and first access to limited jars. Once a month, never more.</p>
        </div>
        {done ? (
          <p className="font-serif text-2xl text-leaf" role="status">धन्यवाद! You're on the list.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setDone(true); }} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input id="nl-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="h-14 flex-1 border border-ink/20 bg-background px-5 text-ink outline-none focus:border-ink" />
            <button className="h-14 bg-ink px-8 text-xs font-semibold uppercase tracking-[0.18em] text-ivory hover:bg-primary">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
