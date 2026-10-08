import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useShop, cartLines, cartSubtotal } from "@/lib/store";
import { formatPrice } from "@/lib/api";

export const FREE_SHIP = 1500;

export function QtyStepper({ qty, onChange, label }: { qty: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex items-center border border-border">
      <button className="grid h-8 w-8 place-items-center hover:bg-sand" onClick={() => onChange(qty - 1)} aria-label={`Decrease ${label}`}><Minus className="h-3 w-3" /></button>
      <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">{qty}</span>
      <button className="grid h-8 w-8 place-items-center hover:bg-sand" onClick={() => onChange(qty + 1)} aria-label={`Increase ${label}`}><Plus className="h-3 w-3" /></button>
    </div>
  );
}

export function CartDrawer() {
  const open = useShop((s) => s.cartOpen);
  const setOpen = useShop((s) => s.setCartOpen);
  const cart = useShop((s) => s.cart);
  const setQty = useShop((s) => s.setQty);
  const remove = useShop((s) => s.remove);
  const lines = cartLines(cart);
  const subtotal = cartSubtotal(cart);
  const left = Math.max(0, FREE_SHIP - subtotal);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 border-l border-border bg-background p-0 sm:max-w-md">
        <div className="border-b border-border px-6 py-5">
          <SheetTitle className="font-serif text-2xl font-normal text-ink">Your basket</SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            {left > 0 ? `Add ${formatPrice(left)} more for free delivery in India.` : "You've unlocked free delivery in India."}
          </SheetDescription>
          <div className="mt-3 h-1 bg-sand"><div className="h-full bg-leaf transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%` }} /></div>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="font-serif text-3xl text-ink">The barni is empty.</p>
            <p className="mt-2 text-sm text-muted-foreground">Start with Aai's Kairi Loncha — it's where everyone begins.</p>
            <Link to="/shop" onClick={() => setOpen(false)} className="mt-6 bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ivory hover:bg-primary">Shop the kitchen</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.productId + l.variantId} className="flex gap-4 py-5">
                  <img src={l.product.images[0]} alt="" className="h-24 w-20 object-cover" width={80} height={96} />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="font-serif text-lg leading-tight text-ink">{l.product.name}</p>
                        <p className="text-xs text-muted-foreground">{l.variant.label}</p>
                      </div>
                      <button onClick={() => remove(l.productId, l.variantId)} aria-label={`Remove ${l.product.name}`} className="text-muted-foreground hover:text-ink"><X className="h-4 w-4" /></button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QtyStepper qty={l.qty} onChange={(n) => setQty(l.productId, l.variantId, n)} label={l.product.name} />
                      <span className="text-sm font-semibold">{formatPrice(l.lineTotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-border bg-ivory px-6 py-5">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
              <p className="mt-1 text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link to="/cart" onClick={() => setOpen(false)} className="border border-ink py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] hover:bg-sand">View basket</Link>
                <Link to="/checkout" onClick={() => setOpen(false)} className="bg-ink py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-ivory hover:bg-primary">Checkout</Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
