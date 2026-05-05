import Link from "next/link";

const automationLevels = [
  {
    title: "第一版務實",
    badge: "建議先做",
    tone: "border-emerald-500 bg-emerald-50 text-emerald-900",
    summary: "網站先判斷超商 / 宅配是否可選，HJ 出貨時人工填物流公司與編號。",
    steps: [
      "商品後台填箱購 / 條購、單條材積、整箱材積、重量",
      "結帳頁用 HJ 規則擋掉不可用配送方式",
      "宅配由 HJ 出貨時選物流商",
      "後台單筆或 Excel 匯入物流編號",
      "會員中心顯示狀態與追蹤連結",
    ],
    risk: "開發範圍可控；物流仍保留 HJ 人工彈性。",
  },
  {
    title: "半自動",
    badge: "第二階段",
    tone: "border-sky-500 bg-sky-50 text-sky-900",
    summary: "超商可串選店與寄件單，宅配仍以人工或批次方式處理。",
    steps: [
      "網站判斷可用配送方式",
      "超商訂單串物流平台選店 / 建單",
      "超商寄件單可批次列印",
      "宅配仍由 HJ 填物流公司與編號",
      "部分貨態可由平台回傳",
    ],
    risk: "比第一版多物流平台串接；但還不必串全部宅配公司。",
  },
  {
    title: "完整自動化",
    badge: "進階功能",
    tone: "border-violet-500 bg-violet-50 text-violet-900",
    summary: "系統自動拆件、選物流商、建單、回寫貨態與異常通知。",
    steps: [
      "購物車依尺寸 / 重量 / 材積自動拆件",
      "系統依規則選可用物流商",
      "多家宅配與超商 API 自動建單",
      "物流狀態自動同步到會員中心",
      "超規 / 異常 / 退貨流程自動通知",
    ],
    risk: "開發與維運成本高；需要 HJ 先定清楚拆件、例外、物流商優先序。",
  },
];

const lanes = [
  {
    label: "客戶",
    first: "選商品、看得到可用配送方式",
    full: "可看到系統自動拆件、不同包裹配送狀態",
  },
  {
    label: "網站",
    first: "依商品資料判斷超商 / 宅配 / 自取",
    full: "自動計算包裹、選物流商、送 API 建單",
  },
  {
    label: "HJ 後台",
    first: "人工確認出貨，填宅配公司與物流編號",
    full: "處理例外與異常，大部分物流資訊自動回寫",
  },
  {
    label: "物流平台",
    first: "提供規則；必要時建超商單或給追蹤連結",
    full: "接收建單、回傳貨態、處理物流異常通知",
  },
];

const productRules = [
  { name: "條購紙杯", spec: "單條材積 0.8 才 / 3kg", result: "可超商、可宅配" },
  { name: "箱購餐盒", spec: "整箱材積 4.5 才 / 8kg", result: "不開超商，只開宅配" },
  { name: "樣品組", spec: "免費樣品 / 需收運費", result: "待 A 包決定是否獨立配送" },
  { name: "離島地址", spec: "配送區域例外", result: "提示聯絡客服，不直接結帳" },
];

const fullAutomationQuestions = [
  "超過宅配限制時，是改客服確認、拆件，還是禁止結帳？",
  "多家宅配公司誰優先？新航、嘉里大榮、新竹、黑貓、大嘴鳥如何排序？",
  "拆成多件時，運費是由系統算，還是 HJ 出貨後調整？",
  "物流異常時要通知誰：客戶、業務、倉管，還是全部？",
  "退貨 / 逆物流是否也要自動建單？",
];

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="mb-6">
      <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
        {eyebrow}
      </div>
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-950">
        {title}
      </h2>
      <p className="mt-2 max-w-4xl text-sm leading-6 text-zinc-600">{desc}</p>
    </div>
  );
}

function StepNumber({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 font-mono text-xs font-bold text-white">
      {children}
    </span>
  );
}

