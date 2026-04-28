"use client";

import Link from "next/link";
import { useState } from "react";
import { Questioned } from "../CommentSystem";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

/* ============== Q definitions ============== */

const Q1 = {
  no: "Q1",
  question: "月結客戶識別與信用額度檢查 — 哪些會員等級可用月結？訂單成立時是否要扣信用額度？額度不足如何處理？",
  context:
    "目前先以「合作 A 級」示意：①「月結 30 天」付款方式只在合作 A 級會員顯示 ② 訂單送出時系統檢查當前未結金額 + 本單金額 ≤ 信用額度，超過則顯示「需業務確認」並改成「月結審核中」狀態。想請 HJ 確認：哪些等級可月結（A 級？A+B？或其他規則）、額度由誰維護（ERP 還是網站）、超額 SOP。",
  clientRef: {
    source: "後台 / 顧客管理 (5) + 後台 / 金流 (7)",
    quote: "客戶編號與凌越 ERP 同步、多層會員分級價；綠界、一般匯款、宅配/自取貨到付款",
    note: "需求表寫了會員分級、金流方式，但月結這個 B2B 常見方式未明寫。本提案先示意，想請 HJ 確認是否要做。",
  },
};

const Q2 = {
  no: "Q2",
  question: "多門市分送 — 一張訂單能否分送多個地址？或要拆成多張訂單？",
  context:
    "目前先以這樣示意：① 預設「全部送同一地址」② 點「分送多地址」可逐項指定收件門市（總店 / 信義分店 / 倉庫）③ 同一訂單但分送多地址時，運費依各門市材積分別計算。想請 HJ 確認：多門市分送是同一張訂單還是要拆單（影響 ERP 處理 + 物流單）？",
  clientRef: {
    source: "後台 / 顧客管理 (5) + 後台 / 物流 (8)",
    quote: "多層會員分級價；四大超商、多家宅配、自取",
    note: "需求表沒明寫多門市分送是否要做；本提案先以「同單分送」示意，避免客戶要分多次下單。",
  },
};

const Q3 = {
  no: "Q3",
  question: "付款方式組合與會員類型對應 — 個人會員 / 企業客戶各自能選哪些付款方式？",
  context:
    "目前先以這樣示意：① 個人會員：信用卡（綠界）、ATM 轉帳、貨到付款 ② 企業客戶 A 級：以上 + 月結 30 天 ③ 企業客戶其他級別：以上但無月結 ④ 部分商品（如客製私版）僅限 ATM / 月結，避免信用卡爭議款。想請 HJ 確認對應規則。",
  clientRef: {
    source: "後台 / 金流 (7) + 後台 / 顧客管理 (5)",
    quote: "綠界、一般匯款、宅配/自取貨到付款；多層會員分級價",
    note: "需求表寫了金流選項與分級，但兩者對應規則未細分。",
  },
};

const Q4 = {
  no: "Q4",
  question: "發票欄位需求 — 企業客戶三聯式（公司抬頭 / 統編 / 寄送方式）是否要每次手動確認？個人會員載具是否強制？",
  context:
    "目前先以這樣示意：① 企業客戶：預設帶入「帳號設定」存的發票資料，可在結帳時改 ② 個人會員：可選電子發票（雲端載具 / 手機條碼）/ 三聯式 / 捐贈發票 ③ 統編 / 載具一旦填過就記住，下次自動帶。想請 HJ 確認：發票欄位是否每次都要手動再確認？個人會員是否強制綁載具？",
  clientRef: {
    source: "需求表未提及（補充項）",
    quote: "（這項在需求表沒有對應段落）",
    note: "B2B 場景發票一定要做。本提案參考一般電商實務，想請 HJ 確認欄位與行為。",
  },
};

/* ============== Icons ============== */

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/* ============== Component ============== */

type ViewMode = "personal" | "business-a" | "business-b";
type PaymentMethod = "credit" | "atm" | "cod" | "monthly";
type DeliveryMethod = "blackcat" | "convenience" | "pickup";
type InvoiceType = "ecpay-personal" | "ecpay-mobile" | "triplet" | "donate";

const MEMBER_LABEL: Record<ViewMode, string> = {
  personal: "個人會員",
  "business-a": "企業客戶（合作 A 級）",
  "business-b": "企業客戶（合作 B 級）",
};

