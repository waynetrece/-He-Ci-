"use client";

import Link from "next/link";
import { useState } from "react";
import { Questioned } from "../CommentSystem";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

/* ============== Questions ============== */
// 32 題 review 已決議事項(直接反映在 mockup 上,不再列為待確認):
// - 同頁切換規格選擇器 + HJ 後台勾選要開放的規格(A 包 Q-A4)
// - 規格組合 SKU 各自獨立、庫存分開、凌越各自編號(D 包)
// - 訪客看一般價、會員看等級價(C 包)
// - 樣品申請限會員、免費 + 收運費、不需後台審核(A 包)

const Q1 = {
  no: "Q1",
  question: "商品影片 / 3D 圖來源？",
  context:
    "選項:(a) 後台直接上傳影片檔(佔伺服器空間,但完全自主) / (b) 嵌入 YouTube、Vimeo 連結(省空間)。3D 圖延用 pacdora.com 模板連結。",
  clientRef: {
    source: "後台 / 公版商品 (5)",
    quote: "商品頁可+影片 or 3D 圖（連結 pacdora.com 模板）",
    note: "您有寫要影片或 3D 圖,3D 已給 pacdora 範例;影片來源仍須選 (a) 或 (b)。",
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function HeartOutlineIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ============== Data — 規格選擇器:同頁切換,A 包 Q-A4 已定 ============== */
const PRODUCT = {
  baseTitle: "公版冷熱共用杯",
  tagline: "紙杯再升級! 雙面 PE 淋膜,冷熱共用不受限,紙杯外層可耐水珠濕氣,維持杯身硬挺!",
};

// 規格選項 — 公版只列「現貨可選的規格」(容量、顏色)
// 客製印刷 = 私版,走獨立詢價流程,公版頁不放(避免混淆)
// 後台 HJ 自行勾選要開放的層,公版/私版機制統一(A 包 Q-A4)
const VARIANTS: { label: string; key: string; options: string[] }[] = [
  { label: "容量", key: "capacity", options: ["8oz", "12oz", "16oz", "22oz"] },
  { label: "顏色", key: "color", options: ["白", "黑", "棕"] },
];

// 規格組合 SKU 各自獨立(D 包確認):每個 SKU 獨立庫存 + 價格 + 凌越編號
type Sku = {
  code: string;
  base: number;
  member: number;
  pack: string;
  moqText: string;
  stock: number;
};

const SKU_BY_CAPACITY: Record<string, Sku> = {
  "8oz":  { code: "PC-08", base: 1.8, member: 1.5, pack: "1,000 入 / 箱",   moqText: "2 箱起 (NT$ 3,000+)", stock: 5200 },
  "12oz": { code: "PC-12", base: 2.4, member: 2.0, pack: "1,000 入 / 箱",   moqText: "2 箱起 (NT$ 4,000+)", stock: 3500 },
  "16oz": { code: "PC-16", base: 3.2, member: 2.6, pack: "1,000 入 / 箱",   moqText: "2 箱起 (NT$ 5,200+)", stock: 1800 },
  "22oz": { code: "PC-22", base: 4.5, member: 3.8, pack: "500 入 / 箱",     moqText: "1 箱起 (NT$ 2,250+)", stock: 0 },
};

// 部分顏色限定庫存(展示「規格組合各自獨立」決議)
const STOCK_OVERRIDE: Record<string, number> = {
  "8oz_棕": 0,        // 缺貨
  "12oz_黑": 200,     // 庫存少
  "16oz_棕": 0,
};

const SPEC_TABLE = (capacity: string) => ({
  "8oz":  { 尺寸: "口徑 80 × H 92 mm",  耐熱: "0°C ~ 90°C" },
  "12oz": { 尺寸: "口徑 90 × H 108 mm", 耐熱: "0°C ~ 90°C" },
  "16oz": { 尺寸: "口徑 90 × H 130 mm", 耐熱: "0°C ~ 90°C" },
  "22oz": { 尺寸: "口徑 95 × H 175 mm", 耐熱: "0°C ~ 90°C" },
}[capacity] ?? {});

const THUMBNAILS = ["主圖", "正面", "側面", "細節", "包裝"];

const RELATED = [
  { name: "8oz 公版瓦楞紙杯", spec: "雙層瓦楞防燙" },
  { name: "12oz PLA 環保杯", spec: "可生物分解" },
  { name: "杯蓋 90mm 平蓋", spec: "適配 8/12oz" },
  { name: "杯套 12oz 牛皮紙", spec: "防燙手提" },
];

/* ============== Component ============== */
export function ProductDetailMockup({
  annotations = false,
  pageId = "products-detail",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [capacity, setCapacity] = useState("12oz");
  const [color, setColor] = useState("白");
  const [qty, setQty] = useState(50);
  const [activeThumb, setActiveThumb] = useState(0);

  const sku = SKU_BY_CAPACITY[capacity];
  const stockOverride = STOCK_OVERRIDE[`${capacity}_${color}`];
  const stock = stockOverride !== undefined ? stockOverride : sku.stock;
  const inStock = stock > 0;
  const fullCode = `${sku.code}-${color}`;
  const specTable = SPEC_TABLE(capacity);
  const totalPrice = (sku.base * qty).toFixed(0);
  const memberTotal = (sku.member * qty).toFixed(0);

  const wrapQ = (qs: QItem[], children: React.ReactNode) =>
    annotations ? (
      <Questioned show questions={qs} pageId={pageId} position="top-right">
        {children}
      </Questioned>
    ) : (
      children
    );

  return (
    <MockupShell url={`https://hj.example.com/products/${fullCode.toLowerCase()}`}>
      <MockupSiteHeader />

      {/* Breadcrumb */}
      <div className="border-b border-zinc-100 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/home" className="hover:text-zinc-900">首頁</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <Link href="/modules/products" className="hover:text-zinc-900">公版商品</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <Link href="/modules/products/category" className="hover:text-zinc-900">紙杯／膠杯類</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="text-zinc-900">{PRODUCT.baseTitle}</span>
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
                  <div className="text-base font-medium">{THUMBNAILS[activeThumb]}</div>
                  <div className="mt-1 text-xs">{capacity} · {color}</div>
                </div>
              </div>
              <span className="absolute left-3 top-3 rounded-full bg-zinc-900 px-2.5 py-0.5 text-[10px] font-medium text-white">
                {fullCode}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-5 gap-2">
              {THUMBNAILS.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`relative aspect-square overflow-hidden rounded-md border-2 bg-white ${
                    i === activeThumb ? "border-amber-500" : "border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-400">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* 商品影片入口 — Q1 釘這 */}
            <div className="mt-5 flex gap-2">
              {wrapQ(
                [Q1],
                <button className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3.5 py-2 text-sm text-zinc-700 hover:border-zinc-700">
                  <PlayIcon />
                  商品影片
                </button>,
              )}
              <button className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3.5 py-2 text-sm text-zinc-700 hover:border-zinc-700">
                3D 模板(Pacdora)
              </button>
            </div>
          </div>

          {/* Right: info, specs, price, CTA */}
          <div className="space-y-5">
            {/* Title + tagline — 標題不寫死容量 */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                {PRODUCT.baseTitle}
              </h1>
              <p className="mt-3 text-sm text-zinc-700 leading-relaxed">
                {PRODUCT.tagline}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-zinc-500">SKU: {fullCode}</span>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
                  inStock ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                }`}>
                  <span className={`size-1.5 rounded-full ${inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
                  {inStock ? `現貨 ${stock.toLocaleString()} 入` : "缺貨"}
                </span>
              </div>
            </div>

            {/* Spec selector — A 包 Q-A4 同頁切換規格 */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
              <div className="flex items-baseline justify-between">
                <div className="text-sm font-bold text-zinc-900">選擇規格</div>
                <div className="text-xs text-zinc-500">
                  {VARIANTS.length} 層規格 · 後台 HJ 自行勾選要開放
                </div>
              </div>

              {VARIANTS.map((v) => {
                const current = v.key === "capacity" ? capacity : color;
                const setter = v.key === "capacity" ? setCapacity : setColor;
                return (
                  <div key={v.key}>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-700">{v.label}</span>
                      <span className="text-zinc-500">已選: <span className="font-bold text-amber-700">{current}</span></span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {v.options.map((opt) => {
                        const active = opt === current;
                        let oos = false;
                        if (v.key === "capacity") {
                          const tempStock = STOCK_OVERRIDE[`${opt}_${color}`] ?? SKU_BY_CAPACITY[opt]?.stock;
                          oos = tempStock === 0;
                        } else if (v.key === "color") {
                          const tempStock = STOCK_OVERRIDE[`${capacity}_${opt}`] ?? SKU_BY_CAPACITY[capacity]?.stock;
                          oos = tempStock === 0;
                        }
                        return (
                          <button
                            key={opt}
                            onClick={() => setter(opt)}
                            className={`relative rounded-lg border-2 px-4 py-2 text-sm transition-colors ${
                              active
                                ? "border-amber-500 bg-amber-50 font-bold text-amber-800"
                                : oos
                                  ? "border-zinc-200 bg-zinc-50 text-zinc-400 line-through"
                                  : "border-zinc-300 bg-white text-zinc-700 hover:border-amber-400"
                            }`}
                          >
                            {opt}
                            {oos && !active && (
                              <span className="ml-1 text-[9px] text-rose-600 no-underline">缺貨</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected SKU spec table */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="mb-3 text-sm font-bold text-zinc-900">當前規格資訊</div>
              <dl className="grid grid-cols-[5rem_1fr] gap-y-2 gap-x-4 text-sm">
                <dt className="text-zinc-500">容量</dt>
                <dd className="text-zinc-900">{capacity}{capacity === "8oz" ? " (約 240 cc)" : capacity === "12oz" ? " (約 360 cc)" : capacity === "16oz" ? " (約 480 cc)" : " (約 660 cc)"}</dd>
                {Object.entries(specTable).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-zinc-500">{k}</dt>
                    <dd className="text-zinc-900">{v}</dd>
                  </div>
                ))}
                <dt className="text-zinc-500">材質</dt>
                <dd className="text-zinc-900">食品級紙 + 雙面 PE 淋膜</dd>
                <dt className="text-zinc-500">包裝</dt>
                <dd className="text-zinc-900">{sku.pack}</dd>
                <dt className="text-zinc-500">最低訂購</dt>
                <dd className="text-zinc-900">{sku.moqText}</dd>
              </dl>
            </div>

            {/* Price block — 訪客看一般價、會員看會員價(C 包已定) */}
            <div className="rounded-xl border-2 border-amber-300 bg-amber-50/40 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-zinc-600">一般價(訪客)</div>
                  <div className="mt-1 text-3xl font-bold text-amber-700">
                    NT$ {sku.base.toFixed(1)}
                    <span className="ml-1 text-sm font-medium text-zinc-500">/ 個</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-700 font-medium">會員價</div>
                  <div className="mt-1 text-2xl font-bold text-emerald-700">
                    NT$ {sku.member.toFixed(1)}
                  </div>
                  <div className="text-[10px] text-zinc-500">登入後解鎖</div>
                </div>
              </div>
              <div className="mt-3 border-t border-amber-200 pt-3 text-xs text-zinc-600">
                共 <span className="font-bold text-zinc-900">{qty}</span> 入 → 一般合計 <span className="font-bold text-amber-700">NT$ {Number(totalPrice).toLocaleString()}</span> · 會員 <span className="font-bold text-emerald-700">NT$ {Number(memberTotal).toLocaleString()}</span>
              </div>
            </div>

            {/* Quantity input — 連動總價 */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="mb-3 text-sm font-medium text-zinc-900">採購數量</div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-md border border-zinc-300 bg-white">
                  <button
                    onClick={() => setQty(Math.max(50, qty - 50))}
                    className="flex size-10 items-center justify-center text-zinc-600 hover:bg-zinc-50"
                  >
                    <MinusIcon />
                  </button>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Math.max(50, Number(e.target.value) || 50))}
                    className="w-24 border-x border-zinc-300 px-3 py-2 text-center text-base font-bold text-zinc-900 focus:outline-none"
                  />
                  <button
                    onClick={() => setQty(qty + 50)}
                    className="flex size-10 items-center justify-center text-zinc-600 hover:bg-zinc-50"
                  >
                    <PlusIcon />
                  </button>
                </div>
                <span className="text-sm text-zinc-500">入(50 入/條 · {sku.pack})</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                {[50, 100, 500, 1000].map((n) => (
                  <button
                    key={n}
                    onClick={() => setQty(n)}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-zinc-700 hover:border-amber-400 hover:bg-amber-50"
                  >
                    {n} 入
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <Link
                href="/modules/cart"
                className={`flex w-full items-center justify-center gap-2 rounded-md px-4 py-3.5 text-base font-bold text-white shadow-sm ${
                  inStock ? "bg-amber-600 hover:bg-amber-700" : "bg-zinc-400 cursor-not-allowed pointer-events-none"
                }`}
              >
                <PlusIcon />
                {inStock ? `加入購物車 — NT$ ${Number(totalPrice).toLocaleString()}` : "缺貨中"}
              </Link>

              <Link
                href="/modules/products/sample"
                className="flex w-full items-center justify-center gap-1.5 rounded-md border-2 border-emerald-500 bg-emerald-50 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-100"
              >
                申請樣品(免費 + 收運費,限會員)
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-1.5 rounded-md border border-zinc-300 bg-white py-2.5 text-sm text-zinc-700 hover:border-zinc-700">
                  <HeartOutlineIcon />
                  加入追蹤清單
                </button>
                <button
                  className={`flex items-center justify-center gap-1.5 rounded-md border bg-white py-2.5 text-sm hover:border-zinc-700 ${
                    inStock ? "border-zinc-300 text-zinc-700" : "border-amber-400 bg-amber-50 text-amber-700 font-medium"
                  }`}
                >
                  <BellIcon />
                  {inStock ? "貨到通知我" : "缺貨通知我"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Description sections */}
      <div className="border-t border-zinc-200 bg-white px-6 py-12">
        <div className="mx-auto max-w-[1760px] space-y-3">
          <ExpandableSection title="商品描述" defaultOpen>
            <p>本款冷熱共用杯採用單層食品紙 + 雙面 PE 淋膜,外層 PE 可耐水珠濕氣,內層 PE 可耐熱飲不滲漏。</p>
            <p>耐熱範圍 0°C ~ 90°C,適合咖啡、奶茶、果汁等冷熱飲。</p>
            <p>適用場景:咖啡廳、手搖飲、會議活動、外帶飲品。</p>
          </ExpandableSection>

          <ExpandableSection title="包裝與配送">
            <p>包裝:50 入/條　20 條/箱(每箱 1,000 入)</p>
            <p>配送:本島 7-11、全家、宅配通;超商取貨限重 5kg。</p>
          </ExpandableSection>

          <ExpandableSection title="檢驗與認證">
            <p>食品級紙材,FDA 食品接觸認證。提供檢驗報告下載(會員專區)。</p>
          </ExpandableSection>
        </div>
      </div>

      {/* Related products */}
      <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900">相似商品</h2>
            <Link href="/modules/products/category" className="text-sm text-zinc-600 hover:text-zinc-900">看更多 →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {RELATED.map((r) => (
              <Link
                key={r.name}
                href="/modules/products/detail"
                className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:shadow-md"
              >
                <div className="aspect-square bg-zinc-100 flex items-center justify-center text-zinc-300 text-xs">商品圖</div>
                <div className="p-4">
                  <div className="text-sm font-bold text-zinc-900 leading-snug group-hover:text-amber-700">{r.name}</div>
                  <div className="mt-1 text-xs text-zinc-500">{r.spec}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <MockupSiteFooter />
    </MockupShell>
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
    <details open={defaultOpen} className="group rounded-xl border border-zinc-200 bg-white">
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
