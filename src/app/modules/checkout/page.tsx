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
const PAGE_LABEL = "購物車與結帳 — 結帳";
const ACTIVE_TAB = "checkout";

const QUESTIONS = [
  {
    no: "Q1",
    question: "付款方式組合 — 目前提案 4 種付款方式，HJ 想要怎麼分配給不同會員類型？",
    context:
      "目前提案的付款方式：信用卡（綠界）/ ATM 虛擬帳號 / 貨到付款 / 月結 30 天（B2B 人工審核）。建議分配（請 HJ 微調）：一般會員適合信用卡 / ATM / 貨到付款；企業客戶適合 ATM / 月結；客製私版建議僅 ATM / 月結（避免信用卡爭議款）。想請 HJ 確認：4 種付款方式是否要增減、個人會員是否完全排除月結、客製私版是否要限制信用卡。",
    pinnedAt: "Step 3『付款方式』區",
    clientRef: {
      source: "後台 / 金流 (7) + 後台 / 顧客管理 (5)",
      quote: "綠界、一般匯款、宅配/自取貨到付款；多層會員分級價",
      note: "需求表寫了金流選項與會員分級。本提案先列出 4 種付款方式並提建議分配，由 HJ 決定要不要這樣分。",
    },
  },
  {
    no: "Q2",
    question: "月結客戶 SOP — 哪些會員等級可月結？月結訂單是業務人工審核還是自動成立？",
    context:
      "目前先以「合作 A 級」示意：①「月結 30 天」付款方式只在合作 A 級會員顯示 ② 月結訂單送出後不直接成立，先進入「月結審核中」狀態 ③ HJ 業務人工確認後才轉「已成立」並送 ERP ④ 業務拒絕則通知會員改其他付款方式。想請 HJ 確認：哪些會員等級可用月結（只 A 級？A+B 級？）、月結訂單是否每筆都人工審核還是過去往來正常的可自動通過、月結延遲付款的提醒 / 催收流程。（信用額度自動檢查、超額自動擋下單屬進階功能；HJ 提出再規劃，不在本輪示意中）",
    pinnedAt: "Step 3『付款方式』區（合作 A 級限定的月結選項）",
    clientRef: {
      source: "後台 / 顧客管理 (5) + 後台 / 金流 (7)",
      quote: "客戶編號與凌越 ERP 同步、多層會員分級價",
      note: "需求表寫了會員分級，但月結這個 B2B 常見方式未明寫。本提案以「人工審核版」示意；信用額度自動扣 / 自動擋是進階功能，HJ 提出再規劃。",
    },
  },
  {
    no: "Q3",
    question: "發票欄位需求 — 企業客戶三聯式（公司抬頭 / 統編 / 寄送方式）是否要每次手動確認？個人會員載具是否強制？",
    context:
      "目前先以這樣示意：① 企業客戶：預設帶入「帳號設定」存的發票資料，可在結帳時改 ② 個人會員：可選電子發票（雲端載具 / 手機條碼）/ 三聯式 / 捐贈發票 ③ 統編 / 載具一旦填過就記住。想請 HJ 確認欄位與行為。",
    pinnedAt: "Step 4『發票』區",
    clientRef: {
      source: "需求表未提及（補充項）",
      quote: "（這項在需求表沒有對應段落）",
      note: "B2B 場景發票一定要做。本提案參考一般電商實務，想請 HJ 確認欄位與行為。",
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
          <CheckoutMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      <section className="border-t-2 border-zinc-400 bg-amber-50/40 px-6 py-16">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-amber-900">
              本頁待確認的項目（共 {QUESTIONS.length} 題）
            </h2>
            <p className="mt-3 max-w-3xl text-base text-zinc-700">
              以下 {QUESTIONS.length} 題都已用紅圈
              <span className="mx-1 inline-flex items-center gap-1 rounded-full border-2 border-rose-600 bg-rose-500 py-0.5 pl-1 pr-2 text-xs font-bold text-white align-middle">
                <span className="flex size-4 items-center justify-center rounded-full bg-white text-[10px] font-black text-rose-600">
                  ?
                </span>
                Q
              </span>
              標註於上方畫面對應的元件上，您可以直接點畫面上的紅圈留言。
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
        prev={{ title: "購物車", href: "/modules/cart" }}
        next={{ title: "訂單成立", href: "/modules/checkout/success" }}
      />
    </main>
  );
}
