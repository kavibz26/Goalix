"use client";

// Cart state: React context + reducer, persisted to localStorage.
// Hydration-safe: starts empty on the server, loads from storage after mount.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Version } from "@/lib/types";

const STORAGE_KEY = "goalix_cart_v1";

export interface CartItem {
  /** Stable identity for a configured line (kit + size + version + name + number). */
  lineId: string;
  kitId: string;
  teamId: string;
  teamName: string;
  kitName: string;
  image?: string;
  size: string;
  version: Version;
  customName?: string;
  customNumber?: string;
  qty: number;
  unitPrice: number;
}

export type NewCartItem = Omit<CartItem, "lineId">;

interface CartState {
  items: CartItem[];
  hydrated: boolean;
}

type QtyInput = number | ((prev: number) => number);

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; item: NewCartItem }
  | { type: "setQty"; lineId: string; qty: QtyInput }
  | { type: "remove"; lineId: string }
  | { type: "clear" };

const MAX_QTY = 99;
const clampQty = (n: number) =>
  Math.min(MAX_QTY, Math.max(1, Math.floor(n) || 1));

function makeLineId(i: NewCartItem): string {
  return [
    i.kitId,
    i.size,
    i.version,
    (i.customName ?? "").trim().toLowerCase(),
    (i.customNumber ?? "").trim(),
  ].join("|");
}

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return { items: action.items, hydrated: true };

    case "add": {
      const lineId = makeLineId(action.item);
      const existing = state.items.find((i) => i.lineId === lineId);
      const items = existing
        ? state.items.map((i) =>
            i.lineId === lineId ? { ...i, qty: i.qty + action.item.qty } : i,
          )
        : [...state.items, { ...action.item, lineId }];
      return { ...state, items };
    }

    case "setQty": {
      // Resolve against the authoritative item qty so rapid +/- taps (which
      // fire before a re-render) accumulate correctly.
      return {
        ...state,
        items: state.items.map((i) => {
          if (i.lineId !== action.lineId) return i;
          const next =
            typeof action.qty === "function"
              ? action.qty(i.qty)
              : action.qty;
          return { ...i, qty: clampQty(next) };
        }),
      };
    }

    case "remove":
      return {
        ...state,
        items: state.items.filter((i) => i.lineId !== action.lineId),
      };

    case "clear":
      return { ...state, items: [] };

    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  count: number;
  total: number;
  add: (item: NewCartItem) => void;
  setQty: (lineId: string, qty: QtyInput) => void;
  remove: (lineId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], hydrated: false });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const items = raw ? (JSON.parse(raw) as CartItem[]) : [];
      dispatch({ type: "hydrate", items: Array.isArray(items) ? items : [] });
    } catch {
      dispatch({ type: "hydrate", items: [] });
    }
  }, []);

  useEffect(() => {
    // Only persist once the initial hydrate has been committed, otherwise the
    // first render would overwrite stored data with the empty initial state.
    if (!state.hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [state.items, state.hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((n, i) => n + i.qty, 0);
    const total = state.items.reduce((n, i) => n + i.qty * i.unitPrice, 0);
    return {
      items: state.items,
      hydrated: state.hydrated,
      count,
      total,
      add: (item) => dispatch({ type: "add", item }),
      setQty: (lineId, qty) => dispatch({ type: "setQty", lineId, qty }),
      remove: (lineId) => dispatch({ type: "remove", lineId }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
