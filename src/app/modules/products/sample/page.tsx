"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { SampleFlowMockup } from "@/components/modules/mockups/SampleFlowMockup";
import { PRODUCTS_MOCKUPS } from "@/lib/products-mockups";

const PAGE_ID = "products-sample";
const PAGE_LABEL = "公版商品系統 — 樣品申請流程";
const ACTIVE_TAB = "sample";

const QUESTIONS = [
  {
    no: "Q1",
    question: "樣品申請是否要收費？運費誰付？",
    context: "選項：完全免費 / 樣品免費但運費自付 / 限金額或會員等級",
    pinnedAt: "決策點：收費 / 運費規則？",
  },
  {
    no: "Q2",
    question: "樣品申請是否限會員才能申請？",
    context: "選項：任何人皆可申請 / 必須登入會員 / 須註冊但不需審核",
    pinnedAt: "決策點：要登入嗎？",
  },
  {
    no: "Q3",
    question: "是否需要後台人工審核才寄出？",
    context: "選項：自動寄出 / 業務審核通過後才寄出。後者較安全但增加處理時間。",
    pinnedAt: "決策點：後台是否要審核？",
  },
  {
    no: "Q4",
    question: "一次最多可以申請幾件樣品？",
    context: "範例：1 件 / 3 件 / 不限。影響表單的商品選擇器 UI。",
    pinnedAt: "決策點：表單欄位／件數／寄送方式",
  },
  {
    no: "Q5",
    question: "樣品寄送方式有哪些？",
    context: "選項：超商取貨 / 宅配到府 / 自取。影響表單收件資訊欄位。",
    pinnedAt: "決策點：表單欄位／件數／寄送方式",
  },
  {
    no: "Q6",
    question: "客戶是否能在會員中心查申請狀態？",
    context: "若要做：會員中心多一個「樣品申請紀錄」頁，可看狀態（申請中／審核中／已寄出／已收到）。",
    pinnedAt: "決策點：查詢狀態頁要做嗎？",
  },
  {
    no: "Q7",
    question: "樣品申請的必填欄位有哪些？",
    context:
      "標配：姓名 / 公司名 / 電話 / 收件地址。可選：統編、用途說明、希望寄達日。每個欄位都要客戶確認是必填還是選填。",
    pinnedAt: "決策點：表單欄位／件數／寄送方式",
  },
];

export default function ProductsSamplePage() {
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
          <span className="mr-2 text-sm font-medium text-amber-900">
            公版商品 預覽：
          </span>
          {PRODUCTS_MOCKUPS.map((m) => {
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

      {/* Flow diagram */}
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <SampleFlowMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Confirmation section */}
      <section className="border-t-2 border-zinc-400 bg-amber-50/40 px-6 py-16">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-amber-900">
              本頁待確認的項目（共 {QUESTIONS.length} 題）
            </h2>
            <p className="mt-3 max-w-3xl text-base text-zinc-700">
              以下 {QUESTIONS.length} 題對應上方流程圖中的紅圈決策點，請逐項確認貴司期望的做法。
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
        prev={{ title: "商品詳情頁", href: "/modules/products/detail" }}
        next={{ title: "私版商品報價系統", href: "/modules/private-quote" }}
      />
    </main>
  );
}
