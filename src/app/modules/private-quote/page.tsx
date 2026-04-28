"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { PrivateQuoteListMockup } from "@/components/modules/mockups/PrivateQuoteListMockup";
import { PRIVATE_QUOTE_MOCKUPS } from "@/lib/private-quote-mockups";

const PAGE_ID = "private-quote-list";
const PAGE_LABEL = "私版報價系統 — 商品列表頁";
const ACTIVE_TAB = "list";

const QUESTIONS = [
  {
    no: "Q1",
    question: "私版即時報價支援哪幾類商品？",
    context:
      "選項：① 全部公版 8 大類都做 ② 只做熱門類別（如紙杯、紙袋、印刷紙品）③ 由 HJ 自行配置。範圍越大，計價邏輯越複雜，且需提供對應價目表。",
    pinnedAt: "第 1 張商品卡（代表性入口）",
    clientRef: {
      source: "前台 / 私版商品系列 (1) + 參考 jcolor BC-67",
      quote: "客人在網站上點選需求選項得到報價；參考 jcolor.com.tw/product/BC-67",
    },
  },
  {
    no: "Q2",
    question: "「即時報價」與「LINE 報價」如何分流？",
    context:
      "建議在每張商品卡上標示「即時報價」或「LINE 報價」標籤，客戶一眼看出能不能站內試算。標準依據可由貴司提供（例如 HJ 自行決定哪些品項、哪些規格組合走人工估價）。",
    pinnedAt: "第 5 張卡『模切異形紙袋』（範例：LINE 報價標籤）",
    clientRef: {
      source: "前台 / 私版商品系列 (1)(2)",
      quote: "(1) 客人在網站上點選需求選項得到報價；(2) 複雜客製商品轉 LINE 客服報價",
      note: "需求表寫了兩種模式並存，但「哪些算複雜需轉 LINE」的判斷規則想請 HJ 提供。",
    },
  },
  {
    no: "Q3",
    question: "列表頁是否要顯示「起報金額」？",
    context:
      "如顯示「12oz 客製紙杯 起 $1.50/個」，可協助客戶第一眼判斷是否符合預算，但前提是價目表已建立。如不顯示，客戶須點進詳細頁才能看到價格。",
    pinnedAt: "第 4 張卡『客製牛皮紙袋』金額區",
  },
];

export default function PrivateQuoteListPage() {
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
            私版報價 預覽：
          </span>
          {PRIVATE_QUOTE_MOCKUPS.map((m) => {
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

      {/* Mockup */}
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <PrivateQuoteListMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Confirmation section */}
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
              標註於上方畫面對應的元件上，您可以直接點畫面上的紅圈留言；下方為對照表，方便整體檢視。
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
        prev={{ title: "公版商品系統", href: "/modules/products" }}
        next={{ title: "即時報價單品頁", href: "/modules/private-quote/quote-form" }}
      />
    </main>
  );
}
