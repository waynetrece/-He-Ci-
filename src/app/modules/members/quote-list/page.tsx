"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { MemberQuoteListMockup } from "@/components/modules/mockups/MemberQuoteListMockup";
import { MEMBER_MOCKUPS } from "@/lib/members-mockups";

const PAGE_ID = "members-quote-list";
const PAGE_LABEL = "會員系統 — 我的詢價紀錄";
const ACTIVE_TAB = "quote-list";

const QUESTIONS = [
  {
    no: "Q1",
    question: "個人會員是否能使用「私版報價」功能？或只開放給企業客戶？",
    context:
      "目前先以這樣示意：① 企業客戶可使用完整詢價功能 ② 個人會員預設不開放，登入後在此頁顯示「升級為企業客戶」引導。想請 HJ 確認個人會員是否能用私版詢價。",
    pinnedAt: "個人會員視圖『升級為企業客戶』引導區",
    clientRef: {
      source: "前台 / 私版商品系列 (1)",
      quote: "客人在網站上點選需求選項得到報價",
      note: "需求表沒指定誰能用私版報價。本提案先預設只企業會員可用，想請 HJ 確認。",
    },
  },
  {
    no: "Q2",
    question: "詢價單有效期幾天？過期後處理方式？",
    context:
      "目前先以這樣示意：詢價單有效期 7 天，過期後狀態變「已過期」，提供「一鍵重新詢價」按鈕將原規格帶回詢價流程。想請 HJ 指定有效天數與過期處理。",
    pinnedAt: "已過期詢價單『一鍵重新詢價』按鈕",
    clientRef: {
      source: "需求表未提及（補充項）",
      quote: "（這項在需求表沒有對應段落）",
      note: "報價通常需設定有效期限，避免價格與材料條件變動。想請 HJ 指定天數。",
    },
  },
  {
    no: "Q3",
    question: "詢價單轉訂單的流程？是否需要客服確認後才能轉？",
    context:
      "目前先以這樣示意：①「已成交」狀態的詢價單可直接「轉訂單」進結帳流程 ②「等客服回覆」狀態需 HJ 客服確認規格與報價後，才會將詢價單標記成「已成交」，會員才能繼續結帳。客服溝通管道（LINE / 站內訊息 / Email）為另題（見會員設定頁 Q1 LINE 整體規劃）。",
    pinnedAt: "已成交詢價單『轉訂單』按鈕",
    clientRef: {
      source: "前台 / 私版商品系列 (2)",
      quote: "客服、客人提供製作原始檔、下單，均轉 LINE 客服",
      note: "需求表寫了「下單轉 LINE 客服」，但詢價單轉訂單的步驟細節未指定。",
    },
  },
];

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
            會員系統 預覽：
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
          <MemberQuoteListMockup annotations={annotations} pageId={PAGE_ID} />
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
              標註於上方畫面對應的元件上，您可以直接點畫面上的紅圈留言；下方為對照表，方便整體檢視。
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
        prev={{ title: "歷史訂單", href: "/modules/members/orders" }}
        next={{ title: "樣品申請紀錄", href: "/modules/members/samples" }}
      />
    </main>
  );
}
