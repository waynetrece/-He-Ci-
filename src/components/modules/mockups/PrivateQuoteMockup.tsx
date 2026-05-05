"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

// 32 題 review A 包已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 公版/私版規格機制統一,以「私版方式」為主(Q-A4)
// - HJ 後台勾選要開放的客製規格(Q-A4 + Q-A7,具體欄位 HJ 之後提供)
// - 同頁切換規格選擇器
// - 私版細節溝通、檔案傳遞、下單確認 全部走 LINE
// - 上傳檔案按鈕直接跳 LINE
// - 提交後成立「私版詢價單」(獨立於一般訂單)
// - 業務後台處理 → LINE 報價 → 客戶確認 → 私下匯款訂金 → 業務後台轉訂單

type Spec = {
  key: string;
  label: string;
  options: string[];
  helper?: string;
};

const SPECS: Spec[] = [
  { key: "size", label: "容量", options: ["8oz", "12oz", "16oz", "22oz"] },
  { key: "material", label: "材質", options: ["食品紙 + PE 淋膜", "PLA 環保(可分解)", "雙層中空隔熱"], helper: "影響成本與適用場景" },
  { key: "color", label: "杯身底色", options: ["白色", "牛皮紙原色", "黑色", "客製 Pantone"], helper: "客製色號需另收打樣費" },
  { key: "printSide", label: "印刷面", options: ["不印刷", "單面", "雙面(全周)"] },
  { key: "printColor", label: "印刷色數", options: ["單色(黑/白)", "雙色", "全彩 CMYK", "燙金/特殊色"], helper: "色數越多單價越高" },
  { key: "lid", label: "搭配杯蓋", options: ["不需要", "平蓋", "拱蓋", "兩種都要"] },
];

