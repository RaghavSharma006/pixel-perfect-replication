import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <Link to="/" aria-label="M-Aai home" className={cn("group inline-flex items-baseline gap-2 leading-none", className)}>
      <span className={cn("font-serif text-2xl font-semibold tracking-tight", light ? "text-ivory" : "text-ink")}>
        M<span className="text-primary">·</span>Aai
      </span>
      <span className={cn("font-marathi text-sm", light ? "text-ivory/70" : "text-muted-foreground")}>घरची चव</span>
    </Link>
  );
}

export function Reveal({ children, delay = 0, className, y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stars({ rating, count, className }: { rating: number; count?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5 text-xs text-muted-foreground", className)}>
      <span className="flex" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className={cn("h-3.5 w-3.5", i <= Math.round(rating) ? "fill-mango text-mango" : "text-border")} aria-hidden />
        ))}
      </span>
      <span>{rating.toFixed(1)}{count !== undefined && ` · ${count} reviews`}</span>
    </div>
  );
}

export function SectionHead({ index, eyebrow, title, intro, className, align = "left" }: { index?: string; eyebrow: string; title: ReactNode; intro?: string; className?: string; align?: "left" | "center" }) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow flex items-center gap-3 text-primary" style={align === "center" ? { justifyContent: "center" } : undefined}>
        {index && <span className="text-muted-foreground">{index}</span>}
        <span className="h-px w-8 bg-primary/50" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl leading-[1.05] text-ink md:text-6xl">{title}</h2>
      {intro && <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg" style={align === "center" ? { marginInline: "auto" } : undefined}>{intro}</p>}
    </Reveal>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: string }) {
  return (
    <header className="border-b border-border bg-sand/40">
      <div className="container-x py-14 md:py-20">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-4xl text-ink md:text-6xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{intro}</p>}
      </div>
    </header>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
