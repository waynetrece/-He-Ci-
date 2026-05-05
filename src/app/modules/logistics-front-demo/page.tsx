"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "@/components/modules/MockupShell";

type ScenarioId = "strips" | "box" | "island" | "sample";

type Scenario = {
  id: ScenarioId;
  name: string;
  tag: string;
  cartTitle: string;
  items: { name: string; spec: string; amount: number }[];
  destination: string;
  volume: string;
  weight: string;
  delivery: {
    home: "available" | "blocked" | "manual";
    store: "available" | "blocked" | "manual";
    pickup: "available" | "blocked" | "manual";
  };
  reason: string;
  shippingText: string;
};

const scenarios: Scenario[] = [
  {
    id: "strips",
    name: "條購符合超商",
    tag: "可超商",
    cartTitle: "條購商品小量訂購",
    items: [
      { name: "12oz 紙杯條購", spec: "條購 / 單條材積 0.8 才 / 2.2kg", amount: 520 },
      { name: "木質餐匙", spec: "條購 / 單條材積 0.3 才 / 0.8kg", amount: 240 },
    ],
    destination: "台北市信義區",
    volume: "1.1 才",
    weight: "3.0 kg",
    delivery: { home: "available", store: "available", pickup: "available" },
    reason: "條購商品加總未超過超商限制，因此可顯示超商取貨。",
    shippingText: "超商未達 $699，運費 $65；宅配未達 $2500，依材積級距計算。",
  },
  {
    id: "box",
    name: "箱購只能宅配",
    tag: "不開超商",
    cartTitle: "箱購 + 條購混合",
    items: [
      { name: "牛皮紙便當盒箱購", spec: "箱購 / 整箱材積 4.5 才 / 8kg", amount: 1980 },
      { name: "12oz 紙杯條購", spec: "條購 / 單條材積 0.8 才 / 2.2kg", amount: 520 },
    ],
    destination: "新北市板橋區",
    volume: "5.3 才",
    weight: "10.2 kg",
    delivery: { home: "available", store: "blocked", pickup: "available" },
    reason: "購物車含箱購商品，且加總材積 / 重量不適合超商，前台不顯示超商選項。",
    shippingText: "宅配金額達 $2500，免運；HJ 出貨時再填宅配公司與物流編號。",
  },
  {
    id: "island",
    name: "離島需客服確認",
    tag: "需客服",
    cartTitle: "離島地址訂單",
    items: [
      { name: "PLA 環保杯", spec: "箱購 / 整箱材積 3.2 才 / 6kg", amount: 1680 },
      { name: "餐具組", spec: "條購 / 單條材積 0.6 才 / 1kg", amount: 460 },
    ],
    destination: "澎湖縣馬公市",
    volume: "3.8 才",
    weight: "7.0 kg",
    delivery: { home: "manual", store: "blocked", pickup: "blocked" },
    reason: "HJ 回覆離島地區先提示聯絡客服，不讓客戶直接結帳。",
    shippingText: "此訂單需 HJ 確認配送方式與運費後再處理。",
  },
  {
    id: "sample",
    name: "樣品需分開處理",
    tag: "分流",
    cartTitle: "樣品 + 公版同時加入",
    items: [
      { name: "樣品：壽司盒", spec: "樣品 / 免費 / 最多 3 個", amount: 0 },
      { name: "塑膠便當盒條購", spec: "條購 / 單條材積 1.0 才 / 2kg", amount: 620 },
    ],
    destination: "台中市西屯區",
    volume: "待分開計算",
    weight: "待分開計算",
    delivery: { home: "manual", store: "manual", pickup: "manual" },
    reason: "HJ 已回覆樣品免費但需收運費，且不可與販售公版商品一起出貨。",
    shippingText: "前台應提示樣品申請與公版商品分開送出，避免同一張訂單混算運費。",
  },
];

const statusStyle = {
  available: {
    label: "可選",
    className: "border-zinc-900 bg-white text-zinc-950",
    button: "bg-zinc-900 text-white",
  },
  blocked: {
    label: "不可選",
    className: "border-zinc-200 bg-zinc-100 text-zinc-400",
    button: "bg-zinc-200 text-zinc-500",
  },
  manual: {
    label: "需確認",
    className: "border-amber-300 bg-amber-50 text-amber-900",
    button: "bg-amber-700 text-white",
  },
};

