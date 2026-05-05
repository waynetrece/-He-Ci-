"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

// 32 題 review 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 訂單狀態 6 個:待付款/已付款/備貨中/已出貨/已完成/已取消(B 包 Q-B2)
// - 已退款狀態 = 第 7 個(B 包 Q-B2 / E 包 Q-E10)
// - 凌越歷史訂單 default 近 2 年(C 包 Q-C3)— 與網站訂單合併顯示
// - 「再購買」按鈕(C 包)
// - 物流追蹤連結 = 系統依物流商產生查詢頁連結模板,客戶點過去到物流商官網(B 包 Q-B3)
// - 公版 / 私版 / 樣品 三類訂單後台分開列(A 包 Q-A2 / Q-A9)
// - 已出貨後 7 天系統自動跳「已完成」(B 包)

type OrderStatus = "unpaid" | "paid" | "preparing" | "shipped" | "completed" | "cancelled" | "refunded";

const STATUS_META: Record<OrderStatus, { label: string; cls: string; dot: string }> = {
  unpaid: { label: "待付款", cls: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
  paid: { label: "已付款", cls: "bg-sky-100 text-sky-800", dot: "bg-sky-500" },
  preparing: { label: "備貨中", cls: "bg-violet-100 text-violet-800", dot: "bg-violet-500" },
  shipped: { label: "已出貨", cls: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  completed: { label: "已完成", cls: "bg-zinc-200 text-zinc-700", dot: "bg-zinc-500" },
  cancelled: { label: "已取消", cls: "bg-rose-100 text-rose-700", dot: "bg-rose-500" },
  refunded: { label: "已退款", cls: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
};

type Source = "site" | "lyserp"; // 網站新訂單 vs 凌越歷史

type Order = {
  id: string;
  date: string;
  source: Source;
  itemSummary: string;
  itemCount: number;
  type: "公版" | "私版" | "樣品";
  amount: number;
  status: OrderStatus;
  hasShipping?: boolean;
  shippingCarrier?: string;
  shippingTracking?: string;
};

const ORDERS: Order[] = [
  // 網站新訂單
  { id: "HJ-2026-0505-0042", date: "2026/05/05", source: "site", itemSummary: "12oz 公版瓦楞紙杯 × 2 箱 + 8oz × 5 條 + 90mm 平蓋 × 5 條", itemCount: 3, type: "公版", amount: 4856, status: "paid" },
  { id: "HJ-2026-0501-0023", date: "2026/05/01", source: "site", itemSummary: "PLA 環保杯 12oz × 1 箱", itemCount: 1, type: "公版", amount: 2100, status: "shipped", hasShipping: true, shippingCarrier: "黑貓宅配", shippingTracking: "T20260501234" },
  { id: "HJ-2026-0428-0011", date: "2026/04/28", source: "site", itemSummary: "客製禮盒 × 200(私版)", itemCount: 1, type: "私版", amount: 18000, status: "preparing" },
  { id: "HJ-2026-0425-0008", date: "2026/04/25", source: "site", itemSummary: "牛皮紙提袋 × 5 條", itemCount: 1, type: "公版", amount: 1050, status: "completed" },
  { id: "HJ-2026-0418-0003", date: "2026/04/18", source: "site", itemSummary: "16oz PLA 杯 × 2 箱", itemCount: 1, type: "公版", amount: 5200, status: "refunded" },
  { id: "HJ-2026-0410-0001", date: "2026/04/10", source: "site", itemSummary: "8oz 公版紙杯 × 1 箱", itemCount: 1, type: "公版", amount: 1800, status: "cancelled" },

  // 凌越歷史訂單(近 2 年,default)
  { id: "LY-2025-1208-1003", date: "2025/12/08", source: "lyserp", itemSummary: "公版便當盒 × 5 箱", itemCount: 1, type: "公版", amount: 27000, status: "completed" },
  { id: "LY-2025-1015-0892", date: "2025/10/15", source: "lyserp", itemSummary: "客製紙杯 5,000 個 + 杯蓋 5,000 個", itemCount: 2, type: "私版", amount: 35000, status: "completed" },
  { id: "LY-2025-0820-0612", date: "2025/08/20", source: "lyserp", itemSummary: "公版紙杯 8oz × 10 箱", itemCount: 1, type: "公版", amount: 18000, status: "completed" },
];

const TIME_RANGES = [
  { id: "30d", label: "近 30 天" },
  { id: "3m", label: "近 3 個月" },
  { id: "1y", label: "近 1 年" },
  { id: "2y", label: "近 2 年", default: true }, // C 包 default
  { id: "all", label: "全部" },
];

export function MemberOrdersListMockup({
  annotations: _annotations,
  pageId: _pageId,
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "公版" | "私版" | "樣品">("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | Source>("all");
  const [search, setSearch] = useState("");
  const [timeRange, setTimeRange] = useState("2y");

  const filtered = ORDERS.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (typeFilter !== "all" && o.type !== typeFilter) return false;
    if (sourceFilter !== "all" && o.source !== sourceFilter) return false;
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.itemSummary.includes(search)) return false;
    return true;
  });

  const statusCounts: Record<OrderStatus | "all", number> = {
    all: ORDERS.length,
    unpaid: 0, paid: 0, preparing: 0, shipped: 0, completed: 0, cancelled: 0, refunded: 0,
  };
  ORDERS.forEach((o) => { statusCounts[o.status]++; });

  return (
    <MockupShell url="https://hj.example.com/member/orders">
      <MockupSiteHeader />

      <div className="bg-zinc-50 px-6 py-8">
        <div className="mx-auto grid max-w-[1760px] grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="rounded-xl border border-zinc-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-3 border-b border-zinc-100 pb-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">陳</div>
              <div>
                <div className="text-sm font-bold text-zinc-900">陳老闆</div>
                <div className="text-xs text-zinc-500">北部直客 · VIP</div>
              </div>
            </div>
            <nav className="space-y-1 text-sm">
              {[
                { l: "會員儀表板", h: "/modules/members" },
                { l: "訂單列表", h: "/modules/members/orders", active: true },
                { l: "詢價單", h: "/modules/members/quote-list" },
                { l: "樣品申請", h: "/modules/members/samples" },
                { l: "收件地址簿", h: "/modules/members/addresses" },
                { l: "個人資料", h: "/modules/members/settings" },
              ].map((n) => (
                <Link key={n.l} href={n.h} className={`block rounded px-3 py-2 ${n.active ? "bg-amber-50 font-medium text-amber-700" : "text-zinc-700 hover:bg-zinc-50"}`}>
                  {n.l}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Body */}
          <div className="col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-zinc-900">訂單列表</h1>
                <p className="mt-1 text-xs text-zinc-500">
                  顯示網站新訂單 + 凌越歷史訂單(default 近 2 年)。共 {filtered.length} / {ORDERS.length} 筆。
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="rounded-xl border border-zinc-200 bg-white p-4 space-y-3">
              {/* Search */}
              <div className="flex gap-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="搜尋訂單編號 / 商品名稱..."
                  className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
                />
                <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="rounded-md border border-zinc-300 px-3 py-2 text-sm">
                  {TIME_RANGES.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}{r.default && "(預設)"}</option>
                  ))}
                </select>
              </div>

              {/* Type + Source filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-zinc-500">類型:</span>
                {([
                  { id: "all" as const, l: "全部" },
                  { id: "公版" as const, l: "公版" },
                  { id: "私版" as const, l: "私版" },
                  { id: "樣品" as const, l: "樣品" },
                ]).map((f) => (
                  <button key={f.id} onClick={() => setTypeFilter(f.id)} className={`rounded-full border px-3 py-1 ${typeFilter === f.id ? "border-amber-500 bg-amber-50 text-amber-800 font-medium" : "border-zinc-300 bg-white text-zinc-700 hover:border-amber-300"}`}>
                    {f.l}
                  </button>
                ))}
                <span className="ml-3 text-zinc-500">來源:</span>
                {([
                  { id: "all" as const, l: "全部" },
                  { id: "site" as const, l: "網站訂單" },
                  { id: "lyserp" as const, l: "凌越歷史" },
                ]).map((f) => (
                  <button key={f.id} onClick={() => setSourceFilter(f.id)} className={`rounded-full border px-3 py-1 ${sourceFilter === f.id ? "border-amber-500 bg-amber-50 text-amber-800 font-medium" : "border-zinc-300 bg-white text-zinc-700 hover:border-amber-300"}`}>
                    {f.l}
                  </button>
                ))}
              </div>

              {/* Status pills */}
              <div className="flex flex-wrap gap-2 border-t border-zinc-100 pt-3 text-xs">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`rounded-full px-3 py-1 ${statusFilter === "all" ? "bg-zinc-900 text-white font-bold" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`}
                >
                  全部({statusCounts.all})
                </button>
                {(Object.entries(STATUS_META) as [OrderStatus, typeof STATUS_META[OrderStatus]][]).map(([key, meta]) => (
                  <button
                    key={key}
                    onClick={() => setStatusFilter(key)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${statusFilter === key ? `${meta.cls} font-bold ring-2 ring-amber-400` : `${meta.cls} hover:opacity-80`}`}
                  >
                    <span className={`size-1.5 rounded-full ${meta.dot}`} />
                    {meta.label}({statusCounts[key]})
                  </button>
                ))}
              </div>
            </div>

            {/* Order cards */}
            <div className="mt-4 space-y-3">
              {filtered.length === 0 ? (
                <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center">
                  <div className="text-sm font-medium text-zinc-900">沒有符合條件的訂單</div>
                  <p className="mt-1 text-xs text-zinc-500">嘗試調整篩選條件</p>
                </div>
              ) : (
                filtered.map((o) => {
                  const meta = STATUS_META[o.status];
                  return (
                    <article key={o.id} className="rounded-xl border border-zinc-200 bg-white p-5 hover:border-amber-300 hover:shadow-sm transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <Link href={`/modules/members/orders/${o.id}`} className="font-mono font-bold text-zinc-900 hover:text-amber-700">
                              {o.id}
                            </Link>
                            <span className="text-zinc-300">·</span>
                            <span className="text-zinc-500">{o.date}</span>
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${meta.cls}`}>
                              <span className={`size-1.5 rounded-full ${meta.dot}`} />
                              {meta.label}
                            </span>
                            <span className={`rounded-full border px-2 py-0.5 ${o.type === "公版" ? "border-amber-300 text-amber-700" : o.type === "私版" ? "border-violet-300 text-violet-700" : "border-emerald-300 text-emerald-700"}`}>
                              {o.type}
                            </span>
                            {o.source === "lyserp" && (
                              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-indigo-700">凌越歷史</span>
                            )}
                          </div>

                          {/* Items */}
                          <div className="mt-2 text-sm text-zinc-700">
                            {o.itemSummary}
                          </div>

                          {/* Shipping tracking */}
                          {o.hasShipping && o.status === "shipped" && (
                            <div className="mt-2 flex items-center gap-2 text-xs">
                              <span className="text-zinc-500">物流:</span>
                              <span className="text-zinc-700">{o.shippingCarrier}</span>
                              <span className="font-mono text-zinc-500">{o.shippingTracking}</span>
                              <a className="rounded-md border border-zinc-300 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-700 hover:border-amber-400 hover:text-amber-700">
                                查詢運送狀態 →
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Right: amount + actions */}
                        <div className="text-right shrink-0">
                          <div className="text-xs text-zinc-500">總金額</div>
                          <div className="text-lg font-bold text-zinc-900">NT$ {o.amount.toLocaleString()}</div>
                          <div className="mt-3 flex flex-col gap-1.5">
                            <Link
                              href={`/modules/members/orders/${o.id}`}
                              className="rounded-md bg-amber-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-amber-700"
                            >
                              查看詳情
                            </Link>
                            {o.status === "completed" && o.type === "公版" && (
                              <Link
                                href="/modules/cart"
                                className="rounded-md border border-zinc-300 bg-white px-4 py-1.5 text-xs text-zinc-700 hover:border-amber-400 hover:text-amber-700"
                              >
                                再訂一次
                              </Link>
                            )}
                            {o.status === "completed" && o.type === "私版" && (
                              <Link
                                href="/modules/private-quote"
                                className="rounded-md border border-zinc-300 bg-white px-4 py-1.5 text-xs text-zinc-700 hover:border-amber-400 hover:text-amber-700"
                              >
                                再次詢價
                              </Link>
                            )}
                            {o.status === "unpaid" && (
                              <Link
                                href="/modules/checkout/payment"
                                className="rounded-md border border-amber-400 bg-amber-50 px-4 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100"
                              >
                                完成付款
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Notice for unpaid */}
                      {o.status === "unpaid" && (
                        <div className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
                          ⚠ 此訂單尚未付款,請於 7 天內完成匯款,逾期將自動取消。
                        </div>
                      )}
                    </article>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-500">←</button>
                {[1, 2, 3].map((p) => (
                  <button key={p} className={`size-9 rounded-md text-sm font-medium ${p === 1 ? "bg-amber-500 text-white" : "border border-zinc-300 bg-white text-zinc-700"}`}>{p}</button>
                ))}
                <button className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700">→</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MockupSiteFooter />
    </MockupShell>
  );
}
