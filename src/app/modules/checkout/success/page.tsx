"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { CheckoutSuccessMockup } from "@/components/modules/mockups/CheckoutSuccessMockup";
import { CART_MOCKUPS } from "@/lib/cart-mockups";

const PAGE_ID = "checkout-success";
const PAGE_LABEL = "購物車與結帳 — 訂單成立";
const ACTIVE_TAB = "success";

const QUESTIONS = [
  {
    no: "Q1",
    question: "訂單成立後 ERP 同步時機 — 即時 API 推送、批次同步（每 N 分鐘 / 每日）、還是業務手動匯入？同步失敗時的備援？",
    context:
      "依需求表「訂單即時匯入凌越 ERP」先示意：① 訂單送出 → 網站存「待確認」→ 推給凌越 ERP → ERP 回 ack 後狀態變「已成立」② 若 ERP 失敗 / 逾時，網站訂單先停在「待 ERP 同步」，背景重試（最多 3 次），仍失敗則通知 HJ 業務手動匯入。實際機制（即時 API / 批次 / 手動）與失敗備援待 HJ 與凌越廠商確認，對齊 scope-checklist #15。",
    pinnedAt: "等待付款 / 月結審核狀態的『ERP 同步狀態』訊息",
    clientRef: {
      source: "後台 / 訂單管理 (3) + 後台 / 顧客管理 (5)",
      quote: "訂單即時匯入凌越 ERP；網站客人需與原 ERP 客戶編號相同",
      note: "需求表寫了「即時匯入凌越 ERP」但未細分機制（同步 API / 排程批次 / 手動），失敗備援也未寫。本提案先依需求表字面示意，待 HJ + 凌越確認後再定。",
    },
  },
  {
    no: "Q2",
    question: "月結審核 SOP — 由誰審？何時通知？拒絕後如何處理？",
    context:
      "目前先以這樣示意：① 月結訂單超過信用額度自動進「月結審核中」狀態 ② HJ 業務在後台審核，可「核准」或「拒絕並改其他付款方式」③ 核准後以 Email 通知會員（其他通知管道待 HJ 確認，見 settings Q1 + Q5 LINE 整體規劃）④ 拒絕則會員需重新到「結帳」改付款方式。想請 HJ 確認：審核權責、SLA。",
    pinnedAt: "月結審核中狀態『後續流程』",
    clientRef: {
      source: "後台 / 訂單管理 (3) + 後台 / 金流 (7)",
      quote: "訂單即時匯入凌越 ERP；綠界、一般匯款、宅配/自取貨到付款",
      note: "需求表沒明寫月結，本提案先示意審核 SOP。",
    },
  },
];

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
          <span className="mr-2 text-sm font-medium text-amber-900">
            購物車與結帳 預覽：
          </span>
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
                {!m.ready && (
                  <span className="ml-1 text-[10px] opacity-60">（製作中）</span>
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
          <CheckoutSuccessMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      <section className="border-t-2 border-zinc-400 bg-amber-50/40 px-6 py-16">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-amber-900">
              本頁待確認的項目（共 {QUESTIONS.length} 題）
            </h2>
            <p className="mt-3 max-w-3xl text-base text-zinc-700">
              以下 {QUESTIONS.length} 題對應於 ERP 串接與月結審核流程，可在上方切換訂單狀態查看 pin 位置。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {QUESTIONS.map((q) => (
              <article
                key={q.no}
                className="relative flex gap-4 rounded-lg border border-rose-300 bg-white p-5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rose-500 font-mono text-sm font-bold text-white">
                  {q.no}
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-bold leading-snug text-zinc-900">
                    {q.question}
                  </h3>
                  {q.context && (
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                      {q.context}
                    </p>
                  )}
                  {q.pinnedAt && (
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
                      <span aria-hidden>↑</span>
                      已標註於：{q.pinnedAt}
                    </p>
                  )}
                  {q.clientRef && (
                    <div className="mt-3 rounded-md border border-sky-200 bg-sky-50/70 px-3 py-2.5">
                      <div className="mb-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="inline-flex items-center gap-1 font-bold text-sky-800">
                          <ClipboardIcon /> 您的需求表
                        </span>
                        <span className="text-sky-300">·</span>
                        <span className="font-medium text-sky-700">
                          {q.clientRef.source}
                        </span>
                      </div>
                      <div className="text-sm leading-relaxed text-zinc-800">
                        「{q.clientRef.quote}」
                      </div>
                      {q.clientRef.note && (
                        <div className="mt-1 text-xs text-zinc-500">
                          {q.clientRef.note}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="shrink-0">
                  <CommentTrigger
                    pageId={PAGE_ID}
                    elementId={`question-${q.no}`}
                    elementLabel={`${q.no}：${q.question}`}
                    variant="icon"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ModuleFooterNav
        prev={{ title: "結帳", href: "/modules/checkout" }}
        next={{ title: "歷史訂單", href: "/modules/members/orders" }}
      />
    </main>
  );
}
