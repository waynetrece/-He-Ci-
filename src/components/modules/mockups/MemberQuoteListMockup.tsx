"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

// 32 題 review A 包 + C 包 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 私版詢價單 = LINE 議價流程(沒有過期概念,Q-A 不採用「報價有效期」)
// - 提交後跳 LINE 自動帶詢價單編號
// - 業務後台手動觸發「詢價單轉訂單」+ 進凌越(Q-A8)
// - 訂金 = 私下匯款,業務後台確認後轉訂單
// - 不分「個人 / 企業」分流,統一一個流程(C 包)
// - 公版/私版/樣品 三條流程完全分開(Q-A9)
//
// 已 deprecated 概念(原 mockup 有,review 不採用):
// - 個人會員「升級為企業客戶」引導(原 personal toggle)
// - 詢價單有效期 / 已過期狀態 / 一鍵重新詢價
// - 會員側「轉訂單」按鈕(改為業務後台手動觸發)

/* ============== Icons ============== */

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
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

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

/* ============== Data ============== */

// 詢價單狀態(A 包流程):
// - draft = 本地草稿,未送出
// - waiting-line = 已送出 LINE,等業務聯繫
// - quoted = 業務已 LINE 報價,等會員確認 + 匯款訂金
// - converted = 業務後台已轉為訂單(進凌越)
// - cancelled = 已取消
type QuoteStatus = "draft" | "waiting-line" | "quoted" | "converted" | "cancelled";

const STATUS_META: Record<
  QuoteStatus,
  { label: string; cls: string; sub?: string }
> = {
  draft: { label: "草稿", cls: "bg-zinc-100 text-zinc-700", sub: "尚未送出" },
  "waiting-line": {
    label: "等業務 LINE 聯繫",
    cls: "bg-amber-100 text-amber-800",
    sub: "業務會主動加 LINE",
  },
  quoted: {
    label: "已報價・等匯款",
    cls: "bg-violet-100 text-violet-800",
    sub: "確認規格後匯訂金",
  },
  converted: {
    label: "已轉訂單",
    cls: "bg-emerald-100 text-emerald-800",
    sub: "業務後台已轉",
  },
  cancelled: {
    label: "已取消",
    cls: "bg-zinc-100 text-zinc-500",
  },
};

type QuoteDetail = {
  product: string;
  quantity: string;
  specs: string[];
  files: { name: string; size: string; channel: "LINE 上傳" | "LINE 連結" }[];
  pricing: { item: string; price: string }[];
  history: { time: string; event: string; by: "會員" | "HJ 業務" | "系統" }[];
};

