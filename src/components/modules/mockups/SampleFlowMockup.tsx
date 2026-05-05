"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

// 32 題 A 包已決議:
// - 限會員(需登入)
// - 樣品免費,僅收運費(固定金額,後台可調,不論幾件同價)
// - 不需後台審核,直接出貨
// - 樣品申請單獨立(不能跟一般訂單同包出貨)
// - 樣品入口 → 登入 → 選樣品(系統檢查 3/10/30 限制)→ 選配送 → 付運費 → 出貨

const SHIPPING_FEE = 80; // 固定樣品運費(後台可調)
const SAMPLE_LIMITS = { perRequest: 3, perMonth: 10, perYear: 30 };

type SampleItem = {
  code: string;
  name: string;
  spec: string;
  qty: number;
  bg: string;
};

const INITIAL_ITEMS: SampleItem[] = [
  { code: "PC-12-白", name: "公版冷熱共用杯 12oz 白色", spec: "12oz / 360cc · 食品紙 + PE", qty: 1, bg: "bg-amber-100" },
  { code: "PL-12", name: "12oz PLA 環保杯", spec: "12oz / 360cc · 可生物分解", qty: 1, bg: "bg-lime-100" },
];

type ShippingMethod = "home" | "store" | "pickup";

const STEPS = [
  { id: 1, label: "選擇樣品", short: "選樣品" },
  { id: 2, label: "填寫資料", short: "填資料" },
  { id: 3, label: "確認送出", short: "確認" },
  { id: 4, label: "申請完成", short: "完成" },
];

