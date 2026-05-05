import Link from "next/link";
import { SectionHeader } from "../sections/SectionHeader";
import { ConnectorTop, getPosition } from "./ConnectorTop";

type Item = {
  label: string;
  sub?: string;
  star?: boolean;
  children?: string[];
  href?: string;
};

const CONTENT: Item[] = [
  { label: "首頁", href: "/modules/home" },
  { label: "關於我們", href: "/modules/about" },
  {
    label: "行銷動態",
    sub: "4 子頁",
    href: "/modules/news",
    children: ["最新消息列表", "消息詳情頁", "常見問題（FAQ）", "政策條款"],
  },
];

const COMMERCE: Item[] = [
  {
    label: "公版商品系列",
    sub: "8 大類 / 49 子類 + 4 子頁",
    star: true,
    href: "/modules/products",
    children: [
      "分類入口頁",
      "分類列表（篩選）→ /products/category",
      "商品詳情（規格 + 加購）→ /products/detail",
      "樣品申請流程 → /products/sample",
    ],
  },
  {
    label: "私版商品系列",
    sub: "2 種報價模式",
    star: true,
    href: "/modules/private-quote",
    children: ["即時報價系統（仿 jcolor）", "LINE 客服轉單"],
  },
  { label: "作品集系列" },
  {
    label: "設計服務",
    sub: "4 大類 / 27 子類",
    star: true,
    children: [
      "餐飲／紙製品印刷設計 (9)",
      "店家／宣傳品印刷設計 (7)",
      "商品平面／包裝設計 (5)",
      "公司／應用品印刷設計 (6)",
    ],
  },
];

const SERVICE: Item[] = [
  { label: "聯絡我們", href: "/modules/contact" },
  { label: "全站搜尋", href: "/modules/search" },
  {
    label: "會員中心",
    sub: "9 子頁",
    href: "/modules/members",
    children: ["登入 / 註冊", "忘記密碼", "會員儀表板", "歷史訂單", "訂單詳情", "詢價紀錄", "樣品紀錄", "個人資料", "收件地址簿"],
  },
  {
    label: "結帳流程",
    sub: "4 子頁",
    href: "/modules/cart",
    children: ["購物車", "填寫資料", "付款方式", "付款結果"],
  },
];

export function FrontendArchitectureMap() {
  return (
    <section className="border-b border-zinc-200 bg-white px-6 py-24">
      <div className="mx-auto max-w-[1760px]">
        <SectionHeader
          kicker="前台完整架構"
          title="前台網站架構圖"
          desc="9 個主要區塊依用途分為三大群組 — 內容、商品與服務、客戶支援。標 → 的項目可點擊進入該模組詳細規劃頁面。"
        />

        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center rounded-2xl border-2 border-indigo-500 bg-indigo-50 px-10 py-5 shadow-sm">
            <div className="text-2xl font-bold text-indigo-900">
              前台網站
            </div>
            <div className="text-sm text-indigo-700">9 個主要區塊</div>
          </div>

          <div className="h-8 w-0.5 bg-zinc-500" />

          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                tone: "sky" as const,
                kicker: "品牌",
                title: "品牌與內容",
                subtitle: `${CONTENT.length} 個區塊`,
                items: CONTENT,
              },
              {
                tone: "indigo" as const,
                kicker: "商品",
                title: "商品與服務",
                subtitle: `${COMMERCE.length} 個區塊 · 主力流量`,
                items: COMMERCE,
              },
              {
                tone: "violet" as const,
                kicker: "服務",
                title: "客戶服務",
                subtitle: `${SERVICE.length} 個區塊`,
                items: SERVICE,
              },
            ].map((b, i, arr) => (
              <Branch key={b.title} {...b} position={getPosition(i, arr.length)} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">★</span>
            <span>標示為核心服務</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const TONE = {
  sky: {
    border: "border-sky-400",
    bg: "bg-sky-50/60",
    title: "text-sky-900",
    kicker: "text-sky-600",
    line: "bg-sky-300",
    chip: "bg-white text-sky-900 border-sky-200",
    chipStar: "bg-amber-50 border-amber-300 text-amber-900",
    childBullet: "bg-sky-300",
    childText: "text-sky-900/80",
  },
  indigo: {
    border: "border-indigo-400",
    bg: "bg-indigo-50/60",
    title: "text-indigo-900",
    kicker: "text-indigo-600",
    line: "bg-indigo-300",
    chip: "bg-white text-indigo-900 border-indigo-200",
    chipStar: "bg-amber-50 border-amber-300 text-amber-900",
    childBullet: "bg-indigo-300",
    childText: "text-indigo-900/80",
  },
  violet: {
    border: "border-violet-400",
    bg: "bg-violet-50/60",
    title: "text-violet-900",
    kicker: "text-violet-600",
    line: "bg-violet-300",
    chip: "bg-white text-violet-900 border-violet-200",
    chipStar: "bg-amber-50 border-amber-300 text-amber-900",
    childBullet: "bg-violet-300",
    childText: "text-violet-900/80",
  },
} as const;

function Branch({
  tone,
  kicker,
  title,
  subtitle,
  items,
  position,
}: {
  tone: keyof typeof TONE;
  kicker: string;
  title: string;
  subtitle: string;
  items: Item[];
  position: "first" | "middle" | "last" | "only";
}) {
  const t = TONE[tone];

  return (
    <div className="flex flex-col items-center">
      <ConnectorTop position={position} />

      <div
        className={`flex w-full flex-col rounded-2xl border-2 ${t.border} ${t.bg} p-5`}
      >
        <div className="mb-4 text-center">
          <div
            className={`text-xs font-mono uppercase tracking-widest ${t.kicker}`}
          >
            {kicker}
          </div>
          <div className={`mt-1 text-xl font-bold ${t.title}`}>{title}</div>
          <div className="text-sm text-zinc-600">{subtitle}</div>
        </div>

        <ul className="space-y-3">
          {items.map((it) => {
            const chipContent = (
              <div
                className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm shadow-sm transition-all ${
                  it.star ? t.chipStar : t.chip
                } ${
                  it.href
                    ? "cursor-pointer hover:shadow-md hover:scale-[1.02]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {it.star && (
                    <span className="text-amber-500 shrink-0" aria-hidden>
                      ★
                    </span>
                  )}
                  <span className="truncate font-medium">{it.label}</span>
                  {it.href && (
                    <span className="ml-1 text-emerald-600 shrink-0 text-xs font-bold">
                      →
                    </span>
                  )}
                </div>
                {it.sub && (
                  <span className="text-xs text-zinc-500 shrink-0">
                    {it.sub}
                  </span>
                )}
              </div>
            );

            return (
              <li key={it.label}>
                {it.href ? (
                  <Link href={it.href}>{chipContent}</Link>
                ) : (
                  chipContent
                )}

                {/* Children list */}
                {it.children && (
                  <ul className="ml-3 mt-1.5 space-y-0.5 border-l border-zinc-300 pl-3">
                    {it.children.map((c) => (
                      <li
                        key={c}
                        className={`flex items-center gap-2 py-0.5 text-xs ${t.childText}`}
                      >
                        <span
                          className={`size-1 shrink-0 rounded-full ${t.childBullet}`}
                        />
                        <span className="truncate">{c}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
