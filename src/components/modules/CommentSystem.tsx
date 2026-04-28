"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

export type CommentType = "general" | "question" | "revision" | "ok";

export type Comment = {
  id: string;
  pageId: string;
  elementId: string;
  elementLabel: string;
  type: CommentType;
  text: string;
  createdAt: string;
};

const STORAGE_KEY = "hj-proposal-comments-v1";

/* ========== Type icons (clean SVG) ========== */
function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function QuestionIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function WarningIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function CommentBubbleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

const TYPE_META: Record<
  CommentType,
  {
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
    chip: string;
    ring: string;
    dot: string;
    iconColor: string;
  }
> = {
  general: {
    label: "一般留言",
    Icon: ChatIcon,
    chip: "bg-zinc-100 text-zinc-700 border-zinc-300",
    ring: "ring-zinc-400",
    dot: "bg-zinc-500",
    iconColor: "text-zinc-600",
  },
  question: {
    label: "有問題",
    Icon: QuestionIcon,
    chip: "bg-sky-100 text-sky-800 border-sky-300",
    ring: "ring-sky-400",
    dot: "bg-sky-500",
    iconColor: "text-sky-600",
  },
  revision: {
    label: "需要修改",
    Icon: WarningIcon,
    chip: "bg-rose-100 text-rose-800 border-rose-300",
    ring: "ring-rose-400",
    dot: "bg-rose-500",
    iconColor: "text-rose-600",
  },
  ok: {
    label: "這樣 OK",
    Icon: CheckIcon,
    chip: "bg-emerald-100 text-emerald-800 border-emerald-300",
    ring: "ring-emerald-400",
    dot: "bg-emerald-500",
    iconColor: "text-emerald-600",
  },
};

/* ========== Hook to manage comments ========== */
function useComments(pageId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setComments(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }, [comments, loaded]);

  const pageComments = comments.filter((c) => c.pageId === pageId);

  const add = (c: Omit<Comment, "id" | "createdAt">) => {
    setComments((prev) => [
      ...prev,
      {
        ...c,
        id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const remove = (id: string) =>
    setComments((prev) => prev.filter((c) => c.id !== id));

  const clearAll = () => {
    if (!confirm("確定刪除全部留言？")) return;
    setComments([]);
  };

  return { allComments: comments, pageComments, add, remove, clearAll };
}

/* ========== Annotation Badge — 可點擊（有說明時）展開原因 ========== */
function InfoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function ClipboardIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

export function AnnotationBadge({
  type,
  onClick,
}: {
  type: "client" | "ours";
  label?: string;
  onClick?: () => void;
}) {
  const isClient = type === "client";
  // Compact mode：預設只顯示「●建議」mini pill，hover 才放大顯示完整文案
  const cls = isClient
    ? "group inline-flex items-center gap-1 rounded-full border border-sky-500 bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-800 whitespace-nowrap shadow-sm"
    : "group inline-flex items-center gap-1 rounded-full border border-amber-500 bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-800 whitespace-nowrap shadow-sm";
  const dotCls = isClient ? "bg-sky-600" : "bg-amber-600";
  const labelText = isClient ? "客戶要求" : "我們建議";
  const compactLabel = isClient ? "客戶" : "建議";

  const inner = (
    <>
      <span className={`size-1.5 rounded-full ${dotCls}`} />
      {/* 預設 compact，hover 顯示完整文字 */}
      <span className="group-hover:hidden">{compactLabel}</span>
      <span className="hidden group-hover:inline">{labelText}</span>
      {onClick && <InfoIcon className="ml-0.5 size-3 opacity-70" />}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`${cls} hover:scale-105 transition-transform cursor-pointer`}
        title={`${labelText}（點擊看原因）`}
      >
        {inner}
      </button>
    );
  }

  return (
    <span className={cls} title={labelText}>
      {inner}
    </span>
  );
}

/* ========== Comment trigger button + dialog ========== */
export function CommentTrigger({
  pageId,
  elementId,
  elementLabel,
  variant = "icon",
}: {
  pageId: string;
  elementId: string;
  elementLabel: string;
  variant?: "icon" | "button";
}) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<CommentType>("general");
  const [text, setText] = useState("");
  const { pageComments, add } = useComments(pageId);

  const myComments = pageComments.filter((c) => c.elementId === elementId);
  const count = myComments.length;
  const topType = myComments[0]?.type;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`relative inline-flex items-center gap-1.5 transition-all ${
          variant === "icon"
            ? "size-9 justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm hover:border-zinc-400 hover:text-zinc-900"
            : "rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600 shadow-sm hover:border-zinc-400"
        }`}
        title={`對「${elementLabel}」留言`}
      >
        <CommentBubbleIcon />
        {variant === "button" && <span>留言</span>}
        {count > 0 && topType && (
          <span
            className={`absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow ${TYPE_META[topType].dot}`}
          >
            {count}
          </span>
        )}
      </button>

      {open && (
        <CommentDialog
          elementLabel={elementLabel}
          type={type}
          setType={setType}
          text={text}
          setText={setText}
          existing={myComments}
          onClose={() => {
            setOpen(false);
            setText("");
          }}
          onSubmit={() => {
            if (!text.trim()) return;
            add({ pageId, elementId, elementLabel, type, text: text.trim() });
            setText("");
            setOpen(false);
          }}
        />
      )}
    </>
  );
}

