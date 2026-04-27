"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ProductDetailMockup } from "@/components/modules/mockups/ProductDetailMockup";
import { PRODUCTS_MOCKUPS } from "@/lib/products-mockups";

const PAGE_ID = "products-detail";
const PAGE_LABEL = "公版商品系統 — 商品詳情頁";
const ACTIVE_TAB = "detail";

const QUESTIONS = [
  {
    no: "Q1",
    question: "商品影片來源？",
    context: "選項：後台直接上傳影片檔 / 嵌入 YouTube、Vimeo 連結",
    pinnedAt: "圖片區下方「商品影片」按鈕",
  },
  {
    no: "Q2",
    question: "詳情頁是否顯示「會員專屬價」？非會員看到什麼？",
    context:
      "HJ 現網站做法：未登入只看到「立即登入/註冊」，登入後才看到價格。要保留這做法、還是改成「非會員看零售價、會員看折扣價」？",
    pinnedAt: "價格區",
  },
];

export default function ProductsDetailPage() {
  // 預設開啟標註模式，讓客戶開頁直接看到問題與我們建議
  const [annotations, setAnnotations] = useState(true);

  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <CommentToolbar
        pageId={PAGE_ID}
        pageLabel={PAGE_LABEL}
        annotations={annotations}
        setAnnotations={setAnnotations}
      />

      {/* Mockup tabs — 預覽切換為主角 */}
      <section className="border-b-2 border-zinc-400 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-amber-900">
            公版商品 預覽：
          </span>
          {PRODUCTS_MOCKUPS.map((m) => {
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

      {/* Current mockup */}
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <ProductDetailMockup annotations={annotations} pageId={PAGE_ID} />
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
        prev={{ title: "公版商品列表頁", href: "/modules/products" }}
        next={{ title: "私版商品報價系統", href: "/modules/private-quote" }}
      />
    </main>
  );
}
