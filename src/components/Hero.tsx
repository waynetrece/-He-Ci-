export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-emerald-400">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
          規劃階段 · Planning
        </div>
        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
          禾啟 <span className="text-emerald-400">HJ</span>
          <br />
          餐飲包材電商平台
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400">
          從 SHOPLINE 遷移至自架平台 · 整合凌越 ERP · 導入 Pacdora 3D 即時客製報價
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="商品大類" value="8" suffix="類" />
          <Stat label="商品子類" value="49" suffix="項" />
          <Stat label="後台模組" value="12" suffix="個" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-zinc-100">{value}</span>
        <span className="text-sm text-zinc-500">{suffix}</span>
      </div>
    </div>
  );
}
