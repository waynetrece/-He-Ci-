"use client";

import Link from "next/link";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import { MockupCmsPage } from "@/components/modules/MockupCmsPage";

const NEWS = [
  { id: 1, date: "2026.05.04", title: "2026 餐飲業環保包裝趨勢報告", tag: "產業動態", excerpt: "歐盟塑膠稅啟動、台灣循環包材補助上路,本文盤點 5 個值得餐飲業者關注的轉變。", img: "from-amber-100 to-orange-200" },
  { id: 2, date: "2026.04.28", title: "甘蔗渣餐盒新色系上架,可客製 Logo 印刷", tag: "新品", excerpt: "原生甘蔗渣材質、可降解、可客製 Logo,即日起公版 + 私版同步開賣。", img: "from-lime-100 to-emerald-200" },
  { id: 3, date: "2026.04.20", title: "母親節檔期出貨提醒,5/8 前下單可如期到貨", tag: "公告", excerpt: "母親節 5/12 檔期將近,提醒餐飲業者最晚 5/8 前完成下單,確保如期出貨。", img: "from-rose-100 to-pink-200" },
  { id: 4, date: "2026.04.10", title: "通過 FSSC 22000 食品安全管理系統認證", tag: "公司動態", excerpt: "禾啟旗下五股廠通過 FSSC 22000 認證,提供更高標準的食品包裝安全保障。", img: "from-sky-100 to-blue-200" },
  { id: 5, date: "2026.04.02", title: "如何選擇適合的紙杯材質?PE / PLA / 紙漿成型比較", tag: "產品知識", excerpt: "從成本、環保、保溫性能三個面向比較三種主流杯材,幫你做出最適合的選擇。", img: "from-amber-200 to-yellow-100" },
  { id: 6, date: "2026.03.25", title: "台北國際包材展圓滿落幕,感謝來訪", tag: "展覽活動", excerpt: "禾啟參展的環保餐盒新系列獲得熱烈迴響,感謝所有來訪的業界夥伴。", img: "from-violet-100 to-purple-200" },
];

const CATEGORIES = ["全部", "產業動態", "新品", "公告", "產品知識", "公司動態", "展覽活動"];

export default function NewsListPage() {
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F4"
        title="最新消息列表"
        subtitle="News"
        desc="產業動態 · 新品上架 · 公告 · 產品知識"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupCmsPage
            url="https://hj.example.com/news"
            pageTitle="最新消息"
            pageDesc="掌握禾啟產品動態與餐飲包材產業趨勢"
            breadcrumb={[{ label: "最新消息" }]}
          >
            {/* Filter */}
            <div className="mb-8 flex flex-wrap items-center gap-2">
              {CATEGORIES.map((c, i) => (
                <button
                  key={c}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    i === 0
                      ? "border-amber-500 bg-amber-500 text-white"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-amber-500"
                  }`}
                >
                  {c}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <input
                  className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm"
                  placeholder="搜尋消息..."
                />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-6">
              {NEWS.map((n) => (
                <Link
                  key={n.id}
                  href={`/modules/news/${n.id}`}
                  className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`aspect-video bg-gradient-to-br ${n.img}`} />
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2 text-xs">
                      <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 font-medium text-amber-700">
                        {n.tag}
                      </span>
                      <span className="font-mono text-zinc-400">{n.date}</span>
                    </div>
                    <h3 className="text-base font-bold leading-snug text-zinc-900 group-hover:text-amber-700">
                      {n.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                      {n.excerpt}
                    </p>
                    <div className="mt-3 inline-flex items-center text-xs font-medium text-amber-700">
                      閱讀全文 →
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <button className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-500">←</button>
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  className={`size-9 rounded-md text-sm font-medium ${
                    p === 1 ? "bg-amber-500 text-white" : "border border-zinc-300 bg-white text-zinc-700 hover:border-amber-500"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700">→</button>
            </div>
          </MockupCmsPage>
        </div>
      </section>
      <ModuleFooterNav
        prev={{ title: "聯絡我們", href: "/modules/contact" }}
        next={{ title: "消息詳情", href: "/modules/news/1" }}
      />
    </main>
  );
}
