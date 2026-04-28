"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardIcon,
  CommentToolbar,
  CommentTrigger,
} from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { MemberDashboardMockup } from "@/components/modules/mockups/MemberDashboardMockup";
import { MEMBER_MOCKUPS } from "@/lib/members-mockups";

const PAGE_ID = "members-dashboard";
const PAGE_LABEL = "會員系統 — 會員首頁 Dashboard";
const ACTIVE_TAB = "dashboard";

const QUESTIONS = [
  {
    no: "Q1",
    question: "一般會員與企業客戶是否共用同一套等級系統？各有幾級、等級名稱、升降級規則、價格生效時間？會員等級價、合約價、ERP 客戶特殊價的優先順序？",
    context:
      "目前畫面預設：個人會員顯示「VIP 銀級」；企業客戶顯示「合作客戶 A 級 + 合約價」。實際命名、層級數、升降級邏輯、與 ERP / 合約價的優先順序皆需貴司提供。這是計價邏輯核心。",
    pinnedAt: "Dashboard『快速功能』標題 + 等級徽章",
    clientRef: {
      source: "後台 / 顧客管理 (2)",
      quote: "多層會員分級：商品會因顧客分級而有不同價",
      note: "需求表寫了「多層分級」，但兩種會員的等級系統是否共用、命名、升降級規則、與 ERP / 合約價的優先順序皆未提供。",
    },
  },
  {
    no: "Q2",
    question: "Dashboard 依會員類型顯示什麼差異？個人會員的 Dashboard 隱藏哪些區塊（公司資料卡 / 詢價紀錄 / 多門市等）？ERP 客戶編號是否在會員自己看的畫面顯示？",
    context:
      "目前畫面預設：企業客戶頂部有「公司資料卡」（公司名 / 統編 / ERP 客戶編號 / 等級 / 價格級距）；個人會員此區塊隱藏，改顯示精簡版。請貴司確認顯示策略。",
    pinnedAt: "公司資料卡（企業版）",
    clientRef: {
      source: "後台 / 顧客管理 (1)(2)",
      quote: "API 串接：網站客人需與原 ERP 客戶編號相同；多層會員分級",
      note: "需求表沒有指定 ERP 客戶編號是否要對會員自己顯示，也沒有規定 Dashboard 兩種會員的差異。",
    },
  },
  {
    no: "Q3",
    question: "價格顯示規則 — 未登入訪客 / 個人會員 / 企業客戶分別看到什麼價格？顯示原價、會員價、企業價、請洽詢，還是隱藏價格？",
    context:
      "目前畫面預設：個人會員顯示「會員價」+「原價劃掉」；企業客戶顯示「合約價」+「等級價」。實際是否顯示、要顯示什麼數字、未登入訪客看到的版本，需貴司確認。",
    pinnedAt: "個人會員精簡資料列『適用價格』",
    clientRef: {
      source: "後台 / 顧客管理 (2)",
      quote: "多層會員分級：商品會因顧客分級而有不同價",
      note: "需求表寫了「不同價」，但「不同身份看到什麼版本」未指定。",
    },
  },
];

export default function MembersDashboardPage() {
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
          <MemberDashboardMockup annotations={annotations} pageId={PAGE_ID} />
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
        prev={{ title: "註冊／登入", href: "/modules/members/auth" }}
        next={{ title: "訂單詳情", href: "/modules/members/orders/HJ-20260427-001" }}
      />
    </main>
  );
}
