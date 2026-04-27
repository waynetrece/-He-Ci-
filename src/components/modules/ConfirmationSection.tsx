type Question = {
  no: string;
  question: string;
  context?: string;
  importance?: "high" | "normal";
};

export function ConfirmationSection({ questions }: { questions: Question[] }) {
  const highCount = questions.filter((q) => q.importance === "high").length;

  return (
    <section className="border-b border-zinc-200 bg-amber-50/40 px-6 py-16">
      <div className="mx-auto max-w-[1760px]">
        <div className="mb-8 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-amber-900">
              待您確認的項目
            </h2>
            <p className="mt-3 max-w-3xl text-base text-zinc-700">
              以下是本模組需要與貴司確認的事項，將影響後續實際開發方向。
            </p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full bg-rose-500 px-3 py-1.5 text-xs font-bold text-white">
              ⭐ 重要 · {highCount}
            </span>
            <span className="rounded-full bg-amber-500 px-3 py-1.5 text-xs font-bold text-white">
              一般 · {questions.length - highCount}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {questions.map((q) => (
            <article
              key={q.no}
              className={`flex gap-4 rounded-lg border bg-white p-5 ${
                q.importance === "high" ? "border-rose-300" : "border-amber-200"
              }`}
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${
                  q.importance === "high"
                    ? "bg-rose-500 text-white"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {q.no}
              </span>
              <div className="flex-1">
                <h3 className="text-base font-bold leading-snug text-zinc-900">
                  {q.question}
                </h3>
                {q.context && (
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                    {q.context}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
