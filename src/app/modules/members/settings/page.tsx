"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { MemberSettingsMockup } from "@/components/modules/mockups/MemberSettingsMockup";
import { MEMBER_MOCKUPS } from "@/lib/members-mockups";

const PAGE_ID = "members-settings";
const PAGE_LABEL = "會員系統 — 帳號與公司資料";
const ACTIVE_TAB = "settings";

const QUESTIONS = [
  {
    no: "Q1",
    question: "LINE 帳號綁定是否強制？通知範圍由誰開關？綁定中斷後如何處理？",
    context:
      "目前先以這樣示意：① 綁定為「選用」非強制 ② 綁定後預設開啟「訂單成立通知 / 出貨通知 / 報價回覆」三項，可在通知偏好區個別關閉 ③ 解除綁定後，通知改用 Email 寄送。想請 HJ 確認。",
    pinnedAt: "LINE 帳號綁定區塊",
    clientRef: {
      source: "前台 / 私版商品系列 (1)(2) + 官網 (3)",
      quote: "註冊方式：LINE.Email；複雜客製商品轉 LINE 客服報價",
      note: "LINE 綁定的具體規範未在需求表指定。本提案以「傳送訂單通知」為核心用途。",
    },
  },
  {
    no: "Q2",
    question: "是否需要常用收件地址 / 多門市地址管理？個人會員可存幾筆？企業客戶可存幾筆？標籤命名規則？",
    context:
      "目前先以這樣示意：① 個人會員可存 5 筆，標籤「家裡 / 工作 / 其他」② 企業客戶可依需求設定上限，標籤「總店 / 分店 / 倉庫 / 其他」可自訂。可標記預設地址。想請 HJ 確認。",
    pinnedAt: "收件地址 / 多門市地址 區塊",
    clientRef: {
      source: "需求表未提及（補充項）",
      quote: "（這項在需求表沒有對應段落）",
      note: "餐飲客戶可能多門市配送，建議補上。想請 HJ 確認上限與標籤命名。",
    },
  },
  {
    no: "Q3",
    question: "發票資料需要哪些欄位？個人會員是否簡化版？",
    context:
      "目前先以這樣示意：① 企業客戶需公司抬頭、統編、發票寄送方式（Email / 紙本擇一）② 個人會員僅需 Email 收件 + 載具綁定。想請 HJ 確認欄位需求。",
    pinnedAt: "發票資料 區塊",
    clientRef: {
      source: "需求表未提及（補充項）",
      quote: "（這項在需求表沒有對應段落）",
      note: "企業場景幾乎一定會問。想請 HJ 確認欄位完整度。",
    },
  },
  {
    no: "Q4",
    question: "公司資料若由會員自行修改，是否需要後台審核後才同步 ERP？",
    context:
      "目前先以這樣示意：① 公司名、統編、發票資料 → 會員可自行修改，但變更後標示「待業務確認」，由 HJ 業務在後台審核通過才同步 ERP ② ERP 客戶編號 → 唯讀，僅後台可改。想請 HJ 確認規則。",
    pinnedAt: "公司資料 區塊",
    clientRef: {
      source: "後台 / 顧客管理 (1)",
      quote: "API 串接：網站客人需與原 ERP 客戶編號相同",
      note: "需求表寫了 ERP 編號要對應，但會員是否能修改公司資料、是否需審核同步 ERP 未指定。",
    },
  },
];

export default function MembersSettingsPage() {
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
          <MemberSettingsMockup annotations={annotations} pageId={PAGE_ID} />
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
        prev={{ title: "樣品申請紀錄", href: "/modules/members/samples" }}
        next={{ title: "訂單系統", href: "/modules/orders" }}
      />
    </main>
  );
}