function DeliveryOption({
  title,
  desc,
  status,
}: {
  title: string;
  desc: string;
  status: "available" | "blocked" | "manual";
}) {
  const style = statusStyle[status];
  return (
    <div className={`rounded-md border-2 p-4 ${style.className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-bold">{title}</div>
          <div className="mt-1 text-xs leading-5">{desc}</div>
        </div>
        <span className="shrink-0 rounded-full bg-white/70 px-2 py-0.5 text-xs font-bold">
          {style.label}
        </span>
      </div>
      <button className={`mt-4 w-full rounded-md px-3 py-2 text-sm font-bold ${style.button}`}>
        {status === "available" ? "選擇此方式" : status === "blocked" ? "此訂單不適用" : "聯絡客服確認"}
      </button>
    </div>
  );
}

function RuleRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-zinc-100 py-2 text-sm last:border-0">
      <span className="text-zinc-500">{label}</span>
      <span className="font-bold text-zinc-900">{value}</span>
    </div>
  );
}

export default function LogisticsFrontDemoPage() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("box");
  const scenario = useMemo(
    () => scenarios.find((item) => item.id === scenarioId) ?? scenarios[0],
    [scenarioId],
  );
  const subtotal = scenario.items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <section className="border-b border-zinc-300 bg-white px-6 py-6">
        <div className="mx-auto max-w-[1760px]">
          <nav className="mb-3 flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-900">首頁</Link>
            <span>/</span>
            <Link href="/modules/logistics-automation" className="hover:text-zinc-900">
              物流理解頁
            </Link>
            <span>/</span>
            <span className="font-medium text-zinc-900">前台配送選擇示意</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex rounded-md border border-emerald-500 bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800">
                內部理解用前台畫面
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950">
                HJ 第一版適合的配送選擇畫面
              </h1>
              <p className="mt-3 max-w-5xl text-base leading-7 text-zinc-600">
                這頁示意客戶在結帳前看到的畫面。網站先依箱購 / 條購 / 材積 /
                重量 / 地址判斷可用配送方式；物流串接只負責後續選店、建單或追蹤，
                不代表完整自動化。
              </p>
            </div>
            <div className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-700">
              <div className="font-bold text-zinc-950">先釐清</div>
              串物流可以只是「選門市 / 建超商單 / 產物流編號」；完整自動化才包含
              自動拆件、多家宅配自動建單、完整貨態同步。
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-4">
        <div className="mx-auto flex max-w-[1760px] flex-wrap gap-2">
          {scenarios.map((item) => {
            const active = item.id === scenarioId;
            return (
              <button
                key={item.id}
                onClick={() => setScenarioId(item.id)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                  active
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-900"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[1760px]">
          <MockupShell url="https://hjhj.com.tw/checkout/delivery">
            <MockupSiteHeader />
            <section className="border-b border-zinc-200 bg-zinc-50 px-6 py-4">
              <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-zinc-500">購物車 / 配送方式</div>
                  <h2 className="mt-1 text-2xl font-black text-zinc-950">
                    選擇配送方式
                  </h2>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-900">
                  {scenario.tag}
                </span>
              </div>
            </section>

            <section className="px-6 py-8">
              <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[1fr_380px]">
                <div className="space-y-5">
                  <div className="rounded-lg border border-zinc-200 bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-black text-zinc-950">
                          {scenario.cartTitle}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-600">
                          收件地區：{scenario.destination}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-zinc-500">商品小計</div>
                        <div className="text-xl font-black text-zinc-950">
                          NT$ {subtotal.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 divide-y divide-zinc-100">
                      {scenario.items.map((item) => (
                        <div key={item.name} className="flex items-center justify-between gap-4 py-3">
                          <div>
                            <div className="font-bold text-zinc-900">{item.name}</div>
                            <div className="mt-1 text-sm text-zinc-500">{item.spec}</div>
                          </div>
                          <div className="font-bold text-zinc-900">
                            NT$ {item.amount.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-zinc-200 bg-white p-5">
                    <div className="mb-4">
                      <h3 className="text-lg font-black text-zinc-950">
                        系統已先檢查商品與配送限制
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-600">
                        {scenario.reason}
                      </p>
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                      <DeliveryOption
                        title="宅配"
                        desc="HJ 出貨時填宅配公司與物流編號，可單筆或 Excel 批次更新。"
                        status={scenario.delivery.home}
                      />
                      <DeliveryOption
                        title="超商取貨"
                        desc="符合超商尺寸 / 重量時才顯示；若串綠界可接選店與寄件單。"
                        status={scenario.delivery.store}
                      />
                      <DeliveryOption
                        title="自取"
                        desc="客戶到 HJ 指定倉庫取貨，由 HJ 通知可取貨時間。"
                        status={scenario.delivery.pickup}
                      />
                    </div>
                    <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
                      {scenario.shippingText}
                    </div>
                  </div>
                </div>

                <aside className="space-y-4">
                  <div className="rounded-lg border border-zinc-200 bg-white p-5">
                    <h3 className="text-base font-black text-zinc-950">本次配送檢查</h3>
                    <div className="mt-3">
                      <RuleRow label="加總材積" value={scenario.volume} />
                      <RuleRow label="加總重量" value={scenario.weight} />
                      <RuleRow label="地址" value={scenario.destination} />
                      <RuleRow label="超商限制" value="45 x 30 x 30 cm / 5kg" />
                    </div>
                  </div>
                  <div className="rounded-lg border border-zinc-200 bg-white p-5">
                    <h3 className="text-base font-black text-zinc-950">
                      串物流在這裡做什麼？
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
                      <li>1. 超商：可接選店、建立寄件單、列印寄件單。</li>
                      <li>2. 宅配：若第一版不串多家宅配，先由 HJ 填公司與編號。</li>
                      <li>3. 貨態：可先用人工狀態 + 追蹤連結。</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-zinc-900 bg-zinc-900 p-5 text-white">
                    <h3 className="text-base font-black">這不算完整自動化</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-200">
                      因為系統沒有自動拆件、沒有自動選宅配公司、也沒有完整貨態回寫。
                      它是「前台基本判斷 + 部分物流串接 + HJ 人工出貨」。
                    </p>
                  </div>
                </aside>
              </div>
            </section>
            <MockupSiteFooter />
          </MockupShell>
        </div>
      </section>
    </main>
  );
}
