import { Annotated, Questioned } from "../CommentSystem";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

/* ============== Questions ============== */
const Q1 = {
  no: "Q1",
  question: "多層規格選項要支援幾層？",
  context: "例：紙杯 → 容量（8oz/12oz）→ 材質（PE/PLA）→ 印刷（單面/雙面）= 3 層",
};
const Q10 = {
  no: "Q10",
  question: "商品影片來源？",
  context: "選項：後台直接上傳影片檔 / 嵌入 YouTube / Vimeo 連結。前者佔伺服器空間，後者較省。",
};
const Q11 = {
  no: "Q11",
  question: "商品 3D 圖整合方式？",
  context:
    "選項：① Pacdora Editor API（月費，現成模板）② 自製 Three.js（一次性開發）③ 360° 旋轉拍照（無 3D 但有立體感）④ 暫不做。詳見 obs 文件 10。",
};
const Q13 = {
  no: "Q13",
  question: "規格切換要切到不同 URL，還是同頁切？",
  context:
    "切 URL → 每個規格組合有獨立網址，SEO 加分、可加入書籤；同頁切 → 反應快、共用同一頁，但無法針對特定規格收藏。建議：B2B 客戶常重複下單，獨立 URL 較佳。",
};
const Q14 = {
  no: "Q14",
  question: "詳情頁是否顯示真實庫存量？",
  context:
    "選項：① 顯示精確數字（500 入）② 顯示分級（現貨/僅剩少量/缺貨）③ 不顯示，一律「可下單」由業務協調。B2B 客戶一次下幾百箱，精確數字可能不利商談。",
};
const Q15 = {
  no: "Q15",
  question: "數量輸入支援整箱訂購？MOQ（最低訂購量）怎麼顯示？",
  context:
    "B2B 包材常以箱為單位，建議：① 數量步進器以 50/100 為單位 ② 一鍵切「整箱模式」直接輸入箱數 ③ MOQ 提示 + 自動補足到 MOQ。",
};
const Q16 = {
  no: "Q16",
  question: "詳情頁是否顯示「會員專屬價」？非會員看到什麼？",
  context:
    "選項：① 一律「請洽詢」+ 引導登入 ② 非會員看標準零售價、會員看 X 折 ③ 不分等級，全部會員看同一價。",
};
const Q17 = {
  no: "Q17",
  question: "是否要「請業務聯繫」按鈕？走 LINE@ 還是表單？",
  context:
    "B2B 大宗訂購常需先談條件再下單。LINE@ 對業務最直接，但要培訓客服；表單可結構化收 lead。建議兩者都做：表單為主、附 LINE@ 備援。",
};
const Q18 = {
  no: "Q18",
  question: "商品說明分頁要支援哪些欄位？需要可後台維護嗎？",
  context:
    "標配：商品說明、規格表、印刷規範、運送資訊。可選：常見問答、案例分享、客戶評論、檢驗報告下載。每項都需要後台 CMS 編輯能力。",
};

type QItem = { no: string; question: string; context?: string };

