import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useShop, cartCount } from "@/lib/store";
import { Logo } from "./primitives";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Shop", to: "/shop" as const, search: {} },
  { label: "Achar", to: "/shop" as const, search: { category: "achar" } },
  { label: "Papad", to: "/shop" as const, search: { category: "papad" } },
  { label: "Juices", to: "/shop" as const, search: { category: "juices" } },
  { label: "Gifts", to: "/shop" as const, search: { category: "gifts" } },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const count = useShop((s) => cartCount(s.cart));
  const wishCount = useShop((s) => s.wishlist.length);
  const setCartOpen = useShop((s) => s.setCartOpen);
  const navigate = useNavigate();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const iconBtn = "relative grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-sand";

  return (
    <>
      <div className="bg-ink py-2 text-center text-[11px] tracking-[0.14em] text-ivory/85">
        SMALL BATCHES FROM PUNE · SHIPPING TO SUPPORTED DESTINATIONS WORLDWIDE
      </div>
      <header className={cn("sticky top-0 z-40 border-b transition-colors duration-300", scrolled ? "border-border bg-background/95 backdrop-blur" : "border-transparent bg-background")}>
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
          <button className={cn(iconBtn, "lg:hidden")} onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <Logo className="lg:mr-8" />
          <nav aria-label="Main" className="hidden flex-1 items-center gap-7 lg:flex">
            {nav.map((n) => (
              <Link key={n.label} to={n.to} search={n.search} className="text-[13px] font-medium tracking-wide text-ink/80 transition hover:text-primary">
                {n.label}
              </Link>
            ))}
            <Link to="/our-story" className="text-[13px] font-medium tracking-wide text-ink/80 transition hover:text-primary">Our Story</Link>
          </nav>
          <div className="flex items-center gap-0.5">
            <button className={iconBtn} onClick={() => setSearchOpen((s) => !s)} aria-label="Search" aria-expanded={searchOpen}>
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link to="/wishlist" className={cn(iconBtn, "hidden sm:grid")} aria-label={`Wishlist, ${wishCount} items`}>
              <Heart className="h-[18px] w-[18px]" />
              {wishCount > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-chilli" />}
            </Link>
            <Link to="/account" className={cn(iconBtn, "hidden sm:grid")} aria-label="Account">
              <User className="h-[18px] w-[18px]" />
            </Link>
            <button className={iconBtn} onClick={() => setCartOpen(true)} aria-label={`Open basket, ${count} items`}>
              <ShoppingBag className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {searchOpen && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border bg-background"
              onSubmit={(e) => {
                e.preventDefault();
                setSearchOpen(false);
                navigate({ to: "/shop", search: { q } });
              }}
            >
              <div className="container-x flex items-center gap-3 py-4">
                <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
                <label htmlFor="site-search" className="sr-only">Search products</label>
                <input id="site-search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search kairi, papad, kokum…" className="w-full bg-transparent font-serif text-xl text-ink outline-none placeholder:text-muted-foreground/60 md:text-2xl" />
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 flex flex-col bg-ink text-ivory lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Menu">
            <div className="container-x flex h-16 items-center justify-between">
              <Logo light />
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-ivory/10" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="container-x mt-6 flex flex-1 flex-col" aria-label="Mobile">
              {[...nav, { label: "Our Story", to: "/our-story" as const, search: {} }].map((n, i) => (
                <motion.div key={n.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                  <Link to={n.to} search={n.search} onClick={() => setOpen(false)} className="flex items-baseline justify-between border-b border-ivory/10 py-4 font-serif text-4xl">
                    {n.label}
                    <span className="font-sans text-xs text-ivory/40">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
              <div className="mt-auto grid grid-cols-2 gap-3 pb-10 pt-8 text-sm">
                <Link to="/account" onClick={() => setOpen(false)} className="border border-ivory/20 py-3 text-center">Account</Link>
                <Link to="/wishlist" onClick={() => setOpen(false)} className="border border-ivory/20 py-3 text-center">Wishlist</Link>
              </div>
              <p className="pb-8 font-marathi text-lg text-ivory/50">आईच्या हातची चव, घरापासून दूर.</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
