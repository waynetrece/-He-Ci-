import { Annotated, Questioned } from "../CommentSystem";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

/* ============== Q ============== */

const Q1 = {
  no: "Q1",
  question: "私版即時報價支援哪幾類商品？",
  context:
    "選項：① 全部公版 8 大類都做 ② 只做熱門類別（如紙杯、紙袋、印刷紙品）③ 由 HJ 自行配置。範圍越大，計價邏輯越複雜，且需提供對應價目表。",
  clientRef: {
    source: "前台 / 私版商品系列 (1) + 參考 jcolor BC-67",
    quote: "客人在網站上點選需求選項得到報價；參考 jcolor.com.tw/product/BC-67",
  },
};

const Q2 = {
  no: "Q2",
  question: "「即時報價」與「LINE 報價」如何分流？",
  context:
    "建議在每張商品卡上標示「即時報價」或「LINE 報價」標籤，客戶一眼看出能不能站內試算。標準依據可由貴司提供（例如 HJ 自行決定哪些品項、哪些規格組合走人工估價）。",
  clientRef: {
    source: "前台 / 私版商品系列 (1)(2)",
    quote: "(1) 客人在網站上點選需求選項得到報價；(2) 複雜客製商品轉 LINE 客服報價",
    note: "需求表寫了兩種模式並存，但「哪些算複雜需轉 LINE」的判斷規則需貴司提供。",
  },
};

const Q3 = {
  no: "Q3",
  question: "列表頁是否要顯示「起報金額」？",
  context:
    "如顯示「12oz 客製紙杯 起 $1.50/個」，可協助客戶第一眼判斷是否符合預算，但前提是價目表已建立。如不顯示，客戶須點進詳細頁才能看到價格。",
  clientRef: {
    source: "需求表未提及（補充項）",
    quote: "（這項在需求表沒有對應段落）",
    note: "顯示與否影響使用者決策速度，建議貴司確認。",
  },
};

/* ============== Icons ============== */

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function LineIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.197-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CalcIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="10" y2="11" />
      <line x1="14" y1="11" x2="16" y2="11" />
      <line x1="8" y1="15" x2="10" y2="15" />
      <line x1="14" y1="15" x2="16" y2="15" />
      <line x1="8" y1="19" x2="10" y2="19" />
      <line x1="14" y1="19" x2="16" y2="19" />
    </svg>
  );
}

/* ============== Data ============== */

const FILTERS = [
  { id: "all", name: "全部", count: 11, active: true },
  { id: "cup", name: "紙杯／膠杯類", count: 3 },
  { id: "bag", name: "紙袋／提袋類", count: 2 },
  { id: "box", name: "餐盒／容器類", count: 2 },
  { id: "print", name: "印刷紙品類", count: 3 },
  { id: "other", name: "特殊客製", count: 1 },
];

type Mode = "auto" | "line";

type PrivateProduct = {
  code: string;
  name: string;
  spec: string;
  mode: Mode;
  startPrice?: string;
  badge?: string;
};

