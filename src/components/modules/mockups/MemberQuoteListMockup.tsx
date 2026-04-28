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
    "目前先以這樣示意：① 企業會員可使用完整詢價功能 ② 個人會員預設不開放，登入後在此頁顯示「升級為企業客戶」引導。想請 HJ 確認個人會員能否使用私版詢價。",
  clientRef: {
    source: "前台 / 私版商品系列 (1)",
    quote: "客人在網站上點選需求選項得到報價",
    note: "需求表沒指定誰能用私版報價。本提案先預設只企業會員可用，想請 HJ 確認。",
  },
};

const Q2 = {
  no: "Q2",
  question: "詢價單有效期幾天？過期後處理方式？",
  context:
    "目前先以這樣示意：詢價單有效期 7 天，過期後狀態變「已過期」，提供「一鍵重新詢價」按鈕將原規格帶回詢價流程。想請 HJ 指定有效天數與過期處理。",
  clientRef: {
    source: "需求表未提及（補充項）",
    quote: "（這項在需求表沒有對應段落）",
    note: "報價通常需設定有效期限，避免價格與材料條件變動。想請 HJ 指定天數。",
  },
};

const Q3 = {
  no: "Q3",
  question: "詢價單轉訂單的流程？是否需要 LINE 客服確認後才能轉？",
  context:
    "目前先以這樣示意：① 「已成交」狀態的詢價單可直接「轉訂單」進結帳流程 ② 「已送 LINE」狀態需 HJ 客服在 LINE 確認規格與報價後，才會將詢價單標記成「已成交」，會員才能繼續結帳。",
  clientRef: {
    source: "前台 / 私版商品系列 (2)",
    quote: "客服、客人提供製作原始檔、下單，均轉 LINE 客服",
    note: "需求表寫了下單轉 LINE，但詢價單轉訂單的步驟細節未指定。",
  },
};