/* ============== Icons ============== */
function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
function CubeIcon() {
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
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
function PhoneIcon() {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function CheckCircleIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ============== Data ============== */
const THUMBNAILS = ["主圖", "正面", "側面", "細節", "包裝"];

const SPECS = {
  capacity: ["8oz", "12oz", "16oz", "22oz"],
  color: [
    { v: "白", c: "#fff" },
    { v: "牛皮", c: "#92400e" },
    { v: "黑", c: "#1a1a1a" },
  ],
  print: [
    { v: "未印刷", desc: "純色、無印刷" },
    { v: "單色印刷", desc: "1 個 PMS 色" },
    { v: "雙色印刷", desc: "2 個 PMS 色" },
    { v: "全彩印刷", desc: "CMYK 4 色" },
  ],
};

const TABS = ["商品說明", "規格表", "印刷規範", "運送資訊", "常見問答"];

const ADDONS = [
  { name: "杯蓋 90mm 口徑", note: "適配 8/12oz", price: "+$NT 280/箱" },
  { name: "杯墊紙 100gsm", note: "桌面防護", price: "+$NT 120/包" },
  { name: "外帶提袋 1-4 杯", note: "整套外帶", price: "+$NT 350/組" },
];

const RELATED = [
  { code: "PC-12-001", name: "12oz 公版瓦楞紙杯", spec: "100% 食品級紙材" },
  { code: "PC-16-001", name: "16oz 公版瓦楞紙杯", spec: "100% 食品級紙材" },
  { code: "DC-08-001", name: "8oz 雙層中空紙杯", spec: "雙層隔熱結構" },
  { code: "PL-08-001", name: "8oz PLA 環保杯", spec: "可生物分解" },
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
    <MockupShell url="https://hjhj.com.tw/products/紙杯類/公版瓦楞杯/PC-08-001">
      <MockupSiteHeader />

      {/* Breadcrumb */}
      <div className="border-b border-zinc-100 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <a className="hover:text-zinc-900">首頁</a>
          <span className="mx-2 text-zinc-300">/</span>
          <a className="hover:text-zinc-900">公版商品</a>
          <span className="mx-2 text-zinc-300">/</span>
          <a className="hover:text-zinc-900">紙杯／膠杯類</a>
          <span className="mx-2 text-zinc-300">/</span>
          <a className="hover:text-zinc-900">公版瓦楞杯</a>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="font-semibold text-zinc-900">8oz 公版瓦楞紙杯</span>
        </div>
      </div>

      {/* Main: image gallery (left) + info & CTA (right) */}
      <div className="bg-zinc-50/50 px-6 py-10">
        <div className="mx-auto grid max-w-[1760px] grid-cols-1 gap-10 lg:grid-cols-2">
          {/* ===== Left: image gallery + media buttons ===== */}
          <div>
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                <div className="text-center">
                  <div className="text-base font-medium">主圖</div>
                  <div className="mt-1 text-xs">8oz 公版瓦楞紙杯</div>
                </div>
              </div>
              <span className="absolute top-4 left-4 rounded bg-white/95 px-2 py-0.5 text-[10px] font-medium text-zinc-700 border border-zinc-300">
                新品
              </span>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 grid grid-cols-5 gap-2">
              {THUMBNAILS.map((label, i) => (
                <button
                  key={i}
                  className={`relative aspect-square overflow-hidden rounded-md border-2 bg-white ${
                    i === 0 ? "border-zinc-900" : "border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-400">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Media buttons (Q10 / Q11) */}
            <div className="mt-5 flex gap-2">
              {wrapQ(
                [Q10],
                <button className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3.5 py-2 text-sm text-zinc-700 hover:border-zinc-700">
                  <PlayIcon />
                  商品影片
                </button>,
              )}
              {wrapQ(
                [Q11],
                <button className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3.5 py-2 text-sm text-zinc-700 hover:border-zinc-700">
                  <CubeIcon />
                  3D 預覽
                </button>,
              )}

              {annotations && (
                <Annotated
                  show
                  source="ours"
                  label="加值功能"
                  title="影片 / 3D 入口位置"
                  rationale={
                    "建議把影片與 3D 入口放在主圖下方，而非藏在「商品說明」分頁裡。\n\n" +
                    "原因：B2B 客戶查看商品時動線是「主圖 → 縮圖 → 規格 → 加入購物車」，影片如果藏在分頁要往下滑很多才看到，多數人會略過。放主圖旁可在 3 秒內被注意到。\n\n" +
                    "如要省版面可改成主圖右上角的 ▶ icon 浮層，但點擊範圍小，B2B 不建議。"
                  }
                  pageId={pageId}
                  elementId="media-position"
                  elementLabel="影片 / 3D 入口位置"
                  position="top-right"
                >
                  <span className="ml-2 text-xs text-zinc-400">↑ 位置編排</span>
                </Annotated>
              )}
            </div>
          </div>

          {/* ===== Right: info, spec, qty, price, CTA, addon ===== */}
          <div className="space-y-5">
            {/* Title block */}
            <div>
              <div className="text-xs font-mono text-zinc-400">
                商品編號：PC-08-001
              </div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
                8oz 公版瓦楞紙杯
              </h1>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                100% 食品級紙材，雙層瓦楞防燙設計，適用熱飲。FDA 食品接觸認證。
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-emerald-700">
                  <CheckCircleIcon />
                  FDA 認證
                </span>
                <span className="text-zinc-300">|</span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <CheckCircleIcon />
                  ISO 22000
                </span>
                <span className="text-zinc-300">|</span>
                <span className="text-zinc-500">分享商品</span>
              </div>
            </div>

            {/* Spec selectors (Q1 + Q13) */}
            {wrapQ(
              [Q1, Q13],
              <div className="space-y-5 rounded-xl border border-zinc-200 bg-white p-5">
                {/* 容量 */}
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-zinc-900">容量</span>
                    <span className="text-xs text-zinc-500">單位：oz / ml</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SPECS.capacity.map((v) => (
                      <button
                        key={v}
                        className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                          v === "8oz"
                            ? "border-zinc-900 bg-zinc-900 text-white font-bold"
                            : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-900"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 顏色 */}
                <div className="border-t border-zinc-100 pt-4">
                  <div className="mb-2 text-sm font-medium text-zinc-900">顏色</div>
                  <div className="flex items-center gap-3">
                    {SPECS.color.map((co, i) => (
                      <button
                        key={co.v}
                        className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors ${
                          i === 0
                            ? "border-zinc-900 bg-zinc-50 font-bold text-zinc-900"
                            : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-900"
                        }`}
                      >
                        <span
                          className="size-4 rounded-full border border-zinc-200 shadow-inner"
                          style={{ background: co.c }}
                        />
                        {co.v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 印刷選項 */}
                <div className="border-t border-zinc-100 pt-4">
                  <div className="mb-2 text-sm font-medium text-zinc-900">
                    印刷選項
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SPECS.print.map((p, i) => (
                      <button
                        key={p.v}
                        className={`flex flex-col items-start gap-0.5 rounded-md border p-3 text-left text-sm transition-colors ${
                          i === 0
                            ? "border-zinc-900 bg-zinc-50 font-bold text-zinc-900"
                            : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-900"
                        }`}
                      >
                        <span>{p.v}</span>
                        <span className="text-xs font-normal text-zinc-500">
                          {p.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-zinc-500">
                    需要自訂印刷？請走「私版商品報價系統」可上傳設計稿。
                  </p>
                </div>
              </div>,
            )}

            {/* Quantity (Q14 + Q15) */}
            {wrapQ(
              [Q14, Q15],
              <div className="rounded-xl border border-zinc-200 bg-white p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-900">數量</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-zinc-500">
                      最低訂購量 (MOQ)：<span className="font-bold text-zinc-900">100</span>
                    </span>
                    <span className="text-zinc-300">|</span>
                    <span className="flex items-center gap-1 font-medium text-emerald-700">
                      <CheckCircleIcon />
                      現貨可立即出貨
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-md border border-zinc-300 bg-white">
                    <button className="flex size-10 items-center justify-center text-zinc-600 hover:bg-zinc-50">
                      <MinusIcon />
                    </button>
                    <input
                      type="text"
                      defaultValue="100"
                      className="w-20 border-x border-zinc-300 px-3 py-2 text-center text-base font-bold text-zinc-900 focus:outline-none"
                      readOnly
                    />
                    <button className="flex size-10 items-center justify-center text-zinc-600 hover:bg-zinc-50">
                      <PlusIcon />
                    </button>
                  </div>
                  <span className="text-sm text-zinc-500">入</span>

                  <span className="ml-auto text-zinc-300">|</span>

                  <label className="flex items-center gap-1.5 text-sm text-zinc-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-zinc-300 accent-amber-700"
                    />
                    整箱訂購（1 箱 = 1,000 入）
                  </label>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-zinc-500">快速選量：</span>
                  {[100, 500, 1000, 5000].map((q) => (
                    <button
                      key={q}
                      className="rounded border border-zinc-300 bg-white px-2 py-0.5 text-zinc-700 hover:border-zinc-700"
                    >
                      {q.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>,
            )}

            {/* Price (Q16) */}
            {wrapQ(
              [Q16],
              <div className="rounded-xl border border-zinc-200 bg-white p-5">
                <div className="text-3xl font-bold text-zinc-900">
                  請洽詢
                </div>
                <p className="mt-1 text-sm text-emerald-700 font-medium">
                  登入後可查看會員專屬價
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  訂購量越多單價越優惠，會員等級越高折扣越多。
                </p>
              </div>,
            )}

            {/* CTA buttons (Q17) */}
            {wrapQ(
              [Q17],
              <div className="space-y-2 rounded-xl border border-zinc-200 bg-white p-5">
                <button className="flex w-full items-center justify-center gap-2 rounded-md bg-amber-700 px-4 py-3.5 text-base font-bold text-white shadow-sm hover:bg-amber-800">
                  <PlusIcon />
                  加入購物車
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-1.5 rounded-md border border-emerald-400 bg-emerald-50 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-100">
                    申請樣品
                  </button>
                  <button className="flex items-center justify-center gap-1.5 rounded-md border border-zinc-400 bg-white py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-50">
                    <PhoneIcon />
                    請業務聯繫
                  </button>
                </div>
              </div>,
            )}

            {/* 我們建議: 加購配件 */}
            {annotations ? (
              <Annotated
                show
                source="ours"
                label="加值功能"
                title="加購配件區"
                rationale={
                  "在加入購物車按鈕下方，列出常被一起買的搭配商品（如 8oz 紙杯 → 90mm 杯蓋、杯墊、外帶提袋）。\n\n" +
                  "原因：B2B 餐飲客戶買紙杯通常一起買杯蓋，分開找會增加心智負擔。主動推薦可以提升客單價。\n\n" +
                  "後台可設定每件主商品的「常見搭配」清單。如不需要可以先不做。"
                }
                pageId={pageId}
                elementId="addons"
                elementLabel="加購配件區"
                position="top-right"
              >
                <AddonsBox />
              </Annotated>
            ) : (
              <AddonsBox />
            )}
          </div>
        </div>
      </div>

      {/* Tabbed content (Q18) */}
      <div className="border-t border-zinc-200 bg-white px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          {wrapQ(
            [Q18],
            <div>
              {/* Tabs */}
              <div className="flex border-b border-zinc-200">
                {TABS.map((t, i) => (
                  <button
                    key={t}
                    className={`px-5 py-3 text-sm transition-colors ${
                      i === 0
                        ? "border-b-2 border-zinc-900 font-bold text-zinc-900 -mb-px"
                        : "text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Active tab content */}
              <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-3 text-sm text-zinc-700 leading-relaxed">
                  <h3 className="text-base font-bold text-zinc-900">
                    產品特色
                  </h3>
                  <p>
                    8oz 公版瓦楞紙杯採用 100% 食品級紙材，外層瓦楞結構提供優異隔熱效果，雙手持握不燙手，無需另加杯套。
                  </p>
                  <p>
                    內層為食品級 PE 淋膜，能耐 100°C 熱飲、不易滲漏。底部緊密封口設計，運送過程中不易變形。
                  </p>
                  <h3 className="mt-5 text-base font-bold text-zinc-900">
                    適用情境
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>咖啡廳、手搖飲料店外帶</li>
                    <li>會議、活動、外燴飲料供應</li>
                    <li>連鎖品牌 logo 印刷（請走私版報價）</li>
                  </ul>
                </div>

                {/* Side info */}
                <aside className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm">
                  <div>
                    <div className="text-xs text-zinc-500">材質</div>
                    <div className="font-medium text-zinc-900">瓦楞紙 + 內層 PE 淋膜</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">尺寸</div>
                    <div className="font-medium text-zinc-900">高 92mm × 口徑 80mm</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">耐熱</div>
                    <div className="font-medium text-zinc-900">100°C</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">包裝</div>
                    <div className="font-medium text-zinc-900">1,000 入 / 箱</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">產地</div>
                    <div className="font-medium text-zinc-900">台灣</div>
                  </div>
                </aside>
              </div>
            </div>,
          )}
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
                key={r.code}
                className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:shadow-md"
              >
                <div className="aspect-square bg-zinc-100 flex items-center justify-center text-zinc-300 text-xs">
                  商品圖
                </div>
                <div className="p-4">
                  <div className="text-xs font-mono text-zinc-400">
                    {r.code}
                  </div>
                  <div className="mt-1 text-sm font-bold text-zinc-900">
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

function AddonsBox() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="mb-3 text-sm font-bold text-zinc-900">
        買這支紙杯的人也加購：
      </div>
      <ul className="space-y-2.5">
        {ADDONS.map((a) => (
          <li
            key={a.name}
            className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50/60 p-3"
          >
            <div className="size-12 rounded bg-white border border-zinc-200" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-zinc-900 truncate">
                {a.name}
              </div>
              <div className="text-xs text-zinc-500">{a.note}</div>
            </div>
            <div className="text-xs font-bold text-amber-700">{a.price}</div>
            <button className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-700 hover:border-zinc-700">
              + 加
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
