const TASKS = [
  { label: "讀取需求 PDF", done: true },
  { label: "分析現有 SHOPLINE 官網架構", done: true },
  { label: "凌越 ERP 初步調研", done: true },
  { label: "Pacdora 3D 整合可行性確認", done: true },
  { label: "客戶回覆 10+ 個關鍵問題", done: false },
  { label: "凌越提供 API 文件 + 報價", done: false },
  { label: "Pacdora 商業方案詢價", done: false },
  { label: "技術方案確定", done: false },
  { label: "正式報價單", done: false },
];

export function ProjectStatus() {
  const doneCount = TASKS.filter((t) => t.done).length;
  const progress = Math.round((doneCount / TASKS.length) * 100);

  return (
    <section className="border-b border-zinc-800 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Project Progress
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">目前進度</h2>
          </div>
          <div className="text-right">
            <div className="font-mono text-4xl font-bold text-emerald-400">
              {progress}
              <span className="text-xl text-zinc-500">%</span>
            </div>
            <div className="text-xs text-zinc-500">
              {doneCount} / {TASKS.length}
            </div>
          </div>
        </div>

        <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-zinc-900">
          <div
            className="h-full bg-emerald-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {TASKS.map((task) => (
            <li
              key={task.label}
              className="flex items-center gap-3 rounded-md border border-zinc-800 bg-zinc-900/30 px-4 py-3"
            >
              <span
                className={`flex size-5 items-center justify-center rounded-full text-xs ${
                  task.done
                    ? "bg-emerald-400/20 text-emerald-400"
                    : "border border-zinc-700 text-zinc-600"
                }`}
              >
                {task.done ? "✓" : ""}
              </span>
              <span
                className={
                  task.done ? "text-zinc-300" : "text-zinc-500"
                }
              >
                {task.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
