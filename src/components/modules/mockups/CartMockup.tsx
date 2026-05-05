"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

// 32 題 review 已決議事項(直接反映在 mockup 上,不再列為待確認):
// - 公版 / 私版 / 樣品 三條流程完全分開,不允許同車(A 包 Q-A9)
// - 加購品 = 公版商品本身,促銷規則,扣自身庫存(A 包 Q-A5)
// - 加購品運費 = 跟主商品同訂單算運費(B 包 Q-B9)
// - 訪客可瀏覽 + 加購物車,結帳前需登入(會員需綁凌越客編)
//
// 運費規則(B 包,HJ 提供的運費圖):
//   宅配:純箱購免運;條購/混購 ≥ NT$ 2,500 免運;< 2,500 依加總材積級距
//     - 0.1–2 才 = NT$ 100
//     - 2.1–3 才 = NT$ 120
//     - 3.1–4 才 = NT$ 150
//     - 4.1–5 才 = NT$ 180
//     - 5.1–6 才 = NT$ 200
//   超商:純箱不開放;條購 ≤ 1.5 才才可走,≥ 699 免運,< 699 = NT$ 65;箱+條不開放
//   超商超規上限:45×30×30 cm + 5kg(同時檢查 1.5 才 + 5kg 取較嚴)

// 32 題 review 列了「自取」為配送方式,但沒明確說「公版商品」也走自取
// (自取常用於 B2B 大量 / 私版客製,公版未必開放)
// 為避免擅自假設,公版購物車先只列宅配 + 超商。若 HJ 後續確認要加自取再開
type ShipMode = "home" | "store";

type CartItem = {
  code: string;
  name: string;
  spec: string;
  unitPrice: number;       // 單價(NT$ / 個)
  memberPrice: number;     // 會員單價(NT$ / 個)
  quantity: number;        // 客戶買幾「箱 / 條」
  unit: string;            // "箱" / "條"
  piecesPerUnit: number;   // 一箱/一條 = 幾個(影響線總價)
  volumeRation: number;    // 才(每單位)
  isBox: boolean;          // 是否「整箱」(影響超商可否走)
  bg: string;
};

const INITIAL_ITEMS: CartItem[] = [
  {
    code: "PC-12-白",
    name: "12oz 公版瓦楞紙杯(白)",
    spec: "12oz / 360cc · 食品紙 + PE",
    unitPrice: 2.4,
    memberPrice: 2.0,
    quantity: 2,
    unit: "箱",
    piecesPerUnit: 1000,
    volumeRation: 1.2,
    isBox: true,
    bg: "bg-amber-100",
  },
  {
    code: "PC-08-白",
    name: "8oz 公版瓦楞紙杯(白)",
    spec: "8oz / 240cc · 食品紙 + PE",
    unitPrice: 1.8,
    memberPrice: 1.5,
    quantity: 5,
    unit: "條",
    piecesPerUnit: 50,
    volumeRation: 0.3,
    isBox: false,
    bg: "bg-amber-100",
  },
  {
    code: "LD-90-白",
    name: "90mm 平蓋(加購)",
    spec: "適配 8/12oz 杯",
    unitPrice: 1.2,
    memberPrice: 1.0,
    quantity: 5,
    unit: "條",
    piecesPerUnit: 50,
    volumeRation: 0.2,
    isBox: false,
    bg: "bg-zinc-100",
  },
];

function calcVolume(items: CartItem[]) {
  return items.reduce((s, i) => s + i.quantity * i.volumeRation, 0);
}

function calcHomeShipping(subtotal: number, items: CartItem[]) {
  const allBox = items.every((i) => i.isBox);
  if (allBox) return { fee: 0, reason: "純箱購免運" };
  if (subtotal >= 2500) return { fee: 0, reason: "金額 ≥ NT$ 2,500 免運" };
  const volume = calcVolume(items);
  if (volume <= 2) return { fee: 100, reason: `材積 ${volume.toFixed(1)} 才 (0.1–2 才)` };
  if (volume <= 3) return { fee: 120, reason: `材積 ${volume.toFixed(1)} 才 (2.1–3 才)` };
  if (volume <= 4) return { fee: 150, reason: `材積 ${volume.toFixed(1)} 才 (3.1–4 才)` };
  if (volume <= 5) return { fee: 180, reason: `材積 ${volume.toFixed(1)} 才 (4.1–5 才)` };
  if (volume <= 6) return { fee: 200, reason: `材積 ${volume.toFixed(1)} 才 (5.1–6 才)` };
  return { fee: 250, reason: `材積 ${volume.toFixed(1)} 才 (>6 才超規,聯繫客服)` };
}

