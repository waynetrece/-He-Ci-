"use client";

import Link from "next/link";
import { useState } from "react";
import { CommentToolbar } from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { MemberQuoteListMockup } from "@/components/modules/mockups/MemberQuoteListMockup";
import { MEMBER_MOCKUPS } from "@/lib/members-mockups";

const PAGE_ID = "members-quote-list";
const PAGE_LABEL = "會員系統 — 私版詢價紀錄";
const ACTIVE_TAB = "quote-list";

// 32 題 review A 包 + C 包 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 私版詢價單 = LINE 議價流程,沒有有效期 / 過期概念
// - 提交後跳 LINE 自動帶詢價單編號
// - 業務後台手動觸發「詢價單轉訂單」+ 進凌越(Q-A8)
// - 訂金 = 私下匯款,業務確認後轉訂單
// - 不分「個人 / 企業」分流(C 包)

export default function MembersQuoteListPage() {
  const [annotations, setAnnotations] = useState(true);

  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <CommentToolbar
        pageId={PAGE_ID}
        pageLabel={PAGE_LABEL}
        annotations={annotations}
        setAnnotations={setAnnotations}
      />

      <section className="border-b-2 border-zinc-400 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-amber-900">
            會員系統 預覽:
          </span>
          {MEMBER_MOCKUPS.map((m) => {
            const active = m.id === ACTIVE_TAB;
            const cls = `rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                : m.ready
                  ? "border-zinc-400 bg-white text-zinc-700 hover:border-zinc-900 hover:bg-amber-100"
                  : "border-zinc-300 bg-zinc-100 text-zinc-400 cursor-not-allowed"
            }`;
            const content = (
              <>
                {m.name}
                {!m.ready && (
                  <span className="ml-1 text-[10px] opacity-60">(製作中)</span>
                )}
              </>
            );
            return m.ready && !active ? (
              <Link key={m.id} href={m.href} className={cls}>
                {content}
              </Link>
            ) : (
              <button key={m.id} disabled={!m.ready} className={cls}>
                {content}
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MemberQuoteListMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Resolution summary */}
      <section className="border-t-2 border-zinc-400 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">
            本頁需求已全部對齊
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-700">
            32 題 review A 包已決議,私版詢價走 LINE 議價流程,業務後台轉訂單;C 包已決議不分個人/企業。
          </p>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "詢價狀態 = 草稿 / 等業務 LINE 聯繫 / 已報價・等匯款 / 已轉訂單 / 已取消",
              "提交後跳 LINE 自動帶詢價單編號(Q-A 流程)",
              "業務透過 LINE 報價,沒有過期概念(deprecated 7 天有效期)",
              "印刷原始檔上傳走 LINE,大檔附雲端連結",
              "訂金 = 私下匯款,業務後台手動轉訂單(Q-A8)",
              "已轉訂單可直接連回 /modules/members/orders/HJ-XXX",
              "不分個人 / 企業,所有會員都可使用詢價(C 包)",
              "公版/私版/樣品 三條流程完全分開,不同表(Q-A9)",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
        prev={{ title: "歷史訂單", href: "/modules/members/orders" }}
        next={{ title: "樣品申請紀錄", href: "/modules/members/samples" }}
      />
    </main>
  );
}
