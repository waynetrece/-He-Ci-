"use client";

import { useState } from "react";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "@/components/modules/MockupShell";

const METHODS = [
  {
    id: "credit",
    name: "信用卡(綠界)",
    desc: "VISA / Mastercard / JCB · 一次付清",
    fee: "免手續費",
    available: true,
    badge: "推薦",
  },
  {
    id: "transfer",
    name: "一般匯款 / ATM 轉帳",
    desc: "下單後 7 天內匯入指定帳戶",
    fee: "免手續費",
    available: true,
  },
  {
    id: "cod",
    name: "貨到付款",
    desc: "宅配時付款給司機(部分宅配支援)",
    fee: "+ NT$ 30 手續費",
    available: true,
  },
  {
    id: "pickup",
    name: "自取(現場 / 線上付款)",
    desc: "至公司自取,可現場付款或先線上刷卡",
    fee: "免手續費 · 免運費",
    available: true,
  },
  {
    id: "atm",
    name: "綠界 ATM 虛擬帳號",
    desc: "第一版未開放,將於後續上線",
    fee: "—",
    available: false,
  },
  {
    id: "installment",
    name: "信用卡分期(3 / 6 / 12 期)",
    desc: "第一版未開放,需確認後上線",
    fee: "—",
    available: false,
  },
];

export default function CheckoutPaymentPage() {
  const [selected, setSelected] = useState("credit");
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F17"
        title="付款方式選擇"
        subtitle="Checkout — Payment"
        desc="信用卡 · 匯款 · 貨到付款 · 自取(綠界 ATM 與分期第一版未開放)"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupShell url="https://hj.example.com/checkout/payment">
            <MockupSiteHeader />

            {/* Steps */}
            <div className="border-b border-zinc-200 bg-white px-6 py-6">
              <div className="mx-auto flex max-w-3xl items-center justify-between text-xs">
                {[
                  { n: 1, l: "購物車", done: true },
                  { n: 2, l: "填寫資料", done: true },
                  { n: 3, l: "付款方式", current: true },
                  { n: 4, l: "確認 / 付款" },
                ].map((s, i, arr) => (
                  <div key={s.n} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ${
                          s.done
                            ? "bg-emerald-500 text-white"
                            : s.current
                              ? "bg-amber-500 text-white"
                              : "bg-zinc-200 text-zinc-500"
                        }`}
                      >
                        {s.done ? "✓" : s.n}
                      </div>
                      <span className={`${s.current ? "font-bold text-amber-700" : "text-zinc-600"}`}>{s.l}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`mx-2 h-px flex-1 ${s.done ? "bg-emerald-300" : "bg-zinc-200"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto grid max-w-[1760px] grid-cols-3 gap-8 px-6 py-10">
              {/* Methods */}
              <div className="col-span-2 space-y-3">
                <h2 className="mb-4 text-xl font-bold text-zinc-900">選擇付款方式</h2>
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => m.available && setSelected(m.id)}
                    disabled={!m.available}
                    className={`flex w-full items-center gap-4 rounded-xl border-2 p-5 text-left transition-colors ${
                      !m.available
                        ? "cursor-not-allowed border-zinc-200 bg-zinc-50 opacity-50"
                        : selected === m.id
                          ? "border-amber-500 bg-amber-50/40"
                          : "border-zinc-200 bg-white hover:border-amber-300"
                    }`}
                  >
                    <div
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        selected === m.id ? "border-amber-500" : "border-zinc-300"
                      }`}
                    >
                      {selected === m.id && <div className="size-2.5 rounded-full bg-amber-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-zinc-900">{m.name}</span>
                        {m.badge && <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] text-white">{m.badge}</span>}
                        {!m.available && (
                          <span className="rounded-full border border-zinc-300 bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500">第一版未開放</span>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-zinc-600">{m.desc}</div>
                    </div>
                    <div className="text-xs text-zinc-500">{m.fee}</div>
                  </button>
                ))}

                {/* Method-specific notice */}
                {selected === "credit" && (
                  <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/60 p-5 text-sm">
                    <div className="font-bold text-amber-900">信用卡刷卡流程</div>
                    <ul className="mt-2 space-y-1 text-amber-800">
                      <li>• 點擊「確認付款」會跳轉到綠界刷卡頁面</li>
                      <li>• 刷卡成功後系統自動切換訂單為「已付款」並進入凌越 ERP</li>
                      <li>• 信用卡資訊由綠界處理,本網站不儲存卡號</li>
                    </ul>
                  </div>
                )}
                {selected === "transfer" && (
                  <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/60 p-5 text-sm">
                    <div className="font-bold text-amber-900">匯款資訊</div>
                    <dl className="mt-2 grid grid-cols-2 gap-2 text-amber-800">
                      <dt>銀行</dt><dd>華南銀行</dd>
                      <dt>戶名</dt><dd>禾啟股份有限公司</dd>
                      <dt>帳號</dt><dd className="font-mono">123-456-789012</dd>
                      <dt>備註</dt><dd>請註明訂單編號 + 末 5 碼</dd>
                    </dl>
                    <p className="mt-3 text-xs text-amber-700">7 天內未匯款訂單將自動取消</p>
                  </div>
                )}
              </div>

              {/* Order summary */}
              <aside className="self-start rounded-xl border border-zinc-200 bg-white p-6">
                <h3 className="text-sm font-bold text-zinc-900">訂單摘要</h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-zinc-600">商品小計</dt><dd>NT$ 8,400</dd></div>
                  <div className="flex justify-between"><dt className="text-zinc-600">運費</dt><dd>免運</dd></div>
                  <div className="flex justify-between"><dt className="text-zinc-600">手續費</dt><dd className="text-zinc-500">—</dd></div>
                  <div className="my-2 h-px bg-zinc-100" />
                  <div className="flex justify-between text-base font-bold"><dt>總計(含稅)</dt><dd className="text-amber-700">NT$ 8,820</dd></div>
                </dl>
                <button className="mt-6 w-full rounded-lg bg-amber-500 py-3 text-sm font-bold text-white hover:bg-amber-600">
                  確認付款 →
                </button>
                <p className="mt-3 text-center text-xs text-zinc-500">送出訂單代表您同意服務條款</p>
              </aside>
            </div>

            <MockupSiteFooter />
          </MockupShell>
        </div>
      </section>
      <ModuleFooterNav
        prev={{ title: "結帳填寫資料", href: "/modules/checkout" }}
        next={{ title: "付款結果", href: "/modules/checkout/success" }}
      />
    </main>
  );
}
