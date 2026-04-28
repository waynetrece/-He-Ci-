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
    question: "LINE 通知 / 客服功能是否要做？若要做：通知範圍、綁定流程、客服管道由誰決定？",
    context:
      "本提案目前畫面只留 LINE 註冊／登入（auth 頁），其他 LINE 功能（綁定、通知推播、LINE 客服對話）尚未規劃進畫面，需 HJ 先確認後再做。需確認的點：① 通知範圍（訂單成立 / 備貨 / 出貨 / 送達 / 報價回覆 / 樣品 / 退換貨）哪些要發 ② 綁定流程（強制 / 選用）③ 推播失敗備援（改寄 Email / 只留會員中心）④ 客服溝通管道（LINE / 站內訊息 / Email）⑤ 是否要做 LINE 客服對話入口。",
    pinnedAt: "（LINE 通知 / 客服尚未規劃進畫面，僅此 Q 諮詢）",
    clientRef: {
      source: "前台 / 私版商品系列 (1)(2) + 官網 (3)",
      quote: "註冊方式：LINE.Email；複雜客製商品轉 LINE 客服報價",
      note: "需求表只寫了「LINE 註冊」與「轉 LINE 客服報價」，未指定通知 / 綁定 / 推播 / 失敗備援等細節。提案先把 LINE 從畫面拿掉，待 HJ 答覆通知與客服範圍後再規劃。",
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
  {
    no: "Q5",
    question: "HJ 是否已有 LINE 官方帳號、LINE Login Channel 與 Messaging API Channel？",
    context:
      "LINE 整合需確認的前置條件（與 Q1 搭配回答；功能尚未規劃進畫面）：① 是否已有 LINE 官方帳號？管理員權限可授權？② 是否已啟用 LINE Login Channel（給網站登入用）？③ 是否已啟用 Messaging API Channel（給通知用）？④ 兩個 Channel 是否在同一 Provider 底下（影響 userId 一致性）？⑤ 月訊息額度是否足夠？⑥ LINE 登入是否要取得 email（需向 LINE 申請額外權限）？",
    pinnedAt: "（LINE 整合前置條件，功能尚未規劃進畫面）",
    clientRef: {
      source: "前台 / 私版商品系列 (1)(2) + 官網 (3)",
      quote: "註冊方式：LINE.Email；複雜客製商品轉 LINE 客服報價",
      note: "需求表只寫了「LINE 註冊 / 轉 LINE 客服」，未交代 LINE 帳號 / Channel 等前置條件。這些條件會直接影響可否落地。",
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
