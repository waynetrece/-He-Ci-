import { SectionHeader } from "../sections/SectionHeader";
import { ConnectorTop, getPosition } from "./ConnectorTop";

type Service = {
  no: string;
  name: string;
  category: string;
  desc: string;
  star?: boolean;
};

type Group = {
  kicker: string;
  title: string;
  desc: string;
  tone: "amber" | "emerald" | "indigo";
  items: Service[];
};

const GROUPS: Group[] = [
  {
    kicker: "群組一",
    title: "核心整合",
    desc: "2 服務 · 關鍵差異化",
    tone: "amber",
    items: [
      {
        no: "01",
        name: "凌越資訊 ERP",
        category: "ERP 系統",
        desc: "與貴司現有 ERP 即時雙向同步：訂單、庫存、客戶資料完全一致，不再雙重作業。",
        star: true,
      },
      {
        no: "02",
        name: "Pacdora 3D Mockup",
        category: "客製商品 3D 預覽",
        desc: "客戶可上傳設計稿即時看到 3D 樣品、自動算出印刷面積與報價，大幅縮短客製商品報價時間。",
        star: true,
      },
    ],
  },
  {
    kicker: "群組二",
    title: "金物流",
    desc: "2 服務",
    tone: "emerald",
    items: [
      {
        no: "03",
        name: "綠界科技",
        category: "金流",
        desc: "信用卡、ATM、超商繳費完整支援，與電子發票自動勾稽。",
      },
      {
        no: "04",
        name: "四大超商 + 宅配",
        category: "物流",
        desc: "7-11、全家、萊爾富、OK 取貨；黑貓、新竹、宅配通整合。",
      },
    ],
  },
  {
    kicker: "群組三",
    title: "行銷與客服",
    desc: "2 服務",
    tone: "indigo",
    items: [
      {
        no: "05",
        name: "LINE Login + LINE@",
        category: "登入 + 客服",
        desc: "客戶可用 LINE 一鍵登入，私版商品報價直接在 LINE 對話延伸服務。",
      },
      {
        no: "06",
        name: "Google Ads + Meta",
        category: "行銷追蹤",
        desc: "完整轉換追蹤、再行銷受眾、廣告成效歸因。",
      },
    ],
  },
];

const TOTAL = GROUPS.flatMap((g) => g.items).length;

export function ExternalArchitectureMap() {
  return (
    <section className="border-b border-zinc-200 bg-white px-6 py-24">
      <div className="mx-auto max-w-[1760px]">
        <SectionHeader
          kicker="外部整合分層"
          title="外部整合架構圖"
          desc={`${TOTAL} 個第三方關鍵服務 — 依角色分為三大群組。標 ★ 為核心差異化整合。`}
        />

        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center rounded-2xl border-2 border-amber-500 bg-amber-50 px-10 py-5 shadow-sm">
            <div className="text-2xl font-bold text-amber-900">
              外部整合
            </div>
            <div className="text-sm text-amber-700">{TOTAL} 個服務</div>
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
            <span>標示為核心差異化整合</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const TONE = {
  amber: {
    border: "border-amber-400",
    bg: "bg-amber-50/60",
    title: "text-amber-900",
    kicker: "text-amber-600",
    line: "bg-amber-300",
    cardBorder: "border-amber-200",
  },
  emerald: {
    border: "border-emerald-400",
    bg: "bg-emerald-50/60",
    title: "text-emerald-900",
    kicker: "text-emerald-600",
    line: "bg-emerald-300",
    cardBorder: "border-emerald-200",
  },
  indigo: {
    border: "border-indigo-400",
    bg: "bg-indigo-50/60",
    title: "text-indigo-900",
    kicker: "text-indigo-600",
    line: "bg-indigo-300",
    cardBorder: "border-indigo-200",
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
          {group.items.map((svc) => (
            <div
              key={svc.no}
              className={`rounded-lg border bg-white p-4 shadow-sm ${
                svc.star ? "border-amber-300" : t.cardBorder
              }`}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                    {svc.category}
                  </div>
                  <div className="mt-0.5 text-base font-bold text-zinc-900">
                    {svc.name}
                  </div>
                </div>
                {svc.star && (
                  <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shrink-0">
                    ★
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed text-zinc-600">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
