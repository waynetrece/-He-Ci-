import { Annotated, Questioned } from "../CommentSystem";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

/* ============== Questions ============== */
const Q1 = {
  no: "Q1",
  question: "商品影片來源？",
  context:
    "選項：後台直接上傳影片檔 / 嵌入 YouTube、Vimeo 連結。前者佔伺服器空間，後者較省。",
  clientRef: {
    source: "後台 / 公版商品 (5)",
    quote: "商品頁可+影片 or 3D 圖（連結 pacdora.com 模板）",
    note: "您有寫要有影片或 3D 圖，並給了 pacdora 範例（為 3D 模板），但「影片」是上傳檔還是 YouTube/Vimeo 嵌入未指定。",
  },
};
const Q2 = {
  no: "Q2",
  question: "詳情頁是否顯示「會員專屬價」？非會員看到什麼？",
  context:
    "HJ 現網站做法：未登入只看到「立即登入/註冊」，登入後才看到價格。要保留這做法、還是改成「非會員看零售價、會員看折扣價」？",
  clientRef: {
    source: "前台 / 公版商品系列 (1) + 後台 / 顧客管理 (2)",
    quote: "提供給客人下單；多層會員分級：商品會因顧客分級而有不同價",
    note: "您有寫要讓客人下單、會員分級不同價，但「非會員看零售價 vs 必須登入才看價」這個常見岔路未指定。",
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

/* ============== Icons ============== */
function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function MinusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function HeartOutlineIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function PencilIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ============== Data — 對齊 HJ 真實商品結構 ============== */
const PRODUCT = {
  title: "公版冷熱共用杯 12oz 白色",
  tagline:
    "紙杯再升級! 雙面PE淋膜，冷熱共用不受限，紙杯外層可耐水珠濕氣，維持杯身硬挺!",
  specs: [
    { label: "容量", value: "12oz（約 360cc）" },
    { label: "尺寸", value: "口徑 90 × H110 mm" },
    { label: "材質", value: "單層食品紙 + 雙面 PE 淋膜" },
    { label: "單位", value: "50 入/條　20 條/箱" },
    { label: "耐熱", value: "0°C ~ 90°C，冷熱飲皆可" },
  ],
};

const THUMBNAILS = ["主圖", "正面", "側面", "細節", "包裝"];

const RELATED = [
  { name: "公版冷熱共用杯 8oz 白色", spec: "8oz / 240cc" },
  { name: "公版冷熱共用杯 16oz 白色", spec: "16oz / 480cc" },
  { name: "公版瓦楞杯 12oz", spec: "雙層瓦楞防燙" },
  { name: "公版 PLA 環保杯 12oz", spec: "可生物分解" },
];

/* ============== Component ============== */
export function ProductDetailMockup({
  annotations = false,
  pageId = "products-detail",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const wrapQ = (qs: QItem[], children: React.ReactNode) =>
    annotations ? (
      <Questioned show questions={qs} pageId={pageId} position="top-right">
        {children}
      </Questioned>
    ) : (
      children
    );

  return (
    <MockupShell url="https://hjhj.com.tw/products/singlewallpapercuphotandcold-12oz-white">
      <MockupSiteHeader />

      {/* Breadcrumb — 對齊 HJ 真實格式 */}
      <div className="border-b border-zinc-100 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <a className="hover:text-zinc-900">全部商品</a>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="text-zinc-900">─ 暢銷精選 ─</span>
        </div>
      </div>

      {/* Main: image left + info right */}
      <div className="bg-zinc-50/50 px-6 py-10">
        <div className="mx-auto grid max-w-[1760px] grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left: image gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                <div className="text-center">
                  <div className="text-base font-medium">主圖</div>
                  <div className="mt-1 text-xs">{PRODUCT.title}</div>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-5 gap-2">
              {THUMBNAILS.map((label, i) => (
                <button
                  key={i}
                  className={`relative aspect-square overflow-hidden rounded-md border-2 bg-white ${
                    i === 0
                      ? "border-zinc-900"
                      : "border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-400">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* 商品影片入口 — Q1 釘這（HJ 現網站沒有，計畫新增的功能） */}
            <div className="mt-5">
              {wrapQ(
                [Q1],
                <button className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3.5 py-2 text-sm text-zinc-700 hover:border-zinc-700">
                  <PlayIcon />
                  商品影片
                </button>,
              )}
            </div>
          </div>

          {/* Right: info, specs, price, CTA */}
          <div className="space-y-5">
            {/* Title + tagline — 規格直接寫死在標題（對齊 HJ 真實做法） */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                {PRODUCT.title}
              </h1>
              <p className="mt-3 text-sm text-zinc-700 leading-relaxed">
                {PRODUCT.tagline}
              </p>
            </div>

            {/* Specs list — 結構化 5 欄（HJ 現網站是純文字，後台應字典化） */}
            {annotations ? (
              <Annotated
                show
                source="ours"
                label="後台改善"
                title="規格欄位後台字典化"
                rationale={
                  "HJ 現網站每件商品的「容量／尺寸／材質／單位／耐熱」都是後台手打文字。\n\n" +
                  "建議後台把這些欄位建成結構化字典：\n" +
                  "・容量、尺寸：填數字 + 單位下拉\n" +
                  "・材質：從預建材質清單勾選（牛卡紙、PE、PLA、PET、PP …）\n" +
                  "・單位：填「入/條/箱」三層數字\n" +
                  "・耐熱：填上下限數字\n\n" +
                  "好處：① 上架快 5 倍 ② 前端可結構化展示（規格表）③ 可被搜尋／篩選 ④ 報表分析有結構。\n\n" +
                  "如不需要可以維持現有「自由打字」模式。"
                }
                pageId={pageId}
                elementId="spec-fields"
                elementLabel="規格欄位"
                position="top-right"
              >
                <SpecBlock />
              </Annotated>
            ) : (
              <SpecBlock />
            )}

            {/* Price — Q2 */}
            {wrapQ(
              [Q2],
              <div className="rounded-xl border border-zinc-200 bg-white p-5">
                <div className="text-2xl font-bold text-zinc-900">請洽詢</div>
                <a className="mt-1 inline-block text-sm font-medium text-amber-700 hover:underline">
                  立即登入 / 註冊　看會員價
                </a>
              </div>,
            )}

            {/* Quantity input — 簡單數字輸入（對齊 HJ 真實做法） */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="mb-3 text-sm font-medium text-zinc-900">數量</div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-md border border-zinc-300 bg-white">
                  <button className="flex size-10 items-center justify-center text-zinc-600 hover:bg-zinc-50">
                    <MinusIcon />
                  </button>
                  <input
                    type="text"
                    defaultValue="50"
                    className="w-20 border-x border-zinc-300 px-3 py-2 text-center text-base font-bold text-zinc-900 focus:outline-none"
                    readOnly
                  />
                  <button className="flex size-10 items-center justify-center text-zinc-600 hover:bg-zinc-50">
                    <PlusIcon />
                  </button>
                </div>
                <span className="text-sm text-zinc-500">入</span>
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                上方規格已說明：50 入/條，20 條/箱
              </p>
            </div>

            {/* Action buttons — 對齊 HJ 真實做法（追蹤、貨到通知）+ 申請樣品（客戶 PDF 要求新增） */}
            <div className="space-y-2">
              <button className="flex w-full items-center justify-center gap-2 rounded-md bg-amber-700 px-4 py-3.5 text-base font-bold text-white shadow-sm hover:bg-amber-800">
                <PlusIcon />
                加入購物車
              </button>

              {/* 申請樣品按鈕 — 客戶 PDF 明確要求新增（HJ 現網站沒這功能） */}
              {annotations ? (
                <Annotated
                  show
                  source="ours"
                  label="客戶 PDF 要求"
                  title="申請樣品按鈕"
                  rationale={
                    "客戶 PDF 明確要求：「公版每個商品頁要加申請樣品按鈕」，列為特殊功能。\n\n" +
                    "HJ 現網站還沒有這功能，新平台要新增。\n\n" +
                    "點擊後跳轉到「樣品申請流程」頁。實際表單內容會等客戶確認流程細節後再做（收費規則、是否限會員、是否需審核 等）。"
                  }
                  pageId={pageId}
                  elementId="sample-cta"
                  elementLabel="申請樣品按鈕"
                  position="top-right"
                >
                  <a
                    href="/modules/products/sample"
                    className="flex w-full items-center justify-center gap-1.5 rounded-md border-2 border-emerald-500 bg-emerald-50 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-100"
                  >
                    申請樣品（先寄樣再下單）
                  </a>
                </Annotated>
              ) : (
                <a
                  href="/modules/products/sample"
                  className="flex w-full items-center justify-center gap-1.5 rounded-md border-2 border-emerald-500 bg-emerald-50 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-100"
                >
                  申請樣品（先寄樣再下單）
                </a>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-1.5 rounded-md border border-zinc-300 bg-white py-2.5 text-sm text-zinc-700 hover:border-zinc-700">
                  <HeartOutlineIcon />
                  加入追蹤清單
                </button>
                <button className="flex items-center justify-center gap-1.5 rounded-md border border-zinc-300 bg-white py-2.5 text-sm text-zinc-700 hover:border-zinc-700">
                  <BellIcon />
                  貨到通知我
                </button>
              </div>
            </div>

            {/* 按需客製入口 — jcolor 啟發的我們建議：公版 → 私版 的橋 */}
            {annotations ? (
              <Annotated
                show
                source="ours"
                label="加值功能（jcolor 啟發）"
                title="按需客製 / 私版報價入口"
                rationale={
                  "在公版商品詳情頁加一個明顯的「按需客製 / 私版報價」按鈕，導到「私版客製商品報價系統」。\n\n" +
                  "原因：企業會員看公版商品時，常會想到「我要印自家 logo / 改尺寸 / 改材質」。如果沒有明確入口，他們只能離開或寄信問業務，轉換率降低。\n\n" +
                  "範例：[jcolor BC-67](https://www.jcolor.com.tw/product/BC-67) 在公版商品旁就有「按需客製」按鈕，是公版→客製的橋。\n\n" +
                  "如不需要可以等私版系統完成後再加。"
                }
                pageId={pageId}
                elementId="custom-cta"
                elementLabel="按需客製入口"
                position="top-right"
              >
                <CustomCtaButton />
              </Annotated>
            ) : (
              <CustomCtaButton />
            )}
          </div>
        </div>
      </div>

      {/* Description sections — 簡單 expand 區塊（不是 5 個 tabs） */}
      <div className="border-t border-zinc-200 bg-white px-6 py-12">
        <div className="mx-auto max-w-[1760px] space-y-3">
          <ExpandableSection title="商品描述" defaultOpen>
            <p>
              本款冷熱共用杯採用單層食品紙 + 雙面 PE 淋膜，外層 PE 可耐水珠濕氣，內層 PE 可耐熱飲不滲漏。
            </p>
            <p>
              口徑 90mm × H110mm，搭配 90mm 平蓋或拱蓋皆可。耐熱範圍 0°C ~ 90°C，適合咖啡、奶茶、果汁等冷熱飲。
            </p>
            <p>適用場景：咖啡廳、手搖飲、會議活動、外帶飲品。</p>
          </ExpandableSection>

          <ExpandableSection title="包裝與配送">
            <p>包裝：50 入/條　20 條/箱（每箱 1,000 入）</p>
            <p>配送：本島 7-11、全家、宅配通；超商取貨限重 5kg。</p>
          </ExpandableSection>

          <ExpandableSection title="檢驗與認證">
            <p>食品級紙材，FDA 食品接觸認證。提供檢驗報告下載（會員專區）。</p>
          </ExpandableSection>
        </div>
      </div>

      {/* Related products */}
      <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900">相似商品</h2>
            <a className="text-sm text-zinc-600 hover:text-zinc-900">
              看更多 →
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {RELATED.map((r) => (
              <article
                key={r.name}
                className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:shadow-md"
              >
                <div className="aspect-square bg-zinc-100 flex items-center justify-center text-zinc-300 text-xs">
                  商品圖
                </div>
                <div className="p-4">
                  <div className="text-sm font-bold text-zinc-900 leading-snug">
                    {r.name}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">{r.spec}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <MockupSiteFooter />
    </MockupShell>
  );
}

function SpecBlock() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="mb-3 text-sm font-bold text-zinc-900">商品規格</div>
      <dl className="grid grid-cols-[5rem_1fr] gap-y-2 gap-x-4 text-sm">
        {PRODUCT.specs.map((s) => (
          <div key={s.label} className="contents">
            <dt className="text-zinc-500">{s.label}</dt>
            <dd className="text-zinc-900">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function CustomCtaButton() {
  return (
    <a
      href="/modules/private-quote"
      className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-amber-700 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800 hover:bg-amber-100"
    >
      <PencilIcon />
      需要客製印刷？走「私版客製報價系統」
      <ArrowRightIcon />
    </a>
  );
}

function ExpandableSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-xl border border-zinc-200 bg-white"
    >
      <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-base font-bold text-zinc-900 hover:bg-zinc-50">
        <span>{title}</span>
        <span className="text-zinc-400 transition-transform group-open:rotate-180">
          <ChevronDown />
        </span>
      </summary>
      <div className="space-y-2 border-t border-zinc-100 px-5 py-4 text-sm text-zinc-700 leading-relaxed">
        {children}
      </div>
    </details>
  );
}
