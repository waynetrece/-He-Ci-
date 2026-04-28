"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { PrivateQuoteMockup } from "@/components/modules/mockups/PrivateQuoteMockup";
import { PRIVATE_QUOTE_MOCKUPS } from "@/lib/private-quote-mockups";

const PAGE_ID = "private-quote-form";
const PAGE_LABEL = "私版報價系統 — 即時報價單品頁";
const ACTIVE_TAB = "form";

const QUESTIONS = [
  {
    no: "Q1",
    question: "即時報價的計價公式由 HJ 提供嗎？",
    context:
      "可能形式：① 固定價目表（Excel 提供，每組規格對一個單價）② 底價 × 加成（例：紙杯 $1.5 × 雙面 1.3 × 全彩 1.5）③ 階梯式級距價。沒有公式系統就無法即時試算。",
    pinnedAt: "Step 3『數量』區（影響試算邏輯）",
    clientRef: {
      source: "前台 / 私版商品系列 (1)",
      quote: "客人在網站上點選需求選項得到報價",
      note: "需提供計價公式 / 價目表（例：每組規格對應單價的對照表，或底價搭配加成倍率），系統才能進行即時試算。",
    },
  },
  {
    no: "Q2",
    question: "能算的報價，是否要做「直接下單」按鈕？",
    context:
      "需釐清下單流程的銜接方式。可選方案：① 能即時報價的，直接從網站購物車結帳，不必經 LINE；② 即時報價只供參考，所有下單一律由 LINE 客服確認後成立。",
    pinnedAt: "右側報價結果『立即下單』按鈕",
    clientRef: {
      source: "前台 / 私版商品系列 (1)(2)",
      quote: "(1) 客人在網站上點選需求選項得到報價；(2) 客服、客人提供製作原始檔、下單，均轉 LINE 客服",
      note: "需求表 (1)(2) 兩段對下單流程的描述有兩種解讀，請貴司決定希望走哪一種。",
    },
  },
  {
    no: "Q3",
    question: "設計檔（印刷原始檔）的上傳，要做在網站上、還是強制 LINE 傳？",
    context:
      "選項：① 網站做檔案上傳區 ② 提示「請傳到 LINE 客服」③ 兩者都做。檔案大小、格式（AI/PDF）也要同步確認。",
    pinnedAt: "Step 4『上傳設計檔』區",
    clientRef: {
      source: "前台 / 私版商品系列 (2)",
      quote: "客服、客人提供製作原始檔、下單，均轉 LINE 客服",
      note: "需求表寫到原始檔走 LINE，但大檔案在 LINE 上傳體驗較差，建議搭配網站上傳功能。請貴司確認偏好的方式。",
    },
  },
  {
    no: "Q4",
    question: "報價有效期幾天？過期後客戶看到什麼？",
    context:
      "範例：7 天 / 14 天 / 30 天。過期後選項：① 自動失效要求重新詢價 ② 顯示「此報價已過期」+ 一鍵帶回相同規格再詢一次。",
    pinnedAt: "右側報價結果『加入詢價單／立即下單』下方",
  },
];

export default function PrivateQuoteFormPage() {
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
          <PrivateQuoteMockup annotations={annotations} pageId={PAGE_ID} />
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
        prev={{ title: "私版商品列表頁", href: "/modules/private-quote" }}
        next={{ title: "會員系統", href: "/modules/members" }}
      />
    </main>
  );
}
