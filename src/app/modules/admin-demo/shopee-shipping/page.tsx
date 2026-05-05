"use client";

import Link from "next/link";
import { useState } from "react";

type ShippingOption = {
  id: string;
  name: string;
  defaultFee: number;
  customFee: number | null;
  enabled: boolean;
  note?: string;
};

export default function ShopeeShippingDemoPage() {
  const [overrideMode, setOverrideMode] = useState(true);
  const [options, setOptions] = useState<ShippingOption[]>([
    { id: "kerry", name: "嘉里大榮", defaultFee: 150, customFee: 200, enabled: true },
    { id: "tcat", name: "黑貓宅急便", defaultFee: 150, customFee: 220, enabled: true },
    { id: "post", name: "中華郵政", defaultFee: 100, customFee: 180, enabled: true },
    { id: "711", name: "7-11 取貨", defaultFee: 60, customFee: null, enabled: false, note: "超過超商尺寸限制(45×30×30)" },
    { id: "fami", name: "全家取貨", defaultFee: 60, customFee: null, enabled: false, note: "超過超商尺寸限制" },
    { id: "okmart", name: "OK Mart 取貨", defaultFee: 60, customFee: null, enabled: false, note: "超過超商尺寸限制" },
    { id: "hilife", name: "萊爾富取貨", defaultFee: 60, customFee: null, enabled: false, note: "超過超商尺寸限制" },
    { id: "self", name: "公司自取", defaultFee: 0, customFee: 0, enabled: true, note: "免運" },
  ]);

  const toggleEnabled = (id: string) => {
    setOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, enabled: !o.enabled } : o)),
    );
  };

  const updateFee = (id: string, value: string) => {
    setOptions((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, customFee: value === "" ? null : Number(value) } : o,
      ),
    );
  };

  return (
    <main className="min-h-dvh bg-zinc-100 text-zinc-900">
      {/* Top bar 模擬蝦皮風格 */}
      <header className="border-b border-orange-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="rounded bg-orange-500 px-2 py-1 font-bold text-white text-sm">SC</span>
            <span className="font-bold text-zinc-900">蝦皮賣家中心(範例 — 用來說明「個別商品運費另計」是什麼)</span>
          </div>
          <Link href="/" className="text-xs text-zinc-500 hover:text-orange-600">← 返回提案首頁</Link>
        </div>
      </header>

      {/* 說明區 */}
      <section className="border-b border-amber-200 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto max-w-[1400px] text-xs text-amber-900">
          <span className="font-bold">為什麼 HJ 要做這個?</span>
          <span className="ml-2">餐飲包材有些「整箱很重 / 體積大」的商品,超商寄不出去 / 宅配運費需要單獨計算。HJ 原始需求表寫:</span>
          <span className="ml-1 font-mono bg-white px-1.5 py-0.5 rounded border border-amber-300">「部分商品運費另計(如蝦皮後台商品頁)」</span>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-white border-b border-zinc-200 px-6 py-3">
        <div className="mx-auto max-w-[1400px] text-xs text-zinc-500">
          <span>我的商品</span>
          <span className="mx-2 text-zinc-300">/</span>
          <span>編輯商品</span>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="font-semibold text-zinc-900">12oz 公版瓦楞紙杯 ×1000 入</span>
        </div>
      </section>

      {/* Form sections */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-[1400px] space-y-4">
          {/* 商品基本資料 */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <header className="mb-4 flex items-center gap-2 border-b border-zinc-100 pb-3">
              <div className="size-1 rounded-full bg-orange-500" />
              <h2 className="text-base font-bold text-zinc-900">商品基本資料</h2>
              <span className="ml-auto rounded bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-500">DEMO 範例</span>
            </header>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Field label="商品名稱" value="12oz 公版瓦楞紙杯 ×1000 入" />
              <Field label="商品分類" value="紙杯 > 公版" />
              <Field label="售價" value="NT$ 1,200" />
              <Field label="庫存" value="50 箱" />
            </div>
          </div>

          {/* 商品材積 */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <header className="mb-4 flex items-center gap-2 border-b border-zinc-100 pb-3">
              <div className="size-1 rounded-full bg-orange-500" />
              <h2 className="text-base font-bold text-zinc-900">商品材積</h2>
            </header>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <Field label="重量(g)" value="5,000" />
              <Field label="長度(cm)" value="30" />
              <Field label="寬度(cm)" value="30" />
              <Field label="高度(cm)" value="25" />
            </div>
            <div className="mt-3 rounded-md border border-rose-200 bg-rose-50/60 px-3 py-2 text-xs text-rose-800">
              ⚠ 系統偵測:此商品材積 30×30×25 cm,**超過超商收件限制**(45×30×30,但需符合單邊+周長 105 cm 規定)
            </div>
          </div>

          {/* 物流設定 — 重點區塊 */}
          <div className="rounded-lg border-2 border-orange-300 bg-white p-6 shadow-sm">
            <header className="mb-4 flex items-center gap-2 border-b border-orange-100 pb-3">
              <div className="size-1 rounded-full bg-orange-500" />
              <h2 className="text-base font-bold text-orange-900">物流設定</h2>
              <span className="ml-2 rounded bg-orange-500 px-2 py-0.5 text-[11px] font-bold text-white">重點區塊</span>
            </header>

            {/* Mode selector */}
            <div className="mb-5 space-y-2">
              <label className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-3 cursor-pointer hover:bg-zinc-100">
                <input
                  type="radio"
                  checked={!overrideMode}
                  onChange={() => setOverrideMode(false)}
                  className="mt-1 accent-orange-600"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-zinc-900">套用全店預設運費規則</div>
                  <div className="text-xs text-zinc-500 mt-0.5">使用「賣場 → 物流設定」的全店預設(例如商品總價 ≥ NT$ 999 免運)</div>
                </div>
              </label>

              <label className="flex items-start gap-2 rounded-lg border-2 border-orange-400 bg-orange-50/40 p-3 cursor-pointer">
                <input
                  type="radio"
                  checked={overrideMode}
                  onChange={() => setOverrideMode(true)}
                  className="mt-1 accent-orange-600"
                />
                <div className="flex-1">
                  <div className="text-sm font-bold text-orange-900">此商品啟用特殊運費(覆寫全店規則)</div>
                  <div className="text-xs text-orange-800 mt-0.5">適用於整箱重貨、超大商品、限定區域配送等情境</div>
                </div>
              </label>
            </div>

            {/* Per-shipping options table */}
            {overrideMode && (
              <div className="overflow-hidden rounded-lg border border-zinc-200">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 text-xs text-zinc-500">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-medium w-1/3">物流方式</th>
                      <th className="px-4 py-2.5 text-center font-medium">啟用</th>
                      <th className="px-4 py-2.5 text-right font-medium">全店預設</th>
                      <th className="px-4 py-2.5 text-right font-medium">此商品專屬運費</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {options.map((o) => (
                      <tr key={o.id} className={o.enabled ? "" : "bg-zinc-50/60"}>
                        <td className="px-4 py-3">
                          <div className="font-medium text-zinc-900">{o.name}</div>
                          {o.note && (
                            <div className={`text-[11px] mt-0.5 ${o.enabled ? "text-emerald-700" : "text-rose-600"}`}>
                              {o.note}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => toggleEnabled(o.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              o.enabled ? "bg-emerald-500" : "bg-zinc-300"
                            }`}
                          >
                            <span
                              className={`inline-block size-4 transform rounded-full bg-white shadow transition ${
                                o.enabled ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-xs text-zinc-500">
                          NT$ {o.defaultFee}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {o.enabled ? (
                            <div className="inline-flex items-center gap-1">
                              <span className="text-xs text-zinc-400">NT$</span>
                              <input
                                type="number"
                                value={o.customFee ?? ""}
                                onChange={(e) => updateFee(o.id, e.target.value)}
                                placeholder={String(o.defaultFee)}
                                className={`w-20 rounded border px-2 py-1 text-right font-mono text-sm ${
                                  o.customFee !== null && o.customFee !== o.defaultFee
                                    ? "border-orange-400 bg-orange-50 text-orange-900 font-bold"
                                    : "border-zinc-300"
                                }`}
                              />
                            </div>
                          ) : (
                            <span className="text-xs text-zinc-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Hint */}
            <div className="mt-4 rounded-md border border-sky-200 bg-sky-50/60 p-3 text-xs text-sky-900">
              <div className="font-bold mb-1">💡 此 demo 反映的設計邏輯</div>
              <ul className="ml-4 space-y-0.5 list-disc">
                <li>每個物流方式都有獨立開關(可關掉某商品的某些物流)</li>
                <li>啟用的物流方式可單獨設定運費(覆寫全店預設)</li>
                <li>橘色高亮的金額 = 已覆寫預設(例:此款整箱紙杯宅配 $200,比預設 $150 多)</li>
                <li>系統偵測超商尺寸超過 → 自動建議關閉超商選項</li>
              </ul>
            </div>
          </div>

          {/* HJ 對應的設計建議 */}
          <div className="rounded-lg border border-emerald-300 bg-emerald-50/40 p-6 shadow-sm">
            <header className="mb-3 flex items-center gap-2">
              <div className="size-1 rounded-full bg-emerald-600" />
              <h2 className="text-base font-bold text-emerald-900">對應到 HJ 後台會長類似的樣子</h2>
            </header>
            <div className="text-sm text-zinc-700 space-y-2">
              <p>HJ 公版商品專區管理(報價單 #17, $160,000)裡的「部分商品運費另計設定(蝦皮模式)$10,000」就是做這一塊。</p>
              <p>HJ 場景:</p>
              <ul className="ml-4 space-y-1 list-disc text-xs">
                <li>1000 入瓦楞紙杯整箱 5kg → 超過超商限制,只開放黑貓 + 嘉里 + 自取</li>
                <li>500 入便當盒整箱大尺寸 → 宅配費 +$50,自取免運</li>
                <li>樣品(單個紙杯)→ 套用全店預設樣品運費 NT$100</li>
              </ul>
              <p className="text-xs text-emerald-700 mt-2">
                跟「運費管理 #23($40,000)」的全站運費規則互動 — 商品層級覆寫全店預設。
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-zinc-50 px-6 py-4">
        <div className="mx-auto max-w-[1400px] text-center text-xs text-zinc-400">
          蝦皮商品物流設定 demo — 此頁僅作為說明用,實際 HJ 後台會用馬亞既有後台介面包裝同邏輯
        </div>
      </footer>
    </main>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 rounded border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900">
        {value}
      </div>
    </div>
  );
}
