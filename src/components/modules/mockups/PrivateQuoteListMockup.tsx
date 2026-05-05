"use client";

import Link from "next/link";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

// 32 題 review A 包已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 公版/私版規格機制統一,以「私版方式」為主(A 包 Q-A4)
// - HJ 後台勾選要開放的客製規格(具體欄位 HJ 之後提供 Q-A7)
// - 私版細節溝通、檔案傳遞、下單確認 全部走 LINE
// - 私版商品頁設計「上傳檔案」按鈕直接跳 LINE
// - 私版訂購流程:
//   1. 私版商品頁選擇客製需求(HJ 後台勾選欄位機制)
//   2. 成立私版詢價單
//   3. LINE 溝通(客戶上傳 Logo / 確認設計細節)
//   4. 業務報價 → 客戶確認 → 私下匯款訂金
//   5. 業務在後台手動觸發「詢價單轉正式訂單」+ 進凌越
// - 樣品 / 公版 / 私版 三條流程完全分開,不可同車(Q-A9)
// - 訂金 = 私下匯款,業務後台手動觸發轉訂單(Q-A8)
//
// 已 deprecated 的舊概念(review 不採用):
// - 「即時報價(jcolor 風格)」站內試算 — 全部改成 詢價單 + LINE
// - 「即時報價 vs LINE 報價分流」 — 統一一條路徑
// - 「起報金額顯示」 — 透過 LINE 議價,不顯示固定價

const STEPS = [
  { n: 1, title: "選擇客製商品", desc: "從下方分類選擇要客製的商品(全部公版商品都可客製化)" },
  { n: 2, title: "填詢價單 + 上傳設計檔", desc: "選規格(尺寸 / 顏色 / 印刷)+ 跳轉 LINE 上傳 Logo / 設計檔" },
  { n: 3, title: "LINE 溝通報價", desc: "業務於 1 工作天內回覆,確認規格、數量、價格、交期" },
  { n: 4, title: "訂金匯款 → 開製", desc: "雙方確認後客戶匯訂金,業務在後台轉正式訂單,2-4 週製作出貨" },
];

const PRIVATE_CATEGORIES = [
  { name: "客製紙杯", count: 18, examples: "8/12/16 oz · 印 Logo · 雙層 · PLA 環保", img: "bg-amber-100" },
  { name: "客製紙袋", count: 12, examples: "牛皮紙袋 · 提袋 · 異形模切 · 印 Logo", img: "bg-orange-100" },
  { name: "客製餐盒", count: 22, examples: "印 Logo 紙便當盒 · 開窗 · PLA · 五格", img: "bg-lime-100" },
  { name: "客製禮盒", count: 8, examples: "燙金 · 局部上光 · 模切 · 天地蓋", img: "bg-rose-100", badge: "特殊處理" },
  { name: "客製餐墊紙 / 腰封", count: 9, examples: "餐墊紙 · 杯腰封 · 餐盒封套 · 全彩印刷", img: "bg-stone-200" },
  { name: "客製杯墊", count: 5, examples: "圓型 / 方型 · 100-200gsm · 全彩", img: "bg-zinc-100" },
];

const CASES = [
  { brand: "○○咖啡", desc: "12oz 雙層杯 + Logo 印刷,5,000 個 / 月", color: "bg-amber-200" },
  { brand: "△△手搖飲", desc: "16oz PLA 杯 + 全彩印刷,10,000 個 / 月", color: "bg-emerald-200" },
  { brand: "□□便當品牌", desc: "客製五格餐盒 + 防油塗層,8,000 個 / 月", color: "bg-orange-200" },
];

