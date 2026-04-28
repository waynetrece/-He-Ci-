"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { CartMockup } from "@/components/modules/mockups/CartMockup";
import { CART_MOCKUPS } from "@/lib/cart-mockups";

const PAGE_ID = "cart";
const PAGE_LABEL = "購物車與結帳 — 購物車";
const ACTIVE_TAB = "cart";

const QUESTIONS = [
  {
    no: "Q1",
    question: "公版商品 + 私版報價結果能否放在同一張購物車？私版報價有效期內鎖定規格，過期需重詢，這樣可以嗎？",
    context:
      "目前先以這樣示意：① 購物車可同時放公版商品與「已成交私版報價單」② 私版報價結果項顯示報價單號、有效期、規格鎖定（不可改數量）③ 報價過期會在車內以紅字提示，需重新詢價。想請 HJ 確認是否要分車（公版車 vs 私版車）或同車。",
    pinnedAt: "公版區 + 私版區（兩區並列）",
    clientRef: {
      source: "前台 / 公版商品系列 + 私版商品系列 (1)(2)",
      quote: "客人在網站上點選需求選項得到報價；複雜客製商品轉 LINE 客服報價",
      note: "需求表沒指定購物車是否能混放公版 + 私版。本提案先以「同車但分區」呈現，避免結帳時切換頁。",
    },
  },
  {
    no: "Q2",
    question: "未登入訪客是否可以放購物車並結帳，還是必須先登入？",
    context:
      "目前先以這樣示意：① 訪客可瀏覽商品、加入購物車 ② 進結帳前強制登入 / 註冊 ③ 登入後購物車內容保留。想請 HJ 確認是否允許訪客結帳；若要做訪客結帳，需另定義發票 / 收件 / 客戶資料的最小集合。",
    pinnedAt: "訂單摘要『前往結帳』按鈕",
    clientRef: {
      source: "前台 / 官網 (3) + 後台 / 顧客管理 (1)",
      quote: "註冊方式：LINE.Email（需驗證）；網站客人需與原 ERP 客戶編號相同",
      note: "需求表寫了會員註冊與 ERP 對應，但未明說訪客結帳是否要做。",
    },
  },
  {
    no: "Q3",
    question: "運費規則 — 是依重量、體積、區域、訂單金額？是否有滿額免運？",
    context:
      "目前先以這樣示意：① 預估運費 NT$ 150（依材積試算） ② 滿 NT$ 3,000 免運（合作客戶 A 級不另收運費）③ 自取免運。實際公式想請 HJ 確認。",
    pinnedAt: "訂單摘要『預估運費』",
    clientRef: {
      source: "後台 / 公版商品管理 (1) + 後台 / 物流 (8)",
      quote: "材積換算、運費規則；四大超商、多家宅配、自取",
      note: "需求表寫了「材積換算、運費規則」但未具體；本提案先以材積為基礎示意。",
    },
  },
];

export default function CartPage() {
  const [annotations, setAnnotations] = useState(true);

  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <CommentToolbar
        pageId={PAGE_ID}
        pageLabel={PAGE_LABEL}
        annotations={annotations}
        setAnnotations={setAnnotations}
      />

      {/* Mockup tabs */}
      <section className="border-b-2 border-zinc-400 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-amber-900">
            購物車與結帳 預覽：
          </span>
          {CART_MOCKUPS.map((m) => {
            const active = m.id === ACTIVE_TAB;
            const cls = `rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                : m.ready
                  ? "border-zinc-400 bg-white text-zinc-700 hover:border-zinc-900 hover:bg-amber-100"
                  : "border-zinc-300 bg-zinc-100 text-zinc-400 cursor-not-allowed"
            }`;
            const content = (
              <>
                {m.name}
                {!m.ready && (
                  <span className="ml-1 text-[10px] opacity-60">（製作中）</span>
                )}
              </>
            );
            return m.ready && !active ? (
              <Link key={m.id} href={m.href} className={cls}>
                {content}
              </Link>
            ) : (
              <button key={m.id} disabled={!m.ready} className={cls}>
                {content}
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <CartMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      <section className="border-t-2 border-zinc-400 bg-amber-50/40 px-6 py-16">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-amber-900">
              本頁待確認的項目（共 {QUESTIONS.length} 題）
            </h2>
            <p className="mt-3 max-w-3xl text-base text-zinc-700">
              以下 {QUESTIONS.length} 題都已用紅圈
              <span className="mx-1 inline-flex items-center gap-1 rounded-full border-2 border-rose-600 bg-rose-500 py-0.5 pl-1 pr-2 text-xs font-bold text-white align-middle">
                <span className="flex size-4 items-center justify-center rounded-full bg-white text-[10px] font-black text-rose-600">
                  ?
                </span>
                Q
              </span>
              標註於上方畫面對應的元件上，您可以直接點畫面上的紅圈留言；下方為對照表。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {QUESTIONS.map((q) => (
              <article
                key={q.no}
                className="relative flex gap-4 rounded-lg border border-rose-300 bg-white p-5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rose-500 font-mono text-sm font-bold text-white">
                  {q.no}
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-bold leading-snug text-zinc-900">
                    {q.question}
                  </h3>
                  {q.context && (
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                      {q.context}
                    </p>
                  )}
                  {q.pinnedAt && (
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
                      <span aria-hidden>↑</span>
                      已標註於：{q.pinnedAt}
                    </p>
                  )}
                  {q.clientRef && (
                    <div className="mt-3 rounded-md border border-sky-200 bg-sky-50/70 px-3 py-2.5">
                      <div className="mb-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="inline-flex items-center gap-1 font-bold text-sky-800">
                          <ClipboardIcon /> 您的需求表
                        </span>
                        <span className="text-sky-300">·</span>
                        <span className="font-medium text-sky-700">
                          {q.clientRef.source}
                        </span>
                      </div>
                      <div className="text-sm leading-relaxed text-zinc-800">
                        「{q.clientRef.quote}」
                      </div>
                      {q.clientRef.note && (
                        <div className="mt-1 text-xs text-zinc-500">
                          {q.clientRef.note}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="shrink-0">
                  <CommentTrigger
                    pageId={PAGE_ID}
                    elementId={`question-${q.no}`}
                    elementLabel={`${q.no}：${q.question}`}
                    variant="icon"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ModuleFooterNav
        prev={{ title: "公版商品", href: "/modules/products" }}
        next={{ title: "結帳", href: "/modules/checkout" }}
      />
    </main>
  );
}
