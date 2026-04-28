"use client";

import Link from "next/link";
import { useState } from "react";
import { Questioned } from "../CommentSystem";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

/* ============== Q definitions ============== */

const Q1 = {
  no: "Q1",
  question: "公版商品 + 私版報價結果能否放在同一張購物車？私版報價有效期內鎖定規格，過期需重詢，這樣可以嗎？",
  context:
    "目前先以這樣示意：① 購物車可同時放公版商品與「已成交私版報價單」② 私版報價結果項顯示報價單號、有效期、規格鎖定（不可改數量）③ 報價過期會在車內以紅字提示，需重新詢價。想請 HJ 確認是否要分車（公版車 vs 私版車）或同車。",
  clientRef: {
    source: "前台 / 公版商品系列 + 私版商品系列 (1)(2)",
    quote: "客人在網站上點選需求選項得到報價；複雜客製商品轉 LINE 客服報價",
    note: "需求表沒指定購物車是否能混放公版 + 私版。本提案先以「同車但分區」呈現，避免結帳時切換頁。",
  },
};

const Q2 = {
  no: "Q2",
  question: "未登入訪客是否可以放購物車並結帳，還是必須先登入？",
  context:
    "目前先以這樣示意：① 訪客可瀏覽商品、加入購物車 ② 進結帳前強制登入 / 註冊 ③ 登入後購物車內容保留。想請 HJ 確認是否允許訪客結帳（綠界等服務支援）；若要做訪客結帳，需另定義發票 / 收件 / 客戶資料的最小集合。",
  clientRef: {
    source: "前台 / 官網 (3) + 後台 / 顧客管理 (1)",
    quote: "註冊方式：LINE.Email（需驗證）；網站客人需與原 ERP 客戶編號相同",
    note: "需求表寫了會員註冊與 ERP 對應，但未明說訪客結帳是否要做。",
  },
};

const Q3 = {
  no: "Q3",
  question: "運費規則 — 是依重量、體積、區域、訂單金額？是否有滿額免運？",
  context:
    "目前先以這樣示意：① 預估運費 NT$ 150（依材積試算） ② 滿 NT$ 3,000 免運（合作客戶 A 級不另收運費）③ 自取免運。實際公式想請 HJ 確認：運費是依商品重量 / 材積 / 區域 / 物流商分別計算，還是統一公式？滿額免運門檻？合作客戶是否有特別條件？",
  clientRef: {
    source: "後台 / 公版商品管理 (1) + 後台 / 物流 (8)",
    quote: "材積換算、運費規則；四大超商、多家宅配、自取",
    note: "需求表寫了「材積換算、運費規則」但未具體；本提案先以材積為基礎示意。",
  },
};

/* ============== Icons ============== */

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

/* ============== Data ============== */

type CartItem = {
  id: string;
  type: "public" | "private";
  name: string;
  spec: string;
  imageNote: string;
  unitPrice: number;
  memberPrice?: number;
  quantity: number;
  // private only
  quoteId?: string;
  quoteValidUntil?: string;
  quoteExpired?: boolean;
};

const ITEMS: CartItem[] = [
  {
    id: "P-001",
    type: "public",
    name: "12oz 公版瓦楞紙杯（白）",
    spec: "白底 / 50 入 × 100 包",
    imageNote: "商品圖",
    unitPrice: 2.2,
    memberPrice: 1.85,
    quantity: 5000,
  },
  {
    id: "P-002",
    type: "public",
    name: "牛皮紙便當盒（M）",
    spec: "牛皮紙 / 50 入 × 40 盒",
    imageNote: "商品圖",
    unitPrice: 5.4,
    memberPrice: 4.6,
    quantity: 2000,
  },
  {
    id: "Q-20260418-014",
    type: "private",
    name: "客製禮盒（天地蓋）",
    spec: "20×20×8 cm / 銅版紙 350g / 燙金 + 局部上光",
    imageNote: "報價單",
    unitPrice: 90,
    quantity: 200,
    quoteId: "Q-20260418-014",
    quoteValidUntil: "2026/05/02",
  },
  {
    id: "Q-20260410-009",
    type: "private",
    name: "客製腰封 × 10,000（已過期）",
    spec: "銅版紙 150g / 全彩",
    imageNote: "報價單",
    unitPrice: 0.45,
    quantity: 10000,
    quoteId: "Q-20260410-009",
    quoteValidUntil: "2026/04/17",
    quoteExpired: true,
  },
];

/* ============== Component ============== */

type ViewMode = "business" | "personal";

