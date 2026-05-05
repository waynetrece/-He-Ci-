"use client";

import { useState } from "react";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "@/components/modules/MockupShell";

const RESULTS = [
  { code: "PC-12-W", name: "公版冷熱共用杯 12oz 白色", cat: "紙杯系列", spec: "12oz / 白色 / 1,000入", price: "NT$ 1.5 / 個起", img: "bg-emerald-100" },
  { code: "PC-16-W", name: "公版冷熱共用杯 16oz 白色", cat: "紙杯系列", spec: "16oz / 白色 / 1,000入", price: "NT$ 2.1 / 個起", img: "bg-emerald-100" },
  { code: "LB-800-K", name: "公版牛皮紙餐盒 800ml", cat: "餐盒系列", spec: "800ml / 牛皮紙 / 300入", price: "NT$ 2.8 / 個起", img: "bg-amber-100" },
  { code: "LB-1000-K", name: "公版牛皮紙餐盒 1000ml", cat: "餐盒系列", spec: "1000ml / 牛皮紙 / 300入", price: "NT$ 3.4 / 個起", img: "bg-amber-100" },
  { code: "SC-5G-B", name: "公版甘蔗渣五格餐盒", cat: "環保系列", spec: "五格 / 本色 / 200入", price: "NT$ 6.8 / 個起", img: "bg-lime-100" },
];

export default function SearchPage() {
  const [keyword, setKeyword] = useState("紙餐盒");
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F13"
        title="公版商品搜尋結果"
        subtitle="Search"
        desc="公版商品名稱 / 編號 / 分類 / 規格搜尋"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupShell url={`https://hj.example.com/products/search?q=${keyword}`}>
            <MockupSiteHeader />

            {/* Search bar prominent */}
            <section className="border-b border-zinc-200 bg-amber-50/50 px-6 py-8">
              <div className="mx-auto max-w-[1760px]">
                <div className="flex items-center gap-3">
                  <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="flex-1 rounded-lg border-2 border-amber-300 bg-white px-5 py-3 text-base"
                    placeholder="搜尋公版商品名稱、商品編號、分類或規格..."
                  />
                  <button className="rounded-lg bg-amber-500 px-7 py-3 text-sm font-medium text-white">
                    搜尋
                  </button>
                </div>
                <p className="mt-3 text-sm text-zinc-600">
                  「<span className="font-bold text-amber-700">{keyword}</span>」找到{" "}
                  <span className="font-bold">5 項公版商品</span>
                </p>
              </div>
            </section>

            <div className="mx-auto max-w-[1760px] grid grid-cols-4 gap-8 px-6 py-10">
              {/* Filters */}
              <aside className="space-y-5">
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                  <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">商品分類</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-zinc-700">
                    {["餐盒系列(2)", "紙杯系列(2)", "環保系列(1)"].map((c) => (
                      <li key={c}><a className="hover:text-amber-700">{c}</a></li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                  <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">搜尋範圍</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-zinc-700">
                    {["公版商品名稱", "商品編號", "商品分類", "容量 / 材質 / 顏色 / 箱條規格"].map((s) => (
                      <li key={s} className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-amber-500" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Results */}
              <div className="col-span-3 space-y-10">
                <section>
                  <h3 className="mb-4 text-lg font-bold text-zinc-900">公版商品搜尋結果 (5)</h3>
                  <div className="grid grid-cols-3 gap-5">
                    {RESULTS.map((r) => (
                      <article key={r.name} className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow">
                        <div className={`aspect-square ${r.img}`} />
                        <div className="p-4">
                          <div className="text-xs text-zinc-500">{r.cat}</div>
                          <div className="mt-1 text-sm font-bold text-zinc-900">{r.name}</div>
                          <div className="mt-1 text-xs text-zinc-500">{r.code} · {r.spec}</div>
                          <div className="mt-2 text-base font-bold text-amber-700">{r.price}</div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <MockupSiteFooter />
          </MockupShell>
        </div>
      </section>
      <ModuleFooterNav
        prev={{ title: "政策條款", href: "/modules/policy" }}
        next={{ title: "公版商品列表", href: "/modules/products" }}
      />
    </main>
  );
}