function canStore(items: CartItem[]) {
  if (items.some((i) => i.isBox)) return { ok: false, reason: "含箱購商品,超商不開放(僅條購可走超商)" };
  const volume = calcVolume(items);
  if (volume > 1.5) return { ok: false, reason: `加總材積 ${volume.toFixed(1)} 才超過 1.5 才上限` };
  return { ok: true, reason: `加總材積 ${volume.toFixed(1)} 才(≤ 1.5 才)` };
}

function calcStoreShipping(subtotal: number) {
  if (subtotal >= 699) return { fee: 0, reason: "金額 ≥ NT$ 699 免運" };
  return { fee: 65, reason: "未達 NT$ 699 免運門檻" };
}

export function CartMockup({
  annotations: _annotations,
  pageId: _pageId,
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [ship, setShip] = useState<ShipMode>("home");
  const [empty, setEmpty] = useState(false);

  const isLoggedIn = true; // 預設已登入(會員看會員價)
  const subtotal = items.reduce(
    (s, i) => s + (isLoggedIn ? i.memberPrice : i.unitPrice) * i.quantity * i.piecesPerUnit,
    0,
  );
  const totalUnits = items.reduce((s, i) => s + i.quantity, 0);
  const totalPieces = items.reduce((s, i) => s + i.quantity * i.piecesPerUnit, 0);
  const totalVolume = calcVolume(items);

  const home = calcHomeShipping(subtotal, items);
  const storeAvailability = canStore(items);
  const store = calcStoreShipping(subtotal);

  let shipFee = 0;
  let shipReason = "";
  if (ship === "home") {
    shipFee = home.fee;
    shipReason = home.reason;
  } else {
    shipFee = store.fee;
    shipReason = store.reason;
  }

  const total = subtotal + shipFee;
  const remainToFreeHome = ship === "home" && !items.every((i) => i.isBox) ? Math.max(0, 2500 - subtotal) : 0;
  const remainToFreeStore = ship === "store" && storeAvailability.ok ? Math.max(0, 699 - subtotal) : 0;

  return (
    <MockupShell url="https://hj.example.com/cart">
      <MockupSiteHeader />

      {/* Demo toggle */}
      <div className="border-b-2 border-dashed border-amber-300 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-amber-700 px-2 py-0.5 font-bold text-white">預覽切換</span>
          <span className="text-zinc-700">空車狀態:</span>
          <div className="flex gap-1 rounded-md bg-white p-1 shadow-sm border border-zinc-200">
            <button
              onClick={() => setEmpty(false)}
              className={`rounded px-3 py-1 font-medium ${!empty ? "bg-zinc-900 text-white" : "text-zinc-600"}`}
            >
              有商品
            </button>
            <button
              onClick={() => setEmpty(true)}
              className={`rounded px-3 py-1 font-medium ${empty ? "bg-zinc-900 text-white" : "text-zinc-600"}`}
            >
              空車
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-zinc-100 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/home" className="hover:text-zinc-900">首頁</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <Link href="/modules/products" className="hover:text-zinc-900">公版商品</Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="text-zinc-900">購物車</span>
        </div>
      </div>

      {empty ? (
        <section className="bg-zinc-50/40 px-6 py-20">
          <div className="mx-auto max-w-md text-center">
            <h2 className="text-xl font-bold text-zinc-900">購物車是空的</h2>
            <p className="mt-2 text-sm text-zinc-600">逛逛公版商品再回來結帳。</p>
            <div className="mt-6 flex justify-center gap-2">
              <Link href="/modules/products" className="rounded-md bg-amber-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-700">
                去逛公版商品
              </Link>
              <Link href="/modules/private-quote" className="rounded-md border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                私版客製諮詢
              </Link>
            </div>
            <p className="mt-6 text-xs text-zinc-500">
              提醒:私版報價走獨立詢價單流程、樣品走獨立樣品申請,皆不會出現在此購物車。
            </p>
          </div>
        </section>
      ) : (
        <>
          <section className="border-b border-zinc-200 bg-white px-6 py-6">
            <div className="mx-auto max-w-[1760px]">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h1 className="text-2xl font-bold text-zinc-900">購物車</h1>
                <div className="text-sm text-zinc-500">
                  共 <span className="font-bold text-zinc-900">{items.length}</span> 項商品 ·
                  <span className="ml-1">{totalUnits} 單位({totalPieces.toLocaleString()} 件)</span> ·
                  加總材積 <span className="font-bold text-zinc-900">{totalVolume.toFixed(1)} 才</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                此購物車僅放公版商品(含加購)。私版報價走獨立詢價單、樣品走獨立申請流程,不會與公版同車。
              </p>
            </div>
          </section>

          <section className="bg-zinc-50/40 px-6 py-8">
            <div className="mx-auto grid max-w-[1760px] gap-6 lg:grid-cols-[1fr_400px]">
              {/* Items */}
              <div className="space-y-3">
                {items.map((it) => {
                  const piecesInLine = it.quantity * it.piecesPerUnit;
                  const pricePerPiece = isLoggedIn ? it.memberPrice : it.unitPrice;
                  const linePrice = pricePerPiece * piecesInLine;
                  return (
                    <article key={it.code} className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5">
                      <div className={`size-20 shrink-0 rounded-md ${it.bg}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <div className="font-mono text-xs text-zinc-400">{it.code}</div>
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                            {it.isBox ? "箱購" : "條購"} · {it.piecesPerUnit} 入/{it.unit} · {it.volumeRation} 才/{it.unit}
                          </span>
                        </div>
                        <Link href="/modules/products/detail" className="mt-0.5 block text-base font-bold text-zinc-900 hover:text-amber-700">
                          {it.name}
                        </Link>
                        <div className="text-xs text-zinc-500">{it.spec}</div>
                        <div className="mt-2 flex items-baseline gap-2 text-xs">
                          <span className="text-zinc-500">單價</span>
                          {isLoggedIn ? (
                            <>
                              <span className="font-mono text-emerald-700 font-bold">NT$ {it.memberPrice}</span>
                              <span className="text-zinc-400 line-through">NT$ {it.unitPrice}</span>
                              <span className="text-zinc-400">/ 個</span>
                              <span className="rounded-full bg-emerald-100 px-1.5 text-[10px] text-emerald-700">會員</span>
                            </>
                          ) : (
                            <>
                              <span className="font-mono text-amber-700 font-bold">NT$ {it.unitPrice}</span>
                              <span className="text-zinc-400">/ 個</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center rounded-md border border-zinc-300">
                          <button
                            onClick={() => setItems(items.map((i) => i.code === it.code ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))}
                            className="px-2 py-1.5 text-zinc-500 hover:bg-zinc-100"
                          >
                            −
                          </button>
                          <span className="w-12 border-x border-zinc-300 py-1.5 text-center text-sm font-bold">{it.quantity}</span>
                          <button
                            onClick={() => setItems(items.map((i) => i.code === it.code ? { ...i, quantity: i.quantity + 1 } : i))}
                            className="px-2 py-1.5 text-zinc-500 hover:bg-zinc-100"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs text-zinc-500">{it.unit}</span>
                      </div>
                      <div className="w-32 text-right">
                        <div className="text-base font-bold text-zinc-900">NT$ {linePrice.toLocaleString()}</div>
                        <div className="text-[10px] text-zinc-400">{piecesInLine.toLocaleString()} 個 × NT$ {pricePerPiece}</div>
                        <button
                          onClick={() => setItems(items.filter((i) => i.code !== it.code))}
                          className="mt-1 text-xs text-rose-600 hover:underline"
                        >
                          移除
                        </button>
                      </div>
                    </article>
                  );
                })}

                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-zinc-300 bg-white p-4 text-sm">
                  <Link href="/modules/products" className="text-amber-700 hover:underline">← 繼續購物</Link>
                  <button onClick={() => setItems([])} className="text-zinc-500 hover:text-rose-600">清空購物車</button>
                </div>
              </div>

              {/* Summary */}
              <aside className="self-start rounded-xl border border-zinc-200 bg-white p-6 sticky top-6">
                <h3 className="text-base font-bold text-zinc-900">訂單摘要</h3>

                {/* Shipping mode */}
                <div className="mt-4">
                  <div className="text-xs font-medium text-zinc-700">配送方式</div>
                  <div className="mt-2 space-y-2">
                    {([
                      { id: "home" as const, name: "宅配", desc: "新航 / 嘉里 / 黑貓 / 新竹 / 大嘴鳥(業務後台勾選)" },
                      { id: "store" as const, name: "超商取貨", desc: "7-11 / 全家 / 萊爾富 / OK", disabled: !storeAvailability.ok, disableReason: storeAvailability.reason },
                    ]).map((opt) => {
                      const active = ship === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => !opt.disabled && setShip(opt.id)}
                          disabled={opt.disabled}
                          className={`w-full rounded-lg border-2 p-3 text-left transition-colors ${
                            opt.disabled
                              ? "border-zinc-200 bg-zinc-50 cursor-not-allowed opacity-60"
                              : active
                                ? "border-amber-500 bg-amber-50"
                                : "border-zinc-200 hover:border-amber-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-zinc-900">{opt.name}</span>
                            <div className={`size-4 rounded-full border-2 ${active ? "border-amber-500" : "border-zinc-300"}`}>
                              {active && <div className="m-0.5 size-2 rounded-full bg-amber-500" />}
                            </div>
                          </div>
                          <div className="mt-1 text-xs text-zinc-500">{opt.desc}</div>
                          {opt.disabled && opt.disableReason && (
                            <div className="mt-1 text-xs text-rose-600">⚠ {opt.disableReason}</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Free shipping hint */}
                {(remainToFreeHome > 0 || remainToFreeStore > 0) && (
                  <div className="mt-3 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
                    {ship === "home" && remainToFreeHome > 0 && (
                      <>再買 NT$ <span className="font-bold">{remainToFreeHome.toLocaleString()}</span> 即可宅配免運(門檻 NT$ 2,500)</>
                    )}
                    {ship === "store" && remainToFreeStore > 0 && (
                      <>再買 NT$ <span className="font-bold">{remainToFreeStore.toLocaleString()}</span> 即可超商免運(門檻 NT$ 699)</>
                    )}
                  </div>
                )}

                <div className="mt-5 space-y-2 border-t border-zinc-100 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">商品小計</span>
                    <span className="text-zinc-900">NT$ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">運費</span>
                    <span className={shipFee === 0 ? "text-emerald-600 font-medium" : "text-zinc-900"}>
                      {shipFee === 0 ? "免運" : `NT$ ${shipFee}`}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 italic">{shipReason}</div>
                  <div className="my-2 h-px bg-zinc-100" />
                  <div className="flex justify-between text-base font-bold">
                    <span>應付總計(未稅)</span>
                    <span className="text-amber-700">NT$ {total.toLocaleString()}</span>
                  </div>
                  <div className="text-[11px] text-zinc-500">稅額與發票於結帳頁設定</div>
                </div>

                <Link
                  href="/modules/checkout"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 py-3 text-sm font-bold text-white hover:bg-amber-700"
                >
                  前往結帳 →
                </Link>
                <p className="mt-2 text-center text-[11px] text-zinc-500">
                  進結帳前需登入會員(綁凌越客編)
                </p>
              </aside>
            </div>
          </section>

          {/* Notice */}
          <section className="bg-zinc-50/40 px-6 pb-12">
            <div className="mx-auto max-w-[1760px] rounded-xl border border-zinc-200 bg-white p-5 text-xs text-zinc-600">
              <div className="font-bold text-zinc-900 mb-2">運費規則(依 HJ 提供的運費圖)</div>
              <ul className="space-y-1 list-disc list-inside leading-relaxed">
                <li><strong>宅配</strong>:純箱購免運;條購/混購 ≥ NT$ 2,500 免運;未達門檻依加總材積級距(0.1–2 才 100 / 2.1–3 才 120 / 3.1–4 才 150 / 4.1–5 才 180 / 5.1–6 才 200)。</li>
                <li><strong>超商取貨</strong>:純箱不開放;條購 ≤ 1.5 才才可走,≥ NT$ 699 免運,未達 65 元;箱+條混購不開放。</li>
                <li><strong>公司自取</strong>:新北五股倉庫,備貨完成後 HJ 通知客戶挑時間,免運費。</li>
                <li><strong>離島地區</strong>(澎湖/金門/馬祖/綠島/蘭嶼/小琉球/東引/烏坵):不允許直接結帳,結帳頁會提示聯繫客服。</li>
                <li><strong>圖外特殊商品</strong>(超大、特殊包裝、易碎):走客服流程,不允許直接結帳。</li>
              </ul>
            </div>
          </section>
        </>
      )}

      <MockupSiteFooter />
    </MockupShell>
  );
}
