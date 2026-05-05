"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "hj-cart-v1";

export type CartItem = {
  code: string;
  name: string;
  spec: string;
  unitPrice: number;
  memberPrice: number;
  quantity: number;
  unit: string;
  piecesPerUnit: number;
  volumeRation: number;
  isBox: boolean;
  bg: string;
};

let cache: CartItem[] | null = null;
let listeners: Array<() => void> = [];

function notify() {
  listeners.forEach((l) => l());
}

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  if (cache) return cache;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    cache = stored ? (JSON.parse(stored) as CartItem[]) : DEFAULT_ITEMS;
    if (!stored) write(cache);
    return cache!;
  } catch {
    cache = [];
    return cache;
  }
}

function write(items: CartItem[]) {
  cache = items;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }
  notify();
}

function subscribe(cb: () => void) {
  listeners.push(cb);
  // 也監聽其他 tab 的 localStorage 變動
  if (typeof window !== "undefined") {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        cache = null;
        cb();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners = listeners.filter((l) => l !== cb);
      window.removeEventListener("storage", onStorage);
    };
  }
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

const EMPTY: CartItem[] = [];

export function useCart(): CartItem[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function useCartSummary() {
  const items = useCart();
  const totalUnits = items.reduce((s, i) => s + i.quantity, 0);
  const totalPieces = items.reduce((s, i) => s + i.quantity * i.piecesPerUnit, 0);
  return { items, totalUnits, totalPieces, count: items.length };
}

export function addToCart(item: CartItem) {
  const current = read();
  const existing = current.find((i) => i.code === item.code);
  if (existing) {
    write(
      current.map((i) =>
        i.code === item.code ? { ...i, quantity: i.quantity + item.quantity } : i,
      ),
    );
  } else {
    write([...current, item]);
  }
}

export function updateQuantity(code: string, quantity: number) {
  write(read().map((i) => (i.code === code ? { ...i, quantity: Math.max(1, quantity) } : i)));
}

export function removeFromCart(code: string) {
  write(read().filter((i) => i.code !== code));
}

export function setCart(items: CartItem[]) {
  write(items);
}

export function clearCart() {
  write([]);
}

// 預設範例資料(空 cart 時帶入,讓 mockup 有東西看)
const DEFAULT_ITEMS: CartItem[] = [
  {
    code: "PC-12-白",
    name: "12oz 公版瓦楞紙杯(白)",
    spec: "12oz / 360cc · 食品紙 + PE",
    unitPrice: 2.4,
    memberPrice: 2.0,
    quantity: 2,
    unit: "箱",
    piecesPerUnit: 1000,
    volumeRation: 1.2,
    isBox: true,
    bg: "bg-amber-100",
  },
  {
    code: "PC-08-白",
    name: "8oz 公版瓦楞紙杯(白)",
    spec: "8oz / 240cc · 食品紙 + PE",
    unitPrice: 1.8,
    memberPrice: 1.5,
    quantity: 5,
    unit: "條",
    piecesPerUnit: 50,
    volumeRation: 0.3,
    isBox: false,
    bg: "bg-amber-100",
  },
  {
    code: "LD-90-白",
    name: "90mm 平蓋(加購)",
    spec: "適配 8/12oz 杯",
    unitPrice: 1.2,
    memberPrice: 1.0,
    quantity: 5,
    unit: "條",
    piecesPerUnit: 50,
    volumeRation: 0.2,
    isBox: false,
    bg: "bg-zinc-100",
  },
];
