"use client";

import Link from "next/link";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "@/components/modules/MockupShell";

type Product = {
  code: string;
  name: string;
  material: string;
  capacity: string;
  diameter: string;
  height: string;
  colors: string;
  pack: string;
  basePrice: string;
  memberPrice: string;
  moq: string;
  hasSample: boolean;
  cert: string;
  bg: string;
};

const PRODUCTS: Product[] = [
  {
    code: "PC-08-001",
    name: "8oz 公版瓦楞紙杯",
    material: "100% 食品級紙",
    capacity: "8oz / 240ml",
    diameter: "口徑 80mm",
    height: "高 92mm",
    colors: "白 / 黑 / 棕",
    pack: "1,000 入 / 箱",
    basePrice: "NT$ 1.8",
    memberPrice: "NT$ 1.5",
    moq: "2 箱起",
    hasSample: true,
    cert: "—",
    bg: "bg-amber-100",
  },
  {
    code: "DC-12-001",
    name: "12oz 雙層中空紙杯",
    material: "雙層隔熱紙",
    capacity: "12oz / 360ml",
    diameter: "口徑 90mm",
    height: "高 110mm",
    colors: "白 / 棕",
    pack: "500 入 / 箱",
    basePrice: "NT$ 3.2",
    memberPrice: "NT$ 2.6",
    moq: "1 箱起",
    hasSample: true,
    cert: "—",
    bg: "bg-orange-100",
  },
  {
    code: "PL-08-001",
    name: "8oz PLA 環保杯",
    material: "可分解 PLA",
    capacity: "8oz / 240ml",
    diameter: "口徑 80mm",
    height: "高 92mm",
    colors: "白",
    pack: "1,000 入 / 箱",
    basePrice: "NT$ 2.4",
    memberPrice: "NT$ 2.0",
    moq: "2 箱起",
    hasSample: true,
    cert: "FSC 認證",
    bg: "bg-lime-100",
  },
];

type Row = { label: string; key: keyof Product; highlight?: boolean };

const ROWS: Row[] = [
  { label: "商品編號", key: "code" },
  { label: "材質", key: "material" },
  { label: "容量", key: "capacity" },
  { label: "口徑", key: "diameter" },
  { label: "高度", key: "height" },
  { label: "顏色", key: "colors" },
  { label: "包裝單位", key: "pack" },
  { label: "一般價(個 / 起)", key: "basePrice" },
  { label: "會員價(個 / 起)", key: "memberPrice" },
  { label: "最低訂購量", key: "moq" },
  { label: "可申請樣品", key: "hasSample" },
  { label: "環保認證", key: "cert" },
];

function isAllSame(values: (string | boolean)[]) {
  return values.every((v) => v === values[0]);
}

