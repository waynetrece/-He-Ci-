import { Annotated, Questioned } from "../CommentSystem";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

/* ============== Questions pinned to elements ============== */
const Q_SPEC = [
  {
    no: "Q1",
    question: "多層規格選項要支援幾層？",
    context: "例：紙杯 → 容量（8oz/12oz）→ 材質（PE/PLA）→ 印刷（單面/雙面）= 3 層",
    clientRef: {
      source: "前台 / 公版商品系列 (3)",
      quote: "多層 規格&選項",
      note: "您有寫「多層」，但未指定支援幾層 → 我們需要您確認層數上限。",
    },
  },
  {
    no: "Q2",
    question: "不同規格組合要分開算庫存嗎？",
    context: "例：「8oz 白色紙杯」賣完了，「12oz 白色紙杯」還能不能賣？分開算 → 各自獨立、其中一款缺貨不影響其他款；合併算 → 同款商品共用一個庫存數字，其中一個沒了全部都擋下。",
    clientRef: {
      source: "後台 / 庫存管理 (1)(2)(3) + 顧客管理 (1)（隱含）",
      quote: "API 串接：庫存即時更新／部分商品需要預留庫存／缺貨提醒；網站客人需與原 ERP 客戶編號相同",
      note: "您有寫要串 ERP 即時庫存，但未說明「庫存的最小單位是商品還是規格組合」→ 影響網站如何擋缺貨。",
    },
  },
];

const Q3 = {
  no: "Q3",
  question: "商品列表頁是否顯示價格？",
  context: "B2B 電商常選擇隱藏價格，需登入才看得到。或一律顯示「請洽詢」字樣。",
  clientRef: {
    source: "前台 / 公版商品系列 (1)",
    quote: "提供給客人下單",
    note: "您有寫要讓客人下單（隱含要看得到價格），但未指定「列表頁直接顯示／詳情頁才顯示／必須登入才看得到」。",
  },
};
const Q4 = {
  no: "Q4",
  question: "分級會員看到的價格如何呈現？",
  context: "選項：只顯示該等級價、原價劃掉+會員價、原價+折扣 % 等。",
  clientRef: {
    source: "後台 / 顧客管理 (2)",
    quote: "多層會員分級：商品會因顧客分級而有不同價",
    note: "您有寫「不同價」，但未指定呈現方式 → 我們需要您選一種。",
  },
};
const Q5 = {
  no: "Q5",
  question: "樣品申請是否要收費？",
  context: "選項：完全免費 / 樣品免費但運費自付 / 限金額或會員等級",
  clientRef: {
    source: "前台 / 公版商品系列 (2)",
    quote: "樣品申請：每個商品頁增加樣品按鈕",
    note: "您有寫要有樣品按鈕，但未提收費規則。",
  },
};
const Q6 = {
  no: "Q6",
  question: "樣品申請是否限會員才能申請？",
  clientRef: {
    source: "前台 / 公版商品系列 (2)",
    quote: "樣品申請：每個商品頁增加樣品按鈕",
    note: "您有寫要有樣品按鈕，但未提資格限制。",
  },
};
const Q7 = {
  no: "Q7",
  question: "樣品申請是否要後台審核才寄出？",
  context: "選項：客戶送出即自動寄出 / 業務後台審核通過才寄出。後者可避免濫用，但會增加處理時間。",
  clientRef: {
    source: "前台 / 公版商品系列 (2)",
    quote: "樣品申請：每個商品頁增加樣品按鈕",
    note: "您有寫要有樣品按鈕，但未提審核流程。",
  },
};

type QItem = {
  no: string;
  question: string;
  context?: string;
  clientRef?: {
    source: string;
    quote: string;
    note?: string;
  };
};

// 同主題的問題合併到同一個 pin，分散到不同卡片
const CARD_PINS: Record<number, { price?: QItem[]; sample?: QItem[] }> = {
  0: { price: [Q3, Q4] },        // 第 1 張：價格區 Q3+Q4
  2: { sample: [Q5, Q6, Q7] },   // 第 3 張：樣品按鈕 Q5+Q6+Q7
};

