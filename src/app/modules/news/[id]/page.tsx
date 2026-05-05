"use client";

import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import { MockupCmsPage } from "@/components/modules/MockupCmsPage";

export default function NewsDetailPage() {
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F5"
        title="最新消息詳情"
        subtitle="News Detail"
        desc="文章內頁 · 編輯器排版 · 相關推薦 · 標籤系統"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupCmsPage
            url="https://hj.example.com/news/1"
            pageTitle="2026 餐飲業環保包裝趨勢報告"
            breadcrumb={[
              { label: "最新消息", href: "/modules/news" },
              { label: "產業動態" },
            ]}
          >
            <div className="grid grid-cols-3 gap-10">
              <article className="col-span-2">
                {/* Article meta */}
                <div className="mb-6 flex items-center gap-3 text-xs">
                  <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 font-medium text-amber-700">
                    產業動態
                  </span>
                  <span className="font-mono text-zinc-400">2026.05.04</span>
                  <span className="text-zinc-300">·</span>
                  <span className="text-zinc-500">禾啟編輯部</span>
                  <span className="text-zinc-300">·</span>
                  <span className="text-zinc-500">閱讀時間 5 分鐘</span>
                </div>

                {/* Cover */}
                <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-amber-100 to-orange-200" />

                {/* Body */}
                <div className="mt-8 space-y-5 text-base leading-relaxed text-zinc-700">
                  <p>
                    歐盟塑膠稅自 2021 年起逐步加嚴,2026 年最新修訂草案進一步擴大課徵範圍,
                    同期間台灣環保署也啟動「循環包材補助計畫」,從供應鏈兩端推動餐飲業包材轉型。
                    本文盤點 5 個值得餐飲業者關注的轉變。
                  </p>
                  <h3 className="pt-4 text-2xl font-bold text-zinc-900">
                    1. 一次性塑膠成本將上升 15–20%
                  </h3>
                  <p>
                    歐盟新規對 PP / PE 塑膠包材課徵每公斤 0.8 歐元,並於 2027 年擴及輸入產品。
                    這將直接影響台灣外銷餐盒、外帶包材的最終售價,本地連鎖品牌使用進口塑膠包材也會受影響。
                  </p>
                  <h3 className="pt-4 text-2xl font-bold text-zinc-900">
                    2. 環保補助:每件最高補貼 2 元
                  </h3>
                  <p>
                    環保署新推「循環包材補助計畫」,符合 PLA / 紙漿成型 / 甘蔗渣材質的餐盒,
                    每件最高可獲得 2 元補貼,適用於 100 件以上採購規模。詳細申請辦法請洽業務專員。
                  </p>
                  <h3 className="pt-4 text-2xl font-bold text-zinc-900">3. 消費者偏好轉向</h3>
                  <p>
                    根據 2026 Q1 消費者調查,有 67% 的受訪者表示「願意為使用環保包材的餐廳多付 5–10%」,
                    這個比例比 2024 年同期上升 14 個百分點,顯示永續包裝已成為品牌差異化的重要環節。
                  </p>
                  <blockquote className="border-l-4 border-amber-500 bg-amber-50/60 p-5 italic text-zinc-700">
                    「環保包裝不只是合規問題,更是品牌能否被新世代消費者選擇的關鍵。」
                    — 某連鎖餐飲品牌經營者
                  </blockquote>
                  <h3 className="pt-4 text-2xl font-bold text-zinc-900">
                    4. 私版客製需求上升
                  </h3>
                  <p>
                    Logo 印刷、品牌色、特定容量的私版包材需求,從 2024 年的小眾選項變成主流,
                    禾啟 2026 Q1 的私版訂單佔比已突破 35%,顯示中小型餐飲品牌也開始重視包裝識別。
                  </p>
                  <h3 className="pt-4 text-2xl font-bold text-zinc-900">5. 結語</h3>
                  <p>
                    環保包材轉型已不是「要不要做」,而是「何時開始做」。
                    禾啟提供完整環保系列商品 + 私版印刷服務,歡迎透過樣品申請先試用,再決定下一步採購策略。
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-6">
                  <span className="text-xs font-medium text-zinc-500">標籤</span>
                  {["環保包材", "趨勢報告", "歐盟塑膠稅", "PLA", "甘蔗渣"].map((t) => (
                    <a key={t} className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 hover:bg-amber-100">
                      #{t}
                    </a>
                  ))}
                </div>

                {/* Share */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-xs text-zinc-500">分享到</span>
                  {["Facebook", "LINE", "複製連結"].map((s) => (
                    <button key={s} className="rounded-md border border-zinc-300 px-3 py-1 text-xs text-zinc-700 hover:border-amber-500">
                      {s}
                    </button>
                  ))}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                  <h4 className="text-sm font-bold text-zinc-900">相關文章</h4>
                  <div className="mt-3 space-y-3">
                    {[
                      { title: "如何選擇適合的紙杯材質?PE / PLA / 紙漿成型比較", date: "2026.04.02" },
                      { title: "甘蔗渣餐盒新色系上架,可客製 Logo 印刷", date: "2026.04.28" },
                      { title: "通過 FSSC 22000 食品安全管理系統認證", date: "2026.04.10" },
                    ].map((r) => (
                      <a key={r.title} className="block hover:bg-amber-50/40 -mx-2 rounded p-2">
                        <div className="text-sm font-medium leading-snug text-zinc-800">{r.title}</div>
                        <div className="mt-1 font-mono text-xs text-zinc-400">{r.date}</div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-amber-500 p-5 text-white">
                  <div className="text-xs uppercase tracking-widest opacity-80">免費試用</div>
                  <h4 className="mt-1 text-lg font-bold">樣品申請</h4>
                  <p className="mt-2 text-sm opacity-90">
                    對文中提到的環保餐盒有興趣?註冊會員可申請樣品試用。
                  </p>
                  <button className="mt-4 rounded-md bg-white px-4 py-2 text-xs font-medium text-amber-700">
                    申請樣品 →
                  </button>
                </div>
              </aside>
            </div>
          </MockupCmsPage>
        </div>
      </section>
      <ModuleFooterNav
        prev={{ title: "最新消息列表", href: "/modules/news" }}
        next={{ title: "Q&A 常見問題", href: "/modules/faq" }}
      />
    </main>
  );
}