const Q4 = {
  no: "Q4",
  question: "LINE 在詢價流程中的定位：通知摘要 + 客服溝通入口（完整明細仍留會員中心）對嗎？",
  context:
    "目前先以這樣示意：① 詢價完整明細（規格、檔案、報價、有效期、狀態紀錄）一律在會員中心顯示，可在卡片內展開列查看 ② LINE 只作為「客服溝通 + 通知摘要」入口，不放完整明細 ③ 按鈕從「至 LINE 查看」改成「開啟 LINE 聯繫客服」。想請 HJ 確認此分工。LINE 通知需 HJ 啟用 LINE 官方帳號 + Messaging API + 會員完成綁定才能送達。",
  clientRef: {
    source: "前台 / 私版商品系列 (2)",
    quote: "複雜客製商品轉 LINE 客服報價",
    note: "需求表只寫了「轉 LINE 客服報價」，沒明確 LINE 是看明細還是只是客服溝通。本提案先把明細留在會員中心、LINE 只作客服與通知，避免承諾 LINE 上有完整明細。",
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

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
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

type QuoteDetail = {
  product: string;
  quantity: string;
  specs: string[];
  files: { name: string; size: string; status: "已上傳" | "客服審核中" | "需補件" }[];
  pricing: { item: string; price: string }[];
  validUntil: string;
  history: { time: string; event: string; by: "會員" | "HJ 客服" | "系統" }[];
  lineSummary?: string;
};

const QUOTES: {
  id: string;
  date: string;
  items: string;
  estimatedAmount: number;
  status: QuoteStatus;
  expiresAt: string;
  note?: string;
  detail: QuoteDetail;
}[] = [
  {
    id: "Q-20260427-002",
    date: "2026/04/27",
    items: "12oz 客製紙杯 × 5,000 / 雙面全彩 + 燙金",
    estimatedAmount: 12500,
    status: "sent-to-line",
    expiresAt: "2026/05/04",
    detail: {
      product: "12oz 客製紙杯（500ml 規格）",
      quantity: "5,000 入",
      specs: [
        "杯型：12oz / 直筒",
        "材質：白底紙 280g + PE 內膜",
        "印刷：CMYK 雙面全彩",
        "加工：杯口燙金 1 處",
        "包裝：50 入 × 100 包",
      ],
      files: [
        { name: "design-final.ai", size: "8.4 MB", status: "已上傳" },
        { name: "color-spec.pdf", size: "1.2 MB", status: "已上傳" },
      ],
      pricing: [
        { item: "印刷費（雙面全彩）", price: "NT$ 8,500" },
        { item: "燙金加工", price: "NT$ 2,500" },
        { item: "刀模 / 開版費", price: "NT$ 1,500（首單）" },
      ],
      validUntil: "報價有效至 2026/05/04（7 天）",
      history: [
        { time: "2026/04/27 14:32", event: "會員送出詢價單", by: "會員" },
        { time: "2026/04/27 16:10", event: "HJ 客服已收到，刀模費已加計", by: "HJ 客服" },
        { time: "2026/04/28 09:45", event: "等待會員確認燙金 LOGO 位置（請看 LINE）", by: "HJ 客服" },
      ],
      lineSummary: "HJ 客服已透過 LINE 詢問燙金 LOGO 對位細節，請於 LINE 回覆樣稿位置確認。",
    },
  },
  {
    id: "Q-20260424-007",
    date: "2026/04/24",
    items: "客製模切紙袋 × 500 / 牛皮紙 + 異形刀模",
    estimatedAmount: 0,
    status: "sent-to-line",
    expiresAt: "2026/05/01",
    note: "客服詢問刀模規格中",
    detail: {
      product: "客製模切紙袋（異形刀模）",
      quantity: "500 入",
      specs: ["材質：牛皮紙 200g", "印刷：單色印刷", "加工：異形模切（需開新刀模）"],
      files: [{ name: "shape-draft.png", size: "640 KB", status: "客服審核中" }],
      pricing: [
        { item: "印刷費", price: "估價中" },
        { item: "異形刀模開版費", price: "估價中（需依形狀計）" },
      ],
      validUntil: "—（報價尚未產生）",
      history: [
        { time: "2026/04/24 11:20", event: "會員送出詢價單", by: "會員" },
        { time: "2026/04/25 09:30", event: "HJ 客服詢問模切尺寸與彎角半徑", by: "HJ 客服" },
      ],
      lineSummary: "HJ 客服已透過 LINE 詢問刀模尺寸細節，等待會員提供完整尺寸圖。",
    },
  },
  {
    id: "Q-20260418-014",
    date: "2026/04/18",
    items: "客製禮盒 × 200 / 燙金 + 局部上光",
    estimatedAmount: 18000,
    status: "confirmed",
    expiresAt: "2026/04/25",
    detail: {
      product: "客製禮盒（天地蓋）",
      quantity: "200 入",
      specs: [
        "尺寸：20 × 20 × 8 cm",
        "材質：銅版紙 350g",
        "印刷：CMYK 全彩",
        "加工：燙金 + 局部上光",
      ],
      files: [
        { name: "box-final.pdf", size: "12.6 MB", status: "已上傳" },
      ],
      pricing: [
        { item: "印刷費", price: "NT$ 12,000" },
        { item: "燙金 + 局部上光", price: "NT$ 4,000" },
        { item: "盒型加工", price: "NT$ 2,000" },
      ],
      validUntil: "報價有效至 2026/04/25（已成交）",
      history: [
        { time: "2026/04/18 10:00", event: "會員送出詢價單", by: "會員" },
        { time: "2026/04/19 14:00", event: "HJ 客服回覆報價", by: "HJ 客服" },
        { time: "2026/04/20 09:00", event: "會員確認規格", by: "會員" },
        { time: "2026/04/20 11:00", event: "詢價單標記為已成交", by: "系統" },
      ],
    },
  },
  {
    id: "Q-20260410-009",
    date: "2026/04/10",
    items: "客製腰封 × 10,000 / 全彩",
    estimatedAmount: 4500,
    status: "expired",
    expiresAt: "2026/04/17",
    detail: {
      product: "客製紙腰封",
      quantity: "10,000 入",
      specs: ["材質：銅版紙 150g", "印刷：CMYK 全彩"],
      files: [],
      pricing: [{ item: "印刷費", price: "NT$ 4,500" }],
      validUntil: "已過期（2026/04/17）",
      history: [
        { time: "2026/04/10 15:00", event: "會員送出詢價單", by: "會員" },
        { time: "2026/04/11 10:00", event: "HJ 客服回覆報價", by: "HJ 客服" },
        { time: "2026/04/17 23:59", event: "報價有效期已過，狀態變更為已過期", by: "系統" },
      ],
    },
  },
  {
    id: "Q-20260428-001",
    date: "2026/04/28",
    items: "16oz 客製雙層中空杯 × 3,000",
    estimatedAmount: 6600,
    status: "draft",
    expiresAt: "—",
    detail: {
      product: "16oz 雙層中空杯",
      quantity: "3,000 入",
      specs: ["杯型：16oz / 雙層中空", "材質：白底紙 280g", "印刷：單面 CMYK"],
      files: [],
      pricing: [{ item: "估價（草稿，未送出）", price: "NT$ 6,600" }],
      validUntil: "—（草稿，未送出）",
      history: [{ time: "2026/04/28 09:15", event: "會員建立草稿", by: "會員" }],
    },
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
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["Q-20260427-002"]));

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
            預覽
          </span>
          <span className="text-zinc-700">切換會員類型：</span>
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
            （此功能由企業會員使用 — 見 Q1）
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
                若您有大量採購或客製印刷需求
              </h2>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                可申請企業會員服務，享有：
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
                申請企業會員服務
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

          {/* LINE 範圍提示 */}
          <section className="border-b border-zinc-200 bg-emerald-50/40 px-6 py-3">
            <div className="mx-auto max-w-[1760px] flex items-start gap-2 text-xs text-emerald-900">
              <LineIcon className="mt-0.5 shrink-0" />
              <p className="leading-relaxed">
                <span className="font-bold">LINE 在詢價流程的角色：</span>
                完整詢價明細（規格、檔案、報價、有效期、狀態紀錄）一律在此頁展開查看；LINE 只作為「客服溝通 + 通知摘要」入口，HJ 客服會在 LINE 詢問細節，但不會把整張詢價單貼到 LINE。
              </p>
            </div>
          </section>

          {/* Quote list */}
          <section className="bg-white px-6 py-6">
            <div className="mx-auto max-w-[1760px] space-y-3">
              {filtered.map((q, idx) => {
                const meta = STATUS_META[q.status];
                const isOpen = expanded.has(q.id);
                const detailRow = isOpen && (
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
                          數量：{q.detail.quantity}
                        </div>
                        <ul className="mt-2 space-y-1 text-xs text-zinc-700">
                          {q.detail.specs.map((s) => (
                            <li key={s}>· {s}</li>
                          ))}
                        </ul>
                      </div>

                      {/* 報價 */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          報價內容
                        </div>
                        <ul className="mt-2 space-y-1 text-xs">
                          {q.detail.pricing.map((p) => (
                            <li key={p.item} className="flex justify-between gap-2 text-zinc-700">
                              <span>{p.item}</span>
                              <span className="font-mono font-medium text-zinc-900">{p.price}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 text-[11px] text-zinc-500">
                          {q.detail.validUntil}
                        </div>
                      </div>

                      {/* 上傳檔案 */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          上傳檔案
                        </div>
                        {q.detail.files.length === 0 ? (
                          <p className="mt-2 text-xs text-zinc-400">尚未上傳</p>
                        ) : (
                          <ul className="mt-2 space-y-1.5 text-xs">
                            {q.detail.files.map((f) => (
                              <li
                                key={f.name}
                                className="flex items-center justify-between gap-2 rounded-md border border-zinc-200 bg-white px-2 py-1.5"
                              >
                                <span className="truncate font-mono text-zinc-700">
                                  {f.name}
                                </span>
                                <span className="shrink-0 text-zinc-400">{f.size}</span>
                                <span
                                  className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${
                                    f.status === "已上傳"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : f.status === "客服審核中"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-rose-100 text-rose-800"
                                  }`}
                                >
                                  {f.status}
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
                            <li key={`${h.time}-${h.event}`} className="flex gap-2">
                              <span className="w-[110px] shrink-0 font-mono text-zinc-400">
                                {h.time}
                              </span>
                              <span className="text-zinc-700">{h.event}</span>
                              <span
                                className={`ml-auto shrink-0 rounded px-1.5 text-[10px] font-medium ${
                                  h.by === "會員"
                                    ? "bg-sky-100 text-sky-800"
                                    : h.by === "HJ 客服"
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

                    {q.detail.lineSummary && (
                      <div className="mt-4 flex items-start gap-2 rounded-md border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-xs text-emerald-900">
                        <LineIcon className="mt-0.5 shrink-0" />
                        <div>
                          <div className="font-bold">LINE 客服回覆摘要</div>
                          <p className="mt-0.5 text-emerald-800">{q.detail.lineSummary}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );

                const detailToggle = (
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
                );

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

                    {detailRow}

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

                      {q.status === "sent-to-line" &&
                        (idx === 0 ? (
                          <Questioned
                            show={annotations}
                            questions={[Q4]}
                            pageId={pageId}
                            position="top-right"
                          >
                            <button className="flex items-center gap-1.5 rounded-md border border-emerald-500 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100">
                              <LineIcon />
                              開啟 LINE 聯繫客服
                            </button>
                          </Questioned>
                        ) : (
                          <button className="flex items-center gap-1.5 rounded-md border border-emerald-500 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100">
                            <LineIcon />
                            開啟 LINE 聯繫客服
                          </button>
                        ))}

                      {q.status === "draft" && (
                        <button className="rounded-md bg-amber-700 px-4 py-2 text-xs font-bold text-white hover:bg-amber-800">
                          編輯送出
                        </button>
                      )}

                      {detailToggle}

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
