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
  question: "個人會員是否能申請樣品？或只開放給企業客戶（避免樣品申請濫用）？",
  context:
    "目前先以這樣示意：① 企業客戶可正常申請與查看紀錄 ② 個人會員可申請但「每年限 X 件」（具體上限想請 HJ 決定）。想請 HJ 確認是否需要對個人會員設限。",
  clientRef: {
    source: "前台 / 公版商品系列 (2)",
    quote: "樣品申請：每個商品頁增加樣品按鈕",
    note: "需求表寫了「樣品申請」但未指定資格限制。",
  },
};

const Q2 = {
  no: "Q2",
  question: "樣品狀態的具體定義（申請中／審核中／已寄出／已送達／已關閉）— 名稱、順序、狀態間轉換條件由 HJ 提供？是否需與 ERP 出貨資料同步？",
  context:
    "目前先以這樣示意五個狀態：① 申請中（剛送出）② 審核中（業務確認資格）③ 已寄出（出貨給物流）④ 已送達（收貨完成）⑤ 已關閉（拒絕／取消／逾期）。想請 HJ 確認名稱與順序，以及是否與 ERP 同步。",
  clientRef: {
    source: "前台 / 公版商品系列 (2)",
    quote: "樣品申請：每個商品頁增加樣品按鈕",
    note: "公版樣品流程 Q6「客戶能否在會員中心查申請狀態」延伸 — 需確認狀態定義細節。",
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

function GiftIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
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

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ============== Data ============== */

type SampleStatus = "applying" | "reviewing" | "shipped" | "delivered" | "closed";

const STATUS_META: Record<SampleStatus, { label: string; cls: string; iconColor: string }> = {
  applying: { label: "申請中", cls: "bg-zinc-100 text-zinc-700", iconColor: "text-zinc-400" },
  reviewing: { label: "審核中", cls: "bg-amber-100 text-amber-800", iconColor: "text-amber-600" },
  shipped: { label: "已寄出", cls: "bg-sky-100 text-sky-800", iconColor: "text-sky-600" },
  delivered: { label: "已送達", cls: "bg-emerald-100 text-emerald-800", iconColor: "text-emerald-600" },
  closed: { label: "已關閉", cls: "bg-rose-100 text-rose-700", iconColor: "text-rose-500" },
};

type SampleDetail = {
  applicantNote: string;
  recipient: { name: string; phone: string; address: string };
  trackingHistory: { time: string; event: string }[];
  followUp?: string;
};

const SAMPLES: {
  id: string;
  date: string;
  items: string[];
  status: SampleStatus;
  appliedFrom: string;
  note?: string;
  tracking?: string;
  shippedAt?: string;
  deliveredAt?: string;
  closedAt?: string;
  closedReason?: string;
  detail: SampleDetail;
}[] = [
  {
    id: "S-20260428-001",
    date: "2026/04/28",
    items: ["12oz 公版瓦楞紙杯（白/黑/牛皮 各 1 個）"],
    status: "reviewing",
    appliedFrom: "公版商品列表頁 → 申請樣品",
    note: "業務確認資格中（預計 4/29 完成）",
    detail: {
      applicantNote: "想比較三種底色的印刷效果，預計 5 月導入新店家。",
      recipient: { name: "陳先生", phone: "0912-345-678", address: "台北市信義區忠孝東路 5 段 100 號 8 樓" },
      trackingHistory: [
        { time: "2026/04/28 09:12", event: "會員送出樣品申請" },
        { time: "2026/04/28 14:30", event: "業務 Wendy 已收到，確認會員資格中" },
      ],
    },
  },
  {
    id: "S-20260425-008",
    date: "2026/04/25",
    items: ["牛皮紙便當盒（M/L 各 1 個）", "防油背心紙 × 2"],
    status: "shipped",
    appliedFrom: "公版樣品申請流程",
    tracking: "黑貓 880987654321",
    shippedAt: "2026/04/26",
    detail: {
      applicantNote: "需要比較 M/L 兩種尺寸是否能裝下我們店裡常用的雙拼便當。",
      recipient: { name: "陳先生", phone: "0912-345-678", address: "台北市信義區忠孝東路 5 段 100 號 8 樓" },
      trackingHistory: [
        { time: "2026/04/25 11:00", event: "會員送出樣品申請" },
        { time: "2026/04/25 16:00", event: "審核通過，撿料中" },
        { time: "2026/04/26 10:15", event: "已交付黑貓宅急便（單號 880987654321）" },
      ],
      followUp: "黑貓宅急便預計 2026/04/27 14:00 前送達。",
    },
  },
  {
    id: "S-20260418-014",
    date: "2026/04/18",
    items: ["PLA 環保杯 12oz × 2"],
    status: "delivered",
    appliedFrom: "商品詳情頁 → 申請樣品",
    deliveredAt: "2026/04/20",
    detail: {
      applicantNote: "想評估 PLA 杯與一般紙杯在飲料溫度下的差異。",
      recipient: { name: "陳先生", phone: "0912-345-678", address: "台北市信義區忠孝東路 5 段 100 號 8 樓" },
      trackingHistory: [
        { time: "2026/04/18 13:20", event: "會員送出樣品申請" },
        { time: "2026/04/18 17:00", event: "審核通過" },
        { time: "2026/04/19 10:00", event: "已寄出（黑貓 880123456789）" },
        { time: "2026/04/20 15:32", event: "已送達" },
      ],
      followUp: "本筆樣品已送達，可繼續開「公版商品」訂單，或私版量身詢價。",
    },
  },
  {
    id: "S-20260410-005",
    date: "2026/04/10",
    items: ["紙吸管套（多色）×5"],
    status: "delivered",
    appliedFrom: "公版樣品申請流程",
    deliveredAt: "2026/04/12",
    detail: {
      applicantNote: "確認多色紙吸管套是否可印刷店家 LOGO。",
      recipient: { name: "陳先生", phone: "0912-345-678", address: "台北市信義區忠孝東路 5 段 100 號 8 樓" },
      trackingHistory: [
        { time: "2026/04/10 09:00", event: "會員送出樣品申請" },
        { time: "2026/04/10 11:30", event: "審核通過" },
        { time: "2026/04/11 14:00", event: "已寄出" },
        { time: "2026/04/12 12:00", event: "已送達" },
      ],
    },
  },
  {
    id: "S-20260330-002",
    date: "2026/03/30",
    items: ["客製腰封（範例款）×3"],
    status: "closed",
    appliedFrom: "商品詳情頁",
    closedAt: "2026/04/02",
    closedReason: "申請件數已達當月上限",
    detail: {
      applicantNote: "想申請客製腰封樣品，已標註想看的紙質。",
      recipient: { name: "陳先生", phone: "0912-345-678", address: "台北市信義區忠孝東路 5 段 100 號 8 樓" },
      trackingHistory: [
        { time: "2026/03/30 17:00", event: "會員送出樣品申請" },
        { time: "2026/04/02 10:00", event: "申請已關閉：已達當月個人會員樣品上限" },
      ],
      followUp: "可下個月重新申請；或聯繫客服說明採購規模升級為企業客戶。",
    },
  },
];

const FILTERS: { id: SampleStatus | "all"; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "applying", label: "申請中" },
  { id: "reviewing", label: "審核中" },
  { id: "shipped", label: "已寄出" },
  { id: "delivered", label: "已送達" },
  { id: "closed", label: "已關閉" },
];

/* ============== Component ============== */

export function MemberSamplesMockup({
  annotations = false,
  pageId = "members-samples",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [statusFilter, setStatusFilter] = useState<SampleStatus | "all">("all");
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["S-20260425-008"]));

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
    ? SAMPLES
    : SAMPLES.filter((s) => s.status === statusFilter);

  return (
    <MockupShell url="https://hjhj.com.tw/members/samples">
      <MockupSiteHeader />

      {/* Breadcrumb */}
      <section className="border-b border-zinc-200 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/members" className="hover:text-zinc-900">
            會員首頁
          </Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="font-semibold text-zinc-900">樣品申請紀錄</span>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-[1760px] items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">樣品申請紀錄</h1>
            <p className="mt-1 text-sm text-zinc-500">
              共 <span className="font-bold text-zinc-900">{filtered.length}</span> 筆 ｜ 您本月已申請 <span className="font-bold text-amber-700">2</span> 件
            </p>
          </div>
          <Questioned
            show={annotations}
            questions={[Q1]}
            pageId={pageId}
            position="top-right"
          >
            <Link
              href="/modules/products/sample"
              className="flex items-center gap-1.5 rounded-md bg-amber-700 px-4 py-2 text-sm font-bold text-white hover:bg-amber-800"
            >
              <PlusIcon />
              申請新樣品
            </Link>
          </Questioned>
        </div>
      </section>

      {/* Filters */}
      <Questioned
        show={annotations}
        questions={[Q2]}
        pageId={pageId}
        position="top-right"
      >
        <section className="border-b border-zinc-200 bg-zinc-50/50 px-6 py-4">
          <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-3 text-xs">
            <FilterIcon />
            <span className="text-zinc-500">狀態：</span>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id as SampleStatus | "all")}
                className={`rounded-full border px-3 py-1 font-medium transition-colors ${
                  statusFilter === f.id
                    ? "border-amber-700 bg-amber-700 text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-amber-400"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>
      </Questioned>

      {/* Sample list */}
      <section className="bg-white px-6 py-6">
        <div className="mx-auto max-w-[1760px] space-y-3">
          {filtered.map((s) => {
            const meta = STATUS_META[s.status];
            const isOpen = expanded.has(s.id);
            return (
              <article
                key={s.id}
                className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg bg-zinc-50 ${meta.iconColor}`}>
                    <GiftIcon className="size-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-zinc-400">{s.id}</span>
                      <span className="text-zinc-300">·</span>
                      <span className="text-xs text-zinc-500">申請於 {s.date}</span>
                    </div>
                    <h3 className="mt-1.5 text-base font-bold text-zinc-900">
                      {s.items.join("、")}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      申請來源：{s.appliedFrom}
                    </p>
                    {s.note && (
                      <p className="mt-1.5 text-xs text-amber-700">{s.note}</p>
                    )}
                    {s.tracking && (
                      <div className="mt-1.5 flex items-center gap-2 text-xs text-zinc-600">
                        <TruckIcon />
                        <span>{s.tracking}</span>
                        <span className="text-zinc-300">·</span>
                        <span>寄出於 {s.shippedAt}</span>
                      </div>
                    )}
                    {s.deliveredAt && (
                      <div className="mt-1.5 text-xs text-emerald-700">
                        ✓ 您已於 {s.deliveredAt} 收到樣品
                      </div>
                    )}
                    {s.closedReason && (
                      <div className="mt-1.5 text-xs text-rose-700">
                        ⚠ 申請已關閉：{s.closedReason}（{s.closedAt}）
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${meta.cls}`}
                    >
                      {meta.label}
                    </span>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {s.tracking && (
                        <button className="flex items-center gap-1 rounded-md border border-zinc-300 bg-white px-2.5 py-1 text-xs text-zinc-700 hover:bg-zinc-50">
                          <TruckIcon />
                          追蹤物流
                        </button>
                      )}
                      {s.status === "delivered" && (
                        <Link
                          href="/modules/private-quote"
                          className="rounded-md border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 hover:bg-amber-100"
                        >
                          追加詢價
                        </Link>
                      )}
                      {s.status === "applying" && (
                        <button className="rounded-md border border-zinc-300 bg-white px-2.5 py-1 text-xs text-zinc-500 hover:bg-zinc-50 hover:text-rose-700">
                          取消申請
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleExpand(s.id)}
                        className={`flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                          isOpen
                            ? "border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800"
                            : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
                        }`}
                        aria-expanded={isOpen}
                      >
                        {isOpen ? "收合明細" : "查看明細"}
                        <ChevronDown className={isOpen ? "rotate-180" : ""} />
                      </button>
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50/70 p-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          申請備註
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">
                          {s.detail.applicantNote}
                        </p>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          收件資訊
                        </div>
                        <p className="mt-1.5 text-sm font-semibold text-zinc-900">
                          {s.detail.recipient.name} ｜ {s.detail.recipient.phone}
                        </p>
                        <p className="text-xs text-zinc-600">{s.detail.recipient.address}</p>
                      </div>
                      <div className="lg:col-span-2">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          狀態紀錄
                        </div>
                        <ol className="mt-2 space-y-1.5 text-xs">
                          {s.detail.trackingHistory.map((h) => (
                            <li key={`${h.time}-${h.event}`} className="flex gap-2">
                              <span className="w-[110px] shrink-0 font-mono text-zinc-400">
                                {h.time}
                              </span>
                              <span className="text-zinc-700">{h.event}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      {s.detail.followUp && (
                        <div className="lg:col-span-2 rounded-md border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs text-amber-900">
                          <span className="font-bold">後續：</span>
                          {s.detail.followUp}
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
