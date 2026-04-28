"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ProductListMockup } from "@/components/modules/mockups/ProductListMockup";
import { PRODUCTS_MOCKUPS } from "@/lib/products-mockups";

const PAGE_ID = "products-list";
const PAGE_LABEL = "公版商品系統";
const ACTIVE_TAB = "list";

const SAMPLE_REF = {
  source: "前台 / 公版商品系列 (2)",
  quote: "樣品申請：每個商品頁增加樣品按鈕",
};

const QUESTIONS = [
  {
    no: "Q1",
    question: "多層規格選項要支援幾層？",
    context: "例：紙杯 → 容量（8oz/12oz）→ 材質（PE/PLA）→ 印刷（單面/雙面）= 3 層",
    pinnedAt: "左欄『材質』篩選區",
    clientRef: {
      source: "前台 / 公版商品系列 (3)",
      quote: "多層 規格&選項",
      note: "您有寫「多層」，但未指定支援幾層 → 我們需要您確認層數上限。",
    },
  },
  {
    no: "Q2",
    question: "不同規格組合要分開算庫存嗎？",
    context: "例：「8oz 白色紙杯」賣完了，「12oz 白色紙杯」還能不能賣？分開算 → 各自獨立、其中一款缺貨不影響其他款；合併算 → 同款商品共用一個庫存數字，其中一個沒了全部都擋下。",
    pinnedAt: "左欄『材質』篩選區",
    clientRef: {
      source: "後台 / 庫存管理 (1)(2)(3) + 顧客管理 (1)（隱含）",
      quote: "API 串接：庫存即時更新／部分商品需要預留庫存／缺貨提醒；網站客人需與原 ERP 客戶編號相同",
      note: "您有寫要串 ERP 即時庫存，但未說明「庫存的最小單位是商品還是規格組合」→ 影響網站如何擋缺貨。",
    },
  },
  {
    no: "Q3",
    question: "商品列表頁是否顯示價格？",
    context: "B2B 電商常選擇隱藏價格，需登入才看得到。或一律顯示「請洽詢」字樣。",
    pinnedAt: "第 1 張卡『請洽詢』價格區",
    clientRef: {
      source: "前台 / 公版商品系列 (1)",
      quote: "提供給客人下單",
      note: "您有寫要讓客人下單（隱含要看得到價格），但未指定「列表頁直接顯示／詳情頁才顯示／必須登入才看得到」。",
    },
  },
  {
    no: "Q4",
    question: "分級會員看到的價格如何呈現？",
    context: "選項：只顯示該等級價、原價劃掉+會員價、原價+折扣 % 等。",
    pinnedAt: "第 1 張卡『請洽詢』價格區",
    clientRef: {
      source: "後台 / 顧客管理 (2)",
      quote: "多層會員分級：商品會因顧客分級而有不同價",
      note: "您有寫「不同價」，但未指定呈現方式 → 我們需要您選一種。",
    },
  },
  {
    no: "Q5",
    question: "樣品申請是否要收費？",
    context: "選項：完全免費 / 樣品免費但運費自付 / 限金額或會員等級",
    pinnedAt: "第 3 張卡『申請樣品』按鈕",
    clientRef: { ...SAMPLE_REF, note: "您有寫要有樣品按鈕，但未提收費規則。" },
  },
  {
    no: "Q6",
    question: "樣品申請是否限會員才能申請？",
    pinnedAt: "第 3 張卡『申請樣品』按鈕",
    clientRef: { ...SAMPLE_REF, note: "您有寫要有樣品按鈕，但未提資格限制。" },
  },
  {
    no: "Q7",
    question: "樣品申請是否要後台審核才寄出？",
    pinnedAt: "第 3 張卡『申請樣品』按鈕",
    clientRef: { ...SAMPLE_REF, note: "您有寫要有樣品按鈕，但未提審核流程。" },
  },
];

export default function ProductsModulePage() {
  // 預設開啟標註模式，讓客戶開頁直接看到問題與我們建議
  const [annotations, setAnnotations] = useState(true);

  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <CommentToolbar
        pageId={PAGE_ID}
        pageLabel={PAGE_LABEL}
        annotations={annotations}
        setAnnotations={setAnnotations}
      />

      {/* Mockup tabs — 預覽切換為主角 */}
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

      {/* Current mockup */}
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <ProductListMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Confirmation section — 對照表，列出本頁所有已釘到畫面上的問題 */}
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
        prev={undefined}
        next={{ title: "私版商品報價系統", href: "/modules/private-quote" }}
      />
    </main>
  );
}