export default function ProductComparePage() {
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F30"
        title="商品比較"
        subtitle="Compare"
        desc="2–4 件商品並排對照規格、價格、容量,差異欄位自動標黃讓客戶秒看出不同"
        tone="amber"
      />

      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupShell url="https://hj.example.com/products/compare">
            <MockupSiteHeader />

            {/* Breadcrumb */}
            <div className="border-b border-zinc-100 bg-zinc-50 px-6 py-3">
              <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
                <Link href="/modules/home" className="hover:text-zinc-900">首頁</Link>
                <span className="mx-2 text-zinc-300">/</span>
                <Link href="/modules/products" className="hover:text-zinc-900">公版商品</Link>
                <span className="mx-2 text-zinc-300">/</span>
                <span className="font-semibold text-zinc-900">商品比較</span>
              </div>
            </div>

            {/* Title bar */}
            <section className="border-b border-zinc-100 bg-white px-6 py-8">
              <div className="mx-auto flex max-w-[1760px] items-end justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-900">商品比較</h1>
                  <p className="mt-2 text-sm text-zinc-500">
                    並排對照 {PRODUCTS.length} 件商品 ·
                    <span className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                      <span className="size-1.5 rounded-full bg-yellow-500" />
                      差異欄位自動標黃
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 hover:border-amber-500">
                    匯出 PDF
                  </button>
                  <Link href="/modules/products" className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 hover:border-amber-500">
                    + 加入更多商品
                  </Link>
                  <button className="rounded-md border border-rose-300 bg-rose-50 px-4 py-2 text-sm text-rose-700 hover:bg-rose-100">
                    清空比較
                  </button>
                </div>
              </div>
            </section>

            {/* Compare table */}
            <section className="bg-white px-6 py-10">
              <div className="mx-auto max-w-[1760px] overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 w-44 bg-white p-3 text-left align-bottom text-xs font-medium text-zinc-500" />
                      {PRODUCTS.map((p) => (
                        <th key={p.code} className="p-3 align-bottom">
                          <div className={`mb-3 aspect-square rounded-xl ${p.bg} flex items-center justify-center text-zinc-300`}>
                            <span className="text-xs">商品圖</span>
                          </div>
                          <Link href="/modules/products/detail" className="block text-left">
                            <div className="text-base font-bold leading-snug text-zinc-900 hover:text-amber-700">{p.name}</div>
                            <div className="mt-1 font-mono text-xs text-zinc-400">{p.code}</div>
                          </Link>
                          <button className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-700 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700">
                            ✕ 移除
                          </button>
                        </th>
                      ))}
                      {/* Empty slot for adding more */}
                      {PRODUCTS.length < 4 && (
                        <th className="p-3 align-bottom">
                          <Link
                            href="/modules/products"
                            className="flex aspect-square w-full items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 text-sm text-zinc-400 hover:border-amber-400 hover:bg-amber-50/30 hover:text-amber-700"
                          >
                            + 加入第 {PRODUCTS.length + 1} 項
                          </Link>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row) => {
                      const values = PRODUCTS.map((p) => p[row.key]);
                      const same = isAllSame(values);
                      return (
                        <tr key={row.label} className={same ? "" : "bg-yellow-50/60"}>
                          <td className="sticky left-0 z-10 w-44 bg-white p-3 text-xs font-medium text-zinc-500 border-t border-zinc-100">
                            {row.label}
                            {!same && (
                              <span className="ml-1.5 inline-flex size-4 items-center justify-center rounded-full bg-yellow-400 text-[8px] font-bold text-yellow-900">
                                !
                              </span>
                            )}
                          </td>
                          {PRODUCTS.map((p) => (
                            <td
                              key={p.code}
                              className={`p-3 align-top text-sm border-t border-zinc-100 ${
                                same ? "text-zinc-700" : "text-zinc-900 font-medium"
                              }`}
                            >
                              {row.key === "hasSample" ? (
                                p.hasSample ? (
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    可申請
                                  </span>
                                ) : (
                                  <span className="text-zinc-400">—</span>
                                )
                              ) : row.key === "memberPrice" ? (
                                <span className="font-bold text-emerald-700">{String(p[row.key])}</span>
                              ) : row.key === "basePrice" ? (
                                <span className="font-bold text-amber-700">{String(p[row.key])}</span>
                              ) : (
                                String(p[row.key])
                              )}
                            </td>
                          ))}
                          {PRODUCTS.length < 4 && <td className="border-t border-zinc-100 p-3" />}
                        </tr>
                      );
                    })}

                    {/* Action row */}
                    <tr className="bg-zinc-50">
                      <td className="sticky left-0 z-10 w-44 bg-zinc-50 p-3 text-xs font-medium text-zinc-500 border-t border-zinc-200">
                        加入購物車
                      </td>
                      {PRODUCTS.map((p) => (
                        <td key={p.code} className="border-t border-zinc-200 p-3 align-top">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center rounded-md border border-zinc-300">
                              <button className="px-2 py-1.5 text-zinc-500 hover:bg-zinc-100">−</button>
                              <span className="w-10 border-x border-zinc-300 py-1.5 text-center text-sm">2</span>
                              <button className="px-2 py-1.5 text-zinc-500 hover:bg-zinc-100">+</button>
                            </div>
                            <Link href="/modules/cart" className="flex-1 rounded-md bg-amber-500 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-amber-600">
                              加購物車
                            </Link>
                          </div>
                          <Link href="/modules/products/sample" className="mt-2 block text-center text-xs text-emerald-700 hover:underline">
                            申請樣品
                          </Link>
                        </td>
                      ))}
                      {PRODUCTS.length < 4 && <td className="border-t border-zinc-200 p-3" />}
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Bulk action bar */}
            <section className="border-t border-zinc-200 bg-zinc-900 px-6 py-4 text-white">
              <div className="mx-auto flex max-w-[1760px] items-center justify-between">
                <div className="flex items-center gap-3 text-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                  <span>共 <span className="font-bold mx-1 text-amber-300">{PRODUCTS.length}</span> 件商品 · 共 <span className="font-bold mx-1">12</span> 項規格比對</span>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800">
                    儲存比較組合
                  </button>
                  <Link href="/modules/cart" className="rounded-md bg-amber-500 px-5 py-2 text-sm font-bold text-white hover:bg-amber-600">
                    全部加入購物車 →
                  </Link>
                </div>
              </div>
            </section>

            <MockupSiteFooter />
          </MockupShell>
        </div>
      </section>

      <section className="border-t-2 border-zinc-400 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">本頁設計重點</h2>
          <ul className="mt-4 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "差異欄位自動標黃 — 客戶秒看出不同",
              "支援 2–4 件商品並排比較",
              "每欄獨立加購物車 / 申請樣品",
              "Sticky 商品名(向下捲動仍可對照)",
              "匯出 PDF 給內部 / 老闆看",
              "「全部加入購物車」一鍵下單",
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
        prev={{ title: "公版商品列表", href: "/modules/products" }}
        next={{ title: "商品詳情", href: "/modules/products/detail" }}
      />
    </main>
  );
}
