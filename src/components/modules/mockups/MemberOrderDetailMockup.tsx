"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

// 32 題 review 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 訂單狀態 6 個 + 已退款 = 7 個(B 包 / E 包)
// - 配送狀態與訂單狀態合一(B 包 Q-B2)— 不分兩條進度列
// - 物流追蹤連結 = 系統依物流商產生查詢頁連結模板(B 包 Q-B3)
// - 已出貨後 7 天系統自動轉「已完成」(B 包)
// - 退換貨走客服(LINE / 電話)— 不開放線上自助申請(E 包 Q-E2)
// - 信用卡退款 → 客服在後台呼叫綠界退刷 API(default 自動)
// - 匯款退款 → 客服記錄,通知會計手動退回
// - 凌越同步:訂單付款完成才進凌越;取消改狀態為「已取消」(E 包 Q-E14)
// - 凌越歷史訂單 default 近 2 年(C 包 Q-C3)

type OrderStatus = "unpaid" | "paid" | "preparing" | "shipped" | "completed" | "cancelled" | "refunded";

const STATUS_META: Record<OrderStatus, { label: string; cls: string; dot: string }> = {
  unpaid: { label: "待付款", cls: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
  paid: { label: "已付款", cls: "bg-sky-100 text-sky-800", dot: "bg-sky-500" },
  preparing: { label: "備貨中", cls: "bg-violet-100 text-violet-800", dot: "bg-violet-500" },
  shipped: { label: "已出貨", cls: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  completed: { label: "已完成", cls: "bg-zinc-200 text-zinc-700", dot: "bg-zinc-500" },
  cancelled: { label: "已取消", cls: "bg-rose-100 text-rose-700", dot: "bg-rose-500" },
  refunded: { label: "已退款", cls: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
};

// 標準時間軸節點(已取消 / 已退款 是分支,單獨顯示)
const TIMELINE_STATUSES: OrderStatus[] = ["unpaid", "paid", "preparing", "shipped", "completed"];

const ORDER = {
  id: "HJ-2026-0505-0042",
  date: "2026/05/05 14:32",
  type: "公版" as const,
  source: "site" as const,
  paymentMethod: "credit" as "credit" | "transfer" | "cod",
  paidAt: "2026/05/05 14:32",
  shippingMethod: "home" as "home" | "store",
  shippingCarrier: "黑貓宅配",
  shippingTracking: "T20260505009842",
  shippedAt: "2026/05/06 11:20",
  estimatedDelivery: "2026/05/07–05/08",
  recipient: "陳老闆",
  phone: "0912-345-678",
  address: "新北市五股區五權路 10 號 3 樓",
  invoice: "三聯式 / 統編 12345678 / 禾啟股份有限公司",
  items: [
    { code: "PC-12-白", name: "12oz 公版瓦楞紙杯(白)", spec: "12oz / 360cc", qty: 2, unit: "箱", piecesPerUnit: 1000, unitPrice: 2.0, bg: "bg-amber-100" },
    { code: "PC-08-白", name: "8oz 公版瓦楞紙杯(白)", spec: "8oz / 240cc", qty: 5, unit: "條", piecesPerUnit: 50, unitPrice: 1.5, bg: "bg-amber-100" },
    { code: "LD-90-白", name: "90mm 平蓋(加購)", spec: "適配 8/12oz 杯", qty: 5, unit: "條", piecesPerUnit: 50, unitPrice: 1.0, bg: "bg-zinc-100" },
  ],
  subtotal: 4625,
  shipFee: 0,
  tax: 231,
  total: 4856,
  syncedToLyserp: true,
  syncTime: "2026/05/05 14:32:18",
};

export function MemberOrderDetailMockup({
  annotations: _annotations,
  pageId: _pageId,
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [demoStatus, setDemoStatus] = useState<OrderStatus>("shipped");
  const [refundOpen, setRefundOpen] = useState(false);

  const meta = STATUS_META[demoStatus];
  const isOnTimeline = TIMELINE_STATUSES.includes(demoStatus);
  const currentStepIndex = TIMELINE_STATUSES.indexOf(demoStatus);

  // 不同狀態的可用動作
  const actions: { label: string; href?: string; onClick?: () => void; primary?: boolean; danger?: boolean }[] = [];
  if (demoStatus === "unpaid") {
    actions.push({ label: "完成付款", href: "/modules/checkout/payment", primary: true });
    actions.push({ label: "取消訂單", danger: true });
  } else if (demoStatus === "paid" || demoStatus === "preparing") {
    actions.push({ label: "申請取消(客服處理)", onClick: () => setRefundOpen(true), danger: true });
  } else if (demoStatus === "shipped") {
    actions.push({ label: "查詢運送狀態", primary: true });
    actions.push({ label: "申請退換貨(客服處理)", onClick: () => setRefundOpen(true) });
  } else if (demoStatus === "completed") {
    if (ORDER.type === "公版") {
      actions.push({ label: "再訂一次", href: "/modules/cart", primary: true });
    }
    actions.push({ label: "申請退換貨(客服處理)", onClick: () => setRefundOpen(true) });
  }

  return (
    <MockupShell url={`https://hj.example.com/member/orders/${ORDER.id}`}>
      <MockupSiteHeader />

      {/* Demo state toggle */}
      <div className="border-b-2 border-dashed border-amber-300 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-amber-700 px-2 py-0.5 font-bold text-white">預覽切換</span>
          <span className="text-zinc-700">訂單狀態:</span>
          {(Object.entries(STATUS_META) as [OrderStatus, typeof STATUS_META[OrderStatus]][]).map(([key, m]) => (
            <button
              key={key}
              onClick={() => setDemoStatus(key)}
              className={`rounded-full px-2.5 py-0.5 ${demoStatus === key ? `${m.cls} font-bold ring-2 ring-amber-400` : `${m.cls} hover:opacity-80`}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-zinc-50 px-6 py-8">
        <div className="mx-auto max-w-[1760px] grid grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="rounded-xl border border-zinc-200 bg-white p-5 self-start">
            <div className="mb-4 flex items-center gap-3 border-b border-zinc-100 pb-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">陳</div>
              <div>
                <div className="text-sm font-bold text-zinc-900">陳老闆</div>
                <div className="text-xs text-zinc-500">北部直客 · VIP</div>
              </div>
            </div>
            <nav className="space-y-1 text-sm">
              {[
                { l: "會員儀表板", h: "/modules/members" },
                { l: "訂單列表", h: "/modules/members/orders", active: true },
                { l: "詢價單", h: "/modules/members/quote-list" },
                { l: "樣品申請", h: "/modules/members/samples" },
                { l: "收件地址簿", h: "/modules/members/addresses" },
                { l: "個人資料", h: "/modules/members/settings" },
              ].map((n) => (
                <Link key={n.l} href={n.h} className={`block rounded px-3 py-2 ${n.active ? "bg-amber-50 font-medium text-amber-700" : "text-zinc-700 hover:bg-zinc-50"}`}>
                  {n.l}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Body */}
          <div className="col-span-3 space-y-5">
            {/* Header */}
            <section className="rounded-xl border border-zinc-200 bg-white p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <Link href="/modules/members/orders" className="text-xs text-zinc-500 hover:text-amber-700">
                  ← 返回訂單列表
                </Link>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  下單時間 <span className="font-mono text-zinc-700">{ORDER.date}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-baseline gap-3">
                <h1 className="font-mono text-2xl font-bold text-zinc-900">{ORDER.id}</h1>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${meta.cls}`}>
                  <span className={`size-2 rounded-full ${meta.dot}`} />
                  {meta.label}
                </span>
                <span className={`rounded-full border px-2 py-0.5 text-xs ${ORDER.type === "公版" ? "border-amber-300 text-amber-700" : "border-violet-300 text-violet-700"}`}>
                  {ORDER.type}
                </span>
              </div>

              {/* Action buttons */}
              {actions.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {actions.map((a, i) => (
                    a.href ? (
                      <Link
                        key={i}
                        href={a.href}
                        className={`rounded-md px-5 py-2 text-sm font-medium ${
                          a.primary ? "bg-amber-600 text-white hover:bg-amber-700"
                            : a.danger ? "border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100"
                            : "border border-zinc-300 bg-white text-zinc-700 hover:border-amber-400"
                        }`}
                      >
                        {a.label}
                      </Link>
                    ) : (
                      <button
                        key={i}
                        onClick={a.onClick}
                        className={`rounded-md px-5 py-2 text-sm font-medium ${
                          a.primary ? "bg-amber-600 text-white hover:bg-amber-700"
                            : a.danger ? "border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100"
                            : "border border-zinc-300 bg-white text-zinc-700 hover:border-amber-400"
                        }`}
                      >
                        {a.label}
                      </button>
                    )
                  ))}
                </div>
              )}
            </section>

            {/* Status Timeline */}
            <section className="rounded-xl border border-zinc-200 bg-white p-6">
              <h2 className="text-base font-bold text-zinc-900">訂單狀態</h2>
              {isOnTimeline ? (
                <div className="mt-5 flex items-start justify-between">
                  {TIMELINE_STATUSES.map((s, i) => {
                    const m = STATUS_META[s];
                    const done = i < currentStepIndex;
                    const current = i === currentStepIndex;
                    return (
                      <div key={s} className="flex flex-1 flex-col items-center">
                        <div className="flex w-full items-center">
                          {i > 0 && <div className={`h-1 flex-1 ${done || current ? "bg-amber-400" : "bg-zinc-200"}`} />}
                          <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                            done ? "bg-emerald-500 text-white"
                              : current ? `${m.dot} ring-4 ring-amber-200 text-white`
                              : "bg-zinc-200 text-zinc-500"
                          }`}>
                            {done ? "✓" : i + 1}
                          </div>
                          {i < TIMELINE_STATUSES.length - 1 && <div className={`h-1 flex-1 ${done ? "bg-amber-400" : "bg-zinc-200"}`} />}
                        </div>
                        <div className={`mt-2 text-xs ${current ? "font-bold text-amber-700" : done ? "text-emerald-700" : "text-zinc-500"}`}>
                          {m.label}
                        </div>
                        {current && demoStatus === "shipped" && (
                          <div className="mt-1 text-[10px] text-zinc-500">{ORDER.shippedAt} 出貨</div>
                        )}
                        {current && demoStatus === "paid" && (
                          <div className="mt-1 text-[10px] text-zinc-500">{ORDER.paidAt} 付款完成</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-3 rounded-lg bg-zinc-50 p-4 text-sm text-zinc-700">
                  此訂單已 <strong>{meta.label}</strong>,不在標準出貨時間軸上。
                  {demoStatus === "cancelled" && "(已通知凌越改狀態為已取消)"}
                  {demoStatus === "refunded" && "(信用卡已透過綠界退刷,款項 3–7 工作天退回)"}
                </div>
              )}
            </section>

            {/* Shipping tracking (only when shipped) */}
            {demoStatus === "shipped" && (
              <section className="rounded-xl border-2 border-emerald-300 bg-emerald-50/60 p-6">
                <h2 className="text-base font-bold text-emerald-900">物流資訊</h2>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <dt className="text-zinc-600">物流商</dt>
                  <dd className="text-zinc-900">{ORDER.shippingCarrier}</dd>
                  <dt className="text-zinc-600">物流單號</dt>
                  <dd className="font-mono text-zinc-900">{ORDER.shippingTracking}</dd>
                  <dt className="text-zinc-600">出貨時間</dt>
                  <dd className="text-zinc-900">{ORDER.shippedAt}</dd>
                  <dt className="text-zinc-600">預計送達</dt>
                  <dd className="text-zinc-900">{ORDER.estimatedDelivery}</dd>
                </dl>
                <a
                  href="https://www.hct.com.tw"
                  target="_blank"
                  rel="noopener"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  查詢運送狀態 →
                </a>
                <p className="mt-2 text-xs text-emerald-800">
                  系統依物流商產生查詢連結模板,點擊會跳轉到物流商官網。HJ 不串物流 API,以連結方式提供查詢。
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  已出貨 7 天後系統會自動將訂單轉為「已完成」(因不串 API 無法判定真實送達時間)。
                </p>
              </section>
            )}

            {/* Items */}
            <section className="rounded-xl border border-zinc-200 bg-white p-6">
              <h2 className="text-base font-bold text-zinc-900">商品明細</h2>
              <div className="mt-4 divide-y divide-zinc-100">
                {ORDER.items.map((it) => {
                  const lineTotal = it.unitPrice * it.qty * it.piecesPerUnit;
                  return (
                    <div key={it.code} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                      <div className={`size-16 shrink-0 rounded ${it.bg}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-xs text-zinc-400">{it.code}</div>
                        <Link href="/modules/products/detail" className="block text-sm font-bold text-zinc-900 hover:text-amber-700">
                          {it.name}
                        </Link>
                        <div className="text-xs text-zinc-500">{it.spec} · {it.piecesPerUnit} 入/{it.unit}</div>
                      </div>
                      <div className="text-sm text-zinc-700">
                        {it.qty} {it.unit}
                        <span className="ml-2 text-xs text-zinc-400">× NT$ {it.unitPrice}</span>
                      </div>
                      <div className="w-24 text-right text-sm font-bold text-zinc-900">
                        NT$ {lineTotal.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
              <dl className="mt-4 space-y-1.5 border-t border-zinc-100 pt-4 text-sm">
                <div className="flex justify-between"><dt className="text-zinc-600">商品小計</dt><dd>NT$ {ORDER.subtotal.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-600">運費(宅配 / 純箱免運)</dt><dd className="text-emerald-600 font-medium">免運</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-600">稅金(5%)</dt><dd>NT$ {ORDER.tax.toLocaleString()}</dd></div>
                <div className="my-2 h-px bg-zinc-100" />
                <div className="flex justify-between text-base font-bold"><dt>總計</dt><dd className="text-amber-700">NT$ {ORDER.total.toLocaleString()}</dd></div>
              </dl>
            </section>

            {/* Recipient + Payment + Invoice */}
            <div className="grid grid-cols-2 gap-5">
              <section className="rounded-xl border border-zinc-200 bg-white p-6">
                <h2 className="text-sm font-bold text-zinc-900">收件資訊</h2>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div className="flex"><dt className="w-20 text-zinc-500">收件人</dt><dd>{ORDER.recipient}</dd></div>
                  <div className="flex"><dt className="w-20 text-zinc-500">電話</dt><dd>{ORDER.phone}</dd></div>
                  <div className="flex"><dt className="w-20 text-zinc-500">配送方式</dt><dd>{ORDER.shippingMethod === "home" ? "宅配" : "超商取貨"}</dd></div>
                  <div className="flex"><dt className="w-20 text-zinc-500">地址</dt><dd className="flex-1">{ORDER.address}</dd></div>
                </dl>
              </section>

              <section className="rounded-xl border border-zinc-200 bg-white p-6">
                <h2 className="text-sm font-bold text-zinc-900">付款 + 發票</h2>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div className="flex"><dt className="w-20 text-zinc-500">付款方式</dt><dd>{ORDER.paymentMethod === "credit" ? "信用卡(綠界)" : ORDER.paymentMethod === "transfer" ? "一般匯款" : "貨到付款"}</dd></div>
                  <div className="flex"><dt className="w-20 text-zinc-500">付款時間</dt><dd>{ORDER.paidAt}</dd></div>
                  <div className="flex"><dt className="w-20 text-zinc-500">發票</dt><dd className="flex-1">{ORDER.invoice}</dd></div>
                  <div className="flex"><dt className="w-20 text-zinc-500">凌越同步</dt><dd>
                    {ORDER.syncedToLyserp ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        ✓ 已同步 {ORDER.syncTime}
                      </span>
                    ) : (
                      <span className="text-zinc-500">未同步</span>
                    )}
                  </dd></div>
                </dl>
              </section>
            </div>

            {/* Customer service */}
            <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-zinc-900">需要協助?</div>
                  <p className="mt-0.5 text-xs text-zinc-600">取消訂單、退換貨、發票問題等請聯繫客服(LINE / 電話)。</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md bg-emerald-600 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-700">LINE 客服</button>
                  <a href="tel:0222993456" className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-xs font-medium text-zinc-700 hover:border-amber-400">02-2299-3456</a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Refund modal */}
      {refundOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6" onClick={() => setRefundOpen(false)}>
          <div className="max-w-lg rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-zinc-900">退換貨流程說明</h3>
            <div className="mt-4 space-y-3 text-sm text-zinc-700">
              <p>退換貨需透過客服處理(無法線上自助申請),請點擊下方按鈕聯繫客服,並提供:</p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600 text-xs">
                <li>訂單編號:<span className="font-mono font-bold text-zinc-900">{ORDER.id}</span></li>
                <li>退換貨原因(瑕疵 / 數量錯 / 不適用等)</li>
                <li>瑕疵照片(若有)</li>
              </ul>
              <div className="rounded-lg bg-zinc-50 p-3 text-xs text-zinc-700">
                <div className="font-bold mb-1">退款方式(由客服在後台處理)</div>
                <ul className="space-y-0.5">
                  <li>• 信用卡 → 透過綠界退刷,3–7 工作天退回</li>
                  <li>• 匯款 → 通知會計手動退回,5–10 工作天</li>
                </ul>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setRefundOpen(false)} className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700">取消</button>
              <button className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">LINE 聯繫客服 →</button>
            </div>
          </div>
        </div>
      )}

      <MockupSiteFooter />
    </MockupShell>
  );
}