/* ============== Icons ============== */
function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function GiftIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}
function CompareIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

/* ============== Data ============== */
const CATEGORIES = [
  { name: "植纖容器類", count: 4, expanded: false },
  { name: "牛皮紙容器類", count: 4, expanded: false },
  { name: "紙製／塑膠容器類", count: 7, expanded: false },
  { name: "紙杯／膠杯類", count: 10, expanded: true, active: true },
  { name: "紙袋／淋膜袋類", count: 7, expanded: false },
  { name: "印刷紙品類", count: 8, expanded: false },
  { name: "餐具／餐廚類", count: 4, expanded: false },
  { name: "清潔紙品類", count: 5, expanded: false },
];

const SUBCATS = [
  { name: "公版瓦楞杯", active: true, count: 12 },
  { name: "雙層中空杯", count: 8 },
  { name: "單層淋膜杯", count: 6 },
  { name: "冷熱共用杯", count: 4 },
  { name: "PLA 環保塑膠杯", count: 7 },
  { name: "PET．PP 塑膠杯", count: 9 },
  { name: "紙杯杯蓋", count: 5 },
  { name: "膠杯杯蓋", count: 3 },
  { name: "杯套．杯提", count: 6 },
];

type Tag = "new" | "hot" | "festival" | "limited";

const PRODUCTS: {
  code: string;
  name: string;
  spec: string;
  colors: string[];
  capacity: string;
  unit: string;
  tags?: Tag[];
  hasSample?: boolean;
}[] = [
  { code: "PC-08-001", name: "8oz 公版瓦楞紙杯", spec: "100% 食品級紙材", capacity: "8oz / 240ml", colors: ["#fff", "#1a1a1a", "#92400e"], unit: "1,000 入/箱", tags: ["new"], hasSample: true },
  { code: "PC-12-001", name: "12oz 公版瓦楞紙杯", spec: "100% 食品級紙材", capacity: "12oz / 360ml", colors: ["#fff", "#1a1a1a", "#92400e"], unit: "1,000 入/箱", hasSample: true },
  { code: "PC-16-001", name: "16oz 公版瓦楞紙杯", spec: "100% 食品級紙材", capacity: "16oz / 480ml", colors: ["#fff", "#1a1a1a", "#92400e"], unit: "1,000 入/箱", tags: ["hot"], hasSample: true },
  { code: "DC-08-001", name: "8oz 雙層中空紙杯", spec: "雙層隔熱結構", capacity: "8oz / 240ml", colors: ["#fff", "#92400e"], unit: "500 入/箱", tags: ["festival"], hasSample: true },
  { code: "DC-12-001", name: "12oz 雙層中空紙杯", spec: "雙層隔熱結構", capacity: "12oz / 360ml", colors: ["#fff", "#92400e"], unit: "500 入/箱", tags: ["new"], hasSample: true },
  { code: "DC-16-001", name: "16oz 雙層中空紙杯", spec: "雙層隔熱結構", capacity: "16oz / 480ml", colors: ["#fff", "#92400e"], unit: "500 入/箱" },
  { code: "PL-08-001", name: "8oz PLA 環保杯", spec: "可生物分解材質", capacity: "8oz / 240ml", colors: ["#f0fdf4"], unit: "1,000 入/箱", tags: ["limited"], hasSample: true },
  { code: "PL-12-001", name: "12oz PLA 環保杯", spec: "可生物分解材質", capacity: "12oz / 360ml", colors: ["#f0fdf4"], unit: "1,000 入/箱", tags: ["hot"], hasSample: true },
  { code: "PT-08-001", name: "8oz PET 透明杯", spec: "高透光率", capacity: "8oz / 240ml", colors: ["#f0fdf4", "#fef3c7"], unit: "1,000 入/箱" },
  { code: "PT-16-001", name: "16oz PET 透明杯", spec: "高透光率", capacity: "16oz / 480ml", colors: ["#f0fdf4"], unit: "1,000 入/箱", hasSample: true },
  { code: "LD-90-001", name: "杯蓋 90mm 口徑", spec: "適配 8/12oz 杯", capacity: "90mm 口徑", colors: ["#fff", "#1a1a1a", "#f0fdf4"], unit: "1,000 入/箱", tags: ["new"] },
  { code: "LD-98-001", name: "杯蓋 98mm 口徑", spec: "適配 16oz 杯", capacity: "98mm 口徑", colors: ["#fff", "#1a1a1a", "#f0fdf4"], unit: "1,000 入/箱" },
];