export function CartMockup({
  annotations = false,
  pageId = "cart",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [view, setView] = useState<ViewMode>("business");
  const [empty, setEmpty] = useState(false);

  const subtotal = ITEMS.filter((i) => !i.quoteExpired).reduce((sum, i) => {
    const price = view === "business" && i.memberPrice ? i.memberPrice : i.unitPrice;
    return sum + price * i.quantity;
  }, 0);
  const shipping = subtotal >= 3000 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <MockupShell url="https://hjhj.com.tw/cart">
      <MockupSiteHeader />

      {/* Demo toggle */}
      <div className="border-b-2 border-dashed border-amber-300 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-amber-700 px-2 py-0.5 font-bold text-white">
            預覽
          </span>
          <span className="text-zinc-700">切換會員類型，確認價格 / 運費差異：</span>
          <div className="flex gap-1 rounded-md bg-white p-1 shadow-sm border border-zinc-200">
            {(["personal", "business"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded px-3 py-1 font-medium transition-colors ${
                  view === v
                    ? "bg-amber-700 text-white"
                    : "text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {v === "personal" ? "個人會員" : "企業客戶（合作 A 級）"}
              </button>
            ))}
          </div>
          <span className="ml-auto text-zinc-500">空車狀態：</span>
          <div className="flex gap-1 rounded-md bg-white p-1 shadow-sm border border-zinc-200">
            <button
              onClick={() => setEmpty(false)}
              className={`rounded px-3 py-1 font-medium transition-colors ${
                !empty ? "bg-zinc-900 text-white" : "text-zinc-600"
              }`}
            >
              有商品
            </button>
            <button
              onClick={() => setEmpty(true)}
              className={`rounded px-3 py-1 font-medium transition-colors ${
                empty ? "bg-zinc-900 text-white" : "text-zinc-600"
              }`}
            >
              空車
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <section className="border-b border-zinc-200 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/products" className="hover:text-zinc-900">
            公版商品
          </Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="font-semibold text-zinc-900">購物車</span>
        </div>
      </section>

      {empty ? (
        <section className="bg-zinc-50/40 px-6 py-20">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
              <CartIcon />
            </div>
            <h2 className="mt-4 text-xl font-bold text-zinc-900">購物車是空的</h2>
            <p className="mt-2 text-sm text-zinc-600">
              逛逛公版商品或申請私版報價，再回來這邊結帳。
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <Link
                href="/modules/products"
                className="rounded-md bg-amber-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-800"
              >
                去逛公版商品
              </Link>
              <Link
                href="/modules/private-quote"
                className="rounded-md border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                私版即時報價
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Hero */}
          <section className="border-b border-zinc-200 bg-white px-6 py-5">
            <div className="mx-auto max-w-[1760px]">
              <h1 className="text-2xl font-bold text-zinc-900">購物車</h1>
              <p className="mt-1 text-sm text-zinc-500">
                共 <span className="font-bold text-zinc-900">{ITEMS.length}</span> 項商品 ｜ 公版商品 + 私版報價結果
              </p>
            </div>
          </section>

          <section className="bg-zinc-50/40 px-6 py-8">
            <div className="mx-auto grid max-w-[1760px] gap-6 lg:grid-cols-[1fr_400px]">
              {/* Items */}
              <div className="space-y-6">
                {/* 公版區 */}
                <Questioned
                  show={annotations}
                  questions={[Q1]}
                  pageId={pageId}
                  position="top-right"
                >
                  <div>
                    <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-zinc-900">
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                        公版
                      </span>
                      可調整數量、可移除
                    </h2>
                    <div className="space-y-3">
                      {ITEMS.filter((i) => i.type === "public").map((item) => (
                        <CartItemCard key={item.id} item={item} view={view} />
                      ))}
                    </div>
                  </div>

                  {/* 私版區 */}
                  <div className="mt-6">
                    <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-zinc-900">
                      <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-800">
                        私版
                      </span>
                      由報價單帶入，規格鎖定，不可改數量
                    </h2>
                    <div className="space-y-3">
                      {ITEMS.filter((i) => i.type === "private").map((item) => (
                        <CartItemCard key={item.id} item={item} view={view} />
                      ))}
                    </div>
                  </div>
                </Questioned>
              </div>

              {/* Summary */}
              <aside className="lg:sticky lg:top-4 lg:self-start">
                <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                  <h2 className="text-base font-bold text-zinc-900">訂單摘要</h2>
                  <div className="mt-4 space-y-2 border-b border-zinc-100 pb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">小計（{ITEMS.filter((i) => !i.quoteExpired).length} 項）</span>
                      <span className="font-mono text-zinc-900">NT$ {subtotal.toLocaleString()}</span>
                    </div>
                    <Questioned
                      show={annotations}
                      questions={[Q3]}
                      pageId={pageId}
                      position="top-right"
                    >
                      <div className="flex justify-between">
                        <span className="text-zinc-600">
                          預估運費{" "}
                          <span className="text-[10px] text-zinc-400">（依材積試算）</span>
                        </span>
                        <span className={`font-mono ${shipping === 0 ? "text-emerald-700 font-bold" : "text-zinc-900"}`}>
                          {shipping === 0 ? "免運" : `NT$ ${shipping}`}
                        </span>
                      </div>
                    </Questioned>
                    {view === "business" && (
                      <div className="flex justify-between text-xs text-emerald-700">
                        <span>已套用合作 A 級價</span>
                        <span>—</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between pt-4 text-base font-bold">
                    <span className="text-zinc-900">合計</span>
                    <span className="font-mono text-amber-800">NT$ {total.toLocaleString()}</span>
                  </div>
                  <Questioned
                    show={annotations}
                    questions={[Q2]}
                    pageId={pageId}
                    position="top-right"
                  >
                    <Link
                      href="/modules/checkout"
                      className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-md bg-amber-700 px-4 py-3 text-sm font-bold text-white hover:bg-amber-800"
                    >
                      前往結帳
                      <ChevronRight />
                    </Link>
                  </Questioned>
                  <Link
                    href="/modules/products"
                    className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                  >
                    <ChevronLeft />
                    繼續購物
                  </Link>

                  {/* Hints */}
                  <div className="mt-4 space-y-1.5 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-600">
                    <div>· 滿 NT$ 3,000 免運（合作 A 級不另收）</div>
                    <div>· 私版項目以報價單金額為準，不可改數量</div>
                    <div>· 結帳後可選付款方式（信用卡 / ATM / 月結）</div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </>
      )}

      <MockupSiteFooter />
    </MockupShell>
  );
}

function CartItemCard({ item, view }: { item: CartItem; view: ViewMode }) {
  const showMember = view === "business" && item.memberPrice && item.type === "public";
  const price = showMember ? item.memberPrice! : item.unitPrice;
  const lineTotal = price * item.quantity;
  const isPrivate = item.type === "private";
  const expired = item.quoteExpired;

  return (
    <article
      className={`rounded-xl border bg-white p-5 shadow-sm ${
        expired ? "border-rose-300 bg-rose-50/30" : "border-zinc-200"
      }`}
    >
      <div className="flex flex-wrap gap-4">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-xs text-zinc-300">
          {item.imageNote}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-zinc-900">{item.name}</h3>
          <p className="mt-0.5 text-xs text-zinc-500">{item.spec}</p>
          {isPrivate && (
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-indigo-700">{item.quoteId}</span>
              <span className="text-zinc-300">·</span>
              <span className={expired ? "text-rose-700 font-bold" : "text-zinc-600"}>
                {expired ? "報價已過期" : `有效至 ${item.quoteValidUntil}`}
              </span>
              {expired && (
                <Link
                  href="/modules/members/quote-list"
                  className="rounded-md bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-rose-700"
                >
                  重新詢價
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          {/* Quantity */}
          {isPrivate ? (
            <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm">
              <span className="text-zinc-500 text-xs">數量</span>{" "}
              <span className="font-mono font-bold text-zinc-900">
                {item.quantity.toLocaleString()}
              </span>
              <span className="ml-1 text-[10px] text-zinc-400">（鎖定）</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 rounded-md border border-zinc-200 bg-white">
              <button className="flex size-8 items-center justify-center text-zinc-600 hover:bg-zinc-50">
                <MinusIcon />
              </button>
              <span className="w-16 text-center font-mono text-sm font-bold">
                {item.quantity.toLocaleString()}
              </span>
              <button className="flex size-8 items-center justify-center text-zinc-600 hover:bg-zinc-50">
                <PlusIcon />
              </button>
            </div>
          )}

          {/* Price */}
          <div className="text-right">
            {showMember && (
              <div className="text-[10px] text-zinc-400 line-through">
                NT$ {item.unitPrice.toLocaleString()}
              </div>
            )}
            <div className="text-xs text-zinc-500">
              單價 NT$ <span className={`font-mono ${showMember ? "text-emerald-700 font-bold" : "text-zinc-900"}`}>
                {price.toLocaleString()}
              </span>
            </div>
            <div className="mt-1 font-mono text-base font-bold text-zinc-900">
              NT$ {lineTotal.toLocaleString()}
            </div>
          </div>

          <button
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-rose-700"
            disabled={isPrivate && !expired}
          >
            <TrashIcon />
            {isPrivate && !expired ? "（不可移除）" : "移除"}
          </button>
        </div>
      </div>
    </article>
  );
}
