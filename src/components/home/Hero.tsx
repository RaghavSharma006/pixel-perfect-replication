import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { images } from "@/data/products";

const HeroJar3D = lazy(() => import("./HeroJar3D"));

function use3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    let webgl = false;
    try {
      webgl = !!document.createElement("canvas").getContext("webgl2");
    } catch { webgl = false; }
    setOk(!reduce && wide && mem >= 4 && webgl);
  }, []);
  return ok;
}

export function Hero() {
  const reduce = useReducedMotion();
  const can3D = use3D();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const imgX = useTransform(sx, (v) => v * -14);
  const imgY = useTransform(sy, (v) => v * -10);
  const cardX = useTransform(sx, (v) => v * 18);
  const cardY = useTransform(sy, (v) => v * 12);

  const fade = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: [0.2, 0.7, 0.2, 1] as const } });

  return (
    <section
      className="relative overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative grid items-center gap-10 pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6 xl:col-span-5">
          <motion.p {...fade(0)} className="eyebrow flex items-center gap-3 text-primary">
            <span className="h-px w-10 bg-primary/60" aria-hidden /> Est. in Aai's kitchen, Pune
          </motion.p>
          <motion.h1 {...fade(0.1)} className="mt-6 text-[3.4rem] font-light leading-[0.95] text-ink sm:text-7xl xl:text-[6.2rem]">
            Aai's recipes.
            <br />
            <em className="font-normal text-primary">Marathi</em> soul.
          </motion.h1>
          <motion.p {...fade(0.2)} className="mt-4 font-marathi text-2xl text-muted-foreground">घरची चव</motion.p>
          <motion.p {...fade(0.3)} className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
            Authentic homemade Marathi flavours, made in small batches and shared beyond home.
          </motion.p>
          <motion.div {...fade(0.4)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/shop" className="group inline-flex items-center justify-center gap-3 bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ivory transition hover:bg-primary">
              Shop the Kitchen <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link to="/our-story" className="inline-flex items-center justify-center border border-ink/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-ink hover:bg-ivory">
              Our Story
            </Link>
          </motion.div>
          <motion.dl {...fade(0.5)} className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {[["40", "jars per batch"], ["3", "generations"], ["0", "preservatives"]].map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-serif text-3xl text-ink">{n}</dd>
                <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-7">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-t-[999px] bg-sand"
          >
            {can3D ? (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,var(--ivory),var(--sand)_70%)]" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-primary/15" aria-hidden />
                <Suspense fallback={<img src={images.kairi} alt="" className="h-full w-full object-cover" />}>
                  <div className="absolute inset-0" aria-label="Interactive 3D jar of Kairi Loncha" role="img">
                    <HeroJar3D />
                  </div>
                </Suspense>
              </>
            ) : (
              <motion.img
                style={{ x: imgX, y: imgY, scale: 1.08 }}
                src={images.kairi}
                alt="A glass jar of M-Aai Kairi Loncha with raw mangoes and a brass spoon"
                width={1200}
                height={1504}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            )}
            <span className="absolute left-1/2 top-8 -translate-x-1/2 font-marathi text-lg text-ink/60">आईच्या हातची</span>
          </motion.div>

          <motion.figure
            style={{ x: cardX, y: cardY }}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute -bottom-6 left-0 hidden w-44 bg-ivory p-2 shadow-[0_20px_40px_-24px_color-mix(in_oklab,var(--ink)_40%,transparent)] sm:block md:w-52 lg:-left-4"
          >
            <img src={images.hands} alt="Aai mixing raw mango with masala in a steel bowl" loading="lazy" className="aspect-square w-full object-cover" />
            <figcaption className="px-1 pt-2 text-[11px] leading-snug text-muted-foreground">Batch no. 214 — mixed by hand, Tuesday morning.</figcaption>
          </motion.figure>

          <div className="absolute -right-2 top-10 hidden h-28 w-28 place-items-center rounded-full border border-ink/20 text-center md:grid lg:right-4">
            <span className="px-3 text-[10px] font-semibold uppercase leading-tight tracking-[0.2em] text-ink/70">Small<br />batch<br />since 1987</span>
          </div>
        </div>
      </div>
    </section>
  );
}
