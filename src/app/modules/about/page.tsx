"use client";

import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import { MockupCmsPage } from "@/components/modules/MockupCmsPage";

const MILESTONES = [
  { year: "1995", title: "禾啟成立", desc: "從新北五股小廠房起家,專注紙餐盒生產" },
  { year: "2008", title: "通過 ISO 9001 認證", desc: "建立標準化品管系統" },
  { year: "2015", title: "推出環保包材系列", desc: "PLA / 甘蔗渣材質生產線啟用" },
  { year: "2020", title: "進入連鎖餐飲供應鏈", desc: "成為超過 50 個餐飲品牌指定供應商" },
  { year: "2026", title: "電商平台上線", desc: "B2B 線上採購 + 私版客製數位化" },
];

const VALUES = [
  { icon: "🌱", title: "永續環保", desc: "材料端優先考量可分解、可回收材質,降低餐飲業包裝負擔。" },
  { icon: "🎯", title: "專業耕耘", desc: "30 年餐飲包材經驗,從食品法規到出貨包裝細節都有深度。" },
  { icon: "🤝", title: "夥伴關係", desc: "客戶不只是客戶,我們陪你從 100 件試水到百萬件量產。" },
];

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F2"
        title="關於我們"
        subtitle="About"
        desc="品牌故事 · 公司沿革 · 核心價值"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupCmsPage
            url="https://hj.example.com/about"
            pageTitle="關於禾啟"
            pageDesc="深耕餐飲包材 30 年,從一個包裝開始,陪伴每個品牌建立識別。"
            breadcrumb={[{ label: "關於我們" }]}
          >
            <div className="grid grid-cols-3 gap-10">
              <div className="col-span-2 space-y-6 text-base leading-relaxed text-zinc-700">
                <p>
                  禾啟股份有限公司(HJ)成立於 1995 年,從新北五股一間小型紙餐盒工廠起家,
                  伴隨台灣餐飲業 30 年成長,目前是國內主要的餐飲包材專業供應商之一。
                </p>
                <p>
                  我們相信好的包裝不只是裝載食物 — 更是品牌與消費者的第一個接觸點。
                  從超商熱便當到精緻外帶餐盒、從手搖店紙杯到星級飯店餐具,
                  我們的產品出現在每一個你熟悉的餐飲品牌身上。
                </p>
                <h3 className="pt-4 text-xl font-bold text-zinc-900">為什麼選擇禾啟?</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ 30 年餐飲包材製造經驗,通過 ISO 9001 / FSSC 22000 認證</li>
                  <li>✓ 完整品項覆蓋:餐盒 / 紙杯 / 吸管 / 餐具 / 外帶包裝</li>
                  <li>✓ 公版即購 + 私版客製雙軌,從小量試水到大量採購全包辦</li>
                  <li>✓ 業務專員一對一服務,大量採購提供樣品試用與專屬報價</li>
                  <li>✓ 環保材質生產線:PLA / 甘蔗渣 / 紙漿成型,符合永續趨勢</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-amber-50 p-6">
                <div className="text-xs font-medium uppercase tracking-widest text-amber-700">數字看禾啟</div>
                <div className="mt-4 space-y-5">
                  {[
                    { num: "30+", label: "年產業經驗" },
                    { num: "500+", label: "合作餐飲品牌" },
                    { num: "1,200+", label: "公版品項" },
                    { num: "10,000+", label: "私版專案累積" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-3xl font-bold text-amber-800">{s.num}</div>
                      <div className="mt-0.5 text-xs text-zinc-600">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="mt-16 border-t border-zinc-100 pt-12">
              <h3 className="text-xl font-bold text-zinc-900">核心價值</h3>
              <div className="mt-6 grid grid-cols-3 gap-5">
                {VALUES.map((v) => (
                  <div key={v.title} className="rounded-xl border border-zinc-200 bg-white p-6">
                    <div className="mb-3 text-3xl">{v.icon}</div>
                    <div className="text-base font-bold text-zinc-900">{v.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-zinc-600">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-16 border-t border-zinc-100 pt-12">
              <h3 className="text-xl font-bold text-zinc-900">公司沿革</h3>
              <div className="mt-6 space-y-5 border-l-2 border-amber-200 pl-6">
                {MILESTONES.map((m) => (
                  <div key={m.year} className="relative">
                    <span className="absolute -left-[31px] top-1 size-3 rounded-full border-2 border-amber-500 bg-white" />
                    <div className="font-mono text-sm font-bold text-amber-700">{m.year}</div>
                    <div className="mt-1 text-base font-bold text-zinc-900">{m.title}</div>
                    <div className="mt-1 text-sm text-zinc-600">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </MockupCmsPage>
        </div>
      </section>
      <ModuleFooterNav
        prev={{ title: "消費端首頁", href: "/modules/home" }}
        next={{ title: "聯絡我們", href: "/modules/contact" }}
      />
    </main>
  );
}
