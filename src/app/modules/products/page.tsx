"use client";

import { useState } from "react";
import {
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import { ProductListMockup } from "@/components/modules/mockups/ProductListMockup";

const PAGE_ID = "products-list";
const PAGE_LABEL = "公版商品系統";

const MOCKUPS = [
  { id: "list", name: "商品列表頁", layer: "前台" as const, ready: true },
  { id: "detail", name: "商品詳情頁", layer: "前台" as const, ready: false },
  { id: "sample", name: "樣品申請表單", layer: "前台" as const, ready: false },
];

// 本頁（列表頁）相關的問題 — 全部都已釘到畫面上對應位置（紅圈標記）
const QUESTIONS = [
  {
    no: "Q1",
    question: "多層規格選項要支援幾層？",
    context: "例：紙杯 → 容量（8oz/12oz）→ 材質（PE/PLA）→ 印刷（單面/雙面）= 3 層",
    pinnedAt: "左欄『材質』篩選區",
    importance: "high" as const,
  },
  {
    no: "Q2",
    question: "規格組合是否要獨立 SKU、獨立庫存？",
    context: "獨立 SKU 表示「8oz 白色紙杯」與「12oz 白色紙杯」分別計算庫存與銷售。",
    pinnedAt: "左欄『材質』篩選區",
    importance: "high" as const,
  },
  {
    no: "Q3",
    question: "商品列表頁是否顯示價格？",
    context: "B2B 電商常選擇隱藏價格，需登入才看得到。或一律顯示「請洽詢」字樣。",
    pinnedAt: "第 1 張卡『請洽詢』價格區",
    importance: "high" as const,
  },
  {
    no: "Q4",
    question: "分級會員看到的價格如何呈現？",
    context: "選項：只顯示該等級價、原價劃掉+會員價、原價+折扣 % 等。",
    pinnedAt: "第 1 張卡『請洽詢』價格區",
    importance: "high" as const,
  },
  {
    no: "Q6",
    question: "樣品申請是否要收費？",
    context: "選項：完全免費 / 樣品免費但運費自付 / 限金額或會員等級",
    pinnedAt: "第 3 張卡『申請樣品』按鈕",
  },
  {
    no: "Q7",
    question: "樣品申請是否限會員才能申請？",
    pinnedAt: "第 3 張卡『申請樣品』按鈕",
  },
  {
    no: "Q8",
    question: "樣品申請是否要後台審核才寄出？",
    pinnedAt: "第 3 張卡『申請樣品』按鈕",
  },
];

export default function ProductsModulePage() {
  const [annotations, setAnnotations] = useState(false);

  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <CommentToolbar
        pageId={PAGE_ID}
        pageLabel={PAGE_LABEL}
        annotations={annotations}
        setAnnotations={setAnnotations}
      />

      <ModuleHero
        no="01"
        title="公版商品系統"
        subtitle="新平台「公版商品」相關頁面預覽"
        tone="amber"
        right={
          <>
            <span className="text-xs font-medium text-zinc-500">預覽畫面：</span>
            {MOCKUPS.map((m) => (
              <button
                key={m.id}
                disabled={!m.ready}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  m.ready
                    ? m.id === "list"
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-400 bg-white text-zinc-700 hover:border-zinc-700"
                    : "border-zinc-300 bg-zinc-100 text-zinc-400 cursor-not-allowed"
                }`}
              >
                {m.name}
                {!m.ready && (
                  <span className="ml-1 text-[10px] opacity-60">（製作中）</span>
                )}
              </button>
            ))}
          </>
        }
      />

      {/* Current mockup */}
      <section className="bg-zinc-50 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <ProductListMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Confirmation section — 對照表，列出本頁所有已釘到畫面上的問題 */}
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
            <p className="mt-2 max-w-3xl text-sm text-zinc-500">
              註：與「結帳流程」「購物車」「商品詳情頁」「商品後台」相關的問題會釘到對應的 mockup 頁，不在本頁列出。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {QUESTIONS.map((q) => (
              <article
                key={q.no}
                className={`relative flex gap-4 rounded-lg border bg-white p-5 ${
                  q.importance === "high" ? "border-rose-300" : "border-amber-200"
                }`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${
                    q.importance === "high"
                      ? "bg-rose-500 text-white"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
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
        prev={undefined}
        next={{ title: "私版商品報價系統", href: "/modules/private-quote" }}
      />
    </main>
  );
}
