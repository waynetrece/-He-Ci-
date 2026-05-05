"use client";

import Link from "next/link";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "@/components/modules/MockupShell";

const CATEGORIES = [
  { name: "餐盒系列", count: 142, icon: "🍱", desc: "便當盒 / 紙餐盒 / PP盒" },
  { name: "紙杯系列", count: 86, icon: "🥤", desc: "冷熱杯 / 杯蓋 / 杯套" },
  { name: "吸管系列", count: 38, icon: "🥤", desc: "PLA / 紙 / 不鏽鋼" },
  { name: "餐具系列", count: 64, icon: "🍴", desc: "刀叉湯匙 / 筷子" },
  { name: "外帶包裝", count: 51, icon: "🛍️", desc: "提袋 / 牛皮紙袋" },
  { name: "客製印刷", count: 0, icon: "🎨", desc: "Logo / 圖樣 / 品牌色", custom: true },
];

const FEATURED = [
  { name: "PE 淋膜紙餐盒 800ml", price: "NT$ 2.8 / 個起", tag: "熱銷", img: "bg-amber-100" },
  { name: "PLA 環保紙杯 12oz", price: "NT$ 1.5 / 個起", tag: "新品", img: "bg-emerald-100" },
  { name: "牛皮紙提袋 中號", price: "NT$ 4.2 / 個起", tag: "推薦", img: "bg-orange-100" },
  { name: "甘蔗渣餐盒 五格", price: "NT$ 6.8 / 個起", tag: "熱銷", img: "bg-lime-100" },
];

const NEWS = [
  { date: "2026.05.04", title: "2026 餐飲業環保包裝趨勢報告", tag: "產業動態" },
  { date: "2026.04.28", title: "甘蔗渣餐盒新色系上架,可客製 Logo 印刷", tag: "新品" },
  { date: "2026.04.20", title: "母親節檔期出貨提醒,5/8 前下單可如期到貨", tag: "公告" },
];