const RECENT_VIEWED = [
  { name: "牛皮紙便當盒 800ml", code: "KB-800" },
  { name: "PLA 環保杯 12oz", code: "PL-12-001" },
  { name: "塑膠醬料杯 30ml", code: "SG-30" },
];

const RELATED = [
  { name: "紙杯腰封・客製印刷", note: "搭配杯子提升質感" },
  { name: "杯墊紙・100/200gsm", note: "桌面防護必備" },
  { name: "外帶提袋・1-4 杯", note: "整套外帶解決方案" },
  { name: "PE 封口貼紙", note: "保鮮防漏" },
];

const TAG_STYLES: Record<Tag, { label: string; bg: string; text: string }> = {
  new: { label: "新品", bg: "bg-white", text: "text-zinc-700 border border-zinc-300" },
  hot: { label: "熱銷", bg: "bg-zinc-900", text: "text-white" },
  festival: { label: "節慶", bg: "bg-white", text: "text-zinc-700 border border-zinc-300" },
  limited: { label: "限量", bg: "bg-white", text: "text-zinc-700 border border-zinc-300" },
};

type Product = (typeof PRODUCTS)[number];

function renderCardInner(
  p: Product,
  opts: {
    annotations: boolean;
    pageId: string;
    pricePins?: QItem[];
    samplePins?: QItem[];
    annotateCompare?: boolean;
    annotateFields?: boolean;
  },
) {
  const {
    annotations,
    pageId,
    pricePins,
    samplePins,
    annotateCompare,
    annotateFields,
  } = opts;
  const showPrice = annotations && pricePins && pricePins.length > 0;
  const showSample = annotations && samplePins && samplePins.length > 0;
  const showCompare = annotations && annotateCompare;
  const showFields = annotations && annotateFields;

  const priceBlock = (
    <div className="mt-3 flex items-baseline justify-between border-t border-zinc-100 pt-3">
      <div>
        <div className="text-lg font-bold text-zinc-900">請洽詢</div>
        <div className="text-xs text-emerald-700 font-medium">
          會員價請登入
        </div>
      </div>
    </div>
  );

  const sampleBtn = (
    <button
      className="flex items-center justify-center gap-1 rounded-md border border-emerald-400 bg-emerald-50 px-3 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 whitespace-nowrap"
      title="申請樣品"
    >
      申請樣品
    </button>
  );

  return (
    <>
      {/* Image area — 自己負責圓角剪裁，這樣 article 可以拿掉 overflow-hidden 讓 pin 浮出 */}
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-zinc-100">
        <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
          <span className="text-xs">商品圖</span>
        </div>

        {p.tags && p.tags[0] && (
          <span
            className={`absolute top-3 left-3 rounded px-2 py-0.5 text-[10px] font-medium tracking-wide ${TAG_STYLES[p.tags[0]].bg} ${TAG_STYLES[p.tags[0]].text}`}
          >
            {TAG_STYLES[p.tags[0]].label}
          </span>
        )}

        {p.hasSample && (
          <span className="absolute top-3 right-12 flex items-center gap-1 rounded border border-zinc-300 bg-white/95 px-2 py-0.5 text-[10px] font-medium text-zinc-700">
            <GiftIcon /> 可申請樣品
          </span>
        )}

        <button className="absolute top-2.5 right-2.5 flex size-8 items-center justify-center rounded-full bg-white/95 text-zinc-400 shadow-sm hover:text-rose-500">
          <HeartIcon />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        {(() => {
          const fieldsBlock = (
            <div>
              <div className="text-xs font-mono text-zinc-400">{p.code}</div>
              <h3 className="mt-1 text-base font-bold text-zinc-900 leading-snug">
                {p.name}
              </h3>
              <p className="mt-1.5 text-sm text-zinc-500">{p.spec}</p>

              <div className="mt-3 flex items-center justify-between text-xs text-zinc-600">
                <span>{p.capacity}</span>
                <span>{p.unit}</span>
              </div>

              <div className="mt-2.5 flex items-center gap-1.5">
                <span className="text-xs text-zinc-400">色:</span>
                {p.colors.map((c, i) => (
                  <span
                    key={i}
                    className="size-4 rounded-full border border-zinc-200 shadow-inner"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
          );

          return showFields ? (
            <Annotated
              show
              source="ours"
              label="商品卡欄位"
              title="商品卡片要顯示哪些欄位？"
              rationale={
                "卡片預設顯示：商品編號 / 名稱 / 規格 / 容量 / 包裝單位 / 色款。\n\n" +
                "原因：B2B 餐飲包材買家通常以「容量」「規格」「色款」為主要篩選條件，先在列表頁就看到這些資訊可大幅減少點進詳情頁的次數。商品編號（如 PC-08-001）方便客戶與業務或凌越 ERP 比對下單。\n\n" +
                "如不需要其中某些欄位（例如不想顯示色款），可以調整成只顯示：圖片 + 商品名 + 規格。請告訴我們希望保留／移除哪些。"
              }
              pageId={pageId}
              elementId={`fields-${p.code}`}
              elementLabel="商品卡片欄位"
              position="top-right"
            >
              {fieldsBlock}
            </Annotated>
          ) : (
            fieldsBlock
          );
        })()}

        {/* 價格區 — Q 釘在這 */}
        {showPrice ? (
          <Questioned
            show
            questions={pricePins!}
            pageId={pageId}
            position="top-right"
          >
            {priceBlock}
          </Questioned>
        ) : (
          priceBlock
        )}

        {/* Action buttons */}
        <div className="mt-3 flex gap-1.5">
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-amber-700 px-2 py-2.5 text-sm font-bold text-white hover:bg-amber-800 shadow-sm transition-colors">
            <PlusIcon /> 加入購物車
          </button>
          {p.hasSample &&
            (showSample ? (
              <Questioned
                show
                questions={samplePins!}
                pageId={pageId}
                position="top-right"
              >
                {sampleBtn}
              </Questioned>
            ) : (
              sampleBtn
            ))}
        </div>

        {(() => {
          const compareLabel = (
            <label className="mt-3 inline-flex items-center gap-1.5 text-xs text-zinc-500 cursor-pointer">
              <input
                type="checkbox"
                className="size-3.5 rounded border-zinc-300 accent-amber-700"
              />
              <span className="flex items-center gap-1">
                <CompareIcon /> 加入比較
              </span>
            </label>
          );
          return showCompare ? (
            <Annotated
              show
              source="ours"
              label="加值功能"
              title="加入比較功能"
              rationale={
                "客戶可勾選 2~4 件商品後一鍵進入「比較頁」，並排對照容量、材質、規格、價格與最低訂購量。\n\n" +
                "原因：餐飲業採購包材時，常需要在 8oz / 12oz / 16oz 之間，或紙杯 / PLA / PET 不同材質之間做選擇。比較頁可減少切換頁面的次數，讓決策更快、轉換率更高。\n\n" +
                "如不需要這個功能可以拿掉，整張卡會更簡潔。"
              }
              pageId={pageId}
              elementId={`compare-${p.code}`}
              elementLabel="加入比較"
              position="top-right"
            >
              {compareLabel}
            </Annotated>
          ) : (
            compareLabel
          );
        })()}
      </div>
    </>
  );
}

/* ============== Component ============== */
export function ProductListMockup({
  annotations = false,
  pageId = "products-list",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  return (
    <MockupShell url="https://hjhj.com.tw/products/紙杯類/公版瓦楞杯">
      <MockupSiteHeader />

      {/* Page banner — 簡化：只留標題 + 商品數 */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1760px] px-6 py-7">
          <h1 className="text-2xl font-bold text-zinc-900">紙杯／膠杯類</h1>
          <p className="mt-1.5 text-sm text-zinc-500">
            共 62 款商品
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-zinc-100 bg-white px-6 py-2.5">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <a className="hover:text-zinc-900">首頁</a>
          <span className="mx-2 text-zinc-300">/</span>
          <a className="hover:text-zinc-900">公版商品</a>
          <span className="mx-2 text-zinc-300">/</span>
          <a className="hover:text-zinc-900">紙杯／膠杯類</a>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="font-semibold text-zinc-900">公版瓦楞杯</span>
        </div>
      </div>

      {/* Main */}
      <div className="bg-zinc-50/50">
        <div className="mx-auto flex max-w-[1760px] gap-6 px-6 py-8">
          {/* Sidebar */}
          <aside className="w-72 shrink-0 space-y-6">
            {/* Categories */}
            <div className="rounded-xl bg-white p-5 shadow-sm border border-zinc-100">
              <h3 className="mb-3 text-base font-bold text-zinc-900">商品分類</h3>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat.name}>
                    <div
                      className={`flex items-center justify-between rounded-md px-3 py-2 cursor-pointer ${
                        cat.active
                          ? "bg-amber-700 text-white font-semibold"
                          : "text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={cat.active ? "text-amber-200" : "text-zinc-400"}>
                          {cat.expanded ? <ChevronDown /> : <ChevronRight />}
                        </span>
                        <span className="text-sm">{cat.name}</span>
                      </span>
                      <span className={`text-xs ${cat.active ? "text-amber-200" : "text-zinc-400"}`}>
                        {cat.count}
                      </span>
                    </div>
                    {cat.expanded && (
                      <ul className="ml-4 mt-1 space-y-0.5 border-l border-amber-200 pl-3">
                        {SUBCATS.map((sc) => (
                          <li
                            key={sc.name}
                            className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-sm cursor-pointer ${
                              sc.active
                                ? "bg-amber-50 text-amber-900 font-semibold"
                                : "text-zinc-600 hover:bg-zinc-50"
                            }`}
                          >
                            <span>{sc.name}</span>
                            <span className="text-xs text-zinc-400">{sc.count}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Filters */}
            <div className="rounded-xl bg-white p-5 shadow-sm border border-zinc-100">
              <h3 className="mb-3 flex items-center justify-between text-base font-bold text-zinc-900">
                篩選條件
                <button className="text-xs font-normal text-amber-700 hover:underline">
                  清除全部
                </button>
              </h3>
              <div className="space-y-5 text-sm">
                <div>
                  <div className="mb-2 font-semibold text-zinc-700">容量</div>
                  <div className="space-y-2">
                    {["8oz", "12oz", "16oz", "22oz"].map((v, i) => (
                      <label key={v} className="flex items-center gap-2 text-zinc-700 cursor-pointer">
                        <input type="checkbox" defaultChecked={i === 0} className="size-4 rounded border-zinc-300 accent-amber-700" />
                        {v}
                        <span className="ml-auto text-xs text-zinc-400">({4 - i})</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Questioned
                  show={annotations}
                  questions={Q_SPEC}
                  pageId={pageId}
                  position="top-right"
                >
                  <div className="border-t border-zinc-100 pt-4">
                    <div className="mb-2 font-semibold text-zinc-700">材質</div>
                    <div className="space-y-2">
                      {[
                        { v: "紙", c: 8 },
                        { v: "PLA", c: 4 },
                        { v: "PET", c: 3 },
                        { v: "PP", c: 2 },
                      ].map((m) => (
                        <label key={m.v} className="flex items-center gap-2 text-zinc-700 cursor-pointer">
                          <input type="checkbox" className="size-4 rounded border-zinc-300 accent-amber-700" />
                          {m.v}
                          <span className="ml-auto text-xs text-zinc-400">({m.c})</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </Questioned>

                <div className="border-t border-zinc-100 pt-4">
                  <div className="mb-2 font-semibold text-zinc-700">顏色</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { c: "bg-white", n: "白" },
                      { c: "bg-zinc-800", n: "黑" },
                      { c: "bg-amber-700", n: "牛皮" },
                      { c: "bg-emerald-50", n: "透明" },
                    ].map((co) => (
                      <button key={co.n} className="size-8 rounded-full border-2 border-zinc-200 shadow-sm hover:border-amber-700 hover:scale-110 transition-all" title={co.n}>
                        <span className={`block size-full rounded-full ${co.c}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-4">
                  <div className="mb-2 font-semibold text-zinc-700">特色標籤</div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(TAG_STYLES).map(([k, v]) => (
                      <button key={k} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 hover:border-amber-700 hover:text-amber-800">
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Viewed */}
            <Annotated
              show={annotations}
              source="ours"
              label="加值功能"
              title="最近瀏覽紀錄"
              rationale={
                "依登入會員的瀏覽紀錄，自動列出最近看過的 5 件商品。\n\n" +
                "原因：B2B 餐飲業者採購週期較長，客戶常常看了商品先離開，幾天後再回來下單。直接顯示「最近瀏覽」可大幅縮短回頭找商品的時間。\n\n" +
                "技術上是讀取會員行為資料（凌越 ERP 不需提供），對伺服器負擔很低，建議納入。如不需要可以拿掉。"
              }
              pageId={pageId}
              elementId="recent-viewed"
              elementLabel="最近瀏覽"
            >
              <div className="rounded-xl bg-white p-5 shadow-sm border border-zinc-100">
                <h3 className="mb-3 text-base font-bold text-zinc-900">最近瀏覽</h3>
                <ul className="space-y-3">
                  {RECENT_VIEWED.map((r) => (
                    <li key={r.code} className="flex items-center gap-2.5 text-sm cursor-pointer hover:bg-zinc-50 p-1.5 -m-1.5 rounded">
                      <span className="size-11 shrink-0 rounded bg-gradient-to-br from-amber-50 to-amber-100" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-zinc-800 font-medium">{r.name}</div>
                        <div className="text-xs text-zinc-400 font-mono">{r.code}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Annotated>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {/* Active filters */}
            <div className="mb-4 flex items-center gap-2 text-sm">
              <span className="text-zinc-500">已套用:</span>
              <span className="flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 px-3 py-1 font-medium">
                容量: 8oz
                <button className="text-amber-600 hover:text-amber-900">×</button>
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 px-3 py-1 font-medium">
                色: 白
                <button className="text-amber-600 hover:text-amber-900">×</button>
              </span>
            </div>

            {/* Top bar */}
            <div className="mb-5 flex items-center justify-between gap-4 rounded-lg bg-white px-5 py-3 shadow-sm border border-zinc-100">
              <div className="flex items-center gap-3 text-sm text-zinc-600">
                <span>共 <span className="font-bold text-zinc-900">12</span> 件商品</span>
                <span className="text-zinc-300">|</span>
                <span>顯示第 1 - 12 筆</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <select className="rounded-md border border-zinc-300 bg-white px-3 py-2">
                  <option>排序：最新上架</option>
                  <option>熱銷優先</option>
                  <option>價格低到高</option>
                  <option>價格高到低</option>
                </select>
                <select className="rounded-md border border-zinc-300 bg-white px-3 py-2">
                  <option>每頁 12</option>
                  <option>每頁 24</option>
                  <option>每頁 48</option>
                </select>
                <div className="flex rounded-md border border-zinc-300 bg-white">
                  <button className="px-2.5 py-2 bg-amber-700 text-white rounded-l-md">
                    <GridIcon />
                  </button>
                  <button className="px-2.5 py-2 text-zinc-500">
                    <ListIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-3 gap-4">
              {PRODUCTS.map((p, idx) => {
                const pins = CARD_PINS[idx];
                return (
                  <article
                    key={p.code}
                    className="group flex h-full flex-col rounded-xl bg-white shadow-sm border border-zinc-100 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {renderCardInner(p, {
                      annotations,
                      pageId,
                      pricePins: pins?.price,
                      samplePins: pins?.sample,
                      annotateCompare: idx === 4,
                      annotateFields: idx === 1,
                    })}
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-between border-t border-zinc-200 bg-white rounded-lg px-4 py-3 shadow-sm">
              <span className="text-xs text-zinc-500">顯示 1-12 / 共 12 件商品</span>
              <div className="flex items-center gap-1 text-sm">
                <button className="rounded border border-zinc-200 bg-white px-3 py-1.5 text-zinc-400">‹</button>
                <button className="rounded bg-amber-700 px-3 py-1.5 font-bold text-white">1</button>
                <button className="rounded border border-zinc-200 bg-white px-3 py-1.5 text-zinc-700 hover:bg-zinc-50">2</button>
                <button className="rounded border border-zinc-200 bg-white px-3 py-1.5 text-zinc-700 hover:bg-zinc-50">3</button>
                <button className="rounded border border-zinc-200 bg-white px-3 py-1.5 text-zinc-700 hover:bg-zinc-50">›</button>
              </div>
            </div>

            {/* Related products */}
            <Annotated
              show={annotations}
              source="ours"
              label="加值功能"
              title="推薦搭配商品"
              rationale={
                "在商品列表底部主動推薦「搭配商品」（例：紙杯 → 杯墊紙、外帶提袋、封口貼紙）。\n\n" +
                "原因：餐飲業者買紙杯，通常會一起買杯蓋、杯墊、外帶提袋。主動推薦可以提升客單價、減少客戶來回找商品的時間。後台可設定每件主商品的搭配商品清單。\n\n" +
                "如目前沒有這需求可以先不做，未來再加。"
              }
              pageId={pageId}
              elementId="related-products"
              elementLabel="推薦搭配商品"
              position="top-left"
            >
              <section className="mt-12 rounded-xl bg-white p-6 shadow-sm border border-zinc-100">
                <div className="mb-5 flex items-center justify-between border-b border-zinc-100 pb-3">
                  <h2 className="text-lg font-bold text-zinc-900">推薦搭配商品</h2>
                  <a className="text-sm text-zinc-600 hover:text-zinc-900">
                    看更多 →
                  </a>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {RELATED.map((r) => (
                    <article
                      key={r.name}
                      className="group cursor-pointer rounded-lg overflow-hidden border border-zinc-200 hover:border-zinc-400 transition-all"
                    >
                      <div className="aspect-square bg-zinc-100 flex items-center justify-center text-zinc-300 text-xs">
                        商品圖
                      </div>
                      <div className="p-3">
                        <div className="text-sm font-bold text-zinc-900 leading-tight">
                          {r.name}
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">{r.note}</div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </Annotated>
          </main>
        </div>
      </div>

      {/* Compare bar (sticky-style at bottom) */}
      <Annotated
        show={annotations}
        source="ours"
        label="加值功能"
        pageId={pageId}
        elementId="compare-bar"
        elementLabel="商品比較功能"
        position="top-right"
      >
        <div className="border-t border-zinc-200 bg-zinc-900 px-6 py-3 text-white">
          <div className="mx-auto flex max-w-[1760px] items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <CompareIcon />
              已選 <span className="font-bold mx-1">2</span> 件商品比較（最多 4 件）
            </span>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="size-7 rounded bg-amber-100" />
                <span className="size-7 rounded bg-emerald-100" />
              </div>
              <button className="rounded border border-zinc-700 px-3 py-1.5 text-zinc-300 hover:bg-zinc-800">
                清空
              </button>
              <button className="rounded bg-amber-600 px-4 py-1.5 font-bold text-white hover:bg-amber-500">
                開始比較 →
              </button>
            </div>
          </div>
        </div>
      </Annotated>

      <MockupSiteFooter />
    </MockupShell>
  );
}
