import { Questioned } from "../CommentSystem";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

/* ============== Q definitions ============== */

const Q1 = {
  no: "Q1",
  question: "即時報價的計價公式由 HJ 提供嗎？",
  context:
    "可能形式：① 固定價目表（Excel 提供，每組規格對一個單價）② 底價＋加成（例：紙杯 $1.5 × 雙面加成 1.3 × 全彩加成 1.5）③ 階梯式級距價。沒有公式系統就無法即時試算。",
  clientRef: {
    source: "前台 / 私版商品系列 (1)",
    quote: "客人在網站上點選需求選項得到報價",
    note: "需提供計價公式 / 價目表（例：每組規格對應單價的對照表，或底價搭配加成倍率），系統才能進行即時試算。",
  },
};

const Q2 = {
  no: "Q2",
  question: "能算的報價，是否要做「直接下單」按鈕？",
  context:
    "需釐清下單流程的銜接方式。可選方案：① 能即時報價的，直接從網站購物車結帳，不必經 LINE；② 即時報價只供參考，所有下單一律由 LINE 客服確認後成立。",
  clientRef: {
    source: "前台 / 私版商品系列 (1)(2)",
    quote: "(1) 客人在網站上點選需求選項得到報價；(2) 客服、客人提供製作原始檔、下單，均轉 LINE 客服",
    note: "需求表 (1)(2) 兩段對下單流程的描述有兩種解讀，想請 HJ 決定希望走哪一種。",
  },
};

const Q3 = {
  no: "Q3",
  question: "設計檔（印刷原始檔）的上傳，要做在網站上、還是強制 LINE 傳？",
  context:
    "選項：① 網站做檔案上傳區 ② 提示「請傳到 LINE 客服」③ 兩者都做。檔案大小、格式（AI/PDF）也要同步確認。",
  clientRef: {
    source: "前台 / 私版商品系列 (2)",
    quote: "客服、客人提供製作原始檔、下單，均轉 LINE 客服",
    note: "需求表寫到原始檔走 LINE，但大檔案在 LINE 上傳體驗較差，建議搭配網站上傳功能。想請 HJ 確認偏好的方式。",
  },
};

const Q4 = {
  no: "Q4",
  question: "報價有效期幾天？過期後客戶看到什麼？",
  context:
    "範例：7 天 / 14 天 / 30 天。過期後選項：① 自動失效要求重新詢價 ② 顯示「此報價已過期」+ 一鍵帶回相同規格再詢一次。",
};

/* ============== Icons ============== */

