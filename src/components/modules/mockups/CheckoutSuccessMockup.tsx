"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartSummary } from "@/lib/cart-store";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

// 32 題 review 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 訂單付款完成才進凌越(E 包,B 方案)
// - 訂單狀態 6 個:待付款/已付款/備貨中/已出貨/已完成/已取消(B 包 Q-B2)
// - 物流商選擇 = 客戶付款完成後業務後台勾選(B 包 Q-B11)
// - 物流追蹤 = HJ 不串 API,系統依物流商產生查詢頁連結模板(B 包 Q-B3)
// - 訂單同步失敗 = 系統自動 retry 3 次,失敗後通知管理員手動補(E 包 Q-E15 default)
// - LINE 通知:訂單成立 / 付款 / 出貨

type SuccessState = "credit-paid" | "transfer-pending" | "cod-pending";

const STATE_LABEL: Record<SuccessState, string> = {
  "credit-paid": "已付款 — 信用卡付款完成",
  "transfer-pending": "待付款 — 等候匯款",
  "cod-pending": "已成立 — 貨到付款",
};

const ORDER_NO = "HJ-2026-0505-0042";

export function CheckoutSuccessMockup({
  annotations: _annotations,
  pageId: _pageId,
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const { items, totalPieces, count } = useCartSummary();
  const [state, setState] = useState<SuccessState>("credit-paid");

  const subtotal = items.reduce(
    (s, i) => s + i.memberPrice * i.quantity * i.piecesPerUnit,
    0,
  );
  const totalVolume = items.reduce((s, i) => s + i.quantity * i.volumeRation, 0);
  const allBox = items.length > 0 && items.every((i) => i.isBox);
  const shipFee = allBox ? 0 : subtotal >= 2500 ? 0 : totalVolume <= 2 ? 100 : totalVolume <= 3 ? 120 : totalVolume <= 4 ? 150 : totalVolume <= 5 ? 180 : 200;
  const codFee = state === "cod-pending" ? 30 : 0;
  const tax = Math.round((subtotal + shipFee + codFee) * 0.05);
  const total = subtotal + shipFee + codFee + tax;

  return (
    <MockupShell url="https://hj.example.com/checkout/success">
      <MockupSiteHeader />

      {/* Demo toggle for 3 result states */}
      <div className="border-b-2 border-dashed border-amber-300 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-amber-700 px-2 py-0.5 font-bold text-white">預覽切換</span>
          <span className="text-zinc-700">付款方式:</span>
          <div className="flex gap-1 rounded-md bg-white p-1 shadow-sm border border-zinc-200">
            {([
              { id: "credit-paid" as const, name: "信用卡(已付款)" },
              { id: "transfer-pending" as const, name: "匯款(待付款)" },
              { id: "cod-pending" as const, name: "貨到付款" },
            ]).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setState(opt.id)}
                className={`rounded px-3 py-1 font-medium ${state === opt.id ? "bg-amber-600 text-white" : "text-zinc-600 hover:bg-zinc-50"}`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stepper (all done) */}
      <div className="border-b border-zinc-200 bg-white px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between text-xs">
            {[
              { n: 1, l: "購物車" },
              { n: 2, l: "填寫資料" },
              { n: 3, l: "付款方式" },
              { n: 4, l: "付款結果", current: true },
            ].map((s, i, arr) => (
              <div key={s.n} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`flex size-9 items-center justify-center rounded-full text-sm font-bold ${
                    s.current ? "bg-amber-500 text-white" : "bg-emerald-500 text-white"
                  }`}>
                    {s.current ? s.n : "✓"}
                  </div>
                  <span className={`${s.current ? "font-bold text-amber-700" : "text-zinc-600"}`}>{s.l}</span>
                </div>
                {i < arr.length - 1 && <div className="mx-2 h-0.5 flex-1 bg-emerald-300" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {count === 0 ? (
        <section className="bg-zinc-50/40 px-6 py-20">
          <div className="mx-auto max-w-md text-center">
            <h2 className="text-xl font-bold text-zinc-900">尚未產生訂單</h2>
            <p className="mt-2 text-sm text-zinc-600">先去購物車加商品,完成結帳流程才會看到此頁。</p>
            <Link href="/modules/products" className="mt-6 inline-block rounded-md bg-amber-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-700">
              去逛公版商品
            </Link>
          </div>
        </section>
      ) : (
        <div className="bg-zinc-50/50 px-6 py-10">
          <div className="mx-auto max-w-3xl">
            {/* Status banner */}
            <div className={`rounded-2xl border-2 p-8 text-center ${
              state === "credit-paid" ? "border-emerald-300 bg-emerald-50/60"
                : state === "transfer-pending" ? "border-amber-300 bg-amber-50/60"
                : "border-sky-300 bg-sky-50/60"
            }`}>
              <div className={`mx-auto flex size-16 items-center justify-center rounded-full ${
                state === "credit-paid" ? "bg-emerald-500"
                  : state === "transfer-pending" ? "bg-amber-500"
                  : "bg-sky-500"
              } text-white`}>
                {state === "credit-paid" ? (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                )}
              </div>
              <h2 className={`mt-5 text-2xl font-bold ${
                state === "credit-paid" ? "text-emerald-900"
                  : state === "transfer-pending" ? "text-amber-900"
                  : "text-sky-900"
              }`}>
                {state === "credit-paid" ? "訂單成立 + 付款完成!" : state === "transfer-pending" ? "訂單成立,等候匯款" : "訂單成立,等待出貨後司機收款"}
              </h2>
              <p className="mt-2 text-sm text-zinc-700">
                訂單編號:<span className="font-mono font-bold text-zinc-900">{ORDER_NO}</span>
              </p>
              <p className="mt-1 text-xs text-zinc-500">{STATE_LABEL[state]}</p>
            </div>

            {/* State-specific instruction */}
            {state === "transfer-pending" && (
              <section className="mt-6 rounded-xl border-2 border-amber-300 bg-white p-6">
                <h3 className="text-base font-bold text-amber-900">請於 7 天內完成匯款</h3>
                <p className="mt-1 text-xs text-zinc-500">逾期未匯款訂單將自動取消(實際期限以 HJ 設定為主)。</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <dt className="text-zinc-500">應匯金額</dt>
                  <dd className="font-bold text-amber-700 text-base">NT$ {total.toLocaleString()}</dd>
                  <dt className="text-zinc-500">銀行</dt>
                  <dd>華南銀行 五股分行</dd>
                  <dt className="text-zinc-500">戶名</dt>
                  <dd>禾啟股份有限公司</dd>
                  <dt className="text-zinc-500">帳號</dt>
                  <dd className="font-mono">123-456-789012</dd>
                  <dt className="text-zinc-500">備註</dt>
                  <dd>請註明訂單編號末 5 碼:<span className="font-mono font-bold">{ORDER_NO.slice(-5)}</span></dd>
                </dl>
                <button className="mt-4 rounded-md border border-amber-400 bg-amber-50 px-4 py-2 text-xs font-medium text-amber-800 hover:bg-amber-100">
                  複製匯款資訊
                </button>
                <p className="mt-3 text-xs text-zinc-500">
                  匯款完成後 → HJ 會計核對 → 訂單狀態切換為「已付款」並進入凌越 ERP → 進入備貨。
                </p>
              </section>
            )}

            {state === "cod-pending" && (
              <section className="mt-6 rounded-xl border-2 border-sky-300 bg-white p-6">
                <h3 className="text-base font-bold text-sky-900">貨到付款流程</h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                  <li>1. 訂單已成立,HJ 業務在後台確認後進入備貨。</li>
                  <li>2. 出貨時司機代收 NT$ {total.toLocaleString()}(含 +NT$ 30 代收手續費)。</li>
                  <li>3. 司機收款 → 訂單狀態切換為「已付款」 → 同步進凌越 ERP。</li>
                </ul>
                <p className="mt-3 text-xs text-zinc-500">
                  貨到付款限部分宅配商支援(具體 5 家中哪幾家待 HJ 確認 Q-F7)。
                </p>
              </section>
            )}

            {state === "credit-paid" && (
              <section className="mt-6 rounded-xl border-2 border-emerald-300 bg-white p-6">
                <h3 className="text-base font-bold text-emerald-900">後續流程</h3>
                <div className="mt-3 space-y-3">
                  {[
                    { ok: true, l: "信用卡刷卡完成(綠界回呼)", time: "剛剛" },
                    { ok: true, l: "訂單狀態切換「已付款」+ 進入凌越 ERP", time: "剛剛" },
                    { ok: false, l: "業務在後台確認後進入備貨,可能會勾選物流商", time: "預計 1 個工作天內" },
                    { ok: false, l: "出貨後上傳物流編號,訂單轉「已出貨」", time: "預計 1–3 個工作天" },
                    { ok: false, l: "已出貨後 7 天系統自動轉「已完成」", time: "依物流時間" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 size-5 shrink-0 rounded-full ${s.ok ? "bg-emerald-500" : "border-2 border-zinc-300 bg-white"} flex items-center justify-center text-white text-xs`}>
                        {s.ok && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm ${s.ok ? "font-medium text-zinc-900" : "text-zinc-700"}`}>{s.l}</div>
                        <div className="text-xs text-zinc-500">{s.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Order summary */}
            <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-6">
              <h3 className="text-base font-bold text-zinc-900">訂單明細({count} 項 · {totalPieces.toLocaleString()} 入)</h3>
              <div className="mt-4 space-y-2 text-sm">
                {items.map((it) => (
                  <div key={it.code} className="flex items-center gap-3 border-b border-zinc-100 pb-2 last:border-b-0">
                    <div className={`size-12 shrink-0 rounded ${it.bg}`} />
                    <div className="flex-1">
                      <div className="font-medium text-zinc-900">{it.name}</div>
                      <div className="text-xs text-zinc-500">
                        {it.quantity} {it.unit} × NT$ {it.memberPrice}/個({it.piecesPerUnit} 入/{it.unit})
                      </div>
                    </div>
                    <div className="text-right font-bold text-zinc-900">
                      NT$ {(it.memberPrice * it.quantity * it.piecesPerUnit).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <dl className="mt-4 space-y-1.5 border-t border-zinc-100 pt-4 text-sm">
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
            </section>

            {/* LINE notification + Email */}
            <section className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-zinc-900">已透過 LINE 通知您</div>
                  <div className="text-xs text-zinc-500">訂單成立 / 付款完成 / 出貨 三個重要時點都會推播 LINE 訊息(若已綁定 LINE)</div>
                </div>
              </div>
            </section>

            {/* CTAs */}
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/modules/members/orders" className="rounded-lg bg-amber-600 px-6 py-3 text-sm font-bold text-white hover:bg-amber-700">
                查看訂單列表 →
              </Link>
              <Link href="/modules/products" className="rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                繼續逛公版商品
              </Link>
            </div>
          </div>
        </div>
      )}

      <MockupSiteFooter />
    </MockupShell>
  );
}