export function PrivateQuoteListMockup({
  annotations: _annotations,
  pageId: _pageId,
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  return (
    <MockupShell url="https://hj.example.com/private-quote">
      <MockupSiteHeader />

      {/* Breadcrumb */}
      <div className="border-b border-zinc-100 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/home" className="hover:text-zinc-900">首頁</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="text-zinc-900">私版商品客製</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-50 via-white to-amber-50 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <div className="grid grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-300 bg-violet-100/60 px-3 py-1 text-xs font-medium text-violet-900">
                <span className="size-1.5 rounded-full bg-violet-500" />
                專業客製服務
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-zinc-900">
                Logo 印刷 / 客製規格<br />
                量身打造您的品牌包裝
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-600">
                所有公版商品都可客製化:Logo 印刷、容量調整、顏色客製、特殊模切。
                透過 LINE 一對一溝通,業務專員報價,訂金匯款後 2-4 週交貨。
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/modules/private-quote/quote-form" className="rounded-lg bg-violet-600 px-6 py-3 text-sm font-medium text-white hover:bg-violet-700">
                  填詢價單 →
                </Link>
                <a className="inline-flex items-center gap-2 rounded-lg border border-emerald-500 bg-emerald-50 px-6 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zM12 .572C5.385.572 0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314c0-5.371-5.385-9.742-12-9.742z" />
                  </svg>
                  直接 LINE 客服
                </a>
              </div>
              <p className="mt-3 text-xs text-zinc-500">最低 1,000 件起製(部分品項 500 件起,依規格而定)</p>
            </div>
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-violet-200 via-purple-100 to-amber-100 shadow-xl flex items-center justify-center">
              <div className="text-center text-violet-700">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5" r=".5" />
                  <circle cx="17.5" cy="10.5" r=".5" />
                  <circle cx="8.5" cy="7.5" r=".5" />
                  <circle cx="6.5" cy="12.5" r=".5" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 text-center">客製流程 4 步驟</h2>
          <p className="mt-2 text-center text-sm text-zinc-500">
            私版客製採詢價單 + LINE 溝通模式 — 不是即時試算,需業務專員報價
          </p>
          <div className="mt-8 grid grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="rounded-xl border-2 border-violet-200 bg-violet-50/40 p-5 h-full">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-violet-600 text-white font-bold">{s.n}</div>
                    <div className="text-base font-bold text-zinc-900">{s.title}</div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-600">{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="absolute right-[-8px] top-1/2 z-10 hidden lg:block text-violet-400 -translate-y-1/2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-zinc-50 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">客製商品分類</h2>
              <p className="mt-1 text-sm text-zinc-500">點選分類進入填寫詢價單</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {PRIVATE_CATEGORIES.map((c) => (
              <Link
                key={c.name}
                href="/modules/private-quote/quote-form"
                className="group cursor-pointer rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-violet-300"
              >
                <div className={`mb-4 aspect-video rounded-lg ${c.img}`} />
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-violet-700">{c.name}</h3>
                  {c.badge && <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-medium text-rose-700">{c.badge}</span>}
                </div>
                <p className="mt-2 text-xs text-zinc-500 line-clamp-2">{c.examples}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-violet-600 font-medium">{c.count} 種規格可選</span>
                  <span className="text-xs text-violet-600">填詢價單 →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sample cases */}
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">合作案例</h2>
          <p className="mt-1 text-sm text-zinc-500">超過 500 個餐飲品牌信賴選擇</p>
          <div className="mt-6 grid grid-cols-3 gap-5">
            {CASES.map((c) => (
              <article key={c.brand} className="rounded-xl border border-zinc-200 bg-white p-5">
                <div className={`aspect-video rounded-lg ${c.color}`} />
                <div className="mt-3 text-base font-bold text-zinc-900">{c.brand}</div>
                <div className="mt-1 text-xs text-zinc-600">{c.desc}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why HJ */}
      <section className="bg-violet-50 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-violet-900 text-center">為什麼選禾啟客製?</h2>
          <div className="mt-8 grid grid-cols-4 gap-5 text-center">
            {[
              { num: "30+", label: "年餐飲包材經驗" },
              { num: "500+", label: "合作餐飲品牌" },
              { num: "1,000", label: "件起製,門檻低" },
              { num: "2-4 週", label: "標準交期" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-bold text-violet-700">{s.num}</div>
                <div className="mt-2 text-xs text-zinc-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-zinc-900 px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold">準備好開始客製了嗎?</h2>
          <p className="mt-2 text-sm opacity-80">填寫詢價單後業務會在 1 個工作天內透過 LINE 回覆。</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/modules/private-quote/quote-form" className="rounded-lg bg-violet-500 px-6 py-3 text-sm font-bold text-white hover:bg-violet-600">
              填詢價單 →
            </Link>
            <a className="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-600">
              LINE 直接諮詢
            </a>
          </div>
        </div>
      </section>

      <MockupSiteFooter />
    </MockupShell>
  );
}