export function PrivateQuoteMockup({
  annotations: _annotations,
  pageId: _pageId,
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [selected, setSelected] = useState<Record<string, string>>({
    size: "12oz",
    material: "食品紙 + PE 淋膜",
    color: "白色",
    printSide: "單面",
    printColor: "全彩 CMYK",
    lid: "平蓋",
  });
  const [qty, setQty] = useState(5000);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lineId, setLineId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [note, setNote] = useState("");
  const [step, setStep] = useState<"form" | "submitted">("form");

  const minQty = 1000;
  const qtyTooLow = qty < minQty;
  const canSubmit = qty >= minQty && name && phone && (email || lineId);

  return (
    <MockupShell url="https://hj.example.com/private-quote/quote-form">
      <MockupSiteHeader />

      <div className="border-b border-zinc-100 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/home" className="hover:text-zinc-900">首頁</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <Link href="/modules/private-quote" className="hover:text-zinc-900">私版客製</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="text-zinc-900">客製紙杯詢價單</span>
        </div>
      </div>

      {step === "submitted" ? (
        <section className="bg-zinc-50 px-6 py-16">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/60 p-8 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="mt-5 text-2xl font-bold text-emerald-900">詢價單成立!</h2>
              <p className="mt-3 text-sm text-zinc-700">
                詢價單編號:<span className="font-mono font-bold text-zinc-900">PQ-2026-0505-0073</span>
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                業務專員會在 1 個工作天內透過 LINE 與您聯繫,確認規格 / 報價 / 交期。
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-300 bg-white p-6">
              <h3 className="text-base font-bold text-zinc-900">下一步:加 LINE 上傳設計檔</h3>
              <p className="mt-2 text-sm text-zinc-600">
                印刷的原始檔(AI / PDF / PSD)請透過 LINE 傳給業務,大檔案可附雲端連結。
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="size-32 rounded-lg bg-zinc-100 flex items-center justify-center">
                  <span className="text-xs text-zinc-400">[QR Code]</span>
                </div>
                <div className="flex-1 text-sm">
                  <div className="font-bold text-zinc-900">禾啟客服 LINE</div>
                  <div className="text-zinc-500">@hjhjtw</div>
                  <button className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-bold text-white hover:bg-emerald-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zM12 .572C5.385.572 0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314c0-5.371-5.385-9.742-12-9.742z" />
                    </svg>
                    開啟 LINE
                  </button>
                </div>
              </div>
              <p className="mt-3 text-xs text-emerald-800">
                點擊 LINE 按鈕會自動帶詢價單編號 <span className="font-mono">PQ-2026-0505-0073</span>,業務可立即比對。
              </p>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <Link href="/modules/members/quote-list" className="rounded-md bg-amber-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-700">
                查看詢價紀錄
              </Link>
              <button onClick={() => setStep("form")} className="rounded-md border border-zinc-300 bg-white px-5 py-2.5 text-sm text-zinc-700 hover:border-amber-400">
                再填一份新詢價單
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="bg-zinc-50 px-6 py-8">
          <div className="mx-auto max-w-[1760px]">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">客製紙杯詢價單</h1>
              <p className="mt-2 text-sm text-zinc-600">
                填寫下方規格與聯絡資訊,送出後業務專員會透過 LINE 與您聯繫報價。最低 1,000 件起製。
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs text-violet-800">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                規格選項由 HJ 後台勾選提供。本頁示範常見項目;實際開放欄位以 HJ 設定為準。
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
              <div className="space-y-5">
                <section className="rounded-xl border border-zinc-200 bg-white p-6">
                  <h2 className="text-base font-bold text-zinc-900">1. 客製規格</h2>
                  <p className="mt-1 text-xs text-zinc-500">同頁切換,規格機制與公版統一</p>

                  <div className="mt-5 space-y-5">
                    {SPECS.map((spec) => (
                      <div key={spec.key}>
                        <div className="flex items-baseline justify-between">
                          <label className="text-sm font-medium text-zinc-900">{spec.label}</label>
                          <span className="text-xs text-zinc-500">已選: <span className="font-bold text-violet-700">{selected[spec.key]}</span></span>
                        </div>
                        {spec.helper && <div className="mt-1 text-xs text-zinc-500">{spec.helper}</div>}
                        <div className="mt-2 flex flex-wrap gap-2">
                          {spec.options.map((opt) => {
                            const active = selected[spec.key] === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => setSelected({ ...selected, [spec.key]: opt })}
                                className={`rounded-lg border-2 px-4 py-1.5 text-sm transition-colors ${
                                  active ? "border-violet-500 bg-violet-50 font-bold text-violet-800" : "border-zinc-300 bg-white text-zinc-700 hover:border-violet-300"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-xl border border-zinc-200 bg-white p-6">
                  <h2 className="text-base font-bold text-zinc-900">2. 預期數量</h2>
                  <p className="mt-1 text-xs text-zinc-500">最低 1,000 件起製。實際單價依數量級距,業務報價時會說明。</p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex items-center rounded-md border border-zinc-300">
                      <button onClick={() => setQty(Math.max(0, qty - 1000))} className="px-3 py-2 text-zinc-500 hover:bg-zinc-100">−1000</button>
                      <input type="number" value={qty} onChange={(e) => setQty(Math.max(0, Number(e.target.value) || 0))} className="w-32 border-x border-zinc-300 px-3 py-2 text-center text-base font-bold focus:outline-none" />
                      <button onClick={() => setQty(qty + 1000)} className="px-3 py-2 text-zinc-500 hover:bg-zinc-100">+1000</button>
                    </div>
                    <span className="text-sm text-zinc-500">件</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                    {[1000, 5000, 10000, 30000].map((n) => (
                      <button key={n} onClick={() => setQty(n)} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-zinc-700 hover:border-violet-400 hover:bg-violet-50">
                        {n.toLocaleString()} 件
                      </button>
                    ))}
                  </div>
                  {qtyTooLow && (
                    <div className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-700">
                      ⚠ 數量需達 {minQty.toLocaleString()} 件起製
                    </div>
                  )}
                </section>

                <section className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-6">
                  <h2 className="text-base font-bold text-emerald-900">3. 印刷設計檔(透過 LINE 上傳)</h2>
                  <p className="mt-1 text-xs text-emerald-800">
                    依 HJ 設計流程,印刷原始檔(AI / PDF / PSD)請於詢價單成立後透過 LINE 傳給業務,
                    大檔案可附雲端連結(Google Drive / Dropbox)。
                  </p>
                  <div className="mt-3 flex items-center gap-3 rounded-lg bg-white border border-emerald-200 p-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#06C755">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zM12 .572C5.385.572 0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314c0-5.371-5.385-9.742-12-9.742z" />
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-zinc-900">送出後自動跳轉 LINE</div>
                      <div className="text-xs text-zinc-500">會自動帶詢價單編號,業務可立即對應</div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">推薦</span>
                  </div>
                </section>

                <section className="rounded-xl border border-zinc-200 bg-white p-6">
                  <h2 className="text-base font-bold text-zinc-900">4. 聯絡資訊</h2>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-zinc-700">聯絡人姓名 *</label>
                      <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-700">公司 / 品牌</label>
                      <input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-700">電話 *</label>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" placeholder="0912-345-678" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-700">Email</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-medium text-zinc-700">LINE ID(若已加 LINE 客服)</label>
                      <input value={lineId} onChange={(e) => setLineId(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                      <div className="mt-1 text-xs text-zinc-500">Email / LINE 至少擇一,業務會透過該管道聯繫</div>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border border-zinc-200 bg-white p-6">
                  <h2 className="text-base font-bold text-zinc-900">5. 預期交期 + 備註</h2>
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="text-xs font-medium text-zinc-700">希望交期</label>
                      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="mt-1 w-48 rounded-md border border-zinc-300 px-3 py-2 text-sm" />
                      <div className="mt-1 text-xs text-zinc-500">標準交期 2-4 週,業務會依規格與排程確認可行性</div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-700">備註(特殊需求 / 預算範圍 / 用途)</label>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="例:咖啡廳新店開幕用,希望可以印 Logo + 品牌色"
                        className="mt-1 h-20 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </section>
              </div>

              <aside className="self-start rounded-xl border border-violet-200 bg-violet-50/30 p-6 sticky top-6">
                <h3 className="text-sm font-bold text-violet-900">詢價摘要</h3>

                <div className="mt-4 space-y-2 border-y border-violet-200 py-3 text-sm">
                  {SPECS.map((s) => (
                    <div key={s.key} className="flex justify-between text-xs">
                      <span className="text-zinc-600">{s.label}</span>
                      <span className="font-medium text-zinc-900">{selected[s.key]}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-violet-200 pt-2 text-sm">
                    <span className="text-zinc-600">數量</span>
                    <span className={qtyTooLow ? "text-rose-600 font-bold" : "text-violet-700 font-bold"}>{qty.toLocaleString()} 件</span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-violet-100/60 p-3 text-xs text-violet-900 leading-relaxed">
                  <strong>下一步流程:</strong><br />
                  1. 送出詢價單 → 系統發出編號<br />
                  2. 跳 LINE,上傳設計檔給業務<br />
                  3. 業務 1 工作天內回覆報價<br />
                  4. 雙方確認 → 訂金匯款<br />
                  5. 業務後台轉訂單 → 開始製作
                </div>

                <button
                  disabled={!canSubmit}
                  onClick={() => canSubmit && setStep("submitted")}
                  className={`mt-5 w-full rounded-lg py-3 text-sm font-bold text-white ${
                    canSubmit ? "bg-violet-600 hover:bg-violet-700" : "bg-zinc-300 cursor-not-allowed"
                  }`}
                >
                  {qtyTooLow ? `數量需達 ${minQty.toLocaleString()} 件` : !name || !phone ? "請填寫聯絡資訊" : !email && !lineId ? "請填 Email 或 LINE ID" : "送出詢價單"}
                </button>

                <p className="mt-3 text-center text-[11px] text-zinc-500">
                  詢價不收費,業務報價後才需付訂金
                </p>
              </aside>
            </div>
          </div>
        </div>
      )}

      <MockupSiteFooter />
    </MockupShell>
  );
}
