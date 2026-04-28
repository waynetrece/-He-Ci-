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
  question: "會員中心的歷史訂單預設顯示哪些資料？例如：近 30 天 / 近 3 個月 / 全部訂單，以及是否要依狀態篩選？",
  context:
    "目前先以這樣示意：① 預設顯示「近 30 天」② 提供時間範圍切換（近 7 天 / 近 30 天 / 近 3 個月 / 全部）③ 提供狀態篩選（待確認 / 已成立 / 備貨中 / 已出貨 / 已完成 / 已取消）。想請 HJ 確認預設範圍與篩選需求。匯出 Excel 屬於後台訂單管理功能，會員前台不放。",
  clientRef: {
    source: "前台 / 會員 (1)",
    quote: "查詢歷史訂單，可再購買一次按鈕",
    note: "需求表寫了「訂單資料匯出」，但匯出屬後台管理員功能，不是會員前台功能；會員前台只保留查詢、篩選、查看詳情、再訂一次。",
  },
};

const Q2 = {
  no: "Q2",
  question: "「再訂一次」遇到混合公版＋私版的訂單，是否要分項處理（公版直接加購、私版重新詢價）？",
  context:
    "目前先以這樣示意：列表頁的「再訂一次」按鈕點下會跳到訂單詳情頁，再由詳情頁的逐項按鈕分流（公版加購物車 / 私版重新詢價）。原因：在列表只能看到摘要，無法判斷哪些是公版哪些是私版。",
  clientRef: {
    source: "前台 / 會員 (1) + 私版商品系列 (1)(2)",
    quote: "可再購買一次按鈕；複雜客製商品轉 LINE 客服報價",
    note: "需求表寫了「再購買一次」但未細分混合訂單的處理方式。",
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

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function ChevronLeft({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

/* ============== Data ============== */

type OrderStatus = "pending" | "confirmed" | "preparing" | "shipped" | "completed" | "cancelled";

const STATUS_META: Record<OrderStatus, { label: string; cls: string }> = {
  pending: { label: "待確認", cls: "bg-zinc-100 text-zinc-700" },
  confirmed: { label: "已成立", cls: "bg-sky-100 text-sky-800" },
  preparing: { label: "備貨中", cls: "bg-amber-100 text-amber-800" },
  shipped: { label: "已出貨", cls: "bg-emerald-100 text-emerald-800" },
  completed: { label: "已完成", cls: "bg-zinc-100 text-zinc-700" },
  cancelled: { label: "已取消", cls: "bg-rose-100 text-rose-700" },
};

const ORDERS = [
  { id: "HJ-20260427-001", date: "2026/04/27", items: "12oz 客製紙杯 × 5,000 + 客製紙杯 × 3,000", types: ["公版", "私版"] as const, amount: 13903, status: "shipped" as OrderStatus },
  { id: "HJ-20260420-008", date: "2026/04/20", items: "牛皮紙便當盒 × 2,000 + 餐具組 × 1,000", types: ["公版"] as const, amount: 12800, status: "completed" as OrderStatus },
  { id: "HJ-20260415-003", date: "2026/04/15", items: "客製模切紙袋 × 500", types: ["私版"] as const, amount: 0, status: "preparing" as OrderStatus, note: "客服報價中" },
  { id: "HJ-20260408-012", date: "2026/04/08", items: "PLA 環保杯 × 2,000", types: ["公版"] as const, amount: 5600, status: "completed" as OrderStatus },
  { id: "HJ-20260330-005", date: "2026/03/30", items: "客製腰封 × 5,000", types: ["私版"] as const, amount: 2500, status: "completed" as OrderStatus },
  { id: "HJ-20260322-001", date: "2026/03/22", items: "8oz 紙杯 × 10,000", types: ["公版"] as const, amount: 15000, status: "cancelled" as OrderStatus },
];

const TIME_RANGES = [
  { id: "7d", label: "近 7 天" },
  { id: "30d", label: "近 30 天", active: true },
  { id: "3m", label: "近 3 個月" },
  { id: "all", label: "全部" },
];

/* ============== Component ============== */

export function MemberOrdersListMockup({
  annotations = false,
  pageId = "members-orders",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const filteredOrders = statusFilter === "all"
    ? ORDERS
    : ORDERS.filter((o) => o.status === statusFilter);

  return (
    <MockupShell url="https://hjhj.com.tw/members/orders">
      <MockupSiteHeader />

      {/* Breadcrumb */}
      <section className="border-b border-zinc-200 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/members" className="hover:text-zinc-900">
            會員首頁
          </Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="font-semibold text-zinc-900">歷史訂單</span>
        </div>
      </section>

      {/* Header */}
      <section className="border-b border-zinc-200 bg-white px-6 py-5">
        <div className="mx-auto max-w-[1760px]">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">歷史訂單</h1>
            <p className="mt-1 text-sm text-zinc-500">
              共 <span className="font-bold text-zinc-900">{filteredOrders.length}</span> 筆訂單
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-zinc-200 bg-zinc-50/50 px-6 py-4">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-4">
          {/* Time range */}
          <div className="flex items-center gap-1 rounded-md bg-white p-1 shadow-sm border border-zinc-200">
            {TIME_RANGES.map((r) => (
              <button
                key={r.id}
                className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                  r.active
                    ? "bg-amber-700 text-white"
                    : "text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <span className="text-zinc-300">|</span>

          {/* Status filter */}
          <Questioned
            show={annotations}
            questions={[Q1]}
            pageId={pageId}
            position="top-right"
          >
            <div className="flex items-center gap-1.5 text-xs">
              <FilterIcon />
              <span className="text-zinc-500">狀態：</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "all")}
                className="rounded-md border border-zinc-300 bg-white px-2 py-1"
              >
                <option value="all">全部</option>
                {Object.entries(STATUS_META).map(([key, m]) => (
                  <option key={key} value={key}>{m.label}</option>
                ))}
              </select>
            </div>
          </Questioned>

          {/* Search */}
          <div className="ml-auto flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs w-72">
            <SearchIcon />
            <input
              type="text"
              placeholder="搜尋訂單號 / 商品名稱"
              className="flex-1 bg-transparent placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Orders table */}
      <section className="bg-white px-6 py-6">
        <div className="mx-auto max-w-[1760px]">
          <div className="overflow-hidden rounded-lg border border-zinc-200">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-xs text-zinc-500 border-b border-zinc-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">訂單號</th>
                  <th className="px-4 py-3 text-left font-medium">日期</th>
                  <th className="px-4 py-3 text-left font-medium">商品摘要</th>
                  <th className="px-4 py-3 text-left font-medium">類型</th>
                  <th className="px-4 py-3 text-right font-medium">金額</th>
                  <th className="px-4 py-3 text-center font-medium">狀態</th>
                  <th className="px-4 py-3 text-right font-medium">動作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredOrders.map((o, idx) => {
                  const statusMeta = STATUS_META[o.status];
                  const reorderBtn = (
                    <Link
                      href={`/modules/members/orders/${o.id}`}
                      className="inline-flex items-center gap-1 rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
                    >
                      <RepeatIcon />
                      再訂一次
                    </Link>
                  );

                  return (
                    <tr key={o.id} className="hover:bg-zinc-50/60">
                      <td className="px-4 py-3 font-mono text-xs">
                        <Link
                          href={`/modules/members/orders/${o.id}`}
                          className="text-zinc-700 hover:text-amber-700 hover:underline"
                        >
                          {o.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-zinc-600">{o.date}</td>
                      <td className="px-4 py-3 text-zinc-800 max-w-[280px] truncate">
                        {o.items}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {o.types.map((t) => (
                            <span
                              key={t}
                              className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                                t === "公版"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-indigo-100 text-indigo-800"
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-zinc-700">
                        {o.amount > 0
                          ? `NT$ ${o.amount.toLocaleString()}`
                          : <span className="text-zinc-400 text-xs">{o.note ?? "—"}</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusMeta.cls}`}
                        >
                          {statusMeta.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          {idx === 0 ? (
                            <Questioned
                              show={annotations}
                              questions={[Q2]}
                              pageId={pageId}
                              position="top-right"
                            >
                              {reorderBtn}
                            </Questioned>
                          ) : (
                            o.status !== "cancelled" && reorderBtn
                          )}
                          <Link
                            href={`/modules/members/orders/${o.id}`}
                            className="text-xs text-amber-700 hover:underline"
                          >
                            查看 →
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="text-xs text-zinc-500">
              顯示 1-{filteredOrders.length} / 共 {filteredOrders.length} 筆
            </span>
            <div className="flex items-center gap-1">
              <button className="flex size-8 items-center justify-center rounded border border-zinc-200 text-zinc-400">
                <ChevronLeft />
              </button>
              <button className="size-8 rounded bg-amber-700 font-bold text-white">1</button>
              <button className="size-8 rounded border border-zinc-200 text-zinc-700 hover:bg-zinc-50">2</button>
              <button className="size-8 rounded border border-zinc-200 text-zinc-700 hover:bg-zinc-50">3</button>
              <button className="flex size-8 items-center justify-center rounded border border-zinc-200 text-zinc-700 hover:bg-zinc-50">
                <ChevronLeft className="rotate-180" />
              </button>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/modules/members"
              className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900"
            >
              <ChevronLeft />
              返回會員首頁
            </Link>
          </div>
        </div>
      </section>

      <MockupSiteFooter />
    </MockupShell>
  );
}
