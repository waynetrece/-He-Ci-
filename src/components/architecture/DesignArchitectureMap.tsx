import { SectionHeader } from "../sections/SectionHeader";
import { ConnectorTop, getPosition } from "./ConnectorTop";

type Item = {
  no: number;
  title: string;
  desc?: string;
  children: string[];
};

type Group = {
  kicker: string;
  title: string;
  desc: string;
  tone: "emerald" | "indigo" | "violet";
  items: Item[];
};

const GROUPS: Group[] = [
  {
    kicker: "群組一",
    title: "產品包裝設計",
    desc: "2 大類 / 14 項",
    tone: "emerald",
    items: [
      {
        no: 1,
        title: "餐飲／紙製品印刷設計",
        children: [
          "餐盒腰封．封套．豪華便當盒",
          "餐墊紙．防油背心",
          "杯墊紙",
          "紙杯．膠杯．杯套",
          "筷套．筷子套",
          "刀叉套．湯匙套",
          "淋膜紙．淋膜袋．點心袋",
          "餐巾紙．扇形紙．濕紙巾",
          "紙包筷．牙籤．吸管",
        ],
      },
      {
        no: 3,
        title: "商品平面／包裝設計",
        children: [
          "商品包裝",
          "手提紙袋",
          "塑膠袋",
          "數位貼紙",
          "喜帖．紅包袋",
        ],
      },
    ],
  },
  {
    kicker: "群組二",
    title: "店家行銷宣傳",
    desc: "1 大類 / 7 項",
    tone: "indigo",
    items: [
      {
        no: 2,
        title: "店家／宣傳品印刷設計",
        children: [
          "菜單本",
          "海報大圖",
          "文宣傳單",
          "名片．店卡．酷卡",
          "抵用券．抽獎券",
          "貴賓卡．會員卡",
          "旗幟．帆布．立牌",
        ],
      },
    ],
  },
  {
    kicker: "群組三",
    title: "企業應用印刷",
    desc: "1 大類 / 6 項",
    tone: "violet",
    items: [
      {
        no: 4,
        title: "公司／應用品印刷設計",
        children: [
          "品牌標誌",
          "型錄．書籍",
          "邀請卡．信封．信紙",
          "聯單．單色宣傳單",
          "資料夾．便條紙．桌曆",
          "原子筆．面紙包．荷葉扇",
        ],
      },
    ],
  },
];

const TOTAL_SUBS = GROUPS.flatMap((g) => g.items).reduce(
  (s, c) => s + c.children.length,
  0,
);
const TOTAL_CATS = GROUPS.flatMap((g) => g.items).length;

export function DesignArchitectureMap() {
  return (
    <section className="border-b border-zinc-200 bg-white px-6 py-24">
      <div className="mx-auto max-w-[1760px]">
        <SectionHeader
          kicker="設計服務分層"
          title="設計服務架構圖"
          desc={`${TOTAL_CATS} 大類 / ${TOTAL_SUBS} 項服務 — 依用途分為三大群組，所有服務項目完整列出。`}
        />

        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center rounded-2xl border-2 border-rose-500 bg-rose-50 px-10 py-5 shadow-sm">
            <div className="text-2xl font-bold text-rose-900">
              設計服務
            </div>
            <div className="text-sm text-rose-700">
              {TOTAL_CATS} 大類 / {TOTAL_SUBS} 項
            </div>
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
    catBorder: "border-emerald-200",
    catHeader: "bg-emerald-50/70 text-emerald-900",
    catBullet: "bg-emerald-300",
  },
  indigo: {
    border: "border-indigo-400",
    bg: "bg-indigo-50/60",
    title: "text-indigo-900",
    kicker: "text-indigo-600",
    line: "bg-indigo-300",
    catBorder: "border-indigo-200",
    catHeader: "bg-indigo-50/70 text-indigo-900",
    catBullet: "bg-indigo-300",
  },
  violet: {
    border: "border-violet-400",
    bg: "bg-violet-50/60",
    title: "text-violet-900",
    kicker: "text-violet-600",
    line: "bg-violet-300",
    catBorder: "border-violet-200",
    catHeader: "bg-violet-50/70 text-violet-900",
    catBullet: "bg-violet-300",
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

        <div className="space-y-4">
          {group.items.map((cat) => (
            <div
              key={cat.no}
              className={`overflow-hidden rounded-lg border bg-white shadow-sm ${t.catBorder}`}
            >
              <header
                className={`flex items-center justify-between gap-2 px-4 py-2.5 ${t.catHeader}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/70 text-xs font-bold text-zinc-700">
                    {cat.no}
                  </span>
                  <span className="truncate font-semibold text-sm">
                    {cat.title}
                  </span>
                </div>
                <span className="text-xs font-medium text-zinc-600 shrink-0">
                  {cat.children.length}
                </span>
              </header>
              <ul className="px-4 py-2">
                {cat.children.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-2 py-1 text-xs text-zinc-700"
                  >
                    <span
                      className={`size-1 shrink-0 rounded-full ${t.catBullet}`}
                    />
                    <span className="truncate">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
