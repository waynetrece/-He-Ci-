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
  question: "訂單成立後 ERP 同步時機 — 即時 API 推送、批次同步（每 N 分鐘 / 每日）、還是業務手動匯入？同步失敗時的備援？",
  context:
    "依需求表「訂單即時匯入凌越 ERP」先示意：① 訂單送出 → 網站存「待確認」→ 推給凌越 ERP → ERP 回 ack 後狀態變「已成立」② 若 ERP 失敗 / 逾時，網站訂單先停在「待 ERP 同步」，背景重試（最多 3 次），仍失敗則通知 HJ 業務手動匯入。實際機制（即時 API / 批次 / 手動）與失敗備援待 HJ 與凌越廠商確認。",
  clientRef: {
    source: "後台 / 訂單管理 (3) + 後台 / 顧客管理 (5)",
    quote: "訂單即時匯入凌越 ERP；網站客人需與原 ERP 客戶編號相同",
    note: "需求表寫了「即時匯入凌越 ERP」但未細分機制（同步 API / 排程批次 / 手動），失敗備援也未寫。本提案先依需求表字面示意，待 HJ + 凌越確認後再定。",
  },
};

const Q2 = {
  no: "Q2",
  question: "月結審核 SOP — 由誰審？多久內回覆？拒絕後如何處理？",
  context:
    "目前先以這樣示意：① 所有月結訂單一律進「月結審核中」狀態 ② HJ 業務在後台審核，可「核准」或「拒絕並請客戶改其他付款方式」③ 核准 → 訂單轉「已成立」並送 ERP，以 Email 通知會員 ④ 拒絕 → 通知會員回結帳改付款方式。\n\n想請 HJ 確認：\n• 審核權責（業務 / 主管 / 會計？）\n• 審核 SLA（多久內回覆？例如 1 個工作天）\n• 通知管道（Email？其他見 settings Q1 + Q5 LINE 整體規劃）\n\n（信用額度自動扣 / 自動擋下單屬進階功能；HJ 確認需要再規劃）",
  clientRef: {
    source: "後台 / 訂單管理 (3) + 後台 / 金流 (7)",
    quote: "訂單即時匯入凌越 ERP；綠界、一般匯款、宅配/自取貨到付款",
    note: "需求表沒明寫月結，本提案以「人工審核版」示意；信用額度自動檢查屬進階功能，HJ 提出再規劃。",
  },
};

/* ============== Icons ============== */

function CheckBigIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function HourglassIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M17 2v4.172a2 2 0 0 1-.586 1.414L12 12 7.586 7.586A2 2 0 0 1 7 6.172V2" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

/* ============== Component ============== */

type SuccessState = "paid" | "awaiting-payment" | "monthly-review";

const STATE_LABEL: Record<SuccessState, string> = {
  paid: "已成立（信用卡 / 已完成付款）",
  "awaiting-payment": "等待付款（ATM 虛擬帳號）",
  "monthly-review": "月結審核中",
};

