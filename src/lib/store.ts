import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, User } from "@/types";
import { getProductById } from "./api";

interface ShopState {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
  add: (productId: string, variantId: string, qty?: number) => void;
  setQty: (productId: string, variantId: string, qty: number) => void;
  remove: (productId: string, variantId: string) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  login: (u: User) => void;
  logout: () => void;
}

export const useShop = create<ShopState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      user: null,
      cartOpen: false,
      setCartOpen: (cartOpen) => set({ cartOpen }),
      add: (productId, variantId, qty = 1) =>
        set((s) => {
          const ex = s.cart.find((i) => i.productId === productId && i.variantId === variantId);
          return {
            cartOpen: true,
            cart: ex
              ? s.cart.map((i) => (i === ex ? { ...i, qty: i.qty + qty } : i))
              : [...s.cart, { productId, variantId, qty }],
          };
        }),
      setQty: (productId, variantId, qty) =>
        set((s) => ({
          cart: s.cart
            .map((i) => (i.productId === productId && i.variantId === variantId ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),
      remove: (productId, variantId) =>
        set((s) => ({ cart: s.cart.filter((i) => !(i.productId === productId && i.variantId === variantId)) })),
      clear: () => set({ cart: [] }),
      toggleWish: (id) =>
        set((s) => ({ wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id] })),
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "m-aai-shop",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({ cart: s.cart, wishlist: s.wishlist, user: s.user }),
    },
  ),
);

export function cartLines(cart: CartItem[]) {
  return cart
    .map((i) => {
      const product = getProductById(i.productId);
      const variant = product?.variants.find((v) => v.id === i.variantId);
      if (!product || !variant) return null;
      return { ...i, product, variant, lineTotal: variant.price * i.qty };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}

export const cartSubtotal = (cart: CartItem[]) => cartLines(cart).reduce((a, l) => a + l.lineTotal, 0);
export const cartCount = (cart: CartItem[]) => cart.reduce((a, i) => a + i.qty, 0);