const PRIVATE_PRODUCTS: PrivateProduct[] = [
  { code: "PC-CUP-12", name: "12oz 客製印 LOGO 紙杯", spec: "8/12/16 oz · 單面/雙面 · 全彩/單色", mode: "auto", startPrice: "$1.50 / 個" },
  { code: "PC-CUP-16", name: "16oz 客製雙層中空紙杯", spec: "雙層隔熱 · 印刷可選", mode: "auto", startPrice: "$2.20 / 個" },
  { code: "PC-PLA-12", name: "12oz 客製 PLA 環保杯", spec: "可生物分解 · 印 LOGO", mode: "auto", startPrice: "$2.80 / 個" },
  { code: "PB-KRF-01", name: "客製牛皮紙袋", spec: "尺寸 / 印刷 / 提繩可選", mode: "auto", startPrice: "$2.80 / 入", badge: "熱銷" },
  { code: "PB-CUS-01", name: "客製模切異形紙袋", spec: "刀模需先打樣", mode: "line" },
  { code: "PX-PAP-01", name: "客製紙便當盒", spec: "防油 · 可印刷", mode: "auto", startPrice: "$3.20 / 個" },
  { code: "PX-WIN-01", name: "客製開窗餐盒", spec: "牛卡紙 · 透明窗位置可調", mode: "line" },
  { code: "PR-WRP-01", name: "客製餐盒腰封 / 封套", spec: "尺寸隨餐盒 · 印 LOGO", mode: "auto", startPrice: "$0.50 / 個" },
  { code: "PR-MAT-01", name: "客製餐墊紙 / 防油背心", spec: "尺寸客製 · 全彩印刷", mode: "auto", startPrice: "$0.80 / 個" },
  { code: "PR-CST-01", name: "客製杯墊", spec: "圓型/方型 · 100~200gsm", mode: "auto", startPrice: "$0.40 / 個" },
  { code: "PS-GLD-01", name: "客製燙金禮盒", spec: "燙金 + 局部上光 + 模切", mode: "line", badge: "特殊處理" },
];

const MODE_LABEL: Record<Mode, { text: string; cls: string }> = {
  auto: { text: "即時報價", cls: "border-emerald-300 bg-emerald-50 text-emerald-800" },
  line: { text: "LINE 報價", cls: "border-zinc-300 bg-zinc-50 text-zinc-700" },
};

/* ============== Component ============== */

