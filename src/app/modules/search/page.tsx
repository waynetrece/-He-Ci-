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
  { type: "商品", name: "PE 淋膜紙餐盒 800ml", cat: "餐盒系列", price: "NT$ 2.8 / 個起", img: "bg-amber-100" },
  { type: "商品", name: "PE 淋膜紙餐盒 1000ml", cat: "餐盒系列", price: "NT$ 3.4 / 個起", img: "bg-amber-100" },
  { type: "商品", name: "PE 淋膜紙杯 12oz", cat: "紙杯系列", price: "NT$ 1.5 / 個起", img: "bg-emerald-100" },
  { type: "商品", name: "PLA 環保紙杯 16oz", cat: "紙杯系列", price: "NT$ 2.1 / 個起", img: "bg-lime-100" },
  { type: "商品", name: "甘蔗渣餐盒 五格", cat: "環保系列", price: "NT$ 6.8 / 個起", img: "bg-lime-100" },
];

const NEWS_RESULTS = [
  { title: "如何選擇適合的紙杯材質?PE / PLA / 紙漿成型比較", date: "2026.04.02" },
  { title: "通過 FSSC 22000 食品安全管理系統認證", date: "2026.04.10" },
];

const FAQ_RESULTS = [
  { q: "支援哪些付款方式?", cat: "付款與發票" },
  { q: "離島地區可以宅配嗎?", cat: "運送與退換" },
];

export default function SearchPage() {
  const [keyword, setKeyword] = useState("紙餐盒");
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F14"
        title="全站搜尋結果"
        subtitle="Search"
        desc="商品 / 文章 / 常見問題 統一搜尋"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupShell url={`https://hj.example.com/search?q=${keyword}`}>
            <MockupSiteHeader />

            {/* Search bar prominent */}
            <section className="border-b border-zinc-200 bg-amber-50/50 px-6 py-8">
              <div className="mx-auto max-w-[1760px]">
                <div className="flex items-center gap-3">
                  <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="flex-1 rounded-lg border-2 border-amber-300 bg-white px-5 py-3 text-base"
                    placeholder="搜尋商品、消息、Q&A..."
                  />
                  <button className="rounded-lg bg-amber-500 px-7 py-3 text-sm font-medium text-white">
                    搜尋
                  </button>
                </div>
                <p className="mt-3 text-sm text-zinc-600">
                  「<span className="font-bold text-amber-700">{keyword}</span>」找到{" "}
                  <span className="font-bold">5 項商品 · 2 則消息 · 2 則 Q&A</span>
                </p>
              </div>
            </section>

            <div className="mx-auto max-w-[1760px] grid grid-cols-4 gap-8 px-6 py-10">
              {/* Filters */}
              <aside className="space-y-5">
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                  <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">類型</div>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {[
                      { label: "全部", count: 9, active: true },
                      { label: "商品", count: 5 },
                      { label: "最新消息", count: 2 },
                      { label: "Q&A", count: 2 },
                    ].map((f) => (
                      <li key={f.label}>
                        <a className={`flex items-center justify-between rounded px-2 py-1.5 ${f.active ? "bg-amber-50 text-amber-700 font-medium" : "text-zinc-700 hover:bg-zinc-50"}`}>
                          <span>{f.label}</span>
                          <span className="text-xs text-zinc-400">{f.count}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                  <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">商品分類</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-zinc-700">
                    {["餐盒系列(2)", "紙杯系列(2)", "環保系列(1)"].map((c) => (
                      <li key={c}><a className="hover:text-amber-700">{c}</a></li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Results */}
              <div className="col-span-3 space-y-10">
                {/* Products */}
                <section>
                  <h3 className="mb-4 text-lg font-bold text-zinc-900">商品 (5)</h3>
                  <div className="grid grid-cols-3 gap-5">
                    {RESULTS.map((r) => (
                      <article key={r.name} className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow">
                        <div className={`aspect-square ${r.img}`} />
                        <div className="p-4">
                          <div className="text-xs text-zinc-500">{r.cat}</div>
                          <div className="mt-1 text-sm font-bold text-zinc-900">{r.name}</div>
                          <div className="mt-2 text-base font-bold text-amber-700">{r.price}</div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                {/* News */}
                <section>
                  <h3 className="mb-4 text-lg font-bold text-zinc-900">最新消息 (2)</h3>
                  <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 bg-white">
                    {NEWS_RESULTS.map((n) => (
                      <a key={n.title} className="flex items-center gap-5 px-5 py-4 hover:bg-amber-50/40">
                        <span className="font-mono text-xs text-zinc-400">{n.date}</span>
                        <span className="flex-1 text-sm font-medium text-zinc-800">{n.title}</span>
                        <span className="text-xs text-zinc-400">→</span>
                      </a>
                    ))}
                  </div>
                </section>

                {/* FAQ */}
                <section>
                  <h3 className="mb-4 text-lg font-bold text-zinc-900">常見問題 (2)</h3>
                  <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 bg-white">
                    {FAQ_RESULTS.map((f) => (
                      <a key={f.q} className="block px-5 py-4 hover:bg-amber-50/40">
                        <div className="text-xs text-amber-700">{f.cat}</div>
                        <div className="mt-1 text-sm font-medium text-zinc-800">Q. {f.q}</div>
                      </a>
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
        next={{ title: "公版商品", href: "/modules/products" }}
      />
    </main>
  );
}
