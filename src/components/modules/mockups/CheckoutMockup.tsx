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
// - 離島不允許直接結帳:澎湖/金門/馬祖/綠島/蘭嶼/小琉球/東引/烏坵 → 提示客服(B 包)
// - 圖外特殊商品也走客服(B 包 Q-B5)
// - 結帳前需登入(綁凌越客編)— C 包
//
// 待 HJ 提供(發票相關,F 包 Q-F11):
// - 發票類型(紙本 / 雲端 / 電子)
// - 退換貨折讓單還是作廢
// 結帳頁先用 default(電子 + 載具),HJ 確認後再調

const ISLAND_KEYWORDS = ["澎湖", "金門", "馬祖", "綠島", "蘭嶼", "小琉球", "東引", "烏坵"];

type ShipMode = "home" | "store";
type InvoiceType = "personal" | "company" | "donation";
type CarrierType = "phone" | "citizen" | "member";

export function CheckoutMockup({
  annotations: _annotations,
  pageId: _pageId,
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const { items, totalUnits, totalPieces, count } = useCartSummary();

  const [name, setName] = useState("陳老闆");
  const [phone, setPhone] = useState("0912-345-678");
  const [city, setCity] = useState("新北市");
  const [district, setDistrict] = useState("五股區");
  const [addr, setAddr] = useState("五權路 10 號 3 樓");
  const [taxId, setTaxId] = useState("12345678");
  const [companyName, setCompanyName] = useState("禾啟股份有限公司");

  const [ship, setShip] = useState<ShipMode>("home");
  const [invoice, setInvoice] = useState<InvoiceType>("company");
  const [carrier, setCarrier] = useState<CarrierType>("member");
  const [npoCode, setNpoCode] = useState("");

  const isIsland = ISLAND_KEYWORDS.some((k) => city.includes(k) || district.includes(k));

  const subtotal = items.reduce(
    (s, i) => s + i.memberPrice * i.quantity * i.piecesPerUnit,
    0,
  );
  const totalVolume = items.reduce((s, i) => s + i.quantity * i.volumeRation, 0);

  // 簡化運費(完整邏輯在 cart store)
  const allBox = items.length > 0 && items.every((i) => i.isBox);
  const shipFee =
    ship === "home"
      ? allBox
        ? 0
        : subtotal >= 2500
          ? 0
          : totalVolume <= 2 ? 100 : totalVolume <= 3 ? 120 : totalVolume <= 4 ? 150 : totalVolume <= 5 ? 180 : 200
      : subtotal >= 699 ? 0 : 65;

  const tax = Math.round((subtotal + shipFee) * 0.05);
  const total = subtotal + shipFee + tax;

  const canCheckout = items.length > 0 && !isIsland && name && phone && addr;

  return (
    <MockupShell url="https://hj.example.com/checkout">
      <MockupSiteHeader />

      {/* Breadcrumb */}
      <div className="border-b border-zinc-100 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/cart" className="hover:text-zinc-900">購物車</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="text-zinc-900">填寫結帳資料</span>
        </div>
      </div>

      {/* Stepper */}
      <section className="border-b border-zinc-100 bg-white px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between">
            {[
              { n: 1, l: "購物車", done: true, href: "/modules/cart" },
              { n: 2, l: "填寫資料", current: true },
              { n: 3, l: "付款方式", href: "/modules/checkout/payment" },
              { n: 4, l: "付款結果", href: "/modules/checkout/success" },
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
                  <span className={`text-xs ${s.current ? "font-bold text-amber-700" : "text-zinc-600"}`}>
                    {s.l}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className={`mx-2 h-0.5 flex-1 ${s.done ? "bg-emerald-300" : "bg-zinc-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Empty cart */}
      {count === 0 ? (
        <section className="bg-zinc-50/40 px-6 py-20">
          <div className="mx-auto max-w-md text-center">
            <h2 className="text-xl font-bold text-zinc-900">購物車是空的</h2>
            <p className="mt-2 text-sm text-zinc-600">先去加商品到購物車再來結帳。</p>
            <Link href="/modules/products" className="mt-6 inline-block rounded-md bg-amber-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-700">
              去逛公版商品
            </Link>
          </div>
        </section>
      ) : (
        <div className="bg-zinc-50/50 px-6 py-10">
          <div className="mx-auto grid max-w-[1760px] gap-6 lg:grid-cols-[1fr_400px]">
            <div className="space-y-5">
              {/* 收件資訊 */}
              <section className="rounded-xl border border-zinc-200 bg-white p-6">
                <h2 className="text-base font-bold text-zinc-900">收件資訊</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-zinc-700">收件人 *</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-700">電話 *</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-700">縣市 *</label>
                    <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm">
                      <option>新北市</option>
                      <option>台北市</option>
                      <option>桃園市</option>
                      <option>台中市</option>
                      <option>高雄市</option>
                      <option>澎湖縣</option>
                      <option>金門縣</option>
                      <option>連江縣(馬祖)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-700">區 / 鎮 *</label>
                    <input value={district} onChange={(e) => setDistrict(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-zinc-700">詳細地址 *</label>
                    <input value={addr} onChange={(e) => setAddr(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                  </div>
                </div>

                {/* Island warning */}
                {isIsland && (
                  <div className="mt-4 rounded-lg border-2 border-rose-300 bg-rose-50 p-4 text-sm text-rose-800">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">⚠</span>
                      <div className="flex-1">
                        <div className="font-bold">您的地址在離島地區,無法直接結帳</div>
                        <p className="mt-1 text-xs">
                          因運費 / 商品法規限制,離島(澎湖 / 金門 / 馬祖 / 綠島 / 蘭嶼 / 小琉球 / 東引 / 烏坵)需聯繫客服協助下單。
                        </p>
                        <Link href="/modules/contact" className="mt-3 inline-flex items-center gap-1 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700">
                          聯繫客服 →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* 配送方式 */}
              <section className="rounded-xl border border-zinc-200 bg-white p-6">
                <h2 className="text-base font-bold text-zinc-900">配送方式</h2>
                <p className="mt-1 text-xs text-zinc-500">物流商於付款完成後由業務後台勾選,客戶付款完成才會進凌越 ERP。</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {([
                    { id: "home" as const, name: "宅配", desc: "新航 / 嘉里 / 黑貓 / 新竹 / 大嘴鳥(業務勾選)" },
                    { id: "store" as const, name: "超商取貨", desc: "7-11 / 全家 / 萊爾富 / OK", disabled: items.some((i) => i.isBox) || totalVolume > 1.5 },
                  ]).map((opt) => {
                    const active = ship === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => !opt.disabled && setShip(opt.id)}
                        disabled={opt.disabled}
                        className={`rounded-lg border-2 p-4 text-left ${
                          opt.disabled ? "border-zinc-200 bg-zinc-50 cursor-not-allowed opacity-60"
                            : active ? "border-amber-500 bg-amber-50"
                            : "border-zinc-200 hover:border-amber-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-zinc-900">{opt.name}</span>
                          <div className={`size-4 rounded-full border-2 ${active ? "border-amber-500" : "border-zinc-300"}`}>
                            {active && <div className="m-0.5 size-2 rounded-full bg-amber-500" />}
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">{opt.desc}</div>
                        {opt.disabled && (
                          <div className="mt-1 text-xs text-rose-600">⚠ 含箱購商品 / 超商上限</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* 發票 */}
              <section className="rounded-xl border border-zinc-200 bg-white p-6">
                <div className="flex items-baseline justify-between">
                  <h2 className="text-base font-bold text-zinc-900">發票資訊</h2>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                    待 HJ 確認服務商與細項
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">
                  發票類型(紙本 / 雲端 / 電子)、退換貨折讓 / 作廢規則待 HJ 提供;mockup 暫以電子發票 default 呈現。
                </p>
                <div className="mt-4">
                  <div className="text-xs font-medium text-zinc-700">發票類型</div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {([
                      { id: "company" as const, name: "三聯式(統編)" },
                      { id: "personal" as const, name: "二聯式(載具)" },
                      { id: "donation" as const, name: "捐贈" },
                    ]).map((opt) => {
                      const active = invoice === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setInvoice(opt.id)}
                          className={`rounded-lg border-2 p-3 text-sm font-medium ${
                            active ? "border-amber-500 bg-amber-50 text-amber-900" : "border-zinc-200 text-zinc-700 hover:border-amber-300"
                          }`}
                        >
                          {opt.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {invoice === "company" && (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-zinc-700">公司抬頭 *</label>
                      <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-700">統一編號 *</label>
                      <input value={taxId} onChange={(e) => setTaxId(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm font-mono" />
                    </div>
                  </div>
                )}

                {invoice === "personal" && (
                  <div className="mt-4">
                    <div className="text-xs font-medium text-zinc-700">載具類型</div>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {([
                        { id: "member" as const, name: "會員載具(雲端)" },
                        { id: "phone" as const, name: "手機條碼" },
                        { id: "citizen" as const, name: "自然人憑證" },
                      ]).map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setCarrier(opt.id)}
                          className={`rounded-lg border-2 p-2 text-xs font-medium ${
                            carrier === opt.id ? "border-amber-500 bg-amber-50 text-amber-900" : "border-zinc-200 text-zinc-700 hover:border-amber-300"
                          }`}
                        >
                          {opt.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {invoice === "donation" && (
                  <div className="mt-4">
                    <label className="text-xs font-medium text-zinc-700">愛心碼</label>
                    <input
                      value={npoCode}
                      onChange={(e) => setNpoCode(e.target.value)}
                      placeholder="例:25885"
                      className="mt-1 w-40 rounded-md border border-zinc-300 px-3 py-2 text-sm font-mono"
                    />
                  </div>
                )}
              </section>

              {/* 訂單備註 */}
              <section className="rounded-xl border border-zinc-200 bg-white p-6">
                <h2 className="text-base font-bold text-zinc-900">訂單備註</h2>
                <textarea
                  className="mt-3 h-20 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
                  placeholder="例:希望 5/15 前到貨 / 與其他訂單合併出貨"
                />
              </section>
            </div>

            {/* Right: order summary */}
            <aside className="self-start rounded-xl border border-zinc-200 bg-white p-6 sticky top-6">
              <h3 className="text-base font-bold text-zinc-900">訂單摘要</h3>
              <p className="mt-1 text-xs text-zinc-500">{count} 項 · {totalUnits} 單位({totalPieces.toLocaleString()} 入)</p>

              <div className="mt-4 max-h-72 overflow-y-auto space-y-2 border-y border-zinc-100 py-3 text-xs">
                {items.map((it) => (
                  <div key={it.code} className="flex gap-3">
                    <div className={`size-12 shrink-0 rounded ${it.bg}`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-zinc-900 truncate">{it.name}</div>
                      <div className="text-zinc-500">{it.quantity} {it.unit} × NT$ {it.memberPrice}/個</div>
                    </div>
                    <div className="text-right text-zinc-900 font-bold">
                      NT$ {(it.memberPrice * it.quantity * it.piecesPerUnit).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-600">商品小計</span>
                  <span>NT$ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">運費({ship === "home" ? "宅配" : "超商"})</span>
                  <span className={shipFee === 0 ? "text-emerald-600 font-medium" : ""}>{shipFee === 0 ? "免運" : `NT$ ${shipFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">稅金(5%)</span>
                  <span>NT$ {tax.toLocaleString()}</span>
                </div>
                <div className="my-2 h-px bg-zinc-100" />
                <div className="flex justify-between text-base font-bold">
                  <span>總計</span>
                  <span className="text-amber-700">NT$ {total.toLocaleString()}</span>
                </div>
              </div>

              {isIsland ? (
                <button
                  disabled
                  className="mt-5 w-full rounded-lg bg-zinc-300 py-3 text-sm font-bold text-white cursor-not-allowed"
                >
                  ⚠ 離島地區請聯繫客服
                </button>
              ) : (
                <Link
                  href="/modules/checkout/payment"
                  className={`mt-5 flex w-full items-center justify-center rounded-lg py-3 text-sm font-bold text-white ${
                    canCheckout ? "bg-amber-600 hover:bg-amber-700" : "bg-zinc-300 cursor-not-allowed pointer-events-none"
                  }`}
                >
                  下一步:選付款方式 →
                </Link>
              )}

              <div className="mt-3 rounded-lg bg-zinc-50 p-3 text-[11px] text-zinc-600 leading-relaxed">
                <strong>付款流程:</strong>選付款方式後跳轉綠界刷卡 / 顯示匯款資訊 / 通知貨到付款。
                付款完成後訂單狀態切換為「已付款」並進入凌越 ERP。
              </div>
            </aside>
          </div>
        </div>
      )}

      <MockupSiteFooter />
    </MockupShell>
  );
}
