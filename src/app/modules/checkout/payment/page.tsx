"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartSummary } from "@/lib/cart-store";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "@/components/modules/MockupShell";

// 32 題 review F 包已決議事項:
// - 信用卡(綠界一次性)第一版做(F 包)
// - 一般匯款第一版做(F 包)
// - 貨到付款第一版做(F 包)— 部分宅配商支援(待 HJ 提供具體 5 家中哪幾家 Q-F7)
// - 自取現場/線上信用卡 — review 列了,但購物車沒「自取」配送方式,故付款頁也對齊不顯示
// - ATM 虛擬帳號 第一版不做(Q-F3 default)
// - 信用卡分期 報價 W2 待確認
// - 超商代收 報價 W4 待確認
// - 月結 review 沒列(F 包 4 種固定)
//
// 待 HJ 提供:
// - 一般匯款自動取消期限(7 / 14 天?Q-F1)
// - 5 家宅配中哪幾家支援貨到付款(Q-F7)

type Method = "credit" | "transfer" | "cod";

export default function CheckoutPaymentPage() {
  const { items, totalPieces, count } = useCartSummary();
  const [selected, setSelected] = useState<Method>("credit");

  const subtotal = items.reduce(
    (s, i) => s + i.memberPrice * i.quantity * i.piecesPerUnit,
    0,
  );
  const totalVolume = items.reduce((s, i) => s + i.quantity * i.volumeRation, 0);
  const allBox = items.length > 0 && items.every((i) => i.isBox);
  // 簡化運費(預設宅配)
  const shipFee = allBox ? 0 : subtotal >= 2500 ? 0 : totalVolume <= 2 ? 100 : totalVolume <= 3 ? 120 : totalVolume <= 4 ? 150 : totalVolume <= 5 ? 180 : 200;
  const codFee = selected === "cod" ? 30 : 0;
  const tax = Math.round((subtotal + shipFee + codFee) * 0.05);
  const total = subtotal + shipFee + codFee + tax;

  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F17"
        title="付款方式選擇"
        subtitle="Checkout — Payment"
        desc="信用卡(綠界)/ 一般匯款 / 貨到付款 三種(F 包 review)。ATM / 分期 / 超商代收第一版未開放。"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupShell url="https://hj.example.com/checkout/payment">
            <MockupSiteHeader />

            {/* Stepper */}
            <div className="border-b border-zinc-200 bg-white px-6 py-6">
              <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-between text-xs">
                  {[
                    { n: 1, l: "購物車", done: true, href: "/modules/cart" },
                    { n: 2, l: "填寫資料", done: true, href: "/modules/checkout" },
                    { n: 3, l: "付款方式", current: true },
                    { n: 4, l: "付款結果" },
                  ].map((s, i, arr) => (
                    <div key={s.n} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className={`flex size-9 items-center justify-center rounded-full text-sm font-bold ${
                          s.done ? "bg-emerald-500 text-white"
                            : s.current ? "bg-amber-500 text-white"
                            : "bg-zinc-200 text-zinc-500"
                        }`}>
                          {s.done ? "✓" : s.n}
                        </div>
                        <span className={`${s.current ? "font-bold text-amber-700" : "text-zinc-600"}`}>{s.l}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className={`mx-2 h-0.5 flex-1 ${s.done ? "bg-emerald-300" : "bg-zinc-200"}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {count === 0 ? (
              <section className="bg-zinc-50/40 px-6 py-20">
                <div className="mx-auto max-w-md text-center">
                  <h2 className="text-xl font-bold text-zinc-900">購物車是空的</h2>
                  <p className="mt-2 text-sm text-zinc-600">先加商品再來付款。</p>
                  <Link href="/modules/products" className="mt-6 inline-block rounded-md bg-amber-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-700">
                    去逛公版商品
                  </Link>
                </div>
              </section>
            ) : (
              <div className="mx-auto grid max-w-[1760px] grid-cols-3 gap-8 px-6 py-10">
                {/* Methods */}
                <div className="col-span-2 space-y-3">
                  <h2 className="mb-2 text-xl font-bold text-zinc-900">選擇付款方式</h2>
                  <p className="text-xs text-zinc-500">付款完成後訂單狀態會切換為「已付款」並進入凌越 ERP。</p>

                  {/* 第一版可用 */}
                  <div className="space-y-3 mt-4">
                    {([
                      {
                        id: "credit" as const,
                        name: "信用卡(綠界一次性)",
                        desc: "VISA / Mastercard / JCB · 跳轉綠界刷卡頁,刷卡完成自動切「已付款」",
                        fee: "免手續費",
                        badge: "推薦",
                      },
                      {
                        id: "transfer" as const,
                        name: "一般匯款 / 銀行轉帳",
                        desc: "下單後匯到 HJ 指定銀行帳戶,會計核對後切「已付款」",
                        fee: "免手續費",
                      },
                      {
                        id: "cod" as const,
                        name: "貨到付款",
                        desc: "宅配時付款給司機(部分宅配商支援,待 HJ 確認 5 家中哪幾家)",
                        fee: "+ NT$ 30 手續費",
                      },
                    ]).map((m) => {
                      const active = selected === m.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setSelected(m.id)}
                          className={`flex w-full items-center gap-4 rounded-xl border-2 p-5 text-left transition-colors ${
                            active ? "border-amber-500 bg-amber-50/40" : "border-zinc-200 bg-white hover:border-amber-300"
                          }`}
                        >
                          <div className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${active ? "border-amber-500" : "border-zinc-300"}`}>
                            {active && <div className="size-2.5 rounded-full bg-amber-500" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-base font-bold text-zinc-900">{m.name}</span>
                              {m.badge && <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] text-white">{m.badge}</span>}
                            </div>
                            <div className="mt-1 text-sm text-zinc-600">{m.desc}</div>
                          </div>
                          <div className="text-xs text-zinc-500">{m.fee}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* 第一版未開放 */}
                  <div className="mt-6">
                    <div className="mb-2 text-xs font-medium text-zinc-500">第一版未開放(後續再加)</div>
                    <div className="space-y-2">
                      {([
                        { name: "綠界 ATM 虛擬帳號", desc: "F 包 Q-F3 已決定第一版不做,後續加" },
                        { name: "信用卡分期(3 / 6 / 12 期)", desc: "需 HJ 確認是否要做(報價待確認 W2)" },
                        { name: "超商代收(代碼 / 條碼)", desc: "需 HJ 確認是否要做(報價待確認 W4)" },
                      ]).map((m) => (
                        <div key={m.name} className="flex items-center gap-4 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 opacity-60">
                          <div className="size-5 rounded-full border-2 border-zinc-300" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-zinc-700">{m.name}</span>
                              <span className="rounded-full border border-zinc-300 bg-white px-2 py-0.5 text-[10px] text-zinc-500">第一版未開放</span>
                            </div>
                            <div className="mt-1 text-xs text-zinc-500">{m.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Method-specific notice */}
                  {selected === "credit" && (
                    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/60 p-5 text-sm">
                      <div className="font-bold text-amber-900">信用卡刷卡流程</div>
                      <ul className="mt-2 space-y-1 text-amber-800">
                        <li>• 點「確認付款」會跳轉到綠界刷卡頁面</li>
                        <li>• 刷卡成功 → 系統自動切換訂單為「已付款」並進入凌越 ERP</li>
                        <li>• 信用卡資訊由綠界處理,本網站不儲存卡號</li>
                        <li>• 退款時透過綠界退刷 API(由客服在後台觸發)</li>
                      </ul>
                    </div>
                  )}
                  {selected === "transfer" && (
                    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/60 p-5 text-sm">
                      <div className="font-bold text-amber-900">匯款資訊</div>
                      <dl className="mt-2 grid grid-cols-2 gap-2 text-amber-800">
                        <dt>銀行</dt><dd>華南銀行 五股分行</dd>
                        <dt>戶名</dt><dd>禾啟股份有限公司</dd>
                        <dt>帳號</dt><dd className="font-mono">123-456-789012</dd>
                        <dt>備註</dt><dd>請註明訂單編號 + 末 5 碼</dd>
                      </dl>
                      <p className="mt-3 text-xs text-amber-700">
                        ⚠ 7 天內未匯款訂單將自動取消(實際期限以 HJ 設定為主,Q-F1 待 HJ 提供)
                      </p>
                    </div>
                  )}
                  {selected === "cod" && (
                    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/60 p-5 text-sm">
                      <div className="font-bold text-amber-900">貨到付款</div>
                      <ul className="mt-2 space-y-1 text-amber-800">
                        <li>• 宅配時直接交付司機,司機收款後切「已付款」</li>
                        <li>• 加收 NT$ 30 代收手續費</li>
                        <li>• 部分宅配商支援(具體 5 家中哪幾家待 HJ 確認 Q-F7)</li>
                        <li>• 超商取貨不支援貨到付款</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Order summary */}
                <aside className="self-start rounded-xl border border-zinc-200 bg-white p-6 sticky top-6">
                  <h3 className="text-sm font-bold text-zinc-900">訂單摘要</h3>
                  <p className="mt-1 text-xs text-zinc-500">{count} 項 · {totalPieces.toLocaleString()} 入</p>

                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-zinc-600">商品小計</dt>
                      <dd>NT$ {subtotal.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-zinc-600">運費(宅配)</dt>
                      <dd className={shipFee === 0 ? "text-emerald-600 font-medium" : ""}>{shipFee === 0 ? "免運" : `NT$ ${shipFee}`}</dd>
                    </div>
                    {codFee > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-zinc-600">貨到付款手續費</dt>
                        <dd>NT$ {codFee}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-zinc-600">稅金(5%)</dt>
                      <dd>NT$ {tax.toLocaleString()}</dd>
                    </div>
                    <div className="my-2 h-px bg-zinc-100" />
                    <div className="flex justify-between text-base font-bold">
                      <dt>總計</dt>
                      <dd className="text-amber-700">NT$ {total.toLocaleString()}</dd>
                    </div>
                  </dl>

                  <Link
                    href="/modules/checkout/success"
                    className="mt-6 flex w-full items-center justify-center rounded-lg bg-amber-600 py-3 text-sm font-bold text-white hover:bg-amber-700"
                  >
                    確認付款 → {selected === "credit" ? "綠界刷卡" : selected === "transfer" ? "顯示匯款資訊" : "成立訂單"}
                  </Link>
                  <p className="mt-3 text-center text-xs text-zinc-500">送出訂單代表您同意服務條款</p>
                </aside>
              </div>
            )}

            <MockupSiteFooter />
          </MockupShell>
        </div>
      </section>

      {/* Resolution summary */}
      <section className="border-t-2 border-zinc-400 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">本頁需求已對齊 review</h2>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "信用卡(綠界一次性)— 推薦付款方式",
              "一般匯款 — 7 天內匯款,逾期取消(具體期限待 HJ Q-F1)",
              "貨到付款 — +30 手續費,部分宅配商支援(Q-F7 待 HJ)",
              "綠界 ATM 第一版不做(F 包 Q-F3)",
              "信用卡分期、超商代收待報價確認(W2 / W4)",
              "月結 review 沒列,本版不做",
              "退款:信用卡走綠界退刷 API,匯款會計手動",
              "付款完成才進凌越(B 方案 / E 包)",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ModuleFooterNav
        prev={{ title: "結帳填表", href: "/modules/checkout" }}
        next={{ title: "付款結果", href: "/modules/checkout/success" }}
      />
    </main>
  );
}
