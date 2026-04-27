const PILLARS = [
  {
    title: "公版商品",
    subtitle: "Standard Products",
    desc: "8 大類 / 49 子類，多層規格選項、樣品申請、材積換算",
    risk: "high",
  },
  {
    title: "私版客製",
    subtitle: "Custom Products",
    desc: "互動式即時報價（Pacdora API）+ 複雜商品轉 LINE 客服",
    risk: "very-high",
  },
  {
    title: "ERP 串接",
    subtitle: "Lingyue Integration",
    desc: "訂單匯入、庫存即時、客戶編號同步、會員分級價",
    risk: "very-high",
  },
  {
    title: "會員 / 訂單",
    subtitle: "Member & Orders",
    desc: "LINE + Email 註冊、歷史訂單、一鍵再購、配送追蹤",
    risk: "medium",
  },
  {
    title: "金流 / 物流",
    subtitle: "Payment & Logistics",
    desc: "綠界 / 匯款 / 貨到付款 · 四大超商 / 多家宅配 / 自取",
    risk: "low",
  },
  {
    title: "後台管理",
    subtitle: "Admin Console",
    desc: "12 個模組：商品、訂單、庫存、顧客、行銷、權限管理",
    risk: "high",
  },
];

const RISK_STYLES = {
  low: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  medium: "text-amber-400 border-amber-400/30 bg-amber-400/5",
  high: "text-orange-400 border-orange-400/30 bg-orange-400/5",
  "very-high": "text-rose-400 border-rose-400/30 bg-rose-400/5",
} as const;

const RISK_LABEL = {
  low: "低",
  medium: "中",
  high: "高",
  "very-high": "極高",
} as const;

export function ArchitectureOverview() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Architecture Overview
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">六大模組</h2>
          <p className="mt-3 text-zinc-400">
            完整架構與商品分類樹詳見 Obsidian 規劃文件
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-zinc-700"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                    {p.subtitle}
                  </div>
                  <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
                </div>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs ${
                    RISK_STYLES[p.risk as keyof typeof RISK_STYLES]
                  }`}
                >
                  風險 {RISK_LABEL[p.risk as keyof typeof RISK_LABEL]}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
