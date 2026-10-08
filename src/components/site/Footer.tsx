import { Link } from "@tanstack/react-router";
import { Logo } from "./primitives";

export function Footer() {
  const col = "space-y-3 text-sm text-ivory/70";
  const a = "transition hover:text-ivory";
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-x py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-ivory/90">
              Homemade Marathi flavours, made in small batches and shared beyond home.
            </p>
            <p className="mt-4 font-marathi text-ivory/50">आईच्या स्वयंपाकघरातून, तुमच्या घरापर्यंत.</p>
          </div>
          <nav aria-label="Shop" className="md:col-span-2">
            <p className="eyebrow mb-4 text-mango">Shop</p>
            <ul className={col}>
              <li><Link to="/shop" className={a}>All products</Link></li>
              <li><Link to="/shop" search={{ category: "achar" }} className={a}>Achar</Link></li>
              <li><Link to="/shop" search={{ category: "papad" }} className={a}>Papad</Link></li>
              <li><Link to="/shop" search={{ category: "juices" }} className={a}>Juices</Link></li>
              <li><Link to="/shop" search={{ category: "gifts" }} className={a}>Gifts</Link></li>
            </ul>
          </nav>
          <nav aria-label="Company" className="md:col-span-2">
            <p className="eyebrow mb-4 text-mango">M-Aai</p>
            <ul className={col}>
              <li><Link to="/our-story" className={a}>Our Story</Link></li>
              <li><Link to="/contact" className={a}>Contact</Link></li>
              <li><Link to="/account" className={a}>Account</Link></li>
            </ul>
          </nav>
          <nav aria-label="Help" className="md:col-span-3">
            <p className="eyebrow mb-4 text-mango">Help</p>
            <ul className={col}>
              <li><Link to="/shipping" className={a}>Shipping</Link></li>
              <li><Link to="/returns" className={a}>Returns</Link></li>
              <li><Link to="/privacy" className={a}>Privacy</Link></li>
              <li><Link to="/terms" className={a}>Terms</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/50 md:flex-row">
          <p>© 2026 M-Aai Foods. Made with care in Pune, Maharashtra.</p>
          <p>FSSAI licence details shown on every pack.</p>
        </div>
      </div>
      <div aria-hidden className="select-none overflow-hidden whitespace-nowrap pb-4 text-center font-serif text-[22vw] leading-[0.8] text-ivory/[0.04]">M·Aai</div>
    </footer>
  );
}
