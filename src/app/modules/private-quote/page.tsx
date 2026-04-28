"use client";

import { useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { PrivateQuoteMockup } from "@/components/modules/mockups/PrivateQuoteMockup";

const PAGE_ID = "private-quote";
const PAGE_LABEL = "私版商品報價系統";

const SAMPLE_REF = {
  source: "前台 / 私版商品系列 (2)",
  quote: "客服、客人提供製作原始檔、下單，均轉 LINE 客服",
};

const QUESTIONS = [
  {
    no: "Q1",
    question: "即時報價支援哪幾類商品？",
    context:
      "選項：① 全部公版 8 大類都做 ② 只做熱門類別（如紙杯、紙袋）③ 由 HJ 自行配置。範圍越大，計價邏輯越複雜，且需提供對應價目表。",
    pinnedAt: "Step 1『商品類型』選擇區",
    clientRef: {
      source: "前台 / 私版商品系列 (1) + 參考 jcolor BC-67",
      quote: "客人在網站上點選需求選項得到報價；參考 jcolor.com.tw/product/BC-67",
      note: "您給了 jcolor 範例（範例只做名片），但未指定 HJ 要支援哪些商品類型。",
    },
  },
  {
    no: "Q2",
    question: "Email 註冊的會員，是否強制綁定 LINE 才能用「自動傳送 LINE」？",
    context:
      "技術限制：LINE 平台不允許用 Email 反查 LINE userId。Email 會員必須在會員中心做一次「綁定 LINE」按鈕，後台才能 push。注意：不綁定的人仍可使用「手動傳送」（路徑 A），不會被擋在門外。",
    pinnedAt: "情境 B『自動傳送』卡片 + 會員中心『未綁定』情境",
    clientRef: {
      source: "前台 / 官網 (3) + 私版商品系列 (1)(2)",
      quote: "註冊方式：LINE.Email（需驗證）；複雜客製商品轉 LINE 客服報價",
      note: "您寫了兩種註冊方式並存，但「Email 會員如何用 LINE 客服推送」這條橋未提。",
    },
  },
  {
    no: "Q3",
    question: "即時報價的計價公式由 HJ 提供嗎？",
    context:
      "可能形式：① 固定價目表（Excel 提供，每組規格對一個單價）② 底價 × 加成（例：紙杯 $1.5 × 雙面 1.3 × 全彩 1.5）③ 階梯式級距價。沒有公式系統就無法即時試算。",
    pinnedAt: "Step 4『數量』區（影響試算邏輯）",
    clientRef: {
      source: "前台 / 私版商品系列 (1)",
      quote: "客人在網站上點選需求選項得到報價",
      note: "您寫要可即時報價，但「計價公式 / 價目表」未提供。沒有這個系統就做不出即時試算。",
    },
  },
  {
    no: "Q4",
    question: "能算的報價，是否要做「直接下單」按鈕？",
    context:
      "您 PDF 第 (1)(2) 點似乎矛盾：(1) 寫客人選完可即時得報價 + 加購 + 訂單管理（暗示能在站內下單）；(2) 寫「客人下單均轉 LINE 客服」（暗示一律走 LINE）。請釐清：能即時報的，是否仍走 LINE 確認？或可直接購物車結帳？",
    pinnedAt: "右側報價結果『立即下單』按鈕",
    clientRef: {
      source: "前台 / 私版商品系列 (1)(2)",
      quote: "(1) 客人在網站上點選需求選項得到報價；(2) 客服、客人提供製作原始檔、下單，均轉 LINE 客服",
      note: "您兩處寫法似乎衝突 —（1）有「即時報價→直接下單」的味道，（2）又寫「下單一律走 LINE」。",
    },
  },
  {
    no: "Q5",
    question: "設計檔（印刷原始檔）的上傳，要做在網站上、還是強制 LINE 傳？",
    context:
      "選項：① 網站做檔案上傳區（FTP / 雲端儲存）② 提示「請傳到 LINE 客服」③ 兩者都做（網站上傳為主，LINE 為輔）。檔案大小、格式（AI / PDF）也要同步確認。",
    pinnedAt: "Step 5『上傳設計檔』區",
    clientRef: { ...SAMPLE_REF, note: "您寫「均轉 LINE」似乎暗示檔案也走 LINE，但這對大檔案不友善 → 需要您確認。" },
  },
  {
    no: "Q6",
    question: "報價有效期幾天？過期後客戶看到什麼？",
    context:
      "範例：7 天 / 14 天 / 30 天。過期後選項：① 自動失效要求重新詢價 ② 顯示「此報價已過期」+ 一鍵帶回相同規格再詢一次。為了避免價格爭議，幾乎所有 B2B 報價系統都會設有效期。",
    pinnedAt: "右側報價結果『加入詢價單／立即下單』下方",
    clientRef: {
      source: "PDF 未提",
      quote: "（您的需求表沒有提到報價有效期）",
      note: "全新問題。報價有效期是 B2B 報價系統的標配，但您的需求表沒寫 → 我們需要您指定。",
    },
  },
];

export default function PrivateQuotePage() {
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

      {/* Mockup */}
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <PrivateQuoteMockup annotations={annotations} pageId={PAGE_ID} />
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
        prev={{ title: "公版商品系統", href: "/modules/products" }}
        next={{ title: "會員系統", href: "/modules/members" }}
      />
    </main>
  );
}