export function PrivateQuoteListMockup({
  annotations = false,
  pageId = "private-quote-list",
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
            私版客製商品
          </div>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900">
            從常見規格 LOGO 印刷，到複雜模切燙金 — 一站式客製
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-600">
            常見規格商品標示「即時報價」，選好規格即知價格；標示「LINE 報價」的特殊規格，由 HJ 客服在 LINE 上人工估價。
          </p>
        </div>
      </section>

      {/* Two-path explainer */}
      <section className="border-b border-zinc-200 bg-zinc-50/40 px-6 py-8">
        <div className="mx-auto grid max-w-[1760px] gap-4 md:grid-cols-2">
          <article className="flex gap-4 rounded-xl border-2 border-emerald-300 bg-white p-5 shadow-sm">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <CalcIcon />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800">
                  路徑 A
                </span>
                <span className="text-sm font-bold text-zinc-900">即時報價</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-600">
                點進商品 → 選規格 → 系統立即顯示單價 / 小計 / 加入詢價單。常見規格走這條路。
              </p>
            </div>
          </article>

          <article className="flex gap-4 rounded-xl border-2 border-zinc-300 bg-white p-5 shadow-sm">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
              <LineIcon />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-600">
                  路徑 B
                </span>
                <span className="text-sm font-bold text-zinc-900">
                  LINE 報價
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-600">
                特殊規格（燙金 / 模切 / 異形）→ 系統把您選的規格自動帶到 LINE 客服 → 由業務人工估價回覆。
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-zinc-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-[1760px]">
          <Annotated
            show={annotations}
            source="ours"
            label="加值功能"
            title="商品分類篩選"
            rationale={
              "依公版商品的 8 大類延伸，提供分類篩選 chips。讓客戶快速縮小範圍、避免一次看到 11 種商品而眼花。\n\n如不需要分類，可改為一頁全部展示。"
            }
            pageId={pageId}
            elementId="filters"
            elementLabel="分類篩選"
            position="top-right"
          >
            <div className="flex items-center gap-2 overflow-x-auto">
              <div className="mr-1 flex items-center gap-1.5 text-xs text-zinc-500">
                <FilterIcon />
                <span>分類</span>
              </div>
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    f.active
                      ? "border-amber-700 bg-amber-700 text-white"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-amber-400"
                  }`}
                >
                  <span>{f.name}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${f.active ? "bg-white/20" : "bg-zinc-100 text-zinc-500"}`}
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
          </Annotated>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-zinc-50/40 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          {/* Top bar */}
          <div className="mb-5 flex items-center justify-between rounded-lg bg-white px-5 py-3 shadow-sm border border-zinc-100">
            <div className="text-sm text-zinc-600">
              共 <span className="font-bold text-zinc-900">{PRIVATE_PRODUCTS.length}</span> 款客製商品
            </div>
            <div className="flex items-center gap-2 text-sm">
              <select className="rounded-md border border-zinc-300 bg-white px-3 py-1.5">
                <option>排序：熱銷優先</option>
                <option>價格低到高</option>
                <option>最新上架</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PRIVATE_PRODUCTS.map((p, idx) => {
              const cardInner = (
                <article className="group flex h-full flex-col rounded-xl bg-white shadow-sm border border-zinc-100 transition-all hover:shadow-lg hover:-translate-y-0.5">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-zinc-100">
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-300 text-xs">
                      商品圖
                    </div>
                    <span
                      className={`absolute top-3 left-3 rounded-md border px-2 py-0.5 text-[10px] font-bold ${MODE_LABEL[p.mode].cls}`}
                    >
                      {p.mode === "line" && (
                        <LineIcon className="mr-1 inline-block" />
                      )}
                      {MODE_LABEL[p.mode].text}
                    </span>
                    {p.badge && (
                      <span className="absolute top-3 right-3 rounded-md bg-amber-700 px-2 py-0.5 text-[10px] font-bold text-white">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="text-xs font-mono text-zinc-400">{p.code}</div>
                    <h3 className="mt-1 text-base font-bold text-zinc-900 leading-snug">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                      {p.spec}
                    </p>

                    <div className="mt-auto pt-3">
                      {p.startPrice ? (
                        <div className="mb-2 flex items-baseline justify-between">
                          <span className="text-xs text-zinc-500">起報</span>
                          <span className="font-mono text-sm font-bold text-emerald-800">
                            {p.startPrice}
                          </span>
                        </div>
                      ) : (
                        <div className="mb-2 text-xs text-zinc-500">
                          需 LINE 客服估價
                        </div>
                      )}
                      <button
                        className={`flex w-full items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-bold transition-colors ${
                          p.mode === "auto"
                            ? "bg-amber-700 text-white hover:bg-amber-800"
                            : "border border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        {p.mode === "auto" ? (
                          <>
                            開始試算
                            <ChevronRight />
                          </>
                        ) : (
                          <>
                            <LineIcon />
                            LINE 詢價
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );

              // Pin Q1 to first card (代表入口商品), Q2 to a "LINE 報價" card, Q3 to a card with "起 $X" 標示
              if (idx === 0) {
                return (
                  <Questioned
                    key={p.code}
                    show={annotations}
                    questions={[Q1]}
                    pageId={pageId}
                    position="top-right"
                  >
                    {cardInner}
                  </Questioned>
                );
              }
              if (idx === 4) {
                return (
                  <Questioned
                    key={p.code}
                    show={annotations}
                    questions={[Q2]}
                    pageId={pageId}
                    position="top-right"
                  >
                    {cardInner}
                  </Questioned>
                );
              }
              if (idx === 3) {
                return (
                  <Questioned
                    key={p.code}
                    show={annotations}
                    questions={[Q3]}
                    pageId={pageId}
                    position="top-right"
                  >
                    {cardInner}
                  </Questioned>
                );
              }
              return <div key={p.code}>{cardInner}</div>;
            })}
          </div>
        </div>
      </section>

      {/* No-match section */}
      <section className="border-t border-zinc-200 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <div className="rounded-xl border-2 border-emerald-300 bg-white p-6 text-center shadow-sm md:p-10">
            <h2 className="text-xl font-bold text-zinc-900 md:text-2xl">
              找不到您要的客製商品？
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-600">
              若您的需求不在以上品項（例如全新材質、特殊用途、極大量訂製），歡迎直接 LINE 客服，由業務專人為您報價。
            </p>
            <button className="mx-auto mt-5 flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700">
              <LineIcon />
              直接 LINE 客服 →
            </button>
          </div>
        </div>
      </section>

      <MockupSiteFooter />
    </MockupShell>
  );
}