export function CheckoutMockup({
  annotations = false,
  pageId = "checkout",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [view, setView] = useState<ViewMode>("business-a");
  const [delivery, setDelivery] = useState<DeliveryMethod>("blackcat");
  const [payment, setPayment] = useState<PaymentMethod>("credit");
  const [invoice, setInvoice] = useState<InvoiceType>(
    view === "personal" ? "ecpay-mobile" : "triplet",
  );
  const [splitDelivery, setSplitDelivery] = useState(false);

  const subtotal = 22000;
  const shipping = delivery === "pickup" ? 0 : subtotal >= 3000 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <MockupShell url="https://hjhj.com.tw/checkout">
      <MockupSiteHeader />

      {/* Demo toggle */}
      <div className="border-b-2 border-dashed border-amber-300 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-amber-700 px-2 py-0.5 font-bold text-white">
            預覽
          </span>
          <span className="text-zinc-700">切換會員類型，確認付款方式 / 收件選項差異：</span>
          <div className="flex flex-wrap gap-1 rounded-md bg-white p-1 shadow-sm border border-zinc-200">
            {(["personal", "business-a", "business-b"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => {
                  setView(v);
                  if (v === "personal" && payment === "monthly") setPayment("credit");
                  if (v === "personal") setInvoice("ecpay-mobile");
                  else setInvoice("triplet");
                }}
                className={`rounded px-3 py-1 font-medium transition-colors ${
                  view === v
                    ? "bg-amber-700 text-white"
                    : "text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {MEMBER_LABEL[v]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb / steps */}
      <section className="border-b border-zinc-200 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] flex items-center gap-2 text-xs">
          <Link href="/modules/cart" className="text-zinc-500 hover:text-zinc-900">
            購物車
          </Link>
          <ChevronArrow />
          <span className="font-bold text-amber-700">結帳</span>
          <ChevronArrow />
          <span className="text-zinc-400">訂單成立</span>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-[1760px] items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">結帳</h1>
            <p className="mt-1 text-sm text-zinc-500">
              {MEMBER_LABEL[view]} · 4 項商品 · NT$ {subtotal.toLocaleString()}
            </p>
          </div>
          <Link
            href="/modules/cart"
            className="flex items-center gap-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50"
          >
            <ChevronLeft />
            返回購物車
          </Link>
        </div>
      </section>

      <section className="bg-zinc-50/40 px-6 py-8">
        <div className="mx-auto grid max-w-[1760px] gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-4">
            {/* 1. 收件人 / 地址 */}
            <Questioned
              show={annotations}
              questions={[Q2]}
              pageId={pageId}
              position="top-right"
            >
              <Section
                step="1"
                title="收件資訊"
                subtitle={
                  view === "personal"
                    ? "收件人姓名、電話、地址"
                    : "可選擇預設收件門市，或分送多個門市"
                }
                tone="default"
              >
                {view !== "personal" ? (
                  <>
                    <div className="flex items-start justify-between gap-3 rounded-lg border border-zinc-200 bg-white p-3 text-sm">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-800">
                            總店
                          </span>
                          <span className="font-bold text-zinc-900">禾啟餐飲（總店）</span>
                          <span className="rounded bg-amber-700 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            預設
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-zinc-600">
                          陳先生 0912-345-678 · 新北市五股區五權五路 10 號
                        </div>
                      </div>
                      <button className="text-xs text-amber-700 hover:underline">
                        變更
                      </button>
                    </div>

                    <label className="mt-3 flex items-center gap-2 text-sm text-zinc-700">
                      <input
                        type="checkbox"
                        checked={splitDelivery}
                        onChange={(e) => setSplitDelivery(e.target.checked)}
                        className="size-4 rounded border-zinc-300 accent-amber-700"
                      />
                      分送多個門市
                    </label>

                    {splitDelivery && (
                      <div className="mt-3 space-y-2 rounded-md border border-zinc-200 bg-zinc-50/70 p-3 text-xs">
                        <div className="font-bold text-zinc-700">逐項指定收件門市：</div>
                        {[
                          { item: "12oz 公版瓦楞紙杯（白）× 5,000", store: "總店" },
                          { item: "牛皮紙便當盒（M）× 2,000", store: "信義分店" },
                          { item: "客製禮盒 × 200", store: "倉庫" },
                        ].map((row) => (
                          <div
                            key={row.item}
                            className="flex items-center justify-between gap-2 rounded border border-zinc-200 bg-white px-2.5 py-1.5"
                          >
                            <span className="truncate text-zinc-700">{row.item}</span>
                            <select className="rounded border border-zinc-300 bg-white px-2 py-0.5">
                              <option>總店</option>
                              <option>信義分店</option>
                              <option>倉庫</option>
                            </select>
                          </div>
                        ))}
                        <p className="mt-2 text-[11px] text-zinc-500">
                          ※ 分送多門市時，運費依各門市材積分別計算
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="收件人" value="陳先生" />
                    <Field label="行動電話" value="0912-345-678" />
                    <div className="sm:col-span-2">
                      <Field label="收件地址" value="新北市五股區五權五路 10 號" />
                    </div>
                  </div>
                )}
              </Section>
            </Questioned>

            {/* 2. 物流 */}
            <Section step="2" title="物流方式" tone="default">
              <div className="space-y-2">
                {[
                  { id: "blackcat", label: "黑貓宅急便", desc: "預估 NT$ 150 / 1-3 個工作天送達", method: "delivery" },
                  { id: "convenience", label: "超商取貨", desc: "預估 NT$ 60 / 萊爾富、全家、7-11", method: "delivery" },
                  { id: "pickup", label: "倉庫自取（免運）", desc: "新北市五股 HJ 倉庫，平日 9:00–17:00", method: "pickup" },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                      delivery === m.id
                        ? "border-amber-700 bg-amber-50/40"
                        : "border-zinc-200 bg-white hover:border-amber-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={m.id}
                      checked={delivery === m.id}
                      onChange={() => setDelivery(m.id as DeliveryMethod)}
                      className="mt-1 accent-amber-700"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-bold text-zinc-900">{m.label}</div>
                      <div className="text-xs text-zinc-500">{m.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </Section>

            {/* 3. 付款方式 */}
            <Questioned
              show={annotations}
              questions={[Q3, ...(view !== "personal" ? [Q1] : [])]}
              pageId={pageId}
              position="top-right"
            >
              <Section step="3" title="付款方式" tone="default">
                <div className="space-y-2">
                  {[
                    {
                      id: "credit",
                      label: "信用卡（綠界）",
                      desc: "Visa / Master / JCB，刷卡完成即付款",
                      shows: ["personal", "business-a", "business-b"],
                    },
                    {
                      id: "atm",
                      label: "ATM 虛擬帳號轉帳",
                      desc: "訂單成立後產生 14 天內有效帳號",
                      shows: ["personal", "business-a", "business-b"],
                    },
                    {
                      id: "cod",
                      label: "貨到付款",
                      desc: "限黑貓宅配 / 超商取貨；私版客製商品不適用",
                      shows: ["personal", "business-a", "business-b"],
                    },
                    {
                      id: "monthly",
                      label: "月結 30 天",
                      desc: "出貨後 30 天結帳；需檢查信用額度，超額需業務確認",
                      shows: ["business-a"],
                      badge: "合作 A 級限定",
                    },
                  ]
                    .filter((m) => m.shows.includes(view))
                    .map((m) => (
                      <label
                        key={m.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                          payment === m.id
                            ? "border-amber-700 bg-amber-50/40"
                            : "border-zinc-200 bg-white hover:border-amber-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={m.id}
                          checked={payment === m.id}
                          onChange={() => setPayment(m.id as PaymentMethod)}
                          className="mt-1 accent-amber-700"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
                            {m.label}
                            {m.badge && (
                              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                                {m.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-zinc-500">{m.desc}</div>
                        </div>
                      </label>
                    ))}
                </div>

                {payment === "monthly" && (
                  <div className="mt-3 rounded-md border border-amber-300 bg-amber-50/70 px-3 py-2 text-xs text-amber-900">
                    <div className="font-bold">合作 A 級信用額度：</div>
                    <div className="mt-1 flex justify-between">
                      <span>已用：NT$ 38,500 / 上限 NT$ 200,000</span>
                      <span className="text-emerald-700 font-bold">
                        本單後：NT$ {(38500 + total).toLocaleString()} ✓ 額度充足
                      </span>
                    </div>
                  </div>
                )}
              </Section>
            </Questioned>

            {/* 4. 發票 */}
            <Questioned
              show={annotations}
              questions={[Q4]}
              pageId={pageId}
              position="top-right"
            >
              <Section step="4" title="發票" tone="default">
                <div className="space-y-2">
                  {(view === "personal"
                    ? [
                        { id: "ecpay-mobile", label: "電子發票 / 手機條碼載具", desc: "綁定載具 /ABC123 自動歸戶" },
                        { id: "ecpay-personal", label: "電子發票 / 個人雲端", desc: "由 wayne@example.com 收電子檔" },
                        { id: "donate", label: "捐贈發票", desc: "捐贈創世基金會" },
                      ]
                    : [
                        { id: "triplet", label: "三聯式發票", desc: "公司抬頭 + 統編，紙本郵寄" },
                        { id: "ecpay-personal", label: "電子發票（公司）", desc: "公司抬頭 + 統編，Email 寄送電子檔" },
                      ]
                  ).map((m) => (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                        invoice === m.id
                          ? "border-amber-700 bg-amber-50/40"
                          : "border-zinc-200 bg-white hover:border-amber-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="invoice"
                        value={m.id}
                        checked={invoice === m.id}
                        onChange={() => setInvoice(m.id as InvoiceType)}
                        className="mt-1 accent-amber-700"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-zinc-900">{m.label}</div>
                        <div className="text-xs text-zinc-500">{m.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {view !== "personal" && (
                  <div className="mt-3 grid gap-2 rounded-md border border-zinc-200 bg-zinc-50/70 p-3 text-xs sm:grid-cols-2">
                    <Field label="發票抬頭" value="禾啟餐飲有限公司" />
                    <Field label="統一編號" value="12345678" mono />
                    <div className="sm:col-span-2 text-[11px] text-zinc-500">
                      ※ 來自帳號設定，可在此次訂單臨時變更
                    </div>
                  </div>
                )}
              </Section>
            </Questioned>
          </div>

          {/* Order summary sticky */}
          <aside className="lg:sticky lg:top-4 lg:self-start">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-zinc-900">訂單摘要</h2>

              {/* Items collapsed */}
              <div className="mt-4 space-y-1.5 border-b border-zinc-100 pb-4 text-xs">
                {[
                  { name: "12oz 公版瓦楞紙杯（白）× 5,000", price: 9250 },
                  { name: "牛皮紙便當盒（M）× 2,000", price: 9200 },
                  { name: "客製禮盒 × 200", price: 18000 },
                ].map((it) => (
                  <div key={it.name} className="flex justify-between gap-2">
                    <span className="truncate text-zinc-600">{it.name}</span>
                    <span className="shrink-0 font-mono text-zinc-700">
                      NT$ {it.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-b border-zinc-100 py-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-600">小計</span>
                  <span className="font-mono">NT$ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">運費</span>
                  <span className={`font-mono ${shipping === 0 ? "text-emerald-700 font-bold" : ""}`}>
                    {shipping === 0 ? "免運" : `NT$ ${shipping}`}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pt-4 text-base font-bold">
                <span className="text-zinc-900">應付金額</span>
                <span className="font-mono text-amber-800">NT$ {total.toLocaleString()}</span>
              </div>

              {payment === "monthly" && (
                <div className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-xs text-emerald-900">
                  ✓ 本單採月結 30 天，出貨後 5/28 結帳
                </div>
              )}

              <Link
                href="/modules/checkout/success"
                className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-md bg-amber-700 px-4 py-3 text-sm font-bold text-white hover:bg-amber-800"
              >
                <LockIcon />
                送出訂單
              </Link>

              <div className="mt-3 flex items-center gap-1 text-[11px] text-zinc-500">
                <CheckIcon className="text-emerald-600" />
                <span>送出後將進行 ERP 建單與付款處理</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <MockupSiteFooter />
    </MockupShell>
  );
}

/* ============== Subcomponents ============== */

function Section({
  step,
  title,
  subtitle,
  children,
  tone = "default",
}: {
  step: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  tone?: "default";
}) {
  return (
    <div className={`rounded-xl border bg-white p-5 shadow-sm ${tone === "default" ? "border-zinc-200" : "border-zinc-200"}`}>
      <div className="mb-4 flex items-baseline gap-3 border-b border-zinc-100 pb-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
          {step}
        </span>
        <div className="flex-1">
          <h2 className="text-base font-bold text-zinc-900">{title}</h2>
          {subtitle && <p className="text-xs text-zinc-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <div
        className={`mt-1 ${mono ? "font-mono" : ""} text-sm font-medium text-zinc-900`}
      >
        {value}
      </div>
    </div>
  );
}

function ChevronArrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
