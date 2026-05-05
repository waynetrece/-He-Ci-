"use client";

import Link from "next/link";
import { useState } from "react";
import { CommentToolbar } from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { MemberDashboardMockup } from "@/components/modules/mockups/MemberDashboardMockup";
import { MEMBER_MOCKUPS } from "@/lib/members-mockups";

const PAGE_ID = "members-dashboard";
const PAGE_LABEL = "會員系統 — 會員首頁";
const ACTIVE_TAB = "dashboard";

// 32 題 review 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 會員 4 等級 = 北部直客 / 北部盤商 / 中南部直客 / 中南部盤商(由業務指派 — C 包)
// - 不分「個人 / 企業」分流(統一一個流程,等級由業務後台指派)
// - 凌越客編綁定 = 內部處理,等簽約後對齊(Q-C1 / Q-C2),不直接對會員顯示
// - 訂單來源 = 網站訂單 + 凌越歷史(預設近 2 年)— B 包
// - 詢價單 = 私版客製,業務透過 LINE 報價(A 包)
// - 樣品 = 每品項 ≤ 3、最多 10 款、總數 ≤ 30(A 包)

export default function MembersDashboardPage() {
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
          <MemberDashboardMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Resolution summary */}
      <section className="border-t-2 border-zinc-400 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">
            本頁需求已全部對齊
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-700">
            32 題 review C 包已決議,會員系統不分個人/企業,統一一個流程;等級由業務後台指派,凌越客編內部處理。
          </p>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "會員 4 等級 = 北部直客 / 北部盤商 / 中南部直客 / 中南部盤商",
              "等級由 HJ 業務依採購地區與通路指派(C 包)",
              "不分「個人 / 企業」分流,統一一個流程",
              "凌越客編綁定 = 內部處理,不直接對會員顯示(Q-C1 / Q-C2)",
              "註冊後業務 1 工作天內聯繫設定等級",
              "歷史訂單 = 網站訂單 + 凌越歷史(預設近 2 年)",
              "詢價單 = 私版客製,LINE 報價(A 包)",
              "樣品申請限額:每品項 ≤ 3、最多 10 款、總數 ≤ 30",
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
        prev={{ title: "註冊／登入", href: "/modules/members/auth" }}
        next={{ title: "歷史訂單", href: "/modules/members/orders" }}
      />
    </main>
  );
}