function CheckCircle({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

/* ============== Form data (mocked picks) ============== */

const SPECS = [
  { label: "容量", options: ["8oz", "12oz", "16oz", "22oz"], picked: "12oz" },
  { label: "材質", options: ["紙", "PLA", "PET"], picked: "紙" },
  { label: "顏色", options: ["白", "黑", "牛皮"], picked: "白" },
];

const PRINT = [
  { label: "印面", options: ["不印", "單面", "雙面"], picked: "雙面" },
  { label: "顏色數", options: ["單色", "雙色", "全彩"], picked: "全彩" },
];

const SPECIAL = [
  { id: "gold", label: "燙金", checked: false },
  { id: "spotuv", label: "局部上光", checked: false },
  { id: "diecut", label: "模切", checked: false },
];

const QTY_TIERS = [1000, 5000, 10000, 50000];

/* ============== Component ============== */

export function PrivateQuoteMockup({
  annotations = false,
  pageId = "private-quote",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  return (
    <MockupShell url="https://hjhj.com.tw/private-quote">
      <MockupSiteHeader />

      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white px-6 py-6">
        <div className="mx-auto max-w-[1760px]">
          <nav className="text-xs text-zinc-500">
            <span>私版客製商品</span>
            <span className="mx-2 text-zinc-300">/</span>
            <span className="font-medium text-zinc-700">12oz 客製印 LOGO 紙杯</span>
          </nav>
          <h1 className="mt-2 text-2xl font-bold text-zinc-900">
            12oz 客製印 LOGO 紙杯
          </h1>
        </div>
      </section>

      {/* Form */}
      <section className="bg-zinc-50/60 px-6 py-10">
        <div className="mx-auto grid max-w-[1760px] gap-6 lg:grid-cols-[1fr_460px]">
          {/* Left: form steps */}
          <div className="space-y-6">
            {/* Step 1: spec */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                  1
                </span>
                <h2 className="text-lg font-bold text-zinc-900">規格選擇</h2>
              </div>
              <div className="space-y-4">
                {SPECS.map((s) => (
                  <div key={s.label}>
                    <div className="mb-2 text-sm font-semibold text-zinc-700">
                      {s.label}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {s.options.map((o) => (
                        <button
                          key={o}
                          className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                            o === s.picked
                              ? "border-amber-600 bg-amber-100 font-bold text-amber-900"
                              : "border-zinc-300 bg-white text-zinc-700 hover:border-amber-400"
                          }`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: print */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                  2
                </span>
                <h2 className="text-lg font-bold text-zinc-900">印刷需求</h2>
              </div>
              <div className="space-y-4">
                {PRINT.map((s) => (
                  <div key={s.label}>
                    <div className="mb-2 text-sm font-semibold text-zinc-700">
                      {s.label}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {s.options.map((o) => (
                        <button
                          key={o}
                          className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                            o === s.picked
                              ? "border-amber-600 bg-amber-100 font-bold text-amber-900"
                              : "border-zinc-300 bg-white text-zinc-700 hover:border-amber-400"
                          }`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div>
                  <div className="mb-2 text-sm font-semibold text-zinc-700">
                    特殊處理（勾選後通常需轉 LINE 報價）
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {SPECIAL.map((s) => (
                      <label
                        key={s.id}
                        className="flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 cursor-pointer hover:border-amber-400"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={s.checked}
                          className="size-4 rounded border-zinc-300 accent-amber-700"
                        />
                        {s.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: qty */}
            <Questioned
              show={annotations}
              questions={[Q1]}
              pageId={pageId}
              position="top-right"
            >
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                    3
                  </span>
                  <h2 className="text-lg font-bold text-zinc-900">數量</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {QTY_TIERS.map((q, i) => (
                    <button
                      key={q}
                      className={`rounded-md border px-4 py-2 text-sm ${
                        i === 1
                          ? "border-amber-600 bg-amber-100 font-bold text-amber-900"
                          : "border-zinc-300 bg-white text-zinc-700 hover:border-amber-400"
                      }`}
                    >
                      {q.toLocaleString()}
                    </button>
                  ))}
                  <button className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 hover:border-amber-400">
                    自填數量
                  </button>
                </div>
              </div>
            </Questioned>

            {/* Step 4: file upload */}
            <Questioned
              show={annotations}
              questions={[Q3]}
              pageId={pageId}
              position="top-right"
            >
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                    4
                  </span>
                  <h2 className="text-lg font-bold text-zinc-900">
                    上傳設計檔
                  </h2>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600">
                    選填
                  </span>
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50/40 px-6 py-8 text-sm text-zinc-600 hover:border-amber-400 hover:bg-amber-50/40">
                  <UploadIcon />
                  <span>拖曳檔案到此或點擊上傳（AI / PDF / JPG / PNG，最大 50MB）</span>
                </button>
                <p className="mt-2 text-xs text-zinc-500">
                  ※ 也可之後在 LINE 對話中傳給客服
                </p>
              </div>
            </Questioned>
          </div>

          {/* Right: live result panel — sticky */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {/* Summary */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="mb-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
                您目前的選擇
              </div>
              <ul className="space-y-1.5 text-sm">
                <li className="flex justify-between"><span className="text-zinc-500">商品</span><span className="font-medium text-zinc-900">紙杯</span></li>
                <li className="flex justify-between"><span className="text-zinc-500">容量</span><span className="font-medium text-zinc-900">12oz</span></li>
                <li className="flex justify-between"><span className="text-zinc-500">材質</span><span className="font-medium text-zinc-900">紙</span></li>
                <li className="flex justify-between"><span className="text-zinc-500">顏色</span><span className="font-medium text-zinc-900">白</span></li>
                <li className="flex justify-between"><span className="text-zinc-500">印刷</span><span className="font-medium text-zinc-900">雙面 / 全彩</span></li>
                <li className="flex justify-between"><span className="text-zinc-500">數量</span><span className="font-medium text-zinc-900">5,000</span></li>
              </ul>
            </div>

            {/* Result A — auto quote (情境 A) */}
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50/40 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle />
                <span className="font-bold">系統可即時報價</span>
              </div>
              <div className="mt-3 border-t border-emerald-200 pt-3 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span>單價</span>
                  <span className="font-mono">NT$ 1.85</span>
                </div>
                <div className="mt-1.5 flex items-baseline justify-between">
                  <span className="text-zinc-600">小計</span>
                  <span className="font-mono text-2xl font-bold text-emerald-900">
                    NT$ 9,250
                  </span>
                </div>
              </div>
              <Questioned
                show={annotations}
                questions={[Q2, Q4]}
                pageId={pageId}
                position="top-right"
              >
                <div className="mt-4 flex flex-col gap-2">
                  <button className="rounded-md bg-amber-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-amber-800">
                    + 加入詢價單
                  </button>
                  <button className="rounded-md border-2 border-amber-700 bg-white px-4 py-2.5 text-sm font-bold text-amber-800 hover:bg-amber-50">
                    立即下單
                  </button>
                </div>
              </Questioned>
              <p className="mt-2.5 text-xs text-zinc-500">
                ※ 此報價有效期 7 天
              </p>
            </div>
          </aside>
        </div>
      </section>

      <MockupSiteFooter />
    </MockupShell>
  );
}
