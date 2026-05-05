"use client";

import Link from "next/link";
import { useState } from "react";
import { CommentToolbar } from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { CheckoutSuccessMockup } from "@/components/modules/mockups/CheckoutSuccessMockup";
import { CART_MOCKUPS } from "@/lib/cart-mockups";

const PAGE_ID = "checkout-success";
const PAGE_LABEL = "購物車與結帳 — 付款結果";
const ACTIVE_TAB = "success";

// 32 題 review 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 訂單付款完成才進凌越(E 包,B 方案)
// - 訂單狀態 6 個(B 包 Q-B2)
// - 訂單同步失敗 → 系統自動 retry 3 次,失敗通知管理員(E 包 Q-E15 default)
// - 物流商選擇 = 客戶付款完成後業務後台勾選(B 包 Q-B11)
// - 物流追蹤 = 系統依物流商產生查詢頁連結(B 包 Q-B3)
// - LINE 通知:訂單成立 / 付款完成 / 出貨

export default function CheckoutSuccessPage() {
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
          <span className="mr-2 text-sm font-medium text-amber-900">購物車與結帳 預覽:</span>
          {CART_MOCKUPS.map((m) => {
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
          <CheckoutSuccessMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Resolution summary */}
      <section className="border-t-2 border-zinc-400 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">本頁需求已全部對齊</h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-700">
            32 題客戶需求 review 已完成,付款結果與訂單流程相關決議全部直接反映在 mockup 上。
          </p>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "訂單付款完成才進凌越 ERP(B 方案)",
              "信用卡 → 綠界回呼自動切「已付款」",
              "匯款 → 會計核對後手動切「已付款」",
              "貨到付款 → 司機收款後切「已付款」",
              "訂單狀態 6 個:待付款/已付款/備貨中/已出貨/已完成/已取消",
              "已出貨後 7 天系統自動轉「已完成」",
              "凌越同步失敗 → 系統 retry 3 次 + 通知管理員",
              "LINE 推播:訂單成立 / 付款完成 / 出貨 三時點",
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
        prev={{ title: "選擇付款方式", href: "/modules/checkout/payment" }}
        next={{ title: "會員 — 訂單列表", href: "/modules/members/orders" }}
      />
    </main>
  );
}
