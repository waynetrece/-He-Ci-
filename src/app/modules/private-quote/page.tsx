"use client";

import Link from "next/link";
import { useState } from "react";
import { CommentToolbar } from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { PrivateQuoteListMockup } from "@/components/modules/mockups/PrivateQuoteListMockup";
import { PRIVATE_QUOTE_MOCKUPS } from "@/lib/private-quote-mockups";

const PAGE_ID = "private-quote-list";
const PAGE_LABEL = "私版客製報價系統 — 入口頁";
const ACTIVE_TAB = "list";

// 32 題 review A 包已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 公版/私版規格機制統一,以「私版方式」為主(Q-A4)
// - 私版細節溝通、檔案傳遞、下單確認 全部走 LINE
// - 私版商品頁設計「上傳檔案」按鈕直接跳 LINE
// - 私版訂購流程:詢價單 → LINE 溝通 → 訂金 → 業務後台轉訂單 → 進凌越
// - 訂金 = 私下匯款,業務後台手動觸發轉訂單(Q-A8)
// - 公版/私版/樣品 三條流程完全分開,不可同車(Q-A9)
//
// 已 deprecated 概念(原 mockup 有,review 不採用):
// - 「即時報價(jcolor 風格)」站內試算
// - 「即時報價 vs LINE 報價分流」
// - 「起報金額顯示」

export default function PrivateQuoteListPage() {
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
          <PrivateQuoteListMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Resolution summary */}
      <section className="border-t-2 border-zinc-400 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">本頁需求已全部對齊</h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-700">
            32 題 review A 包已決議,私版客製採詢價單 + LINE 溝通流程,本頁不採「即時報價」舊提案。
          </p>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "公版/私版規格機制統一(以私版方式為主)",
              "HJ 後台勾選要開放的客製規格(Q-A7 具體欄位待 HJ)",
              "全部走詢價單 + LINE 溝通(不做站內即時報價)",
              "「上傳檔案」按鈕直接跳 LINE",
              "業務報價 → 客戶確認 → 私下匯款訂金",
              "業務後台手動觸發「詢價單轉訂單」+ 進凌越",
              "公版/私版/樣品 三條流程完全分開,不可同車",
              "標準交期 2-4 週(依規格與數量)",
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
        prev={{ title: "公版商品", href: "/modules/products" }}
        next={{ title: "私版詢價表單", href: "/modules/private-quote/quote-form" }}
      />
    </main>
  );
}
