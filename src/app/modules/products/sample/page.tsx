"use client";

import Link from "next/link";
import { useState } from "react";
import { CommentToolbar } from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { SampleFlowMockup } from "@/components/modules/mockups/SampleFlowMockup";
import { PRODUCTS_MOCKUPS } from "@/lib/products-mockups";

const PAGE_ID = "products-sample";
const PAGE_LABEL = "公版商品系統 — 樣品申請流程";
const ACTIVE_TAB = "sample";

// 32 題 A 包已全部決議,本頁無待確認問題:
// - 限會員(必須登入)
// - 樣品免費 + 收運費(固定金額,後台可調)
// - 不需後台審核,直接出貨
// - 樣品申請單獨立(不能跟一般訂單同包)
// - 全部公版商品都可申請樣品
// - 件數限制:單次 3 / 月 10 / 年 30 件
// - 寄送方式:宅配 / 超商取貨 / 自取(同公版物流規則)
// - 進度查詢:會員中心 / 樣品申請列表

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
          <span className="mr-2 text-sm font-medium text-amber-900">公版商品 預覽:</span>
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
                {!m.ready && <span className="ml-1 text-[10px] opacity-60">(製作中)</span>}
              </>
            );
            return m.ready && !active ? (
              <Link key={m.id} href={m.href} className={cls}>{content}</Link>
            ) : (
              <button key={m.id} disabled={!m.ready} className={cls}>{content}</button>
            );
          })}
        </div>
      </section>

      {/* Mockup */}
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <SampleFlowMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Resolution summary */}
      <section className="border-t-2 border-zinc-400 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">本頁需求已全部對齊</h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-700">
            32 題客戶需求 review 已完成,樣品申請流程相關決議全部已直接反映在上方 mockup 上。
          </p>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "限會員(必須登入才能申請)",
              "樣品免費 + 收運費(固定 NT$ 80,後台可調)",
              "不需後台審核,直接進出貨流程",
              "樣品申請單獨立,不能與一般訂單同包",
              "件數限制:單次 3 / 月 10 / 年 30 件",
              "寄送方式:宅配 / 超商 / 自取(自取免運)",
              "進度查詢 → 會員中心 / 樣品申請列表",
              "全部公版商品都可申請",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ModuleFooterNav
        prev={{ title: "商品詳情頁", href: "/modules/products/detail" }}
        next={{ title: "私版商品報價系統", href: "/modules/private-quote" }}
      />
    </main>
  );
}