export default function HomeMockupPage() {
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F1"
        title="消費端首頁"
        subtitle="Home"
        desc="客戶到訪的第一個畫面 — 形象、商品入口、樣品 CTA、私版 CTA、最新消息一次到位"
        tone="amber"
      />

      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupShell url="https://hj.example.com/">
            <MockupSiteHeader />

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 px-6 py-16">
              <div className="mx-auto grid max-w-[1760px] grid-cols-2 gap-8 items-center">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100/60 px-3 py-1 text-xs font-medium text-amber-900">
                    <span className="size-1.5 rounded-full bg-amber-500" />
                    深耕餐飲包材 30 年 · 餐廳信賴選擇
                  </div>
                  <h2 className="text-5xl font-bold leading-tight tracking-tight text-zinc-900">
                    讓品牌
                    <br />
                    從一個包裝開始
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-600">
                    禾啟 HJ 提供餐盒、紙杯、餐具、外帶包裝完整選擇,支援公版即購 + 私版客製 + 樣品申請,
                    從小規模試水到大量採購全包辦。
                  </p>
                  <div className="mt-7 flex gap-3">
                    <button className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800">
                      瀏覽公版商品
                    </button>
                    <button className="rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 hover:border-zinc-900">
                      私版客製諮詢 →
                    </button>
                  </div>
                </div>
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-amber-200 via-orange-100 to-amber-50 shadow-xl">
                  <div className="flex h-full items-center justify-center text-7xl">
                    🍱
                  </div>
                </div>
              </div>
            </section>

            {/* Value props */}
            <section className="border-t border-zinc-100 bg-white px-6 py-10">
              <div className="mx-auto grid max-w-[1760px] grid-cols-4 gap-6">
                {[
                  { icon: "✓", title: "免費樣品申請", desc: "註冊會員可申請樣品試用" },
                  { icon: "🚚", title: "滿 3,000 免運", desc: "全台宅配 + 超商取貨" },
                  { icon: "🎨", title: "私版印刷客製", desc: "Logo / 圖樣 / 顏色客製" },
                  { icon: "📞", title: "業務專員服務", desc: "大量採購一對一報價" },
                ].map((v) => (
                  <div key={v.title} className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                      {v.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-zinc-900">{v.title}</div>
                      <div className="mt-0.5 text-xs text-zinc-500">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section className="bg-zinc-50 px-6 py-12">
              <div className="mx-auto max-w-[1760px]">
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
                      商品分類
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      所有商品依用途分類,點擊進入瀏覽
                    </p>
                  </div>
                  <Link href="/modules/products" className="text-sm font-medium text-amber-700 hover:underline">
                    查看全部分類 →
                  </Link>
                </div>
                <div className="grid grid-cols-6 gap-4">
                  {CATEGORIES.map((c) => (
                    <a
                      key={c.name}
                      className={`group cursor-pointer rounded-xl border p-5 transition-all hover:-translate-y-1 hover:shadow-lg ${
                        c.custom
                          ? "border-amber-300 bg-amber-50"
                          : "border-zinc-200 bg-white hover:border-amber-300"
                      }`}
                    >
                      <div className="mb-3 text-3xl">{c.icon}</div>
                      <div className="text-sm font-bold text-zinc-900">{c.name}</div>
                      <div className="mt-1 text-xs text-zinc-500">{c.desc}</div>
                      {!c.custom && (
                        <div className="mt-2 text-xs font-medium text-amber-700">
                          {c.count} 項商品
                        </div>
                      )}
                      {c.custom && (
                        <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-amber-700">
                          客製諮詢 →
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured products */}
            <section className="bg-white px-6 py-12">
              <div className="mx-auto max-w-[1760px]">
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
                      本週精選
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">熱銷商品與新上架</p>
                  </div>
                  <Link href="/modules/products" className="text-sm font-medium text-amber-700 hover:underline">
                    查看更多 →
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-5">
                  {FEATURED.map((p) => (
                    <article
                      key={p.name}
                      className="group cursor-pointer rounded-xl border border-zinc-200 bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className={`relative aspect-square ${p.img}`}>
                        <span className="absolute left-3 top-3 rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-white">
                          {p.tag}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="text-sm font-bold leading-snug text-zinc-900">
                          {p.name}
                        </div>
                        <div className="mt-2 flex items-baseline justify-between">
                          <span className="text-base font-bold text-amber-700">
                            {p.price}
                          </span>
                          <button className="text-xs text-zinc-500 hover:text-zinc-900">
                            樣品申請
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Private custom + Sample CTA banner */}
            <section className="bg-zinc-50 px-6 py-12">
              <div className="mx-auto grid max-w-[1760px] grid-cols-2 gap-5">
                <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-8 text-white">
                  <div className="text-xs uppercase tracking-widest opacity-80">私版客製</div>
                  <h4 className="mt-2 text-2xl font-bold">Logo 印刷 / 客製規格</h4>
                  <p className="mt-2 text-sm opacity-90">
                    最低 1,000 件起製,提供 Logo 印刷、容量客製、顏色客製,業務專員一對一報價。
                  </p>
                  <button className="mt-5 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-amber-700">
                    線上詢價 →
                  </button>
                </div>
                <div className="rounded-2xl bg-zinc-900 p-8 text-white">
                  <div className="text-xs uppercase tracking-widest opacity-60">免費試用</div>
                  <h4 className="mt-2 text-2xl font-bold">樣品申請</h4>
                  <p className="mt-2 text-sm opacity-80">
                    註冊會員即可申請樣品試用,實際手感再下單,降低採購風險。
                  </p>
                  <button className="mt-5 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-medium text-zinc-900">
                    開始申請 →
                  </button>
                </div>
              </div>
            </section>

            {/* News */}
            <section className="bg-white px-6 py-12">
              <div className="mx-auto max-w-[1760px]">
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
                      最新消息
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">產業動態 / 新品上架 / 公告</p>
                  </div>
                  <Link href="/modules/news" className="text-sm font-medium text-amber-700 hover:underline">
                    查看全部 →
                  </Link>
                </div>
                <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-200">
                  {NEWS.map((n) => (
                    <a key={n.title} className="flex items-center gap-5 px-5 py-4 hover:bg-amber-50/40">
                      <span className="font-mono text-xs text-zinc-400">{n.date}</span>
                      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] text-zinc-600">
                        {n.tag}
                      </span>
                      <span className="flex-1 text-sm font-medium text-zinc-800">{n.title}</span>
                      <span className="text-xs text-zinc-400">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            <MockupSiteFooter />
          </MockupShell>
        </div>
      </section>

      <ModuleFooterNav
        prev={undefined}
        next={{ title: "公版商品", href: "/modules/products" }}
      />
    </main>
  );
}