const QUOTES: {
  id: string;
  date: string;
  items: string;
  estimatedAmount: number;
  status: QuoteStatus;
  note?: string;
  convertedOrderId?: string;
  detail: QuoteDetail;
}[] = [
  {
    id: "PQ-2026-0428-001",
    date: "2026/04/28",
    items: "16oz 客製雙層中空杯 × 3,000",
    estimatedAmount: 0,
    status: "draft",
    detail: {
      product: "16oz 雙層中空杯",
      quantity: "3,000 入(草稿)",
      specs: [
        "杯型:16oz / 雙層中空",
        "材質:白底紙 280g",
        "印刷:單面 CMYK(草稿)",
      ],
      files: [],
      pricing: [{ item: "尚未送出,僅本地草稿", price: "—" }],
      history: [{ time: "2026/04/28 09:15", event: "會員建立草稿", by: "會員" }],
    },
  },
  {
    id: "PQ-2026-0427-002",
    date: "2026/04/27",
    items: "12oz 客製紙杯 × 5,000 / 雙面全彩 + 燙金",
    estimatedAmount: 0,
    status: "waiting-line",
    note: "業務:王業務 / LINE @hj-sales-wang(已加好友)",
    detail: {
      product: "12oz 客製紙杯",
      quantity: "5,000 入",
      specs: [
        "杯型:12oz / 直筒",
        "材質:白底紙 280g + PE 內膜",
        "印刷:CMYK 雙面全彩",
        "加工:杯口燙金 1 處",
      ],
      files: [
        { name: "design-final.ai (8.4 MB)", size: "已透過 LINE 傳檔", channel: "LINE 上傳" },
        { name: "color-spec.pdf (1.2 MB)", size: "已透過 LINE 傳檔", channel: "LINE 上傳" },
      ],
      pricing: [{ item: "業務評估中,將於 LINE 報價", price: "—" }],
      history: [
        { time: "2026/04/27 14:32", event: "會員送出詢價單,系統跳 LINE 自動帶編號", by: "系統" },
        { time: "2026/04/27 14:35", event: "會員加王業務 LINE 好友", by: "會員" },
        { time: "2026/04/27 16:10", event: "業務已收到,LINE 詢問印刷顏色細節", by: "HJ 業務" },
      ],
    },
  },
  {
    id: "PQ-2026-0418-014",
    date: "2026/04/18",
    items: "客製禮盒 × 200 / 燙金 + 局部上光",
    estimatedAmount: 18000,
    status: "quoted",
    note: "業務已 LINE 報價,請確認規格並匯訂金 NT$ 5,400(30%)",
    detail: {
      product: "客製禮盒(天地蓋)",
      quantity: "200 入",
      specs: [
        "尺寸:20 × 20 × 8 cm",
        "材質:銅版紙 350g",
        "印刷:CMYK 全彩",
        "加工:燙金 + 局部上光",
      ],
      files: [
        { name: "box-final.pdf (12.6 MB)", size: "已透過 LINE 傳檔", channel: "LINE 上傳" },
      ],
      pricing: [
        { item: "印刷費", price: "NT$ 12,000" },
        { item: "燙金 + 局部上光", price: "NT$ 4,000" },
        { item: "盒型加工", price: "NT$ 2,000" },
        { item: "合計(LINE 報價)", price: "NT$ 18,000" },
        { item: "訂金 30%(私下匯款)", price: "NT$ 5,400" },
      ],
      history: [
        { time: "2026/04/18 10:00", event: "會員送出詢價單", by: "會員" },
        { time: "2026/04/19 14:00", event: "業務 LINE 報價 NT$ 18,000", by: "HJ 業務" },
        { time: "2026/04/20 09:00", event: "會員 LINE 確認規格", by: "會員" },
      ],
    },
  },
  {
    id: "PQ-2026-0410-009",
    date: "2026/04/10",
    items: "客製腰封 × 10,000 / 全彩",
    estimatedAmount: 4500,
    status: "converted",
    note: "業務已將此詢價單轉為訂單 HJ-20260415-003",
    convertedOrderId: "HJ-20260415-003",
    detail: {
      product: "客製紙腰封",
      quantity: "10,000 入",
      specs: ["材質:銅版紙 150g", "印刷:CMYK 全彩"],
      files: [
        { name: "logo-final.ai (3.2 MB)", size: "已透過 LINE 傳檔", channel: "LINE 上傳" },
      ],
      pricing: [
        { item: "印刷費", price: "NT$ 4,500" },
        { item: "已收訂金", price: "NT$ 1,350(已匯款)" },
      ],
      history: [
        { time: "2026/04/10 15:00", event: "會員送出詢價單", by: "會員" },
        { time: "2026/04/11 10:00", event: "業務 LINE 報價 NT$ 4,500", by: "HJ 業務" },
        { time: "2026/04/12 09:00", event: "會員確認規格,匯訂金", by: "會員" },
        { time: "2026/04/13 14:00", event: "業務後台轉訂單 HJ-20260415-003,已進凌越", by: "HJ 業務" },
      ],
    },
  },
  {
    id: "PQ-2026-0330-005",
    date: "2026/03/30",
    items: "客製紙袋 × 1,000(取消)",
    estimatedAmount: 0,
    status: "cancelled",
    note: "客戶調整需求,改採公版商品",
    detail: {
      product: "客製紙袋",
      quantity: "1,000 入",
      specs: ["材質:牛皮紙 200g", "印刷:單色印刷"],
      files: [],
      pricing: [{ item: "已取消", price: "—" }],
      history: [
        { time: "2026/03/30 11:00", event: "會員送出詢價單", by: "會員" },
        { time: "2026/04/01 16:00", event: "會員 LINE 通知:改買公版商品,取消此單", by: "會員" },
      ],
    },
  },
];

