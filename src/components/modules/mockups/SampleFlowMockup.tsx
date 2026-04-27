import { QuestionPin } from "../CommentSystem";

const Q6 = {
  no: "Q6",
  question: "樣品申請是否要收費？運費誰付？",
  context:
    "選項：① 完全免費 ② 樣品免費但運費自付 ③ 限金額或會員等級。影響表單後是否有結帳流程。",
};
const Q7 = {
  no: "Q7",
  question: "樣品申請是否限會員才能申請？",
  context:
    "選項：① 任何人皆可申請（要填收件資料）② 必須登入會員 ③ 須註冊但不需審核。影響流程入口。",
};
const Q8 = {
  no: "Q8",
  question: "是否需要後台人工審核才寄出？",
  context:
    "選項：① 自動寄出（送出表單立即進出貨流程）② 業務審核通過後才寄出（可避免濫用）。後者增加處理時間但較安全。",
};
const Q19 = {
  no: "Q19",
  question: "一次最多可以申請幾件樣品？",
  context: "範例：1 件 / 3 件 / 不限。影響表單的商品選擇器 UI。",
};
const Q20 = {
  no: "Q20",
  question: "樣品寄送方式有哪些？",
  context: "選項：超商取貨 / 宅配到府 / 自取。影響表單收件資訊欄位。",
};
const Q21 = {
  no: "Q21",
  question: "客戶是否能在會員中心查申請狀態？",
  context: "若要做：需要會員中心多一個「樣品申請紀錄」頁，可看狀態（申請中／審核中／已寄出／已收到）。",
};
const Q22 = {
  no: "Q22",
  question: "樣品申請的必填欄位有哪些？",
  context:
    "標配：姓名／公司名／電話／收件地址。可選：統編、用途說明、希望寄達日。每個欄位都要客戶確認是必填還是選填。",
};

type QItem = { no: string; question: string; context?: string };

/* ============== Flow building blocks ============== */
function StepNode({
  side,
  step,
  title,
  desc,
}: {
  side: "前台" | "後台";
  step: number;
  title: string;
  desc?: string;
}) {
  const isFront = side === "前台";
  return (
    <div
      className={`relative flex w-full max-w-md gap-3 rounded-lg border-2 p-4 shadow-sm ${
        isFront
          ? "border-amber-400 bg-amber-50"
          : "border-indigo-400 bg-indigo-50"
      }`}
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${
          isFront
            ? "bg-amber-700 text-white"
            : "bg-indigo-700 text-white"
        }`}
      >
        {step}
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              isFront
                ? "bg-amber-200 text-amber-900"
                : "bg-indigo-200 text-indigo-900"
            }`}
          >
            {side}
          </span>
          <span className="text-base font-bold text-zinc-900">{title}</span>
        </div>
        {desc && (
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">{desc}</p>
        )}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center py-1">
      <svg
        width="24"
        height="32"
        viewBox="0 0 24 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-zinc-400"
      >
        <line x1="12" y1="2" x2="12" y2="26" strokeLinecap="round" />
        <polyline points="6 22 12 30 18 22" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function DecisionPoint({
  questions,
  pageId,
  show,
  label,
}: {
  questions: QItem[];
  pageId: string;
  show: boolean;
  label: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-1">
      <div className="rounded-full border-2 border-rose-400 bg-rose-50 px-5 py-2 text-center text-sm font-bold text-rose-800 shadow-sm">
        ❓ 決策點：{label}
      </div>
      {show && <QuestionPin questions={questions} pageId={pageId} />}
    </div>
  );
}

/* ============== Component ============== */
export function SampleFlowMockup({
  annotations = false,
  pageId = "products-sample",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-zinc-400 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
      {/* Top label — 跟 LIVE PREVIEW 區分，這頁是「規劃文件」 */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-zinc-400 bg-zinc-900 px-4 py-2 text-xs text-zinc-300">
        <span className="flex items-center gap-1.5 text-emerald-300">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 17l6-6 4 4 8-8" />
            <polyline points="14 7 21 7 21 14" />
          </svg>
          <span className="font-mono uppercase tracking-widest">
            Operation Flow
          </span>
        </span>
        <span className="text-zinc-500">／</span>
        <span className="text-zinc-300">樣品申請操作流程</span>
      </div>

      <div className="bg-zinc-50/40 px-6 py-10">
        {/* Title + legend — 只留專業介紹，不寫內部對話 */}
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            樣品申請操作流程
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            客戶從商品頁申請樣品到收到的完整動線
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-amber-500" />
              前台
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-indigo-500" />
              後台
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-rose-500" />
              決策點
            </span>
          </div>
        </div>

        {/* Vertical flow */}
        <div className="mx-auto flex max-w-md flex-col items-stretch">
          <StepNode
            side="前台"
            step={1}
            title="商品詳情頁"
            desc="客戶瀏覽公版商品 → 看到「申請樣品」按鈕"
          />
          <Arrow />

          <StepNode
            side="前台"
            step={2}
            title="點「申請樣品」按鈕"
            desc="跳轉到樣品申請頁"
          />
          <Arrow />

          <DecisionPoint
            show={annotations}
            pageId={pageId}
            label="要登入嗎？"
            questions={[Q7]}
          />
          <Arrow />

          <StepNode
            side="前台"
            step={3}
            title="填寫申請表單"
            desc="商品（已帶入）／數量／收件資訊／用途備註等"
          />
          <Arrow />

          <DecisionPoint
            show={annotations}
            pageId={pageId}
            label="表單欄位／件數／寄送方式"
            questions={[Q22, Q19, Q20]}
          />
          <Arrow />

          <StepNode
            side="前台"
            step={4}
            title="送出表單"
            desc="顯示「申請成功」訊息（或「等待審核中」依下方決策）"
          />
          <Arrow />

          <DecisionPoint
            show={annotations}
            pageId={pageId}
            label="後台是否要審核？"
            questions={[Q8]}
          />
          <Arrow />

          <StepNode
            side="後台"
            step={5}
            title="收到申請通知"
            desc="業務在後台看到新申請，可選擇審核 / 直接出貨"
          />
          <Arrow />

          <DecisionPoint
            show={annotations}
            pageId={pageId}
            label="收費 / 運費規則？"
            questions={[Q6]}
          />
          <Arrow />

          <StepNode
            side="後台"
            step={6}
            title="寄出樣品"
            desc="出貨單給物流商（綠界 / 黑貓等）"
          />
          <Arrow />

          <StepNode
            side="前台"
            step={7}
            title="客戶收到樣品"
            desc="可能後續轉成大量訂單"
          />
          <Arrow />

          <DecisionPoint
            show={annotations}
            pageId={pageId}
            label="查詢狀態頁要做嗎？"
            questions={[Q21]}
          />
        </div>

      </div>
    </div>
  );
}
