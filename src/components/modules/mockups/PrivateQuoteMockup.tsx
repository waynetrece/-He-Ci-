import { Annotated, Questioned } from "../CommentSystem";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

/* ============== Q definitions ============== */

const Q1 = {
  no: "Q1",
  question: "即時報價支援哪幾類商品？",
  context:
    "選項：① 全部公版 8 大類都做 ② 只做熱門類別（如紙杯、紙袋）③ 由 HJ 自行配置。範圍越大，計價邏輯越複雜。",
  clientRef: {
    source: "前台 / 私版商品系列 (1) + 參考 jcolor BC-67",
    quote: "客人在網站上點選需求選項得到報價；參考 jcolor.com.tw/product/BC-67",
    note: "您給了 jcolor 範例（範例只做名片），但未指定 HJ 要支援哪些商品類型。",
  },
};

const Q2 = {
  no: "Q2",
  question: "Email 註冊的會員，是否強制綁定 LINE 才能用「自動傳送 LINE」？",
  context:
    "技術限制：LINE 平台不允許用 Email 反查 LINE userId。Email 會員必須在會員中心做一次「綁定 LINE」按鈕，後台才能 push。是否要強制？或是可以走「手動傳送」（路徑 A）。",
  clientRef: {
    source: "前台 / 官網 (3) + 私版商品系列 (1)(2)",
    quote: "註冊方式：LINE.Email（需驗證）；複雜客製商品轉 LINE 客服報價",
    note: "您寫了兩種註冊方式並存，但「Email 會員如何用 LINE 客服」這條橋未提。",
  },
};

const Q3 = {
  no: "Q3",
  question: "即時報價的計價公式由 HJ 提供嗎？",
  context:
    "可能形式：① 固定價目表（Excel 提供，每組規格對一個單價）② 底價＋加成（例：紙杯 $1.5 × 雙面加成 1.3 × 全彩加成 1.5）③ 階梯式級距價。沒有公式系統就無法即時試算。",
  clientRef: {
    source: "前台 / 私版商品系列 (1)",
    quote: "客人在網站上點選需求選項得到報價",
    note: "您寫要可即時報價，但「計價公式 / 價目表」未提供。",
  },
};

const Q4 = {
  no: "Q4",
  question: "能算的報價，是否要做「直接下單」按鈕？",
  context:
    "您 PDF 第 (1)(2) 點似乎矛盾：(1) 寫客人選完可即時得報價 + 加購 + 訂單管理（暗示能在站內下單）；(2) 寫「客人下單均轉 LINE 客服」（暗示一律走 LINE）。請釐清：能即時報的，是否仍走 LINE 確認？或可直接購物車結帳？",
  clientRef: {
    source: "前台 / 私版商品系列 (1)(2)",
    quote: "(1) 客人在網站上點選需求選項得到報價；(2) 客服、客人提供製作原始檔、下單，均轉 LINE 客服",
    note: "您兩處寫法似乎衝突 —（1）有「即時報價→直接下單」的味道，（2）又寫「下單一律走 LINE」。",
  },
};

const Q5 = {
  no: "Q5",
  question: "設計檔（印刷原始檔）的上傳，要做在網站上、還是強制 LINE 傳？",
  context:
    "選項：① 網站做檔案上傳區（FTP/雲端儲存）② 提示「請傳到 LINE 客服」③ 兩者都做（網站上傳為主，LINE 為輔）。檔案大小、格式（AI/PDF）也要同步確認。",
  clientRef: {
    source: "前台 / 私版商品系列 (2)",
    quote: "客服、客人提供製作原始檔、下單，均轉 LINE 客服",
    note: "您寫「均轉 LINE」似乎暗示檔案也走 LINE，但這對大檔案不友善 → 需要您確認。",
  },
};

