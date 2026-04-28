import { SectionHeader } from "../sections/SectionHeader";
import { ConnectorTop, getPosition } from "./ConnectorTop";

type Item = { label: string; star?: boolean };

const FRONTEND: Item[] = [
  { label: "首頁" },
  { label: "關於我們" },
  { label: "行銷動態" },
  { label: "公版商品系列", star: true },
  { label: "私版商品系列", star: true },
  { label: "作品集系列" },
  { label: "設計服務", star: true },
  { label: "聯絡我們" },
  { label: "會員中心" },
];

const BACKEND: Item[] = [
  { label: "公版商品管理" },
  { label: "私版商品管理" },
  { label: "訂單管理", star: true },
  { label: "庫存管理", star: true },
  { label: "顧客管理", star: true },
  { label: "網頁設計" },
  { label: "金流" },
  { label: "物流" },
  { label: "數據分析" },
  { label: "行銷工具" },
  { label: "網站維護" },
  { label: "權限管理" },
];

const EXTERNAL: Item[] = [
  { label: "凌越 ERP", star: true },
  { label: "Pacdora 3D", star: true },
  { label: "綠界金流" },
  { label: "四大超商 / 宅配" },
  { label: "LINE Login + LINE@" },
  { label: "Google Ads + Meta" },
];

export function ArchitectureMap() {
  return (
    <section className="border-b border-zinc-200 bg-white px-6 py-24">
      <div className="mx-auto max-w-[1760px]">
        <SectionHeader
          kicker="整體架構"
          title="禾啟 HJ 整體架構圖"
        />

        {/* Root */}
        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center rounded-2xl border-2 border-emerald-500 bg-emerald-50 px-10 py-5 shadow-sm">
            <div className="text-2xl font-bold text-emerald-900">
              禾啟 HJ
            </div>
            <div className="text-sm text-emerald-700">
              餐飲包材電商平台
            </div>
          </div>

          {/* Vertical line down from root */}
          <div className="h-8 w-0.5 bg-zinc-500" />

          {/* Three branches with self-drawn T-connectors */}
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                tone: "indigo" as const,
                kicker: "第一層",
                title: "前台網站",
                subtitle: `${FRONTEND.length} 個區塊`,
                items: FRONTEND,
              },
              {
                tone: "emerald" as const,
                kicker: "第二層",
                title: "後台管理",
                subtitle: `${BACKEND.length} 個模組`,
                items: BACKEND,
              },
              {
                tone: "amber" as const,
                kicker: "第三層",
                title: "外部整合",
                subtitle: `${EXTERNAL.length} 個服務`,
                items: EXTERNAL,
              },
            ].map((b, i, arr) => (
              <Branch key={b.title} {...b} position={getPosition(i, arr.length)} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">★</span>
            <span>標示為核心服務 / 關鍵技術整合</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const TONE = {
  indigo: {
    border: "border-indigo-400",
    bg: "bg-indigo-50/60",
    title: "text-indigo-900",
    kicker: "text-indigo-600",
    line: "bg-indigo-300",
    chip: "bg-white text-indigo-900 border-indigo-200",
    chipStar: "bg-amber-50 border-amber-300 text-amber-900",
  },
  emerald: {
    border: "border-emerald-400",
    bg: "bg-emerald-50/60",
    title: "text-emerald-900",
    kicker: "text-emerald-600",
    line: "bg-emerald-300",
    chip: "bg-white text-emerald-900 border-emerald-200",
    chipStar: "bg-amber-50 border-amber-300 text-amber-900",
  },
  amber: {
    border: "border-amber-400",
    bg: "bg-amber-50/60",
    title: "text-amber-900",
    kicker: "text-amber-600",
    line: "bg-amber-300",
    chip: "bg-white text-amber-900 border-amber-200",
    chipStar: "bg-amber-100 border-amber-400 text-amber-900",
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

      {/* Branch box */}
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

        <ul className="space-y-2">
          {items.map((it) => (
            <li
              key={it.label}
              className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-sm ${
                it.star ? t.chipStar : t.chip
              }`}
            >
              {it.star && (
                <span className="text-amber-500" aria-hidden>
                  ★
                </span>
              )}
              <span className="truncate">{it.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
