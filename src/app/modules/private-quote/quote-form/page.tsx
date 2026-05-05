"use client";

import Link from "next/link";
import { useState } from "react";
import { CommentToolbar } from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { PrivateQuoteMockup } from "@/components/modules/mockups/PrivateQuoteMockup";
import { PRIVATE_QUOTE_MOCKUPS } from "@/lib/private-quote-mockups";

const PAGE_ID = "private-quote-form";
const PAGE_LABEL = "私版客製報價系統 — 詢價單表單";
const ACTIVE_TAB = "form";

// 32 題 review A 包已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 公版/私版規格機制統一(Q-A4)
// - HJ 後台勾選要開放的客製規格(Q-A4 + Q-A7)
// - 同頁切換規格選擇器
// - 上傳設計檔走 LINE(原始檔大,LINE 上傳有檔案大小限制可附雲端連結)
// - 提交後成立「私版詢價單」(獨立於一般訂單)
// - 業務透過 LINE 報價 → 客戶確認 → 訂金匯款 → 業務後台轉訂單 → 進凌越
//
// 已 deprecated 概念(原 mockup 有,review 不採用):
// - 站內即時試算 + 計價公式(Q1)
// - 即時報價直接下單按鈕(Q2)
// - 網站上傳印刷原始檔(Q3)— review 走 LINE
// - 報價有效期(Q4)— review 走 LINE 議價,沒有過期概念

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

      <section className="border-b-2 border-zinc-400 bg-violet-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-violet-900">私版客製報價 預覽:</span>
          {PRIVATE_QUOTE_MOCKUPS.map((m) => {
            const active = m.id === ACTIVE_TAB;
            const cls = `rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                : m.ready
                  ? "border-zinc-400 bg-white text-zinc-700 hover:border-zinc-900 hover:bg-violet-100"
                  : "border-zinc-300 bg-zinc-100 text-zinc-400 cursor-not-allowed"
            }`;
            const content = (
              <>
                {m.name}
                {!m.ready && <span className="ml-1 text-[10px] opacity-60">(製作中)</span>}
              </>
            );
            return m.ready && !active ? (
              <Link key={m.id} href={m.href} className={cls}>{content}</Link>
            ) : (
              <button key={m.id} disabled={!m.ready} className={cls}>{content}</button>
            );
          })}
        </div>
      </section>

      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <PrivateQuoteMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Resolution summary */}
      <section className="border-t-2 border-zinc-400 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">本頁需求已全部對齊</h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-700">
            32 題 review A 包已決議,私版採詢價單 + LINE 流程,本頁不採「站內即時試算」舊提案。
          </p>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "規格機制 = 同頁切換選擇器(與公版統一)",
              "規格欄位由 HJ 後台勾選提供(Q-A7 具體欄位待 HJ)",
              "印刷原始檔上傳走 LINE,大檔可附雲端連結",
              "送出後跳 LINE,自動帶詢價單編號",
              "Email / LINE ID 至少擇一(業務溝通管道)",
              "標準交期 2-4 週,實際依規格與排程",
              "詢價不收費,訂金確認後才開製",
              "業務後台手動觸發「詢價單轉正式訂單」+ 進凌越",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ModuleFooterNav
        prev={{ title: "私版客製入口", href: "/modules/private-quote" }}
        next={{ title: "詢價單列表", href: "/modules/members/quote-list" }}
      />
    </main>
  );
}
