"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { MemberSamplesMockup } from "@/components/modules/mockups/MemberSamplesMockup";
import { MEMBER_MOCKUPS } from "@/lib/members-mockups";

const PAGE_ID = "members-samples";
const PAGE_LABEL = "會員系統 — 樣品申請紀錄";
const ACTIVE_TAB = "samples";

const QUESTIONS = [
  {
    no: "Q1",
    question: "「樣品申請紀錄」是否要做進會員中心？這是我們建議的延伸功能，需求表只明確要「樣品申請按鈕」",
    context:
      "目前先以這樣示意：把樣品申請流程之後的紀錄整合到會員中心，讓會員能查申請狀態、收件地址、物流追蹤、備註。想請 HJ 確認此功能是否要保留，以及狀態是否要與 ERP / 出貨資料對應。若不做，會員端只保留「樣品申請按鈕」，後續狀態以 LINE 或 Email 通知。",
    pinnedAt: "頁面上方『我們建議』橫幅",
    clientRef: {
      source: "前台 / 公版商品系列 (2)",
      quote: "樣品申請：每個商品頁增加樣品按鈕",
      note: "需求表只寫了「樣品申請按鈕」。「樣品申請紀錄」是我們延伸建議的功能，不是客戶明確要求。",
    },
  },
  {
    no: "Q2",
    question: "樣品狀態的具體定義（申請中／審核中／已寄出／已送達／已關閉）— 名稱、順序、狀態間轉換條件由 HJ 提供？是否需與 ERP 出貨資料同步？",
    context:
      "目前先以這樣示意五個狀態：① 申請中（剛送出）② 審核中（業務確認資格）③ 已寄出（出貨給物流）④ 已送達（收貨完成）⑤ 已關閉（拒絕／取消／逾期）。想請 HJ 確認名稱與順序，以及是否與 ERP 同步。",
    pinnedAt: "篩選列『狀態』",
    clientRef: {
      source: "前台 / 公版商品系列 (2)",
      quote: "樣品申請：每個商品頁增加樣品按鈕",
      note: "公版樣品流程 Q6「客戶能否在會員中心查申請狀態」延伸 — 需確認狀態定義細節。",
    },
  },
  {
    no: "Q3",
    question: "個人會員是否能申請樣品？或只開放給企業客戶（避免樣品申請濫用）？",
    context:
      "目前先以這樣示意：① 企業客戶可正常申請與查看紀錄 ② 個人會員可申請但「每年限 X 件」（具體上限想請 HJ 決定）。想請 HJ 確認是否需要對個人會員設限。",
    pinnedAt: "右上『申請新樣品』按鈕",
    clientRef: {
      source: "前台 / 公版商品系列 (2)",
      quote: "樣品申請：每個商品頁增加樣品按鈕",
      note: "需求表寫了「樣品申請」但未指定資格限制。",
    },
  },
];

export default function MembersSamplesPage() {
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
          <MemberSamplesMockup annotations={annotations} pageId={PAGE_ID} />
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
        prev={{ title: "詢價紀錄", href: "/modules/members/quote-list" }}
        next={{ title: "帳號設定", href: "/modules/members/settings" }}
      />
    </main>
  );
}
