"use client";

import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "@/components/modules/MockupShell";

const PRODUCTS = [
  { name: "PE 淋膜紙餐盒 800ml", price: "NT$ 2.8", tag: "熱銷", img: "bg-amber-100", stock: "現貨" },
  { name: "PE 淋膜紙餐盒 1000ml", price: "NT$ 3.4", tag: "", img: "bg-amber-100", stock: "現貨" },
  { name: "甘蔗渣餐盒 五格", price: "NT$ 6.8", tag: "新品", img: "bg-lime-100", stock: "現貨" },
  { name: "PLA 環保餐盒 三格", price: "NT$ 5.2", tag: "", img: "bg-emerald-100", stock: "預購" },
  { name: "紙漿成型餐盒 四格", price: "NT$ 4.5", tag: "推薦", img: "bg-stone-200", stock: "現貨" },
  { name: "PP 微波餐盒 700ml", price: "NT$ 1.8", tag: "", img: "bg-sky-100", stock: "現貨" },
  { name: "鋁箔餐盒 600ml", price: "NT$ 2.2", tag: "", img: "bg-zinc-200", stock: "現貨" },
  { name: "牛皮紙餐盒 中號", price: "NT$ 3.6", tag: "", img: "bg-orange-100", stock: "現貨" },
  { name: "保麗龍便當盒", price: "NT$ 0.9", tag: "", img: "bg-stone-100", stock: "現貨" },
];

export default function ProductCategoryPage() {
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F9"
        title="商品分類列表 — 餐盒系列"
        subtitle="Category"
        desc="篩選 + 排序 + 多層分類 + 即時庫存"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupShell url="https://hj.example.com/products/category/lunch-box">
            <MockupSiteHeader />

            {/* Breadcrumb */}
            <div className="border-b border-zinc-100 bg-zinc-50 px-6 py-3">
              <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
                首頁 / 公版商品 / <span className="text-zinc-900">餐盒系列</span>
              </div>
            </div>

            {/* Title */}
            <section className="bg-white px-6 py-8">
              <div className="mx-auto max-w-[1760px]">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">餐盒系列</h1>
                <p className="mt-2 text-sm text-zinc-600">提供 PE 淋膜、PLA、甘蔗渣、紙漿成型、PP 等多種材質,共 142 項。</p>
              </div>
            </section>

            <div className="mx-auto max-w-[1760px] grid grid-cols-5 gap-8 bg-white px-6 pb-12">
              {/* Filters */}
              <aside className="space-y-5">
                <div className="rounded-xl border border-zinc-200 p-5">
                  <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">子分類</div>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {["全部餐盒(142)", "PE 淋膜餐盒(38)", "PLA 環保餐盒(24)", "甘蔗渣餐盒(18)", "紙漿成型(20)", "PP 微波餐盒(28)", "鋁箔餐盒(14)"].map((c, i) => (
                      <li key={c}>
                        <a className={`block rounded px-2 py-1 ${i === 0 ? "bg-amber-50 font-medium text-amber-700" : "text-zinc-700 hover:bg-zinc-50"}`}>{c}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-zinc-200 p-5">
                  <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">容量</div>
                  <div className="mt-3 space-y-1.5">
                    {["500ml 以下", "500–800ml", "800–1000ml", "1000ml 以上"].map((s) => (
                      <label key={s} className="flex items-center gap-2 text-sm text-zinc-700">
                        <input type="checkbox" /> {s}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-200 p-5">
                  <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">價格</div>
                  <div className="mt-3 space-y-1.5">
                    {["NT$ 1 以下", "NT$ 1–3", "NT$ 3–5", "NT$ 5 以上"].map((p) => (
                      <label key={p} className="flex items-center gap-2 text-sm text-zinc-700">
                        <input type="checkbox" /> {p}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-200 p-5">
                  <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">特性</div>
                  <div className="mt-3 space-y-1.5">
                    {["環保可降解", "可微波", "可冷凍", "可印 Logo", "現貨即出"].map((f) => (
                      <label key={f} className="flex items-center gap-2 text-sm text-zinc-700">
                        <input type="checkbox" /> {f}
                      </label>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Grid */}
              <div className="col-span-4">
                {/* Toolbar */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="text-sm text-zinc-600">共 {PRODUCTS.length} 項</div>
                  <div className="flex items-center gap-3">
                    <select className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm">
                      <option>預設排序</option>
                      <option>價格低到高</option>
                      <option>價格高到低</option>
                      <option>熱銷度</option>
                      <option>最新上架</option>
                    </select>
                    <div className="flex rounded-md border border-zinc-300">
                      <button className="border-r border-zinc-300 bg-amber-50 px-3 py-1.5 text-xs">▦</button>
                      <button className="px-3 py-1.5 text-xs">≡</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-5">
                  {PRODUCTS.map((p) => (
                    <article key={p.name} className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg">
                      <div className={`relative aspect-square ${p.img}`}>
                        {p.tag && (
                          <span className="absolute left-3 top-3 rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-white">{p.tag}</span>
                        )}
                        <button className="absolute right-3 top-3 size-8 rounded-full bg-white/90 text-zinc-600 hover:bg-amber-100">♡</button>
                      </div>
                      <div className="p-4">
                        <div className="text-sm font-bold leading-snug text-zinc-900">{p.name}</div>
                        <div className="mt-2 flex items-baseline justify-between">
                          <span className="text-base font-bold text-amber-700">{p.price} <span className="text-xs text-zinc-400">/ 個起</span></span>
                          <span className={`text-xs ${p.stock === "現貨" ? "text-emerald-600" : "text-amber-600"}`}>● {p.stock}</span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button className="flex-1 rounded-md bg-amber-500 py-2 text-xs font-medium text-white">加購</button>
                          <button className="rounded-md border border-zinc-300 px-3 py-2 text-xs">樣品</button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-10 flex items-center justify-center gap-2">
                  <button className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm">←</button>
                  {[1, 2, 3, 4].map((p) => (
                    <button key={p} className={`size-9 rounded-md text-sm font-medium ${p === 1 ? "bg-amber-500 text-white" : "border border-zinc-300 bg-white"}`}>{p}</button>
                  ))}
                  <button className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm">→</button>
                </div>
              </div>
            </div>

            <MockupSiteFooter />
          </MockupShell>
        </div>
      </section>
      <ModuleFooterNav
        prev={{ title: "公版商品分類入口", href: "/modules/products" }}
        next={{ title: "商品詳情", href: "/modules/products/detail" }}
      />
    </main>
  );
}
