import { SectionHeader } from "../sections/SectionHeader";
import { ConnectorTop, getPosition } from "./ConnectorTop";

type Module = {
  no: string;
  title: string;
  desc: string;
  star?: boolean;
};

type Group = {
  kicker: string;
  title: string;
  desc: string;
  tone: "emerald" | "indigo" | "violet";
  items: Module[];
};

const GROUPS: Group[] = [
  {
    kicker: "群組一",
    title: "商品與訂單",
    desc: "4 模組 · 含 ERP 同步",
    tone: "emerald",
    items: [
      {
        no: "01",
        title: "公版商品管理",
        desc: "材積換算、運費規則、Excel 批次匯入匯出、預約上架、3D 圖整合",
      },
      {
        no: "02",
        title: "私版商品管理",
        desc: "客製商品上架、Excel 匯入匯出、預約上架管理",
      },
      {
        no: "03",
        title: "訂單管理",
        desc: "訂單即時匯入凌越 ERP、批次列印物流單、撿貨單匯出、退換貨",
        star: true,
      },
      {
        no: "04",
        title: "庫存管理",
        desc: "與凌越 ERP 即時雙向同步、預留庫存、缺貨自動提醒",
        star: true,
      },
    ],
  },
  {
    kicker: "群組二",
    title: "顧客與行銷",
    desc: "4 模組 · 含 ERP 同步",
    tone: "indigo",
    items: [
      {
        no: "05",
        title: "顧客管理",
        desc: "客戶編號與凌越 ERP 同步、多層會員分級價",
        star: true,
      },
      {
        no: "06",
        title: "網頁設計",
        desc: "首頁區塊、彈跳/浮動視窗、公告欄、商品頁底色",
      },
      {
        no: "09",
        title: "數據分析",
        desc: "商品瀏覽量、加入購物車量、實際購買量",
      },
      {
        no: "10",
        title: "行銷工具",
        desc: "Google Ads、Meta Pixel、SEO 整合",
      },
    ],
  },
  {
    kicker: "群組三",
    title: "基礎服務",
    desc: "4 模組",
    tone: "violet",
    items: [
      {
        no: "07",
        title: "金流",
        desc: "綠界、一般匯款、宅配/自取貨到付款",
      },
      {
        no: "08",
        title: "物流",
        desc: "四大超商、多家宅配、自取",
      },
      {
        no: "11",
        title: "網站維護",
        desc: "防火牆、SSL 憑證、保固、系統諮詢",
      },
      {
        no: "12",
        title: "權限管理",
        desc: "登入紀錄、操作記錄、人員權限細項",
      },
    ],
  },
];

const TOTAL = GROUPS.flatMap((g) => g.items).length;

export function BackendArchitectureMap() {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50/40 px-6 py-24">
      <div className="mx-auto max-w-[1760px]">
        <SectionHeader
          kicker="後台分層"
          title="後台管理系統架構圖"
          desc={`${TOTAL} 個管理模組 — 依功能分為三大群組。標 ★ 為需與凌越 ERP 即時雙向同步。`}
        />

        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center rounded-2xl border-2 border-emerald-500 bg-emerald-50 px-10 py-5 shadow-sm">
            <div className="text-2xl font-bold text-emerald-900">
              後台管理系統
            </div>
            <div className="text-sm text-emerald-700">{TOTAL} 個模組</div>
          </div>

          <div className="h-8 w-0.5 bg-zinc-500" />

          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
            {GROUPS.map((g, i) => (
              <GroupColumn
                key={g.title}
                group={g}
                position={getPosition(i, GROUPS.length)}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">★</span>
            <span>標示為與凌越 ERP 即時同步</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const TONE = {
  emerald: {
    border: "border-emerald-400",
    bg: "bg-emerald-50/60",
    title: "text-emerald-900",
    kicker: "text-emerald-600",
    line: "bg-emerald-300",
    cardBorder: "border-emerald-200",
    cardBg: "bg-white",
  },
  indigo: {
    border: "border-indigo-400",
    bg: "bg-indigo-50/60",
    title: "text-indigo-900",
    kicker: "text-indigo-600",
    line: "bg-indigo-300",
    cardBorder: "border-indigo-200",
    cardBg: "bg-white",
  },
  violet: {
    border: "border-violet-400",
    bg: "bg-violet-50/60",
    title: "text-violet-900",
    kicker: "text-violet-600",
    line: "bg-violet-300",
    cardBorder: "border-violet-200",
    cardBg: "bg-white",
  },
} as const;

function GroupColumn({
  group,
  position,
}: {
  group: Group;
  position: "first" | "middle" | "last" | "only";
}) {
  const t = TONE[group.tone];

  return (
    <div className="flex flex-col items-center">
      <ConnectorTop position={position} />

      <div
        className={`flex w-full flex-col rounded-2xl border-2 ${t.border} ${t.bg} p-5`}
      >
        <div className="mb-5 text-center">
          <div
            className={`text-xs font-mono uppercase tracking-widest ${t.kicker}`}
          >
            {group.kicker}
          </div>
          <div className={`mt-1 text-xl font-bold ${t.title}`}>
            {group.title}
          </div>
          <div className="text-sm text-zinc-600">{group.desc}</div>
        </div>

        <div className="space-y-3">
          {group.items.map((mod) => (
            <div
              key={mod.no}
              className={`rounded-lg border p-3 shadow-sm ${
                mod.star
                  ? "border-amber-300 bg-amber-50/50"
                  : `${t.cardBorder} ${t.cardBg}`
              }`}
            >
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`font-mono text-xs ${
                      mod.star ? "text-amber-700" : "text-zinc-400"
                    }`}
                  >
                    {mod.no}
                  </span>
                  <span className="font-semibold text-sm text-zinc-900 truncate">
                    {mod.title}
                  </span>
                </div>
                {mod.star && (
                  <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shrink-0">
                    ★ ERP
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed text-zinc-600">
                {mod.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