const Q6 = {
  no: "Q6",
  question: "報價有效期幾天？過期後客戶看到什麼？",
  context:
    "範例：7 天 / 14 天 / 30 天。過期後選項：① 自動失效要求重新詢價 ② 顯示「此報價已過期，請重新詢價」+ 一鍵帶回相同規格再詢一次。",
  clientRef: {
    source: "PDF 未提",
    quote: "（您的需求表沒有提到報價有效期）",
    note: "全新問題。為了避免價格爭議，幾乎所有 B2B 報價系統都會設有效期 → 我們需要您指定。",
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function AlertCircle({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function LineIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.197-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
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

function QrIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <line x1="14" y1="14" x2="17" y2="14" />
      <line x1="20" y1="14" x2="20" y2="17" />
      <line x1="14" y1="17" x2="14" y2="20" />
      <line x1="17" y1="17" x2="20" y2="20" />
      <line x1="17" y1="14" x2="17" y2="14" />
    </svg>
  );
}

/* ============== Form data (mocked picks) ============== */

const PRODUCT_TYPES = [
  { id: "cup", name: "紙杯", desc: "8 / 12 / 16 / 22 oz", active: true },
  { id: "bag", name: "紙袋", desc: "提袋・捧袋・點心袋" },
  { id: "box", name: "餐盒", desc: "便當盒・三明治盒" },
  { id: "other", name: "其他", desc: "→ 直接 LINE 諮詢", line: true },
];

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
      <section className="border-b border-zinc-200 bg-gradient-to-br from-amber-50 to-white px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-700">
            私版客製．即時報價
          </div>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900">
            選好規格，即時試算 — 複雜需求一鍵轉 LINE
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-600">
            常見品項可即時得到報價並加入詢價單；
            特殊規格（燙金 / 模切 / 大量訂製等）系統會把您的選擇自動帶到 HJ LINE 客服，由業務人工估價。
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-zinc-50/60 px-6 py-10">
        <div className="mx-auto grid max-w-[1760px] gap-6 lg:grid-cols-[1fr_460px]">
          {/* Left: form steps */}
          <div className="space-y-6">
            {/* Step 1 */}
            <Annotated
              show={annotations}
              source="ours"
              label="加值功能"
              title="商品類型分流"
              rationale={
                "「其他」類別（不在公版範圍）會直接導去 LINE 客服，避免客戶卡在沒商品的下拉選單。\n\n首頁就分流可大幅減少「客戶選不到對應商品而離開」的情況。"
              }
              pageId={pageId}
              elementId="step-1-product-type"
              elementLabel="商品類型分流"
              position="top-right"
            >
              <Questioned
                show={annotations}
                questions={[Q1]}
                pageId={pageId}
                position="top-left"
              >
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                      1
                    </span>
                    <h2 className="text-lg font-bold text-zinc-900">
                      選擇商品類型
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {PRODUCT_TYPES.map((p) => (
                      <button
                        key={p.id}
                        className={`rounded-lg border-2 p-4 text-left transition-all ${
                          p.active
                            ? "border-amber-600 bg-amber-50"
                            : p.line
                              ? "border-emerald-300 bg-emerald-50/40 hover:border-emerald-500"
                              : "border-zinc-200 bg-white hover:border-amber-400"
                        }`}
                      >
                        <div
                          className={`text-base font-bold ${p.active ? "text-amber-900" : p.line ? "text-emerald-800" : "text-zinc-900"}`}
                        >
                          {p.name}
                          {p.line && (
                            <LineIcon className="ml-1.5 inline-block text-emerald-600" />
                          )}
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">
                          {p.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Questioned>
            </Annotated>

            {/* Step 2: spec */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                  2
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

            {/* Step 3: print */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                  3
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

            {/* Step 4: qty */}
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

            {/* Step 5: file upload */}
            <Questioned
              show={annotations}
              questions={[Q5]}
              pageId={pageId}
              position="top-right"
            >
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                    5
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
                questions={[Q4, Q6]}
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

      {/* Section: 不能算 → LINE 客服 */}
      <section className="border-t-2 border-zinc-300 bg-emerald-50/30 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-6">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-700">
              情境 B · 系統無法即時報價時
            </div>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900">
              特殊需求一鍵轉 LINE 客服
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-zinc-600">
              當您勾選了系統無法計算的選項（如燙金、模切、超大量），系統會把您的選擇自動帶入 LINE 對話，由 HJ 客服在 LINE 上人工報價。
            </p>
          </div>

          <div className="rounded-xl border-2 border-amber-400 bg-amber-50/50 p-6 shadow-sm">
            <div className="flex items-start gap-2 text-amber-900">
              <AlertCircle className="mt-0.5 shrink-0" />
              <div>
                <div className="font-bold">您的需求需要客服人工估算</div>
                <div className="mt-1 text-sm">
                  您加選了「燙金 + 模切」等特殊處理，超出即時報價系統範圍。
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {/* Path B - automated */}
              <Questioned
                show={annotations}
                questions={[Q2]}
                pageId={pageId}
                position="top-right"
              >
                <article className="rounded-lg border border-emerald-300 bg-white p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800">
                      推薦
                    </span>
                    <span className="text-sm font-bold text-zinc-900">
                      自動傳送（已綁定 LINE）
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    系統會把您剛才選擇的所有規格直接 push 到您的 LINE，HJ 客服在 LINE@ 後台立刻看到並回覆。
                  </p>
                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700">
                    <LineIcon />
                    一鍵傳送至 LINE 客服
                  </button>
                </article>
              </Questioned>

              {/* Path A - manual prefill */}
              <article className="rounded-lg border border-zinc-200 bg-white p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-600">
                    替代方案
                  </span>
                  <span className="text-sm font-bold text-zinc-900">
                    手動傳送（未綁定也可用）
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  系統幫您打開 LINE 並預填好訊息，您按「送出」即可。適合還沒綁定 LINE 的客戶。
                </p>
                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border-2 border-emerald-600 bg-white px-4 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-50">
                  <LineIcon />
                  開啟 LINE 並預填
                </button>
              </article>

              {/* Add as friend */}
              <article className="rounded-lg border border-zinc-200 bg-zinc-50/40 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-600">
                    第一次來
                  </span>
                  <span className="text-sm font-bold text-zinc-900">
                    還沒加 HJ 為好友？
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  加好友後即可使用「自動傳送」並收到報價推送。
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-400">
                    <QrIcon />
                  </div>
                  <button className="flex flex-1 items-center justify-center rounded-md border border-zinc-400 bg-white px-3 py-2.5 text-xs font-bold text-zinc-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700">
                    加入好友 →
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Section: 會員中心 - 綁定 LINE */}
      <section className="border-t-2 border-zinc-300 bg-zinc-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-6">
            <div className="text-xs font-mono uppercase tracking-widest text-sky-700">
              會員中心 · 帳號設定（搭配說明）
            </div>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900">
              網站會員 ID 與 LINE userId 的綁定流程
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-zinc-600">
              這塊是「自動推送 LINE」能正常運作的前提 — 系統需要知道某個會員對應 LINE 上的哪個人。LINE 平台規則：必須由客戶主動授權，後台才能拿到 LINE userId。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Unbound state */}
            <Annotated
              show={annotations}
              source="ours"
              label="加值功能"
              title="未綁定 LINE 的會員"
              rationale={
                "Email 註冊的會員，後台沒有他的 LINE userId，無法 push 訊息。\n\n會員中心顯示「綁定 LINE」按鈕，按下後走 LINE Login OAuth → 後台取得他的 userId 並存到會員資料。\n\n從此這位會員就能用「自動傳送」功能。"
              }
              pageId={pageId}
              elementId="member-unbound"
              elementLabel="未綁定 LINE"
              position="top-right"
            >
              <article className="rounded-xl border-2 border-amber-300 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-amber-900">
                  <AlertCircle className="text-amber-600" />
                  <span className="font-bold">情境 A · 尚未綁定 LINE</span>
                </div>
                <ul className="space-y-1.5 text-sm">
                  <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                    <span className="text-zinc-500">Email</span>
                    <span className="font-medium">wayne@example.com ✓</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                    <span className="text-zinc-500">註冊方式</span>
                    <span className="font-medium">Email（已驗證）</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-500">LINE 綁定</span>
                    <span className="font-medium text-amber-700">未綁定</span>
                  </li>
                </ul>
                <div className="mt-4 rounded-lg bg-amber-50/60 p-3 text-xs text-amber-900">
                  綁定後可享：即時報價自動推送 LINE / 訂單狀態通知 / 客服對話歷史保留
                </div>
                <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700">
                  <LineIcon />
                  透過 LINE 登入綁定
                </button>
              </article>
            </Annotated>

            {/* Bound state */}
            <article className="rounded-xl border-2 border-emerald-300 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-emerald-900">
                <CheckCircle className="text-emerald-600" />
                <span className="font-bold">情境 B · 已綁定 LINE</span>
              </div>
              <ul className="space-y-1.5 text-sm">
                <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                  <span className="text-zinc-500">Email</span>
                  <span className="font-medium">wayne@example.com ✓</span>
                </li>
                <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                  <span className="text-zinc-500">LINE 暱稱</span>
                  <span className="font-medium">Wayne C.</span>
                </li>
                <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                  <span className="text-zinc-500">LINE userId</span>
                  <span className="font-mono text-xs text-zinc-400">
                    U4af49••••••（後台儲存）
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-500">綁定狀態</span>
                  <span className="font-medium text-emerald-700">✓ 已綁定</span>
                </li>
              </ul>
              <div className="mt-4 rounded-lg bg-emerald-50/60 p-3 text-xs text-emerald-900">
                您可以使用「自動傳送 LINE」功能，無需每次手動發送。
              </div>
              <button className="mt-3 w-full rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                解除綁定
              </button>
            </article>
          </div>

          {/* Tech flow diagram */}
          <div className="mt-8 rounded-xl border border-sky-200 bg-sky-50/40 p-6">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-sky-900">
              <span className="rounded-full bg-sky-200 px-2.5 py-0.5 text-xs">
                技術說明
              </span>
              綁定流程（一次完成，之後自動）
            </div>
            <ol className="grid gap-3 text-sm md:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "會員按「綁定 LINE」",
                  desc: "於會員中心點擊按鈕",
                },
                {
                  step: "2",
                  title: "LINE 授權頁",
                  desc: "OAuth 標準流程，客戶在 LINE 同意",
                },
                {
                  step: "3",
                  title: "後台拿到 userId",
                  desc: "存入會員資料表的 line_user_id 欄位",
                },
                {
                  step: "4",
                  title: "之後自動推送",
                  desc: "Push API 用 userId 直接送訊息給該會員",
                },
              ].map((s, i, arr) => (
                <li key={s.step} className="relative flex gap-3 rounded-lg bg-white p-3 shadow-sm">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sky-600 text-xs font-bold text-white">
                    {s.step}
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-zinc-900">{s.title}</div>
                    <div className="mt-0.5 text-xs text-zinc-600">
                      {s.desc}
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-zinc-300 md:block">
                      <ChevronRight />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <MockupSiteFooter />
    </MockupShell>
  );
}