const FILTERS: { id: QuoteStatus | "all"; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "draft", label: "草稿" },
  { id: "waiting-line", label: "等業務 LINE 聯繫" },
  { id: "quoted", label: "已報價・等匯款" },
  { id: "converted", label: "已轉訂單" },
  { id: "cancelled", label: "已取消" },
];

/* ============== Component ============== */

export function MemberQuoteListMockup({
  annotations: _annotations,
  pageId: _pageId,
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "all">("all");
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(["PQ-2026-0418-014"]),
  );

  const toggleExpand = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const filtered =
    statusFilter === "all"
      ? QUOTES
      : QUOTES.filter((q) => q.status === statusFilter);

  return (
    <MockupShell url="https://hjhj.com.tw/members/quote-list">
      <MockupSiteHeader />

      {/* Breadcrumb */}
      <section className="border-b border-zinc-200 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/members" className="hover:text-zinc-900">
            會員首頁
          </Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="font-semibold text-zinc-900">私版詢價紀錄</span>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-[1760px] items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">私版詢價紀錄</h1>
            <p className="mt-1 text-sm text-zinc-500">
              客製商品詢價單 · 業務透過 LINE 報價 · 確認規格後匯款訂金
            </p>
          </div>
          <Link
            href="/modules/private-quote/quote-form"
            className="rounded-md bg-violet-700 px-4 py-2 text-sm font-bold text-white hover:bg-violet-800"
          >
            建立新詢價
          </Link>
        </div>
      </section>

      {/* 流程提示 */}
      <section className="border-b border-zinc-200 bg-violet-50/40 px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-violet-900">
          <span className="font-bold">私版詢價流程:</span>
          <span className="ml-2">
            建立詢價 → 跳 LINE 自動帶詢價單編號 → 業務 LINE 報價 → 確認規格 → 匯訂金 → 業務後台轉為訂單
          </span>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-zinc-200 bg-zinc-50/50 px-6 py-4">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-3 text-xs">
          <FilterIcon />
          <span className="text-zinc-500">狀態:</span>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id as QuoteStatus | "all")}
              className={`rounded-full border px-3 py-1 font-medium transition-colors ${
                statusFilter === f.id
                  ? "border-violet-700 bg-violet-700 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-violet-400"
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
          {filtered.map((q) => {
            const meta = STATUS_META[q.status];
            const isOpen = expanded.has(q.id);

            return (
              <article
                key={q.id}
                className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-zinc-400">{q.id}</span>
                      <span className="text-zinc-300">·</span>
                      <span className="text-xs text-zinc-500">建立於 {q.date}</span>
                    </div>
                    <h3 className="mt-2 text-base font-bold text-zinc-900">
                      {q.items}
                    </h3>
                    {q.note && (
                      <p className="mt-1.5 text-xs text-zinc-600">※ {q.note}</p>
                    )}
                    {q.convertedOrderId && (
                      <Link
                        href={`/modules/members/orders/${q.convertedOrderId}`}
                        className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        查看訂單 {q.convertedOrderId} →
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.cls}`}>
                      {meta.label}
                      {meta.sub && (
                        <span className="ml-1 text-[10px] opacity-70">· {meta.sub}</span>
                      )}
                    </span>
                    {q.estimatedAmount > 0 ? (
                      <div className="font-mono text-base font-bold text-zinc-900">
                        NT$ {q.estimatedAmount.toLocaleString()}
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-400">
                        {q.status === "waiting-line"
                          ? "業務評估中"
                          : q.status === "draft"
                            ? "—"
                            : q.status === "cancelled"
                              ? "已取消"
                              : "—"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Detail */}
                {isOpen && (
                  <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50/70 p-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      {/* 規格 */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          商品 / 規格
                        </div>
                        <div className="mt-1.5 text-sm font-semibold text-zinc-900">
                          {q.detail.product}
                        </div>
                        <div className="mt-0.5 text-xs text-zinc-500">
                          數量:{q.detail.quantity}
                        </div>
                        <ul className="mt-2 space-y-1 text-xs text-zinc-700">
                          {q.detail.specs.map((s) => (
                            <li key={s}>· {s}</li>
                          ))}
                        </ul>
                      </div>

                      {/* 報價(LINE 議價結果) */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          報價內容(透過 LINE 議價)
                        </div>
                        <ul className="mt-2 space-y-1 text-xs">
                          {q.detail.pricing.map((p) => (
                            <li
                              key={p.item}
                              className="flex justify-between gap-2 text-zinc-700"
                            >
                              <span>{p.item}</span>
                              <span className="font-mono font-medium text-zinc-900">
                                {p.price}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* LINE 上傳檔案 */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          上傳檔案(透過 LINE)
                        </div>
                        {q.detail.files.length === 0 ? (
                          <p className="mt-2 text-xs text-zinc-400">尚未上傳</p>
                        ) : (
                          <ul className="mt-2 space-y-1.5 text-xs">
                            {q.detail.files.map((f) => (
                              <li
                                key={f.name}
                                className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-2 py-1.5"
                              >
                                <MessageIcon />
                                <span className="truncate font-mono text-zinc-700">
                                  {f.name}
                                </span>
                                <span className="ml-auto rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800">
                                  {f.channel}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* 狀態紀錄 */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          狀態紀錄
                        </div>
                        <ol className="mt-2 space-y-1.5 text-xs">
                          {q.detail.history.map((h) => (
                            <li
                              key={`${h.time}-${h.event}`}
                              className="flex gap-2"
                            >
                              <span className="w-[110px] shrink-0 font-mono text-zinc-400">
                                {h.time}
                              </span>
                              <span className="text-zinc-700">{h.event}</span>
                              <span
                                className={`ml-auto shrink-0 rounded px-1.5 text-[10px] font-medium ${
                                  h.by === "會員"
                                    ? "bg-sky-100 text-sky-800"
                                    : h.by === "HJ 業務"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-zinc-200 text-zinc-700"
                                }`}
                              >
                                {h.by}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-zinc-100 pt-3">
                  {q.status === "draft" && (
                    <Link
                      href="/modules/private-quote/quote-form"
                      className="rounded-md bg-violet-700 px-4 py-2 text-xs font-bold text-white hover:bg-violet-800"
                    >
                      編輯送出
                    </Link>
                  )}

                  {q.status === "waiting-line" && (
                    <a
                      href="https://line.me/R/ti/p/@hj-sales-wang"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-md bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600"
                    >
                      <MessageIcon />
                      在 LINE 上詢問業務
                    </a>
                  )}

                  {q.status === "quoted" && (
                    <a
                      href="https://line.me/R/ti/p/@hj-sales-wang"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-md bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600"
                    >
                      <MessageIcon />
                      在 LINE 確認規格 + 匯款
                    </a>
                  )}

                  {q.status === "converted" && q.convertedOrderId && (
                    <Link
                      href={`/modules/members/orders/${q.convertedOrderId}`}
                      className="rounded-md bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800"
                    >
                      查看訂單 →
                    </Link>
                  )}

                  {q.status === "cancelled" && (
                    <Link
                      href="/modules/private-quote/quote-form"
                      className="rounded-md border border-violet-300 bg-violet-50 px-4 py-2 text-xs font-bold text-violet-800 hover:bg-violet-100"
                    >
                      重新詢價
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleExpand(q.id)}
                    className={`flex items-center gap-1 rounded-md border px-3 py-2 text-xs font-medium transition-colors ${
                      isOpen
                        ? "border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800"
                        : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
                    }`}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "收合明細" : "查看詢價明細"}
                    <ChevronDown className={isOpen ? "rotate-180" : ""} />
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

      <MockupSiteFooter />
    </MockupShell>
  );
}
