"use client";

import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import { MockupCmsPage } from "@/components/modules/MockupCmsPage";

export default function ContactPage() {
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F3"
        title="聯絡我們"
        subtitle="Contact"
        desc="表單留言 · 公司資訊 · 地圖"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupCmsPage
            url="https://hj.example.com/contact"
            pageTitle="聯絡我們"
            pageDesc="有任何詢問,歡迎透過下方表單留言,或直接電話 / LINE 聯繫業務專員。"
            breadcrumb={[{ label: "聯絡我們" }]}
          >
            <div className="grid grid-cols-3 gap-8">
              {/* Form */}
              <div className="col-span-2 rounded-xl border border-zinc-200 bg-white p-8">
                <h3 className="text-lg font-bold text-zinc-900">線上留言</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  填寫以下表單,我們會在 1 個工作天內回覆。
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-700">公司 / 品牌名稱 *</label>
                    <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" placeholder="例:某某餐飲" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-700">聯絡人姓名 *</label>
                    <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-700">電話 *</label>
                    <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" placeholder="02-xxxx-xxxx" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-700">Email *</label>
                    <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-zinc-700">詢問類型</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["公版商品採購", "私版客製詢價", "樣品申請", "經銷合作", "媒體採訪", "其他"].map((t) => (
                        <button
                          key={t}
                          className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-700 hover:border-amber-500 hover:bg-amber-50"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-zinc-700">留言內容 *</label>
                    <textarea
                      className="mt-1 h-28 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
                      placeholder="請描述您的需求 — 預計採購品項、數量、時程等"
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2 text-xs text-zinc-500">
                    <input type="checkbox" /> 我同意接收禾啟的產品資訊與電子報
                  </div>
                </div>
                <button className="mt-6 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-600">
                  送出留言
                </button>
              </div>

              {/* Info */}
              <div className="space-y-5">
                <div className="rounded-xl border border-zinc-200 bg-white p-6">
                  <h4 className="text-sm font-bold text-zinc-900">公司資訊</h4>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="text-xs text-zinc-500">公司名稱</dt>
                      <dd className="text-zinc-800">禾啟股份有限公司</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500">統一編號</dt>
                      <dd className="text-zinc-800">12345678</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500">公司地址</dt>
                      <dd className="text-zinc-800">新北市五股區五權路 10 號</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500">電話</dt>
                      <dd className="text-zinc-800">02-2299-3456</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500">Email</dt>
                      <dd className="text-zinc-800">Lkphouse@yahoo.com.tw</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500">營業時間</dt>
                      <dd className="text-zinc-800">週一至週五 08:00 – 17:00</dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-xl bg-amber-500 p-6 text-white">
                  <h4 className="text-sm font-bold">LINE 即時客服</h4>
                  <p className="mt-2 text-xs opacity-90">大量採購 / 私版詢價建議直接 LINE 聯繫,業務專員快速回覆。</p>
                  <button className="mt-4 rounded-md bg-white px-4 py-2 text-xs font-medium text-amber-700">
                    @hjhjtw 加入 LINE
                  </button>
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
                  <div className="flex h-full items-center justify-center text-xs text-zinc-400">[Google Map 嵌入]</div>
                </div>
              </div>
            </div>
          </MockupCmsPage>
        </div>
      </section>
      <ModuleFooterNav
        prev={{ title: "關於我們", href: "/modules/about" }}
        next={{ title: "最新消息", href: "/modules/news" }}
      />
    </main>
  );
}
