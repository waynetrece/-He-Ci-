"use client";

import Link from "next/link";
import { useState } from "react";
import { CommentToolbar } from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { CartMockup } from "@/components/modules/mockups/CartMockup";
import { CART_MOCKUPS } from "@/lib/cart-mockups";

const PAGE_ID = "cart";
const PAGE_LABEL = "購物車與結帳 — 購物車";
const ACTIVE_TAB = "cart";

// 32 題 review 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 公版 / 私版 / 樣品 三條流程完全分開,不允許同車(A 包 Q-A9)
// - 加購品 = 公版商品本身 + 促銷規則(A 包 Q-A5)
// - 加購品運費 = 跟主商品同訂單算運費(B 包 Q-B9)
// - 訂單狀態 6 個:待付款/已付款/備貨中/已出貨/已完成/已取消(B 包 Q-B2)
// - 物流商選擇 = 客戶付款完成後業務後台勾選(B 包 Q-B11)
// - 物流追蹤 = HJ 不串 API,系統依物流商產生查詢頁連結模板(B 包 Q-B3)
//
// 運費規則(B 包,HJ 提供的運費圖):
//   宅配:純箱免運;條購/混購 ≥ NT$ 2,500 免運;未達依加總材積級距
//     - 0.1–2 才 = 100 / 2.1–3 = 120 / 3.1–4 = 150 / 4.1–5 = 180 / 5.1–6 = 200
//   超商:純箱不開放;條購 ≤ 1.5 才才可走,≥ 699 免運,未達 65;箱+條不開放
//   超商上限:同時檢查 1.5 才 + 5kg(取較嚴)
//   自取:1 個倉庫(新北五股),客戶下單不選日期,HJ 通知後客戶挑

export default function CartPage() {
  const [annotations, setAnnotations] = useState(true);

  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <CommentToolbar
        pageId={PAGE_ID}
        pageLabel={PAGE_LABEL}
        annotations={annotations}
        setAnnotations={setAnnotations}
      />

      {/* Mockup tabs */}
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
          <CartMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Resolution summary */}
      <section className="border-t-2 border-zinc-400 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">本頁需求已全部對齊</h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-700">
            32 題客戶需求 review 已完成,購物車運費規則、配送方式、訂單狀態相關決議全部直接反映在上方 mockup。
          </p>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "公版 / 私版 / 樣品 三條流程完全分開,不允許同車",
              "加購品 = 公版商品本身,加購是促銷規則,跟主商品同訂單算運費",
              "宅配:純箱免運 / 混購 ≥ NT$ 2,500 免運 / 未達依材積級距",
              "宅配級距:0.1–2 才 100、2.1–3 才 120、3.1–4 才 150、4.1–5 才 180、5.1–6 才 200",
              "超商:純箱不開放 / 條購 ≤ 1.5 才 / ≥ NT$ 699 免運",
              "公司自取:新北五股倉,備貨完成後通知客戶挑時間",
              "離島 / 圖外特殊商品:不允許直接結帳,提示客服",
              "物流商選擇 = 客戶付款完成後業務後台勾選",
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
        next={{ title: "結帳", href: "/modules/checkout" }}
      />
    </main>
  );
}
