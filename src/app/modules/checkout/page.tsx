"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { CheckoutMockup } from "@/components/modules/mockups/CheckoutMockup";
import { CART_MOCKUPS } from "@/lib/cart-mockups";

const PAGE_ID = "checkout";
const PAGE_LABEL = "購物車與結帳 — 結帳填寫資料";
const ACTIVE_TAB = "checkout";

// 32 題 review 已決議事項(直接反映在 mockup 上):
// - 訂單付款完成才進凌越(E 包,B 方案)
// - 訂單狀態 6 個(B 包 Q-B2)
// - 物流商選擇 = 客戶付款完成後業務後台勾選(B 包 Q-B11)
// - 離島不允許直接結帳 → 提示客服(B 包)
// - 圖外特殊商品也走客服(B 包 Q-B5)
// - 結帳前需登入(綁凌越客編)
// - 付款方式 4 種(F 包):信用卡(綠界)/ 一般匯款 / 貨到付款 / 自取現場
// - ATM 第一版不做、月結不做(F 包)

const QUESTIONS = [
  {
    no: "Q1",
    question: "發票服務商 + 細項規則",
    context:
      "已決定:結帳頁要設計發票區。\n\n仍須 HJ 確認:\n• 發票類型:紙本 / 雲端 / 電子 三選哪些\n• 服務商:綠界發票 / 關貿 / 大簡 / ezPay 等\n• 退換貨處理:全退作廢、部分退開折讓單?\n• B2B(三聯式 + 統編)+ B2C(二聯式 + 載具)+ 捐贈愛心碼,呈現方式\n\n本頁先用「電子 default」呈現,實際服務商串接費 + 月費等簽約後對齊。",
    pinnedAt: "發票資訊區",
    clientRef: {
      source: "F 包 Q-F11 + 報價待確認 W1/W5",
      quote: "發票類型(紙本/雲端/電子) + 退換貨折讓單還是作廢",
      note: "32 題回覆中發票部分 HJ 留白,待 HJ 提供具體規則。",
    },
  },
];

export default function CheckoutPage() {
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
          <CheckoutMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Q section — 只剩發票相關 */}
      <section className="border-t-2 border-zinc-400 bg-amber-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-amber-900">
              本頁待確認的項目(共 {QUESTIONS.length} 題,等 HJ 補資料)
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-zinc-700">
              其他結帳邏輯(收件 / 配送 / 訂單狀態 / 離島判定)32 題 review 已全部決議,直接反映在 mockup 上。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {QUESTIONS.map((q) => (
              <article key={q.no} className="relative flex gap-4 rounded-lg border border-rose-300 bg-white p-5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rose-500 font-mono text-sm font-bold text-white">
                  {q.no}
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-bold leading-snug text-zinc-900">{q.question}</h3>
                  {q.context && <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-zinc-600">{q.context}</p>}
                  {q.pinnedAt && (
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
                      <span aria-hidden>↑</span>已標註於:{q.pinnedAt}
                    </p>
                  )}
                  {q.clientRef && (
                    <div className="mt-3 rounded-md border border-sky-200 bg-sky-50/70 px-3 py-2.5">
                      <div className="mb-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="inline-flex items-center gap-1 font-bold text-sky-800">
                          <ClipboardIcon /> 您的需求表
                        </span>
                        <span className="text-sky-300">·</span>
                        <span className="font-medium text-sky-700">{q.clientRef.source}</span>
                      </div>
                      <div className="text-sm leading-relaxed text-zinc-800">「{q.clientRef.quote}」</div>
                      {q.clientRef.note && <div className="mt-1 text-xs text-zinc-500">{q.clientRef.note}</div>}
                    </div>
                  )}
                </div>
                <div className="shrink-0">
                  <CommentTrigger
                    pageId={PAGE_ID}
                    elementId={`question-${q.no}`}
                    elementLabel={`${q.no}:${q.question}`}
                    variant="icon"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Resolution summary */}
      <section className="border-t border-zinc-200 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">本頁其他規則已對齊 review</h2>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "結帳前需登入會員(綁凌越客編)",
              "離島地址 → 擋住結帳 + 提示聯繫客服",
              "8 個離島:澎湖/金門/馬祖/綠島/蘭嶼/小琉球/東引/烏坵",
              "配送方式延用購物車選擇(宅配 / 超商)",
              "物流商 = 客戶付款完成後業務後台勾選",
              "訂單付款完成才進凌越 ERP(B 方案)",
              "圖外特殊商品 → 走客服流程",
              "稅額 5%、發票於本頁設定",
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
        prev={{ title: "購物車", href: "/modules/cart" }}
        next={{ title: "選擇付款方式", href: "/modules/checkout/payment" }}
      />
    </main>
  );
}