export function SampleFlowMockup({
  annotations: _annotations,
  pageId: _pageId,
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [step, setStep] = useState(2);
  const [items, setItems] = useState<SampleItem[]>(INITIAL_ITEMS);
  const [shipping, setShipping] = useState<ShippingMethod>("home");
  const [name, setName] = useState("陳老闆");
  const [phone, setPhone] = useState("0912-345-678");
  const [addr, setAddr] = useState("新北市五股區五權路 10 號 3 樓");
  const [purpose, setPurpose] = useState("");

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const overLimit = totalItems > SAMPLE_LIMITS.perRequest;
  const fee = shipping === "pickup" ? 0 : SHIPPING_FEE;

  return (
    <MockupShell url="https://hj.example.com/products/sample">
      <MockupSiteHeader />

      {/* Breadcrumb */}
      <div className="border-b border-zinc-100 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/home" className="hover:text-zinc-900">首頁</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <Link href="/modules/products" className="hover:text-zinc-900">公版商品</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="text-zinc-900">樣品申請</span>
        </div>
      </div>

      {/* Title */}
      <section className="border-b border-zinc-100 bg-white px-6 py-8">
        <div className="mx-auto max-w-[1760px]">
          <div className="flex items-baseline gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">樣品申請</h1>
            <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              限會員 · 樣品免費 + 收運費 NT$ {SHIPPING_FEE}
            </span>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-zinc-600">
            樣品申請單獨立流程,不可與公版商品同訂單。本月可申請 {SAMPLE_LIMITS.perMonth} 件、本年 {SAMPLE_LIMITS.perYear} 件、單次最多 {SAMPLE_LIMITS.perRequest} 件。
          </p>
        </div>
      </section>

      {/* Stepper */}
      <section className="border-b border-zinc-100 bg-white px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => {
              const done = step > s.id;
              const current = step === s.id;
              return (
                <div key={s.id} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={`flex size-9 items-center justify-center rounded-full text-sm font-bold ${
                      done ? "bg-emerald-500 text-white"
                        : current ? "bg-amber-500 text-white"
                        : "bg-zinc-200 text-zinc-500"
                    }`}>
                      {done ? "✓" : s.id}
                    </div>
                    <span className={`text-xs ${current ? "font-bold text-amber-700" : "text-zinc-600"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`mx-2 h-0.5 flex-1 ${done ? "bg-emerald-300" : "bg-zinc-200"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="bg-zinc-50/50 px-6 py-10">
        <div className="mx-auto grid max-w-[1760px] grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Step 1: items */}
            <section className={`rounded-xl border bg-white p-6 ${step === 1 ? "border-amber-400" : "border-zinc-200"}`}>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-zinc-900">1. 申請樣品(共 {totalItems} 件)</h2>
                {overLimit && (
                  <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-700">
                    ⚠ 已超過單次上限 {SAMPLE_LIMITS.perRequest} 件
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-3">
                {items.map((it) => (
                  <div key={it.code} className="flex items-center gap-4 rounded-lg border border-zinc-100 p-3">
                    <div className={`size-16 shrink-0 rounded-md ${it.bg}`} />
                    <div className="flex-1">
                      <div className="font-mono text-xs text-zinc-400">{it.code}</div>
                      <div className="text-sm font-bold text-zinc-900">{it.name}</div>
                      <div className="text-xs text-zinc-500">{it.spec}</div>
                    </div>
                    <div className="flex items-center rounded-md border border-zinc-300">
                      <button
                        onClick={() =>
                          setItems(items.map((i) => (i.code === it.code ? { ...i, qty: Math.max(1, i.qty - 1) } : i)))
                        }
                        className="px-2 py-1.5 text-zinc-500 hover:bg-zinc-100"
                      >
                        −
                      </button>
                      <span className="w-10 border-x border-zinc-300 py-1.5 text-center text-sm">{it.qty}</span>
                      <button
                        onClick={() =>
                          setItems(items.map((i) => (i.code === it.code ? { ...i, qty: i.qty + 1 } : i)))
                        }
                        className="px-2 py-1.5 text-zinc-500 hover:bg-zinc-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => setItems(items.filter((i) => i.code !== it.code))}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      移除
                    </button>
                  </div>
                ))}
              </div>

              <Link
                href="/modules/products"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 hover:underline"
              >
                + 加入更多樣品
              </Link>
            </section>

            {/* Step 2: form */}
            <section className={`rounded-xl border bg-white p-6 ${step === 2 ? "border-amber-400" : "border-zinc-200"}`}>
              <h2 className="text-base font-bold text-zinc-900">2. 收件資訊</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-zinc-700">收件人 *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-700">電話 *</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-zinc-700">收件地址 *</label>
                  <input value={addr} onChange={(e) => setAddr(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-zinc-700">用途說明(選填,協助業務了解需求)</label>
                  <textarea
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="例:咖啡廳新店開幕,試各款杯子手感"
                    className="mt-1 h-20 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-medium text-zinc-900">寄送方式</h3>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {([
                    { id: "home" as const, name: "宅配到府", desc: "黑貓 / 嘉里 1–3 工作天", fee: SHIPPING_FEE },
                    { id: "store" as const, name: "超商取貨", desc: "7-11 / 全家 2–4 工作天", fee: SHIPPING_FEE },
                    { id: "pickup" as const, name: "公司自取", desc: "新北五股 / 上班時段", fee: 0 },
                  ]).map((opt) => {
                    const active = shipping === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setShipping(opt.id)}
                        className={`rounded-lg border-2 p-4 text-left transition-colors ${
                          active ? "border-amber-500 bg-amber-50" : "border-zinc-200 hover:border-amber-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-bold text-zinc-900">{opt.name}</div>
                          <div className={`size-4 rounded-full border-2 ${active ? "border-amber-500" : "border-zinc-300"}`}>
                            {active && <div className="m-0.5 size-2 rounded-full bg-amber-500" />}
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">{opt.desc}</div>
                        <div className={`mt-2 text-xs font-medium ${opt.fee === 0 ? "text-emerald-700" : "text-amber-700"}`}>
                          {opt.fee === 0 ? "免運費" : `運費 NT$ ${opt.fee}`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Notice */}
            <section className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 text-xs text-amber-900">
              <div className="font-bold">申請須知</div>
              <ul className="mt-2 space-y-1 list-disc list-inside text-zinc-700">
                <li>樣品本身免費,需自付運費(NT$ {SHIPPING_FEE} 固定,自取免運)。</li>
                <li>單次最多申請 {SAMPLE_LIMITS.perRequest} 件,本月最多 {SAMPLE_LIMITS.perMonth} 件,本年最多 {SAMPLE_LIMITS.perYear} 件。</li>
                <li>送出後直接進出貨流程,3 個工作天內寄出(不需後台審核)。</li>
                <li>樣品申請單獨立流程,不可與一般訂單同包出貨。</li>
                <li>進度可至 <Link href="/modules/members/samples" className="underline font-medium">會員中心 / 樣品申請列表</Link> 查詢。</li>
              </ul>
            </section>
          </div>

          {/* Right: summary */}
          <aside className="self-start rounded-xl border border-zinc-200 bg-white p-6 sticky top-6">
            <h3 className="text-sm font-bold text-zinc-900">申請摘要</h3>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600">樣品數量</span>
                <span className={overLimit ? "text-rose-600 font-bold" : "text-zinc-900"}>
                  {totalItems} 件 {overLimit && `/ 上限 ${SAMPLE_LIMITS.perRequest}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">樣品費用</span>
                <span className="text-emerald-600 font-medium">免費</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">運費({shipping === "home" ? "宅配" : shipping === "store" ? "超商" : "自取"})</span>
                <span className={fee === 0 ? "text-emerald-600 font-medium" : "text-zinc-900"}>
                  {fee === 0 ? "免運" : `NT$ ${fee}`}
                </span>
              </div>
              <div className="my-2 h-px bg-zinc-100" />
              <div className="flex justify-between text-base font-bold">
                <span>應付金額</span>
                <span className="text-amber-700">NT$ {fee}</span>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-zinc-50 p-3 text-xs text-zinc-600">
              <div className="font-medium text-zinc-900">本年累計</div>
              <div className="mt-1">已申請 4 件 / 上限 {SAMPLE_LIMITS.perYear} 件</div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200">
                <div className="h-full bg-amber-400" style={{ width: `${(4 / SAMPLE_LIMITS.perYear) * 100}%` }} />
              </div>
            </div>

            <button
              disabled={overLimit || items.length === 0}
              onClick={() => setStep(4)}
              className={`mt-5 w-full rounded-lg py-3 text-sm font-bold text-white ${
                overLimit || items.length === 0
                  ? "bg-zinc-300 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-600"
              }`}
            >
              {overLimit ? "已超過件數上限" : items.length === 0 ? "請先選樣品" : "確認送出申請"}
            </button>
            <p className="mt-2 text-center text-[11px] text-zinc-500">
              送出後將直接出貨,不需後台審核
            </p>
          </aside>
        </div>

        {/* Step 4: success */}
        {step === 4 && (
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/60 p-8 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-emerald-900">樣品申請成功!</h3>
              <p className="mt-2 text-sm text-zinc-700">
                申請編號:<span className="font-mono font-bold">SP-2026-05-0042</span><br />
                我們會在 3 個工作天內寄出。
              </p>
              <div className="mt-5 flex justify-center gap-3">
                <Link href="/modules/members/samples" className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-white">
                  查看樣品申請紀錄
                </Link>
                <Link href="/modules/products" className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm text-zinc-700">
                  繼續逛公版商品
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <MockupSiteFooter />
    </MockupShell>
  );
}
