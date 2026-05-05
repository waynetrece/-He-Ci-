"use client";

import Link from "next/link";
import { useState } from "react";
import { CommentToolbar } from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { MemberOrderDetailMockup } from "@/components/modules/mockups/MemberOrderDetailMockup";
import { MEMBER_MOCKUPS } from "@/lib/members-mockups";

const PAGE_ID = "members-order-detail";
const PAGE_LABEL = "會員系統 — 訂單詳情";
const ACTIVE_TAB = "order-detail";

// 32 題 review 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 訂單狀態 6 個 + 已退款 = 7 個(B 包 / E 包)
// - 訂單與配送狀態合一(B 包 Q-B2)
// - 已出貨 7 天系統自動轉「已完成」(B 包)
// - 物流追蹤 = 系統依物流商產生查詢頁連結模板(B 包 Q-B3)
// - 退換貨走客服(LINE / 電話)— 不開放線上自助(E 包 Q-E2)
// - 信用卡退款 → 客服在後台呼叫綠界退刷 API(default 自動)
// - 匯款退款 → 客服記錄,通知會計手動退回
// - 凌越同步 = 訂單付款完成才進凌越;取消改狀態為已取消(E 包)
// - 凌越歷史訂單 default 近 2 年(C 包 Q-C3)

export default function MembersOrderDetailPage() {
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
          <span className="mr-2 text-sm font-medium text-amber-900">會員系統 預覽:</span>
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
          <MemberOrderDetailMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Resolution summary */}
      <section className="border-t-2 border-zinc-400 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">本頁需求已全部對齊</h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-700">
            32 題客戶需求 review 已完成,訂單詳情邏輯 + 退換貨流程全部反映在 mockup 上。
          </p>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "訂單狀態 7 個時間軸:待付款→已付款→備貨中→已出貨→已完成 + 已取消 / 已退款",
              "已出貨 → 物流商 + 單號 + 「查詢運送狀態」連物流官網",
              "已出貨 7 天系統自動轉「已完成」(不串 API,無法判定送達)",
              "退換貨統一走客服(LINE / 電話),不開放線上自助",
              "信用卡退款 → 客服後台呼叫綠界退刷 API",
              "匯款退款 → 客服記錄通知會計手動",
              "凌越同步:付款完成才進;取消改狀態為已取消",
              "依不同訂單狀態顯示對應動作按鈕",
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
        prev={{ title: "訂單列表", href: "/modules/members/orders" }}
        next={{ title: "詢價單列表", href: "/modules/members/quote-list" }}
      />
    </main>
  );
}
