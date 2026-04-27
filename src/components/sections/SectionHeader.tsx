export function SectionHeader({
  kicker,
  title,
  desc,
  align = "left",
}: {
  kicker: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`mb-12 max-w-3xl ${alignCls}`}>
      <div className="text-sm font-mono uppercase tracking-widest text-emerald-700">
        {kicker}
      </div>
      <h2 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 text-lg leading-relaxed text-zinc-600">{desc}</p>
      )}
    </div>
  );
}