export default function LogisticsAutomationPage() {
  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-300 bg-white px-6 py-6">
        <div className="mx-auto max-w-[1760px]">
          <nav className="mb-3 flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-900">
              首頁
            </Link>
            <span>/</span>
            <Link href="/modules/checkout" className="hover:text-zinc-900">
              金物流
            </Link>
            <span>/</span>
            <span className="font-medium text-zinc-900">物流自動化示意</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex rounded-md border border-amber-500 bg-amber-50 px-2 py-1 text-xs font-bold text-amber-800">
                HJ 物流規劃理解頁
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950">
                第一版物流判斷 vs 完整自動化
              </h1>
              <p className="mt-3 max-w-5xl text-base leading-7 text-zinc-600">
                同樣是「串物流」，範圍可以差很多。這頁用 HJ 的箱購 / 條購 /
                材積 / 多家宅配情境，把三種自動化程度放在同一張畫面比較。
              </p>
            </div>
            <div className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
              <div className="font-bold text-zinc-950">核心判斷</div>
              <div className="mt-1 max-w-md leading-6">
                物流平台公布限制與建單能力；網站負責把 HJ 商品資料套進規則，
                決定客戶可不可以選那個配送方式。
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <SectionTitle
            eyebrow="Automation Levels"
            title="三種物流自動化程度"
            desc="不是只有有串接 / 沒串接。真正的差異在於：商品規則誰維護、配送方式誰判斷、物流單誰建立、貨態誰更新。"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {automationLevels.map((level) => (
              <article
                key={level.title}
                className={`rounded-lg border-2 bg-white p-5 ${level.tone}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-black">{level.title}</h3>
                  <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold">
                    {level.badge}
                  </span>
                </div>
                <p className="mt-3 min-h-14 text-sm leading-6 text-zinc-700">
                  {level.summary}
                </p>
                <ol className="mt-5 space-y-3">
                  {level.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-6 text-zinc-800">
                      <StepNumber>{index + 1}</StepNumber>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 rounded-md border border-white/70 bg-white/70 px-3 py-2 text-sm font-medium text-zinc-800">
                  {level.risk}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-300 bg-white px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <SectionTitle
            eyebrow="Process Difference"
            title="同一張訂單，在不同自動化程度下誰負責？"
            desc="第一版的重點是先把客戶不能選的配送方式擋掉；完整自動化則會把建單、拆件、貨態同步都包進系統。"
          />
          <div className="overflow-hidden rounded-lg border border-zinc-300">
            <div className="grid grid-cols-[150px_1fr_1fr] bg-zinc-900 text-sm font-bold text-white">
              <div className="border-r border-zinc-700 px-4 py-3">角色</div>
              <div className="border-r border-zinc-700 px-4 py-3">第一版務實流程</div>
              <div className="px-4 py-3">完整自動化流程</div>
            </div>
            {lanes.map((lane) => (
              <div
                key={lane.label}
                className="grid grid-cols-[150px_1fr_1fr] border-t border-zinc-200 bg-white text-sm"
              >
                <div className="border-r border-zinc-200 px-4 py-4 font-bold text-zinc-950">
                  {lane.label}
                </div>
                <div className="border-r border-zinc-200 px-4 py-4 leading-6 text-zinc-700">
                  {lane.first}
                </div>
                <div className="px-4 py-4 leading-6 text-zinc-700">{lane.full}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-[1760px] gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionTitle
              eyebrow="Frontend Demo"
              title="結帳頁會怎麼判斷配送方式"
              desc="這不是正式 UI，只是用來理解邏輯：網站先看商品類型、材積、重量與地址，再決定要顯示哪些配送方式。"
            />
            <div className="rounded-lg border border-zinc-300 bg-white">
              <div className="border-b border-zinc-200 px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-black text-zinc-950">購物車配送檢查</h3>
                    <p className="mt-1 text-sm text-zinc-600">
                      範例：同時有條購、箱購、樣品與離島地址。
                    </p>
                  </div>
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
                    檢查後：超商不可選
                  </span>
                </div>
              </div>
              <div className="grid gap-3 p-5 md:grid-cols-2">
                {productRules.map((item) => (
                  <div key={item.name} className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-zinc-950">{item.name}</div>
                        <div className="mt-1 text-sm text-zinc-600">{item.spec}</div>
                      </div>
                    </div>
                    <div className="mt-3 rounded bg-white px-3 py-2 text-sm font-medium text-zinc-800">
                      {item.result}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-200 p-5">
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-md border-2 border-zinc-900 bg-zinc-900 p-4 text-white">
                    <div className="text-sm font-bold">宅配</div>
                    <div className="mt-1 text-xs leading-5 text-zinc-200">
                      可選。依材積級距計算運費，出貨時 HJ 填物流公司與編號。
                    </div>
                  </div>
                  <div className="rounded-md border-2 border-zinc-300 bg-zinc-100 p-4 text-zinc-500">
                    <div className="text-sm font-bold">超商取貨</div>
                    <div className="mt-1 text-xs leading-5">
                      不可選。購物車含箱購 / 超出超商規格。
                    </div>
                  </div>
                  <div className="rounded-md border-2 border-emerald-600 bg-emerald-50 p-4 text-emerald-900">
                    <div className="text-sm font-bold">自取</div>
                    <div className="mt-1 text-xs leading-5">
                      可選。依 HJ 倉庫取貨規則與備貨通知處理。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside>
            <SectionTitle
              eyebrow="Scope Guard"
              title="完整自動化要先問清楚的事"
              desc="如果要往完整自動化走，這些不是工程師自己能決定，會影響報價與營運流程。"
            />
            <div className="rounded-lg border border-zinc-300 bg-white p-5">
              <ol className="space-y-4">
                {fullAutomationQuestions.map((question, index) => (
                  <li key={question} className="flex gap-3">
                    <StepNumber>{index + 1}</StepNumber>
                    <div className="text-sm leading-6 text-zinc-700">{question}</div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
                對 HJ 目前回覆來看，第一版較合理是先做基本判斷與人工出貨資訊。
                完整自動化可保留為第二階段，不要在第一版直接承諾。
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
