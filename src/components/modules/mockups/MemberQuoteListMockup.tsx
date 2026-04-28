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
  question: "個人會員是否能使用「私版報價」功能？或只開放給企業客戶？",
  context:
    "目前畫面預設：① 企業客戶（B2B）可使用完整詢價功能 ② 個人會員預設不開放，登入後在此頁顯示「升級為企業客戶」引導。請貴司確認個人會員能否使用私版詢價。",
  clientRef: {
    source: "前台 / 私版商品系列 (1)",
    quote: "客人在網站上點選需求選項得到報價",
    note: "需求表沒指定誰能用私版報價。本提案先預設只 B2B 可用，請貴司確認。",
  },
};

const Q2 = {
  no: "Q2",
  question: "詢價單有效期幾天？過期後處理方式？",
  context:
    "目前畫面預設：詢價單有效期 7 天，過期後狀態變「已過期」，提供「一鍵重新詢價」按鈕將原規格帶回詢價流程。請貴司指定有效天數與過期處理。",
  clientRef: {
    source: "需求表未提及（補充項）",
    quote: "（這項在需求表沒有對應段落）",
    note: "詢價單有效期是 B2B 報價系統標配，需貴司指定。",
  },
};

const Q3 = {
  no: "Q3",
  question: "詢價單轉訂單的流程？是否需要 LINE 客服確認後才能轉？",
  context:
    "目前畫面預設：① 「已成交」狀態的詢價單可直接「轉訂單」進結帳流程 ② 「已送 LINE」狀態需 HJ 客服在 LINE 確認規格與報價後，才會將詢價單標記成「已成交」，會員才能繼續結帳。",
  clientRef: {
    source: "前台 / 私版商品系列 (2)",
    quote: "客服、客人提供製作原始檔、下單，均轉 LINE 客服",
    note: "需求表寫了下單轉 LINE，但詢價單轉訂單的步驟細節未指定。",
  },
};

/* ============== Icons ============== */

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function LineIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.197-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
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

function FileTextIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

/* ============== Data ============== */

type QuoteStatus = "draft" | "sent-to-line" | "confirmed" | "expired";

const STATUS_META: Record<QuoteStatus, { label: string; cls: string; sub?: string }> = {
  draft: { label: "草稿", cls: "bg-zinc-100 text-zinc-700", sub: "尚未送出" },
  "sent-to-line": { label: "已送 LINE", cls: "bg-emerald-100 text-emerald-800", sub: "等客服回覆" },
  confirmed: { label: "已成交", cls: "bg-amber-100 text-amber-800", sub: "可轉訂單" },
  expired: { label: "已過期", cls: "bg-rose-100 text-rose-700", sub: "可重詢" },
};

const QUOTES = [
  {
    id: "Q-20260427-002",
    date: "2026/04/27",
    items: "12oz 客製紙杯 × 5,000 / 雙面全彩 + 燙金",
    estimatedAmount: 12500,
    status: "sent-to-line" as QuoteStatus,
    expiresAt: "2026/05/04",
  },
  {
    id: "Q-20260424-007",
    date: "2026/04/24",
    items: "客製模切紙袋 × 500 / 牛皮紙 + 異形刀模",
    estimatedAmount: 0,
    status: "sent-to-line" as QuoteStatus,
    expiresAt: "2026/05/01",
    note: "客服詢問刀模規格中",
  },
  {
    id: "Q-20260418-014",
    date: "2026/04/18",
    items: "客製禮盒 × 200 / 燙金 + 局部上光",
    estimatedAmount: 18000,
    status: "confirmed" as QuoteStatus,
    expiresAt: "2026/04/25",
  },
  {
    id: "Q-20260410-009",
    date: "2026/04/10",
    items: "客製腰封 × 10,000 / 全彩",
    estimatedAmount: 4500,
    status: "expired" as QuoteStatus,
    expiresAt: "2026/04/17",
  },
  {
    id: "Q-20260428-001",
    date: "2026/04/28",
    items: "16oz 客製雙層中空杯 × 3,000",
    estimatedAmount: 6600,
    status: "draft" as QuoteStatus,
    expiresAt: "—",
  },
];

