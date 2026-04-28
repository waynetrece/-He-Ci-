"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { MemberAuthMockup } from "@/components/modules/mockups/MemberAuthMockup";
import { MEMBER_MOCKUPS } from "@/lib/members-mockups";

const PAGE_ID = "members-auth";
const PAGE_LABEL = "會員系統 — 註冊／登入";
const ACTIVE_TAB = "auth";

const QUESTIONS = [
  {
    no: "Q1",
    question: "註冊流程是否分為「個人會員 / 企業客戶」兩種？企業客戶是否需後台審核或手動升級？",
    context:
      "目前先以這樣示意：① 註冊第一步先選會員類型 ② 個人會員填基本資料即可立即啟用 ③ 企業客戶填公司資料後標示「審核中」，由 HJ 業務人工確認 ERP 編號與分級後啟用。審核中可瀏覽公版商品、申請樣品；查看企業價、下單、私版報價需審核完成。",
    pinnedAt: "Step 1『選擇會員類型』區",
    clientRef: {
      source: "前台 / 官網 (3) + 後台 / 顧客管理 (1)",
      quote: "註冊方式：LINE.Email（需驗證）；網站客人需與原 ERP 客戶編號相同",
      note: "需求表寫了註冊方式但未指定是否分「個人 / 企業」，以及企業是否需審核流程。",
    },
  },
  {
    no: "Q2",
    question: "LINE 一鍵註冊／登入是否要做？要做的話，LINE 帳號與網站會員的對應規則由誰決定？",
    context:
      "本頁畫面只示意「LINE 一鍵註冊／登入」（用來建立或登入會員帳號）。其他 LINE 功能（通知推播 / 帳號綁定 / LINE 客服對話）尚未規劃進畫面，需 HJ 確認後再做（見會員設定頁 Q1 + Q5 LINE 整體規劃）。",
    pinnedAt: "註冊頁『使用 LINE 一鍵註冊』按鈕",
    clientRef: {
      source: "前台 / 官網 (3)",
      quote: "註冊方式：LINE.Email（需驗證）",
      note: "需求表只提到「LINE 註冊」，未細分流程。本提案先把 LINE 一鍵註冊／登入做進畫面，其他 LINE 功能集中到設定頁的 LINE 整體 Q 諮詢。",
    },
  },
];

export default function MembersAuthPage() {
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

      {/* Mockup */}
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MemberAuthMockup annotations={annotations} pageId={PAGE_ID} />
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
        prev={{ title: "私版報價系統", href: "/modules/private-quote" }}
        next={{ title: "會員首頁", href: "/modules/members" }}
      />
    </main>
  );
}
