"use client";

import Link from "next/link";
import { use, useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { MemberOrderDetailMockup } from "@/components/modules/mockups/MemberOrderDetailMockup";
import { MEMBER_MOCKUPS } from "@/lib/members-mockups";

const PAGE_ID = "members-order-detail";
const PAGE_LABEL = "會員系統 — 訂單詳情";
const ACTIVE_TAB = "order-detail";

const QUESTIONS = [
  {
    no: "Q1",
    question: "訂單狀態與配送狀態是否分兩條 timeline？我們提供以下預設方案，請貴司確認名稱、順序、是否與 ERP / 物流同步：",
    context:
      "預設方案：● 訂單狀態：待確認 → 已成立 → 備貨中 → 已出貨 → 已完成；例外：已取消 / 退換貨處理中  ● 配送狀態：未出貨 → 已交物流 → 運送中 → 已送達；例外：配送異常。請確認名稱與順序，以及是否要與凌越 ERP / 物流公司即時同步。",
    pinnedAt: "上方雙 timeline 區塊『訂單狀態』",
    clientRef: {
      source: "前台 / 會員 (2) + 後台 / 訂單管理 (3)",
      quote: "訂單配送狀態；訂單出貨狀態",
      note: "需求表寫到「狀態」但未指定具體名稱、順序、與 ERP/物流的同步邏輯。",
    },
  },
  {
    no: "Q2",
    question: "「再訂一次」遇到公版商品 → 加購物車；遇到私版／客製商品 → 帶入規格重新詢價、還是轉 LINE 確認？",
    context:
      "目前畫面預設：① 公版商品（如 12oz 紙杯）按下「再訂一次」直接加入購物車 ② 私版／客製商品（如客製腰封）按下「再訂一次」會帶入上次規格到「我的詢價紀錄」並提示客戶重新確認，因為價格與規格可能變動。",
    pinnedAt: "商品明細第 1 張卡『再訂一次』按鈕",
    clientRef: {
      source: "前台 / 會員 (1) + 私版商品系列 (1)(2)",
      quote: "查詢歷史訂單，可再購買一次按鈕；複雜客製商品轉 LINE 客服報價",
      note: "需求表寫了「可再購買一次按鈕」，但未細分公版／私版商品的處理方式。",
    },
  },
  {
    no: "Q3",
    question: "退換貨／取消訂單流程走線上系統還是 LINE？什麼狀態下不能取消（出貨後？已備貨？）？",
    context:
      "目前畫面預設：①「待確認 / 已成立」狀態可線上取消 ②「備貨中」需 LINE 客服協助 ③「已出貨」之後不能取消，只能走「退換貨」流程。退換貨是線上申請還是 LINE 處理待確認。",
    pinnedAt: "訂單頂部『退換貨』按鈕",
    clientRef: {
      source: "後台 / 訂單管理 (7)",
      quote: "退換貨",
      note: "需求表只寫「退換貨」，未指定線上 vs LINE、可取消狀態。",
    },
  },
  {
    no: "Q4",
    question: "會員看到的歷史訂單，是只包含新網站成立後的訂單，還是要匯入 / 同步 ERP 既有歷史訂單？",
    context:
      "客戶可能期待「過去在 HJ 下過的訂單也能查」。如果要匯入，需確認資料範圍（過去 N 年？所有訂單？）、欄位是否完整、是否能執行「再訂一次」。",
    pinnedAt: "底部『訂單來源』提示",
    clientRef: {
      source: "後台 / 顧客管理 (1)",
      quote: "API 串接：網站客人需與原 ERP 客戶編號相同",
      note: "需求表只寫了客戶編號要對應，未指定歷史訂單是否要匯入。",
    },
  },
];

export default function MembersOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [annotations, setAnnotations] = useState(true);
  const { id } = use(params);

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
          <MemberOrderDetailMockup
            annotations={annotations}
            pageId={PAGE_ID}
            orderId={id}
          />
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
        prev={{ title: "會員首頁", href: "/modules/members" }}
        next={{ title: "訂單系統", href: "/modules/orders" }}
      />
    </main>
  );
}
