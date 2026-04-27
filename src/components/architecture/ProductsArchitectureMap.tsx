import { SectionHeader } from "../sections/SectionHeader";
import { ConnectorTop, getPosition } from "./ConnectorTop";

type Category = {
  no: number;
  title: string;
  items: string[];
  star?: boolean;
};

type Group = {
  kicker: string;
  title: string;
  desc: string;
  tone: "emerald" | "amber" | "indigo";
  cats: Category[];
};

const GROUPS: Group[] = [
  {
    kicker: "群組一",
    title: "餐盒容器類",
    desc: "3 大類 / 15 子類",
    tone: "emerald",
    cats: [
      {
        no: 1,
        title: "植纖容器類",
        items: [
          "植纖餐盒",
          "植纖碗．盤",
          "植纖壽司盒",
          "植纖連體餐盒．醬料杯",
        ],
      },
      {
        no: 2,
        title: "牛皮紙容器類",
        items: [
          "牛皮紙餐盒",
          "牛卡紙開窗餐盒",
          "牛卡紙敞口盒．斜口杯",
          "牛皮紙湯杯碗．圓便當盒",
        ],
      },
      {
        no: 3,
        title: "紙製／塑膠容器類",
        items: [
          "紙湯杯．醬料杯",
          "紙製餐盒．紙圓便當盒",
          "透明輕食盒",
          "塑膠便當盒．壽司盒",
          "塑膠沙拉盒．食品盒",
          "塑膠連體醬料杯",
          "塑膠分隔內襯",
        ],
      },
    ],
  },
  {
    kicker: "群組二",
    title: "外帶週邊類",
    desc: "2 大類 / 17 子類 · 主力線",
    tone: "amber",
    cats: [
      {
        no: 4,
        title: "紙杯／膠杯／外帶週邊類",
        star: true,
        items: [
          "公版瓦楞杯",
          "雙層中空杯",
          "單層淋膜杯",
          "冷熱共用杯",
          "水杯．試飲杯",
          "紙杯杯蓋",
          "PLA 環保塑膠杯",
          "PET．PP 塑膠杯",
          "膠杯杯蓋",
          "杯套．杯提．杯座．分杯架",
        ],
      },
      {
        no: 5,
        title: "紙袋／淋膜袋／塑膠袋類",
        items: [
          "淋膜袋．淋膜包裝紙",
          "麵包袋．點心袋",
          "方型捧袋",
          "紙繩提袋",
          "塑膠提袋",
          "塑膠耐熱袋．夾鏈袋",
          "塑膠垃圾袋",
        ],
      },
    ],
  },
  {
    kicker: "群組三",
    title: "印刷與用品類",
    desc: "3 大類 / 17 子類",
    tone: "indigo",
    cats: [
      {
        no: 6,
        title: "印刷紙品類",
        items: [
          "公版餐盒腰封．封套",
          "公版餐墊．防油背心",
          "公版杯墊",
          "公版筷套",
          "公版刀叉套．湯匙套",
          "公版複寫聯單．熱感紙",
          "紙吸管套．蛋糕插卡",
          "產品型錄",
        ],
      },
      {
        no: 7,
        title: "餐具／餐廚用品類",
        items: ["餐刀叉匙", "吸管", "筷子．牙籤．咖啡調棒", "手套．餐廚用品"],
      },
      {
        no: 8,
        title: "清潔紙品／用品類",
        items: [
          "餐巾紙",
          "扇形紙．濕紙巾",
          "衛生紙．擦手紙",
          "清潔用品．掃除工具",
          "清潔劑．粉",
        ],
      },
    ],
  },
];

const TOTAL_SUBS = GROUPS.flatMap((g) => g.cats).reduce(
  (s, c) => s + c.items.length,
  0,
);
const TOTAL_CATS = GROUPS.flatMap((g) => g.cats).length;

export function ProductsArchitectureMap() {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50/40 px-6 py-24">
      <div className="mx-auto max-w-[1760px]">
        <SectionHeader
          kicker="公版商品分層"
          title="公版商品架構圖"
          desc={`${TOTAL_CATS} 大類 / ${TOTAL_SUBS} 子類 — 依使用情境分為三大群組，所有子類完整列出方便逐項討論。`}
        />

        {/* Root */}
        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center rounded-2xl border-2 border-amber-500 bg-amber-50 px-10 py-5 shadow-sm">
            <div className="text-2xl font-bold text-amber-900">
              公版商品系列
            </div>
            <div className="text-sm text-amber-700">
              {TOTAL_CATS} 大類 / {TOTAL_SUBS} 子類
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

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">★</span>
            <span>標示為最大類別</span>
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
  amber: {
    border: "border-amber-400",
    bg: "bg-amber-50/60",
    title: "text-amber-900",
    kicker: "text-amber-600",
    line: "bg-amber-300",
    catBorder: "border-amber-200",
    catHeader: "bg-amber-50/70 text-amber-900",
    catBullet: "bg-amber-300",
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
        {/* Group Header */}
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

        {/* Categories within this group */}
        <div className="space-y-4">
          {group.cats.map((cat) => (
            <div
              key={cat.no}
              className={`overflow-hidden rounded-lg border bg-white shadow-sm ${
                cat.star ? "border-amber-400" : t.catBorder
              }`}
            >
              <header
                className={`flex items-center justify-between gap-2 px-4 py-2.5 ${
                  cat.star ? "bg-amber-50" : t.catHeader
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      cat.star
                        ? "bg-amber-500 text-white"
                        : "bg-white/70 text-zinc-700"
                    }`}
                  >
                    {cat.no}
                  </span>
                  <span className="truncate font-semibold text-sm">
                    {cat.title}
                  </span>
                  {cat.star && (
                    <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-amber-800 shrink-0">
                      ★
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-zinc-600 shrink-0">
                  {cat.items.length}
                </span>
              </header>
              <ul className="px-4 py-2">
                {cat.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-2 py-1 text-xs text-zinc-700"
                  >
                    <span
                      className={`size-1 shrink-0 rounded-full ${
                        cat.star ? "bg-amber-400" : t.catBullet
                      }`}
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