function CommentDialog({
  elementLabel,
  type,
  setType,
  text,
  setText,
  existing,
  onClose,
  onSubmit,
}: {
  elementLabel: string;
  type: CommentType;
  setType: (t: CommentType) => void;
  text: string;
  setText: (s: string) => void;
  existing: Comment[];
  onClose: () => void;
  onSubmit: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <ModalPortal>
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-zinc-200 px-6 py-4">
          <div className="text-sm text-zinc-500">針對此項目留言</div>
          <div className="mt-1 text-lg font-bold text-zinc-900">
            {elementLabel}
          </div>
        </div>

        {existing.length > 0 && (
          <div className="border-b border-zinc-100 px-6 py-3 max-h-32 overflow-y-auto">
            <div className="mb-2 text-xs text-zinc-500">
              已有 {existing.length} 則留言
            </div>
            {existing.map((c) => {
              const meta = TYPE_META[c.type];
              return (
                <div
                  key={c.id}
                  className={`mb-1.5 flex items-center gap-2 rounded border px-3 py-2 text-sm ${meta.chip}`}
                >
                  <meta.Icon className={`shrink-0 ${meta.iconColor}`} />
                  <span>{c.text}</span>
                </div>
              );
            })}
          </div>
        )}

        <div className="px-6 py-5">
          <div className="mb-2 text-sm font-medium text-zinc-700">
            留言類型
          </div>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {(Object.keys(TYPE_META) as CommentType[]).map((k) => {
              const meta = TYPE_META[k];
              return (
                <button
                  key={k}
                  onClick={() => setType(k)}
                  className={`flex items-center gap-2.5 rounded-md border px-4 py-3 text-sm transition-colors ${
                    type === k
                      ? `${meta.chip} ring-2 ${meta.ring} ring-offset-1`
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <meta.Icon className={meta.iconColor} />
                  <span className="font-medium">{meta.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mb-2 text-sm font-medium text-zinc-700">
            留言內容
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="請輸入您的意見、問題或修改建議..."
            rows={4}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-2 border-t border-zinc-200 bg-zinc-50 px-6 py-3">
          <button
            onClick={onClose}
            className="rounded-md border border-zinc-300 bg-white px-5 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            取消
          </button>
          <button
            onClick={onSubmit}
            disabled={!text.trim()}
            className="rounded-md bg-amber-700 px-5 py-2 text-sm font-medium text-white hover:bg-amber-800 disabled:bg-zinc-300 disabled:cursor-not-allowed"
          >
            送出
          </button>
        </div>
      </div>
    </div>
    </ModalPortal>
  );
}

/* ========== Mode Toggle Bar ========== */
export function CommentToolbar({
  pageId,
  pageLabel,
  annotations,
  setAnnotations,
}: {
  pageId: string;
  pageLabel: string;
  annotations: boolean;
  setAnnotations: (v: boolean) => void;
}) {
  const { pageComments, clearAll } = useComments(pageId);
  const [panelOpen, setPanelOpen] = useState(false);

  const counts = {
    general: pageComments.filter((c) => c.type === "general").length,
    question: pageComments.filter((c) => c.type === "question").length,
    revision: pageComments.filter((c) => c.type === "revision").length,
    ok: pageComments.filter((c) => c.type === "ok").length,
  };

  const total = pageComments.length;

  return (
    <>
      <div className="sticky top-[57px] z-30 border-b border-zinc-200 bg-white px-6 py-3 shadow-sm">
        <div className="mx-auto flex max-w-[1760px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono uppercase tracking-widest text-zinc-500">
              檢視模式
            </span>
            <div className="flex rounded-md border border-zinc-300 bg-white p-0.5">
              <button
                onClick={() => setAnnotations(false)}
                className={`rounded px-4 py-1.5 text-sm ${
                  !annotations
                    ? "bg-zinc-900 text-white font-semibold"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                乾淨檢視
              </button>
              <button
                onClick={() => setAnnotations(true)}
                className={`rounded px-4 py-1.5 text-sm ${
                  annotations
                    ? "bg-amber-700 text-white font-semibold"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                標註模式
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm">
            <CountChip type="general" count={counts.general} />
            <CountChip type="question" count={counts.question} />
            <CountChip type="revision" count={counts.revision} />
            <CountChip type="ok" count={counts.ok} />

            <button
              onClick={() => setPanelOpen(true)}
              className="ml-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
            >
              全部留言 ({total})
            </button>
          </div>
        </div>
      </div>

      {!panelOpen && total > 0 && (
        <button
          onClick={() => setPanelOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-amber-700 px-5 py-3 text-sm font-medium text-white shadow-xl hover:bg-amber-800"
        >
          <CommentBubbleIcon /> 留言 ({total})
        </button>
      )}

      {panelOpen && (
        <CommentSidePanel
          pageLabel={pageLabel}
          comments={pageComments}
          onClose={() => setPanelOpen(false)}
          onClear={clearAll}
        />
      )}
    </>
  );
}

function CountChip({
  type,
  count,
}: {
  type: CommentType;
  count: number;
}) {
  const meta = TYPE_META[type];
  if (count === 0)
    return (
      <span className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-zinc-400">
        <meta.Icon className="size-3.5" />
        <span>0</span>
      </span>
    );
  return (
    <span
      className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ${meta.chip}`}
    >
      <meta.Icon className={`size-3.5 ${meta.iconColor}`} />
      <span>{count}</span>
    </span>
  );
}

function CommentSidePanel({
  pageLabel,
  comments,
  onClose,
  onClear,
}: {
  pageLabel: string;
  comments: Comment[];
  onClose: () => void;
  onClear: () => void;
}) {
  const [filter, setFilter] = useState<CommentType | "all">("all");

  const filtered =
    filter === "all" ? comments : comments.filter((c) => c.type === filter);

  const exportText = () => {
    const lines = comments.map((c) => {
      const meta = TYPE_META[c.type];
      const date = new Date(c.createdAt).toLocaleString("zh-TW");
      return `[${meta.label}] ${c.elementLabel}\n「${c.text}」\n（${date}）`;
    });
    return `# ${pageLabel} 留言彙總\n\n${lines.join("\n\n---\n\n")}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText()).then(() => {
      alert("已複製全部留言到剪貼簿");
    });
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`[HJ Mockup 留言] ${pageLabel}`);
    const body = encodeURIComponent(exportText());
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30"
      onClick={onClose}
    >
      <aside
        className="absolute right-0 top-0 bottom-0 flex w-96 flex-col bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="border-b border-zinc-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-900">
              全部留言 ({comments.length})
            </h3>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-900 text-2xl leading-none"
            >
              ×
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(["all", "general", "question", "revision", "ok"] as const).map(
              (f) => {
                const isAll = f === "all";
                const meta = isAll ? null : TYPE_META[f];
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs ${
                      filter === f
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {meta && <meta.Icon className="size-3" />}
                    <span>{isAll ? "全部" : meta!.label}</span>
                  </button>
                );
              },
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-zinc-400">
              尚無留言。切到「標註模式」即可在元素旁留言。
            </div>
          ) : (
            <ul className="space-y-3">
              {filtered.map((c) => {
                const meta = TYPE_META[c.type];
                return (
                  <li
                    key={c.id}
                    className={`rounded-lg border p-4 ${meta.chip}`}
                  >
                    <div className="flex items-start gap-2">
                      <meta.Icon
                        className={`shrink-0 mt-0.5 ${meta.iconColor}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold">{meta.label}</div>
                        <div className="mt-1 text-xs text-zinc-600">
                          @ {c.elementLabel}
                        </div>
                        <div className="mt-2 text-sm text-zinc-900">
                          {c.text}
                        </div>
                        <div className="mt-1.5 text-[10px] text-zinc-500">
                          {new Date(c.createdAt).toLocaleString("zh-TW")}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className="space-y-2 border-t border-zinc-200 bg-zinc-50 px-6 py-4">
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              disabled={comments.length === 0}
              className="flex-1 rounded-md bg-amber-700 px-3 py-2 text-sm font-medium text-white hover:bg-amber-800 disabled:bg-zinc-300"
            >
              複製全部
            </button>
            <button
              onClick={handleEmail}
              disabled={comments.length === 0}
              className="flex-1 rounded-md border border-amber-300 bg-white px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-50 disabled:opacity-50"
            >
              寄給 Wayne
            </button>
          </div>
          <button
            onClick={onClear}
            disabled={comments.length === 0}
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-500 hover:text-rose-600 hover:border-rose-300 disabled:opacity-50"
          >
            清除全部留言
          </button>
        </footer>
      </aside>
    </div>
  );
}

/* ========== Question Pin — 一個 pin 可同時顯示多題（同主題群組） ========== */
export type ClientRef = {
  source: string; // 客戶需求表的位置，如「前台 / 公版商品系列 (3)」
  quote: string; // 原文摘錄
  note?: string; // 補充：客戶寫了什麼／沒寫什麼
};

export type QItem = {
  no: string;
  question: string;
  context?: string;
  clientRef?: ClientRef;
};

export function QuestionPin({
  questions,
  pageId,
}: {
  questions: QItem[];
  pageId: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (questions.length === 0) return null;
  const label = questions.map((q) => q.no).join("·");
  const tooltip = questions.map((q) => `${q.no}：${q.question}`).join("\n");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-1 rounded-full border-2 border-rose-600 bg-rose-500 py-1 pl-1 pr-2.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-110"
        title={`${tooltip}\n（點擊查看問題）`}
      >
        <span className="flex size-5 items-center justify-center rounded-full bg-white text-sm font-black text-rose-600">
          ?
        </span>
        <span className="tracking-wide">{label}</span>
      </button>

      {open && (
        <ModalPortal>
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-xl bg-white shadow-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-6 py-4">
              <div>
                <div className="text-xs text-zinc-500">待您確認的項目</div>
                <h3 className="mt-1 text-lg font-bold text-zinc-900">
                  {questions.length === 1
                    ? `1 題待確認`
                    : `共 ${questions.length} 題（同一區塊相關）`}
                </h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-zinc-900 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-zinc-100">
              {questions.map((q) => (
                <div key={q.no} className="px-6 py-5">
                  <div className="flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
                      {q.no}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-zinc-900 leading-snug">
                        {q.question}
                      </h4>
                      {q.context && (
                        <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                          {q.context}
                        </p>
                      )}
                      {q.clientRef && (
                        <div className="mt-3 rounded-md border border-sky-200 bg-sky-50/70 px-3 py-2.5 text-xs">
                          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 font-bold text-sky-800">
                              <ClipboardIcon /> 您的需求表
                            </span>
                            <span className="text-sky-300">·</span>
                            <span className="font-medium text-sky-700">
                              {q.clientRef.source}
                            </span>
                          </div>
                          <div className="text-sm leading-relaxed text-zinc-800">
                            「{q.clientRef.quote}」
                          </div>
                          {q.clientRef.note && (
                            <div className="mt-1 text-zinc-500">
                              {q.clientRef.note}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="mt-3">
                        <CommentTrigger
                          pageId={pageId}
                          elementId={`question-${q.no}`}
                          elementLabel={`${q.no}：${q.question}`}
                          variant="button"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 border-t border-zinc-200 bg-zinc-50 px-6 py-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
        </ModalPortal>
      )}
    </>
  );
}

/* ========== Questioned wrapper — 把同一組問題收進一個 pin ========== */
export function Questioned({
  show,
  questions,
  pageId,
  position = "top-right",
  children,
}: {
  show: boolean;
  questions: QItem[];
  pageId: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  children: ReactNode;
}) {
  const positionCls = {
    "top-right": "-top-3 -right-3",
    "top-left": "-top-3 -left-3",
    "bottom-right": "-bottom-3 -right-3",
    "bottom-left": "-bottom-3 -left-3",
  }[position];

  if (!show || questions.length === 0) return <>{children}</>;

  return (
    <div className="relative ring-2 ring-rose-400 ring-offset-2 ring-offset-white rounded-lg">
      {children}
      <div className={`absolute z-30 ${positionCls}`}>
        <QuestionPin questions={questions} pageId={pageId} />
      </div>
    </div>
  );
}

/* ========== Annotated wrapper — 標註 + 可選的「說明原因」彈窗 ========== */
export function Annotated({
  show,
  source,
  label,
  title,
  rationale,
  pageId,
  elementId,
  elementLabel,
  position = "top-right",
  children,
}: {
  show: boolean;
  source: "client" | "ours";
  label: string;
  title?: string;
  rationale?: string;
  pageId: string;
  elementId: string;
  elementLabel: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const positionCls = {
    "top-right": "-top-3 -right-3",
    "top-left": "-top-3 -left-3",
    "bottom-right": "-bottom-3 -right-3",
    "bottom-left": "-bottom-3 -left-3",
  }[position];

  if (!show) return <>{children}</>;

  const ringCls =
    source === "client"
      ? "ring-2 ring-sky-500 ring-offset-4 ring-offset-white rounded-xl"
      : "ring-2 ring-amber-500 ring-offset-4 ring-offset-white rounded-xl";

  const headColor =
    source === "client" ? "bg-sky-600" : "bg-amber-600";
  const sourceLabel = source === "client" ? "客戶要求" : "我們建議";

  return (
    <>
      <div className={`relative ${ringCls}`}>
        {children}
        <div className={`absolute z-20 flex items-center gap-1 ${positionCls}`}>
          <AnnotationBadge
            type={source}
            label={label}
            onClick={rationale ? () => setOpen(true) : undefined}
          />
          <CommentTrigger
            pageId={pageId}
            elementId={elementId}
            elementLabel={elementLabel}
            variant="icon"
          />
        </div>
      </div>

      {open && rationale && (
        <ModalPortal>
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center gap-3 rounded-t-xl px-6 py-3 text-white ${headColor}`}>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold">
                {sourceLabel}
              </span>
              <span className="text-xs opacity-90">／</span>
              <span className="text-xs font-medium opacity-90">{label}</span>
            </div>

            <div className="px-6 py-5">
              <h3 className="text-lg font-bold text-zinc-900">
                {title ?? elementLabel}
              </h3>
              <p className="mt-3 text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                {rationale}
              </p>
            </div>

            <div className="flex justify-between gap-2 border-t border-zinc-200 bg-zinc-50 px-6 py-3 rounded-b-xl">
              <button
                onClick={() => setOpen(false)}
                className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                關閉
              </button>
              <CommentTrigger
                pageId={pageId}
                elementId={elementId}
                elementLabel={elementLabel}
                variant="button"
              />
            </div>
          </div>
        </div>
        </ModalPortal>
      )}
    </>
  );
}
