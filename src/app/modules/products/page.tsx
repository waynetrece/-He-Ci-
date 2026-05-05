"use client";

import Link from "next/link";
import { useState } from "react";
import { CommentToolbar } from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ProductListMockup } from "@/components/modules/mockups/ProductListMockup";
import { PRODUCTS_MOCKUPS } from "@/lib/products-mockups";

const PAGE_ID = "products-list";
const PAGE_LABEL = "公版商品系統";
const ACTIVE_TAB = "list";

// 已決議事項(直接反映在 mockup 上,不再列為待確認):
// - 規格層數 → HJ 後台自行勾選彈性配置(A 包 Q-A4)
// - 規格組合庫存 → 各自獨立 / 凌越各自編號(D 包)
// - 列表頁價格 → 訪客看一般價、會員看等級價(C 包)
// - 會員價呈現 → default 依等級顯示;細節等正式規劃再 final 跟 HJ 確認
// - 樣品申請 → 限會員、免費 + 收運費、不需審核直接出貨(A 包)

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

      {/* Resolution summary — 已決議事項摘要 */}
      <section className="border-t-2 border-zinc-400 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">
            本頁需求已全部對齊
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-700">
            32 題客戶需求 review 已完成,本頁相關問題全部已決議,直接反映在上方 mockup 上。
          </p>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "規格層數 → HJ 後台彈性配置",
              "規格組合庫存 → 各自獨立 / 凌越各自編號",
              "列表頁價格 → 訪客看一般價、會員看等級價",
              "會員價呈現 → 依等級顯示(規劃階段再 final 確認)",
              "樣品申請 → 限會員、免費 + 收運費",
              "樣品出貨 → 不需後台審核,直接出貨",
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
        prev={undefined}
        next={{ title: "私版商品報價系統", href: "/modules/private-quote" }}
      />
    </main>
  );
}
