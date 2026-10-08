import { Link } from "@tanstack/react-router";
import { Heart, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/api";
import { useShop } from "@/lib/store";
import { Stars } from "./primitives";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className, large }: { product: Product; className?: string; large?: boolean }) {
  const add = useShop((s) => s.add);
  const wish = useShop((s) => s.wishlist.includes(product.id));
  const toggleWish = useShop((s) => s.toggleWish);
  const v = product.variants[0];

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative overflow-hidden bg-sand">
        <Link to="/products/$slug" params={{ slug: product.slug }} className="block" aria-label={product.name}>
          <img
            src={product.images[0]}
            alt={`${product.name} — ${product.descriptor}`}
            loading="lazy"
            width={1200}
            height={1504}
            className={cn("w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]", large ? "aspect-[4/5]" : "aspect-[4/5]")}
          />
        </Link>
        {product.badge && (
          <span className="absolute left-3 top-3 bg-ivory/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWish(product.id)}
          aria-label={wish ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wish}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ivory/90 text-ink transition hover:bg-ivory"
        >
          <Heart className={cn("h-4 w-4", wish && "fill-chilli text-chilli")} />
        </button>
        {product.inStock ? (
          <button
            type="button"
            onClick={() => {
              add(product.id, v.id);
              toast.success(`${product.name} added to your basket`);
            }}
            className="absolute inset-x-3 bottom-3 flex translate-y-0 items-center justify-center gap-2 bg-ink py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ivory opacity-100 transition duration-300 hover:bg-primary md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100"
          >
            <Plus className="h-3.5 w-3.5" /> Quick add · {formatPrice(v.price)}
          </button>
        ) : (
          <span className="absolute inset-x-3 bottom-3 bg-ivory/90 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Sold out · next batch soon</span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-serif text-xl leading-tight text-ink">
            <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:text-primary">{product.name}</Link>
          </h3>
          <p className="mt-0.5 font-marathi text-sm text-muted-foreground">{product.marathiName}</p>
        </div>
        <p className="shrink-0 text-sm font-semibold text-ink">{formatPrice(v.price)}</p>
      </div>
      <p className="mt-1.5 line-clamp-1 text-sm text-muted-foreground">{product.descriptor}</p>
      <Stars rating={product.rating} count={product.reviewCount} className="mt-2" />
    </article>
  );
}