const FILTERS: { id: QuoteStatus | "all"; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "draft", label: "草稿" },
  { id: "sent-to-line", label: "已送 LINE" },
  { id: "confirmed", label: "已成交" },
  { id: "expired", label: "已過期" },
];

/* ============== Component ============== */

type ViewMode = "business" | "personal";

export function MemberQuoteListMockup({
  annotations = false,
  pageId = "members-quote-list",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [view, setView] = useState<ViewMode>("business");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "all">("all");

  const filtered = statusFilter === "all"
    ? QUOTES
    : QUOTES.filter((q) => q.status === statusFilter);

  return (
    <MockupShell url="https://hjhj.com.tw/members/quote-list">
      <MockupSiteHeader />

      {/* Demo toggle */}
      <div className="border-b-2 border-dashed border-amber-300 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] items-center gap-3 text-xs">
          <span className="rounded-full bg-amber-700 px-2 py-0.5 font-bold text-white">
            DEMO
          </span>
          <span className="text-zinc-700">切換預覽會員類型：</span>
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
                {v === "personal" ? "個人會員" : "企業客戶"}
              </button>
            ))}
          </div>
          <span className="ml-auto text-zinc-500 italic">
            （此功能可能僅限企業客戶 — 見 Q1）
          </span>
        </div>
      </div>

      {/* Breadcrumb */}
      <section className="border-b border-zinc-200 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/members" className="hover:text-zinc-900">
            會員首頁
          </Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="font-semibold text-zinc-900">我的詢價紀錄</span>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white px-6 py-5">
        <div className="mx-auto max-w-[1760px]">
          <h1 className="text-2xl font-bold text-zinc-900">我的詢價紀錄</h1>
          <p className="mt-1 text-sm text-zinc-500">
            私版客製商品的詢價歷程，含草稿、已送出、已成交、已過期狀態
          </p>
        </div>
      </section>

      {/* Personal member: 升級為企業客戶 引導 */}
      {view === "personal" ? (
        <Questioned
          show={annotations}
          questions={[Q1]}
          pageId={pageId}
          position="top-right"
        >
          <section className="bg-zinc-50/40 px-6 py-12">
            <div className="mx-auto max-w-2xl rounded-xl border-2 border-amber-300 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <FileTextIcon />
              </div>
              <h2 className="mt-4 text-xl font-bold text-zinc-900">
                私版客製詢價，目前僅供企業客戶使用
              </h2>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                如您有客製化、大量採購或客製印刷需求，建議升級為「企業客戶」帳號，可享：
              </p>
              <ul className="mx-auto mt-3 max-w-sm text-left text-sm text-zinc-700 space-y-1">
                <li>• 私版即時報價系統</li>
                <li>• LINE 客服直接溝通規格</li>
                <li>• 企業合約價（合作客戶等級）</li>
                <li>• 多門市配送地址</li>
                <li>• 統編發票自動歸戶</li>
              </ul>
              <Link
                href="/modules/members/settings"
                className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-amber-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-800"
              >
                升級為企業客戶
              </Link>
              <p className="mt-3 text-xs text-zinc-400">
                （或直接聯繫客服詢問少量客製方案）
              </p>
            </div>
          </section>
        </Questioned>
      ) : (
        <>
          {/* Business member: full quote list */}
          {/* Filters */}
          <section className="border-b border-zinc-200 bg-zinc-50/50 px-6 py-4">
            <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-3 text-xs">
              <FilterIcon />
              <span className="text-zinc-500">狀態：</span>
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id as QuoteStatus | "all")}
                  className={`rounded-full border px-3 py-1 font-medium transition-colors ${
                    statusFilter === f.id
                      ? "border-amber-700 bg-amber-700 text-white"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-amber-400"
                  }`}
                >
                  {f.label}
                </button>
              ))}
              <span className="ml-auto text-zinc-500">
                共 <span className="font-bold text-zinc-900">{filtered.length}</span> 筆
              </span>
            </div>
          </section>

          {/* Quote list */}
          <section className="bg-white px-6 py-6">
            <div className="mx-auto max-w-[1760px] space-y-3">
              {filtered.map((q, idx) => {
                const meta = STATUS_META[q.status];
                return (
                  <article
                    key={q.id}
                    className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-zinc-400">
                            {q.id}
                          </span>
                          <span className="text-zinc-300">·</span>
                          <span className="text-xs text-zinc-500">
                            建立於 {q.date}
                          </span>
                        </div>
                        <h3 className="mt-2 text-base font-bold text-zinc-900">
                          {q.items}
                        </h3>
                        {q.note && (
                          <p className="mt-1 text-xs text-zinc-500">
                            ※ {q.note}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.cls}`}
                        >
                          {meta.label}
                          {meta.sub && (
                            <span className="ml-1 text-[10px] opacity-70">
                              · {meta.sub}
                            </span>
                          )}
                        </span>
                        <div className="text-right">
                          {q.estimatedAmount > 0 ? (
                            <div className="font-mono text-base font-bold text-zinc-900">
                              NT$ {q.estimatedAmount.toLocaleString()}
                            </div>
                          ) : (
                            <span className="text-xs text-zinc-400">
                              估價中
                            </span>
                          )}
                          <div className="mt-0.5 text-xs text-zinc-500">
                            {q.status === "expired" || q.status === "draft"
                              ? "—"
                              : `有效至 ${q.expiresAt}`}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-zinc-100 pt-3">
                      {q.status === "confirmed" &&
                        (idx === 2 ? (
                          <Questioned
                            show={annotations}
                            questions={[Q3]}
                            pageId={pageId}
                            position="top-right"
                          >
                            <Link
                              href="/modules/members/orders/HJ-20260427-001"
                              className="rounded-md bg-amber-700 px-4 py-2 text-xs font-bold text-white hover:bg-amber-800"
                            >
                              轉訂單 →
                            </Link>
                          </Questioned>
                        ) : (
                          <Link
                            href="/modules/members/orders/HJ-20260427-001"
                            className="rounded-md bg-amber-700 px-4 py-2 text-xs font-bold text-white hover:bg-amber-800"
                          >
                            轉訂單 →
                          </Link>
                        ))}

                      {q.status === "expired" &&
                        (idx === 3 ? (
                          <Questioned
                            show={annotations}
                            questions={[Q2]}
                            pageId={pageId}
                            position="top-right"
                          >
                            <button className="rounded-md bg-amber-700 px-4 py-2 text-xs font-bold text-white hover:bg-amber-800">
                              一鍵重新詢價
                            </button>
                          </Questioned>
                        ) : (
                          <button className="rounded-md bg-amber-700 px-4 py-2 text-xs font-bold text-white hover:bg-amber-800">
                            一鍵重新詢價
                          </button>
                        ))}

                      {q.status === "sent-to-line" && (
                        <button className="flex items-center gap-1.5 rounded-md border border-emerald-500 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100">
                          <LineIcon />
                          至 LINE 查看
                        </button>
                      )}

                      {q.status === "draft" && (
                        <button className="rounded-md bg-amber-700 px-4 py-2 text-xs font-bold text-white hover:bg-amber-800">
                          編輯送出
                        </button>
                      )}

                      <button className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50">
                        查看明細
                      </button>
                      <button className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-500 hover:bg-zinc-50 hover:text-rose-700">
                        刪除
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Back link */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/modules/members"
                className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900"
              >
                <ChevronLeft />
                返回會員首頁
              </Link>
            </div>
          </section>
        </>
      )}

      <MockupSiteFooter />
    </MockupShell>
  );
}
