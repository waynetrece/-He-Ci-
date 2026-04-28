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
  question: "訂單狀態與配送狀態是否分兩條 timeline？我們提供以下預設方案，請貴司確認名稱、順序、是否與 ERP / 物流同步：",
  context:
    "預設方案：\n● 訂單狀態：待確認 → 已成立 → 備貨中 → 已出貨 → 已完成；例外：已取消 / 退換貨處理中\n● 配送狀態：未出貨 → 已交物流 → 運送中 → 已送達；例外：配送異常\n\n請確認名稱與順序，以及是否要與凌越 ERP / 物流公司即時同步。",
  clientRef: {
    source: "前台 / 會員 (2) + 後台 / 訂單管理 (3)",
    quote: "訂單配送狀態；訂單出貨狀態",
    note: "需求表寫到「狀態」但未指定具體名稱、順序、與 ERP/物流的同步邏輯。",
  },
};

const Q2 = {
  no: "Q2",
  question: "「再訂一次」遇到公版商品 → 加購物車；遇到私版／客製商品 → 帶入規格重新詢價、還是轉 LINE 確認？",
  context:
    "目前畫面預設：① 公版商品（如 12oz 紙杯）按下「再訂一次」直接加入購物車 ② 私版／客製商品（如客製腰封）按下「再訂一次」會帶入上次規格到「我的詢價紀錄」並提示客戶重新確認，因為價格與規格可能變動。",
  clientRef: {
    source: "前台 / 會員 (1) + 私版商品系列 (1)(2)",
    quote: "查詢歷史訂單，可再購買一次按鈕；複雜客製商品轉 LINE 客服報價",
    note: "需求表寫了「可再購買一次按鈕」，但未細分公版／私版商品的處理方式。",
  },
};

const Q3 = {
  no: "Q3",
  question: "退換貨／取消訂單流程走線上系統還是 LINE？什麼狀態下不能取消（出貨後？已備貨？）？",
  context:
    "目前畫面預設：① 「待確認 / 已成立」狀態可線上取消 ② 「備貨中」需 LINE 客服協助 ③ 「已出貨」之後不能取消，只能走「退換貨」流程。退換貨是線上申請還是 LINE 處理待確認。",
  clientRef: {
    source: "後台 / 訂單管理 (7)",
    quote: "退換貨",
    note: "需求表只寫「退換貨」，未指定線上 vs LINE、可取消狀態。",
  },
};

const Q4 = {
  no: "Q4",
  question: "會員看到的歷史訂單，是只包含新網站成立後的訂單，還是要匯入 / 同步 ERP 既有歷史訂單？",
  context:
    "客戶可能期待「過去在 HJ 下過的訂單也能查」。如果要匯入，需確認資料範圍（過去 N 年？所有訂單？）、欄位是否完整、是否能執行「再訂一次」。",
  clientRef: {
    source: "後台 / 顧客管理 (1)",
    quote: "API 串接：網站客人需與原 ERP 客戶編號相同",
    note: "需求表只寫了客戶編號要對應，未指定歷史訂單是否要匯入。",
  },
};

/* ============== Icons ============== */

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CheckCircle({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.707 9.707-7 7a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L10 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414z" />
    </svg>
  );
}