export function CheckoutSuccessMockup({
  annotations = false,
  pageId = "checkout-success",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [state, setState] = useState<SuccessState>("paid");

  const orderId = "HJ-20260428-007";

  return (
    <MockupShell url="https://hjhj.com.tw/checkout/success">
      <MockupSiteHeader />

      {/* Demo toggle */}
      <div className="border-b-2 border-dashed border-amber-300 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-amber-700 px-2 py-0.5 font-bold text-white">
            預覽
          </span>
          <span className="text-zinc-700">切換訂單狀態：</span>
          <div className="flex flex-wrap gap-1 rounded-md bg-white p-1 shadow-sm border border-zinc-200">
            {(["paid", "awaiting-payment", "monthly-review"] as SuccessState[]).map((s) => (
              <button
                key={s}
                onClick={() => setState(s)}
                className={`rounded px-3 py-1 font-medium transition-colors ${
                  state === s
                    ? "bg-amber-700 text-white"
                    : "text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {STATE_LABEL[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb / steps */}
      <section className="border-b border-zinc-200 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] flex items-center gap-2 text-xs">
          <Link href="/modules/cart" className="text-zinc-500 hover:text-zinc-900">
            購物車
          </Link>
          <ChevronArrow />
          <Link href="/modules/checkout" className="text-zinc-500 hover:text-zinc-900">
            結帳
          </Link>
          <ChevronArrow />
          <span className="font-bold text-amber-700">訂單成立</span>
        </div>
      </section>

      <section className="bg-zinc-50/40 px-6 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Status hero */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            {state === "paid" && <PaidView orderId={orderId} />}
            {state === "awaiting-payment" && (
              <Questioned
                show={annotations}
                questions={[Q1]}
                pageId={pageId}
                position="top-right"
              >
                <AwaitingView orderId={orderId} />
              </Questioned>
            )}
            {state === "monthly-review" && (
              <Questioned
                show={annotations}
                questions={[Q1, Q2]}
                pageId={pageId}
                position="top-right"
              >
                <MonthlyReviewView orderId={orderId} />
              </Questioned>
            )}
          </div>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/modules/members/orders/${orderId}`}
              className="rounded-md bg-amber-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-800"
            >
              查看訂單詳情
            </Link>
            <Link
              href="/modules/members/orders"
              className="rounded-md border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              我的歷史訂單
            </Link>
            <Link
              href="/modules/products"
              className="rounded-md border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              繼續購物
            </Link>
          </div>

          {/* Notification reminder */}
          <div className="mt-6 rounded-md border border-zinc-200 bg-white p-4 text-sm">
            <div className="font-bold text-zinc-900">通知會送到：</div>
            <ul className="mt-2 space-y-1 text-xs text-zinc-600">
              <li>· Email：wayne@example.com（預設）</li>
              <li>· 其他通知管道：待 HJ 確認後規劃</li>
            </ul>
          </div>
        </div>
      </section>

      <MockupSiteFooter />
    </MockupShell>
  );
}

/* ============== Status views ============== */

function PaidView({ orderId }: { orderId: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <CheckBigIcon />
      </div>
      <h1 className="mt-5 text-2xl font-bold text-zinc-900">訂單已成立</h1>
      <p className="mt-2 text-sm text-zinc-600">
        感謝您的訂購，我們將儘快為您備貨。
      </p>

      <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50/70 p-4 text-left text-sm">
        <Row label="訂單編號" value={orderId} mono />
        <Row label="付款方式" value="信用卡 / 已完成付款" />
        <Row label="應付金額" value="NT$ 22,150" mono bold />
        <Row label="預計出貨" value="2026/04/30" />
      </div>

      <div className="mt-4 grid gap-2 text-left text-xs sm:grid-cols-2">
        <Step done label="訂單成立" />
        <Step done label="付款完成" />
        <Step pending label="備貨中" />
        <Step pending label="出貨" />
      </div>
    </div>
  );
}

function AwaitingView({ orderId }: { orderId: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-amber-100 text-amber-700">
        <ClockIcon />
      </div>
      <h1 className="mt-5 text-2xl font-bold text-zinc-900">訂單已成立，等待付款</h1>
      <p className="mt-2 text-sm text-zinc-600">
        請於 14 天內完成 ATM 轉帳，逾期未付款訂單將自動取消。
      </p>

      <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50/60 p-4 text-left">
        <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
          ATM 虛擬帳號
        </div>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-xs text-zinc-600">中國信託銀行 (822)</span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="font-mono text-2xl font-bold tracking-wider text-zinc-900">
            9220 0019 8847 1356
          </span>
          <button className="flex items-center gap-1 rounded-md border border-zinc-300 bg-white px-2.5 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50">
            <CopyIcon />
            複製帳號
          </button>
        </div>
        <div className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
          <Row label="繳款金額" value="NT$ 22,150" mono bold />
          <Row label="繳款期限" value="2026/05/12 23:59" />
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50/70 p-4 text-left text-sm">
        <Row label="訂單編號" value={orderId} mono />
        <Row label="ERP 同步狀態" value="已建檔（待付款後進入備貨）" />
      </div>

      <div className="mt-4 grid gap-2 text-left text-xs sm:grid-cols-2">
        <Step done label="訂單成立" />
        <Step pending label="等待付款" highlight />
        <Step pending label="備貨中" />
        <Step pending label="出貨" />
      </div>
    </div>
  );
}

function MonthlyReviewView({ orderId }: { orderId: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
        <HourglassIcon />
      </div>
      <h1 className="mt-5 text-2xl font-bold text-zinc-900">訂單已送出，月結審核中</h1>
      <p className="mt-2 text-sm text-zinc-600">
        本筆月結訂單需 HJ 業務人工確認後才會成立並進入備貨。
      </p>

      <div className="mt-6 rounded-lg border border-indigo-300 bg-indigo-50/60 p-4 text-left text-sm">
        <Row label="訂單編號" value={orderId} mono />
        <Row label="付款方式" value="月結 30 天" />
        <Row label="本單金額" value="NT$ 22,150" mono />
        <Row label="送審時間" value="2026/04/29 14:32" />
        <div className="mt-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          ⓘ 月結訂單一律需業務人工審核（依後台 SOP 設定）
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50/70 p-4 text-left text-sm">
        <div className="font-bold text-zinc-900">後續流程</div>
        <ol className="mt-2 space-y-1 text-xs text-zinc-600 list-decimal list-inside">
          <li>HJ 業務在 1 個工作天內審核（可能聯繫您確認需求）</li>
          <li>核准 → 訂單進入「備貨中」，依正常出貨流程</li>
          <li>未通過 → 系統通知您，請至訂單詳情改付款方式</li>
        </ol>
      </div>

      <div className="mt-4 grid gap-2 text-left text-xs sm:grid-cols-2">
        <Step done label="訂單送出" />
        <Step pending label="月結審核中" highlight />
        <Step pending label="核准後進備貨" />
        <Step pending label="出貨" />
      </div>
    </div>
  );
}

/* ============== Subcomponents ============== */

function Row({
  label,
  value,
  mono = false,
  bold = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between gap-2 py-0.5">
      <span className="text-zinc-600">{label}</span>
      <span
        className={`${mono ? "font-mono" : ""} ${bold ? "font-bold text-amber-800" : "text-zinc-900"}`}
      >
        {value}
      </span>
    </div>
  );
}

function Step({
  done,
  pending,
  highlight,
  label,
}: {
  done?: boolean;
  pending?: boolean;
  highlight?: boolean;
  label: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-md border px-3 py-2 ${
        done
          ? "border-emerald-200 bg-emerald-50/60 text-emerald-900"
          : highlight
            ? "border-amber-300 bg-amber-50/60 text-amber-900 font-bold"
            : "border-zinc-200 bg-white text-zinc-400"
      }`}
    >
      {done ? "✓" : pending ? "○" : "—"} {label}
    </div>
  );
}

function ChevronArrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