function CircleEmpty({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function CircleActive({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill="white" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4l-9-5.19" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    </svg>
  );
}

/* ============== Data ============== */

const ORDER_STATUS_FLOW = [
  { key: "pending", label: "待確認" },
  { key: "confirmed", label: "已成立" },
  { key: "preparing", label: "備貨中" },
  { key: "shipped", label: "已出貨" },
  { key: "completed", label: "已完成" },
];

const DELIVERY_STATUS_FLOW = [
  { key: "not-shipped", label: "未出貨" },
  { key: "handed-over", label: "已交物流" },
  { key: "in-transit", label: "運送中" },
  { key: "delivered", label: "已送達" },
];

// 當前訂單狀態（demo 用：已出貨）
const CURRENT_ORDER_STAGE = 3; // shipped
const CURRENT_DELIVERY_STAGE = 2; // in-transit

const ORDER_ITEMS = [
  {
    type: "stock" as const,
    code: "PC-12-001",
    name: "12oz 公版瓦楞紙杯",
    spec: "白色 / 100% 食品級紙材",
    qty: 5000,
    unitPrice: 1.5,
  },
  {
    type: "custom" as const,
    code: "PC-CUS-LOGO",
    name: "12oz 客製印 LOGO 紙杯",
    spec: "雙面 / 全彩印刷 / 客戶 LOGO",
    qty: 3000,
    unitPrice: 1.85,
    note: "上次規格已存，再訂一次需重新確認",
  },
];

/* ============== Component ============== */

export function MemberOrderDetailMockup({
  annotations = false,
  pageId = "members-order-detail",
  orderId = "HJ-20260427-001",
}: {
  annotations?: boolean;
  pageId?: string;
  orderId?: string;
}) {
  const [reorderModal, setReorderModal] = useState<{
    open: boolean;
    type: "stock" | "custom" | null;
  }>({ open: false, type: null });

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const shipping = 200;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  return (
    <MockupShell url={`https://hjhj.com.tw/members/orders/${orderId}`}>
      <MockupSiteHeader />

      {/* Breadcrumb */}
      <section className="border-b border-zinc-200 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/members" className="hover:text-zinc-900">
            會員首頁
          </Link>
          <span className="mx-2 text-zinc-300">/</span>
          <Link href="/modules/members/orders" className="hover:text-zinc-900">
            歷史訂單
          </Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="font-mono font-semibold text-zinc-900">
            {orderId}
          </span>
        </div>
      </section>

      {/* Order header */}
      <section className="border-b border-zinc-200 bg-white px-6 py-6">
        <div className="mx-auto max-w-[1760px]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-mono text-xl font-bold text-zinc-900">
                  {orderId}
                </h1>
                <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                  已出貨 · 運送中
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-600">
                <span>下單日期：2026/04/27 14:32</span>
                <span>應送達：2026/04/29</span>
                <span>會員：禾啟餐飲（合作客戶 A 級）</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setReorderModal({ open: true, type: "stock" })}
                className="flex items-center gap-1.5 rounded-md bg-amber-700 px-4 py-2 text-sm font-bold text-white hover:bg-amber-800"
              >
                <RepeatIcon />
                再訂一次
              </button>
              <Questioned
                show={annotations}
                questions={[Q3]}
                pageId={pageId}
                position="top-right"
              >
                <button className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                  退換貨
                </button>
              </Questioned>
              <button className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                <TruckIcon />
                追蹤物流
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Two timelines side by side */}
      <section className="bg-zinc-50/40 px-6 py-8">
        <div className="mx-auto grid max-w-[1760px] gap-6 lg:grid-cols-2">
          {/* Order status timeline */}
          <Questioned
            show={annotations}
            questions={[Q1]}
            pageId={pageId}
            position="top-right"
          >
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <PackageIcon />
                <h2 className="text-base font-bold text-zinc-900">訂單狀態</h2>
              </div>
              <Timeline flow={ORDER_STATUS_FLOW} currentIdx={CURRENT_ORDER_STAGE} />
              <p className="mt-4 text-xs text-zinc-500">
                目前訂單已出貨，預計 2026/04/29 送達。
              </p>
            </div>
          </Questioned>

          {/* Delivery status timeline */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <TruckIcon />
              <h2 className="text-base font-bold text-zinc-900">配送狀態</h2>
              <span className="ml-auto rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 font-mono">
                黑貓 880123456789
              </span>
            </div>
            <Timeline
              flow={DELIVERY_STATUS_FLOW}
              currentIdx={CURRENT_DELIVERY_STAGE}
            />
            <p className="mt-4 text-xs text-zinc-500">
              貨物已從新北市配送中心出發，預計於 2026/04/29 上午送達您的指定地址。
            </p>
          </div>
        </div>
      </section>

      {/* Items + summary */}
      <section className="bg-white px-6 py-8">
        <div className="mx-auto grid max-w-[1760px] gap-6 lg:grid-cols-[1fr_400px]">
          {/* Items */}
          <div>
            <h2 className="mb-3 text-base font-bold text-zinc-900">商品明細</h2>
            <div className="space-y-3">
              {ORDER_ITEMS.map((item) => (
                <article
                  key={item.code}
                  className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-300 text-xs">
                      商品圖
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                                item.type === "stock"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-indigo-100 text-indigo-800"
                              }`}
                            >
                              {item.type === "stock" ? "公版" : "私版客製"}
                            </span>
                            <span className="font-mono text-xs text-zinc-400">
                              {item.code}
                            </span>
                          </div>
                          <h3 className="mt-1 text-base font-bold text-zinc-900">
                            {item.name}
                          </h3>
                          <p className="mt-0.5 text-sm text-zinc-500">
                            {item.spec}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-zinc-500">
                            單價 NT$ {item.unitPrice.toFixed(2)} × {item.qty.toLocaleString()}
                          </div>
                          <div className="mt-0.5 font-mono text-base font-bold text-zinc-900">
                            NT$ {(item.qty * item.unitPrice).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        {item === ORDER_ITEMS[0] ? (
                          <Questioned
                            show={annotations}
                            questions={[Q2]}
                            pageId={pageId}
                            position="top-right"
                          >
                            <button
                              onClick={() =>
                                setReorderModal({ open: true, type: item.type })
                              }
                              className="flex items-center gap-1.5 rounded-md bg-emerald-50 border border-emerald-300 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
                            >
                              <RepeatIcon />
                              再訂一次（公版直接加購物車）
                            </button>
                          </Questioned>
                        ) : (
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() =>
                                setReorderModal({ open: true, type: item.type })
                              }
                              className="flex items-center gap-1.5 rounded-md bg-indigo-50 border border-indigo-300 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
                            >
                              <RepeatIcon />
                              再訂一次（私版需重新確認規格）
                            </button>
                            {item.note && (
                              <span className="text-xs text-zinc-500">
                                ※ {item.note}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Address */}
            <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-sm font-bold text-zinc-900">收件資訊</h3>
              <div className="text-sm text-zinc-700 leading-relaxed">
                <div>禾啟餐飲（總店）</div>
                <div>陳先生 0912-345-678</div>
                <div className="text-zinc-600">
                  新北市五股區五權五路 10 號
                </div>
              </div>
            </div>

            {/* Origin source note */}
            <Questioned
              show={annotations}
              questions={[Q4]}
              pageId={pageId}
              position="top-left"
            >
              <div className="mt-4 rounded-md bg-zinc-50/60 px-4 py-3 text-xs text-zinc-500">
                訂單來源：HJ 網站系統 · 訂單編號與凌越 ERP 編號 <span className="font-mono">ERP-2604-031</span> 同步
              </div>
            </Questioned>
          </div>

          {/* Amount summary (sticky) */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-bold text-zinc-900 uppercase tracking-wider">
                金額明細
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-zinc-600">商品小計</span>
                  <span className="font-mono">
                    NT$ {subtotal.toLocaleString()}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-600">運費</span>
                  <span className="font-mono">
                    NT$ {shipping.toLocaleString()}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-600">營業稅 (5%)</span>
                  <span className="font-mono">NT$ {tax.toLocaleString()}</span>
                </li>
                <li className="flex justify-between border-t border-zinc-200 pt-2">
                  <span className="font-bold text-zinc-900">總計</span>
                  <span className="font-mono text-lg font-bold text-zinc-900">
                    NT$ {total.toLocaleString()}
                  </span>
                </li>
              </ul>

              <div className="mt-4 rounded-md bg-amber-50/60 p-3 text-xs text-amber-900">
                ※ 此價格已套用「合作客戶 A 級」合約價
              </div>
            </div>

            <Link
              href="/modules/members/orders"
              className="flex items-center justify-center gap-1.5 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              <ChevronRight />
              返回歷史訂單
            </Link>
          </aside>
        </div>
      </section>

      {/* Reorder modal */}
      {reorderModal.open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setReorderModal({ open: false, type: null })}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 text-center">
              {reorderModal.type === "stock" ? (
                <>
                  <CheckCircle className="mx-auto size-12 text-emerald-600" />
                  <h3 className="mt-3 text-lg font-bold text-zinc-900">
                    已加入購物車
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-600">
                    12oz 公版瓦楞紙杯 × 5,000 已加入購物車。
                  </p>
                  <p className="mt-3 text-xs text-zinc-400">
                    （Demo 用 — 購物車模組製作中，實際會跳到結帳頁）
                  </p>
                </>
              ) : (
                <>
                  <RepeatIcon />
                  <h3 className="mt-3 text-lg font-bold text-zinc-900">
                    規格已帶入詢價紀錄
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                    客製商品價格與規格可能變動，請至「我的詢價紀錄」確認規格後送出，HJ 客服將在 LINE 上回覆您新的報價。
                  </p>
                </>
              )}
              <div className="mt-5 flex justify-center gap-2">
                {reorderModal.type === "custom" && (
                  <Link
                    href="/modules/members/quote-list"
                    onClick={() => setReorderModal({ open: false, type: null })}
                    className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-bold text-white hover:bg-indigo-700"
                  >
                    前往詢價紀錄
                  </Link>
                )}
                <button
                  onClick={() =>
                    setReorderModal({ open: false, type: null })
                  }
                  className="rounded-md border border-zinc-300 bg-white px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <MockupSiteFooter />
    </MockupShell>
  );
}

/* ============== Timeline component ============== */

function Timeline({
  flow,
  currentIdx,
}: {
  flow: { key: string; label: string }[];
  currentIdx: number;
}) {
  return (
    <ol className="space-y-3">
      {flow.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <li key={step.key} className="flex items-center gap-3">
            <span
              className={`flex shrink-0 ${
                done
                  ? "text-emerald-600"
                  : active
                    ? "text-amber-600"
                    : "text-zinc-300"
              }`}
            >
              {done ? <CheckCircle /> : active ? <CircleActive /> : <CircleEmpty />}
            </span>
            <div className="flex-1">
              <div
                className={`font-medium ${
                  done
                    ? "text-zinc-700"
                    : active
                      ? "text-amber-900 font-bold"
                      : "text-zinc-400"
                }`}
              >
                {step.label}
              </div>
              {(done || active) && (
                <div className="text-xs text-zinc-500">
                  {i === 0 && "2026/04/27 14:32"}
                  {i === 1 && "2026/04/27 15:18"}
                  {i === 2 && "2026/04/28 09:45"}
                  {i === 3 && "2026/04/28 16:30"}
                  {i === 4 && active ? "預計 2026/04/29" : ""}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
