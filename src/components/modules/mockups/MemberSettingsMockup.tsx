"use client";

import Link from "next/link";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

// 32 題 review A 包 + B 包 + C 包 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 不分「個人 / 企業」分流(C 包)
// - 4 等級由業務後台指派,會員此頁只能查看(C 包)
// - 凌越客編 = 內部處理,不對會員顯示(Q-C1 / Q-C2)
// - 發票格式 = 三聯 / 二聯+載具 / 捐贈+愛心碼(B 包,跟結帳流程一致)
// - 註冊方式 = LINE 或 Email(C 包),此頁顯示綁定狀態
// - 通知偏好 — LINE 整體規劃 phase 2,目前只開 Email 通知
//
// 已 deprecated 概念(原 mockup 有,review 不採用):
// - 個人/企業 切換 toggle(已不分流)
// - ERP 客戶編號對會員顯示(改為內部處理)
// - 公司資料 區塊「待業務確認」回 ERP 流程(改為業務後台直接維護)
// - LINE 通知細項(phase 2 再規劃)

/* ============== Icons ============== */

function CheckCircle() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.707 9.707-7 7a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L10 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function LineIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zM12 .572C5.385.572 0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314c0-5.371-5.385-9.742-12-9.742z" />
    </svg>
  );
}

/* ============== Component ============== */

export function MemberSettingsMockup({
  annotations: _annotations,
  pageId: _pageId,
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  return (
    <MockupShell url="https://hjhj.com.tw/members/settings">
      <MockupSiteHeader />

      {/* Breadcrumb */}
      <section className="border-b border-zinc-200 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/members" className="hover:text-zinc-900">
            會員首頁
          </Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="font-semibold text-zinc-900">帳號設定</span>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white px-6 py-5">
        <div className="mx-auto max-w-[1760px]">
          <h1 className="text-2xl font-bold text-zinc-900">帳號設定</h1>
          <p className="mt-1 text-sm text-zinc-500">
            管理登入帳號、收件地址、發票偏好與通知
          </p>
        </div>
      </section>

      {/* Sections grid */}
      <section className="bg-zinc-50/40 px-6 py-8">
        <div className="mx-auto max-w-[1760px] space-y-6">
          {/* 1. 基本登入資料 */}
          <Section title="基本登入資料" subtitle="您的會員帳號與聯絡資訊">
            <Field label="姓名" value="陳先生" editable />
            <Field label="公司 / 品牌名稱" value="禾啟餐飲" editable />
            <Field label="行動電話" value="0912-345-678" verified editable />
            <Field
              label="Email"
              value="wayne@example.com"
              verified
              action={
                <button className="text-xs text-amber-700 hover:underline">
                  變更 Email
                </button>
              }
            />
            <Field
              label="密碼"
              value="••••••••"
              action={
                <button className="text-xs text-amber-700 hover:underline">
                  變更密碼
                </button>
              }
            />
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-zinc-500">LINE 綁定</label>
                <button className="text-xs text-amber-700 hover:underline">
                  解除綁定
                </button>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  <LineIcon />
                  已綁定 (Wayne C.)
                </span>
              </div>
              <div className="mt-1 text-[10px] text-zinc-400">
                解除後將無法使用 LINE 一鍵登入
              </div>
            </div>
          </Section>

          {/* 2. 會員等級狀態(唯讀,業務後台指派) */}
          <Section
            title="會員等級狀態"
            subtitle="由 HJ 業務後台依採購地區與通路指派,如需調整請聯繫業務"
            tone="amber"
          >
            <Field
              label="目前等級"
              value="北部直客"
              highlight
              meta="由業務於 2026/04/26 指派"
            />
            <Field
              label="專屬業務窗口"
              value="王業務"
              meta="0912-345-678 / LINE @hj-sales-wang"
            />
            <Field
              label="適用價格"
              value="北部直客專屬價(會員價)"
            />
            <Field
              label="可用功能"
              value="公版商品、樣品申請、私版詢價"
            />
            <div className="col-span-full rounded-md bg-amber-50/60 p-3 text-xs text-amber-900">
              會員 4 等級:北部直客 / 北部盤商 / 中南部直客 / 中南部盤商。等級由業務後台維護,公司資料與凌越對接由業務協助處理。
            </div>
          </Section>

          {/* 3. 收件地址 */}
          <Section
            title="常用收件地址"
            subtitle="可儲存多筆地址,結帳時直接選用,可標記預設"
            extra={
              <button className="flex items-center gap-1 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50">
                <PlusIcon />
                新增地址
              </button>
            }
          >
            <div className="col-span-full space-y-2">
              {[
                {
                  tag: "總店",
                  name: "禾啟餐飲(總店)",
                  addr: "新北市五股區五權五路 10 號",
                  phone: "陳先生 0912-345-678",
                  isDefault: true,
                },
                {
                  tag: "信義分店",
                  name: "禾啟餐飲(信義分店)",
                  addr: "台北市信義區市府路 1 號",
                  phone: "張小姐 0922-111-222",
                },
                {
                  tag: "倉庫",
                  name: "禾啟貨倉",
                  addr: "桃園市龜山區工業路 5 號",
                  phone: "倉管 0933-555-666",
                },
              ].map((a) => (
                <article
                  key={a.tag}
                  className={`flex items-start gap-3 rounded-lg border p-4 ${
                    a.isDefault
                      ? "border-amber-300 bg-amber-50/40"
                      : "border-zinc-200 bg-white"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800">
                      {a.tag}
                    </span>
                    {a.isDefault && (
                      <span className="rounded bg-amber-700 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        預設
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 text-sm">
                    <div className="font-bold text-zinc-900">{a.name}</div>
                    <div className="text-zinc-600">{a.phone}</div>
                    <div className="text-zinc-600">{a.addr}</div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {!a.isDefault && (
                      <button className="text-xs text-amber-700 hover:underline">
                        設為預設
                      </button>
                    )}
                    <button className="text-xs text-zinc-500 hover:text-zinc-900">
                      編輯
                    </button>
                    <button className="text-xs text-zinc-500 hover:text-rose-700">
                      刪除
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          {/* 4. 發票資料 */}
          <Section
            title="發票偏好"
            subtitle="結帳時自動帶入,也可結帳時改用其他類型"
          >
            <Field
              label="預設發票類型"
              value="三聯式發票(電子)"
              editable
              meta="另支援:二聯+載具 / 捐贈+愛心碼"
            />
            <Field label="發票抬頭" value="禾啟餐飲有限公司" editable />
            <Field label="統一編號" value="12345678" mono editable />
            <Field
              label="發票寄送 Email"
              value="invoice@hjhj.com.tw"
              verified
              editable
            />
            <div className="col-span-full rounded-md bg-zinc-50 p-3 text-xs text-zinc-600">
              發票類型於結帳流程可逐單調整(三聯 / 二聯+載具 / 捐贈+愛心碼三選一)。
            </div>
          </Section>

          {/* 5. 通知偏好(僅 Email,phase 1) */}
          <Section
            title="通知偏好"
            subtitle="目前僅開放 Email 通知;LINE 通知細項待後續規劃"
          >
            <div className="col-span-full">
              <div className="overflow-hidden rounded-lg border border-zinc-200">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 text-xs text-zinc-500">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-medium">通知類型</th>
                      <th className="px-4 py-2.5 text-center font-medium">Email</th>
                      <th className="px-4 py-2.5 text-center font-medium">LINE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      { name: "訂單成立通知", email: true, required: true },
                      { name: "出貨通知(含物流單號)", email: true, required: false },
                      { name: "詢價單回覆", email: true, required: false },
                      { name: "樣品出貨", email: true, required: false },
                      { name: "重要公告", email: true, required: true },
                      { name: "行銷活動", email: false, required: false },
                    ].map((n) => (
                      <tr key={n.name}>
                        <td className="px-4 py-2.5">
                          {n.name}
                          {n.required && (
                            <span className="ml-1.5 text-[10px] text-zinc-400">
                              (必開)
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <input
                            type="checkbox"
                            defaultChecked={n.email}
                            disabled={n.required && n.email}
                            className="size-4 rounded border-zinc-300 accent-amber-700 disabled:opacity-60"
                          />
                        </td>
                        <td className="px-4 py-2.5 text-center text-xs text-zinc-400">
                          phase 2
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-2 text-[11px] text-zinc-500">
                  ※ LINE 通知將於後續開發,需 HJ 確認通知範圍與 Channel 設定後才能啟用
                </div>
              </div>
            </div>
          </Section>

          {/* Back link */}
          <div className="flex justify-center pt-4">
            <Link
              href="/modules/members"
              className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900"
            >
              <ChevronLeft />
              返回會員首頁
            </Link>
          </div>
        </div>
      </section>

      <MockupSiteFooter />
    </MockupShell>
  );
}

/* ============== Subcomponents ============== */

function Section({
  title,
  subtitle,
  children,
  extra,
  tone = "default",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
  tone?: "default" | "amber" | "emerald";
}) {
  const toneCls = {
    default: "border-zinc-200 bg-white",
    amber: "border-amber-200 bg-white",
    emerald: "border-emerald-200 bg-white",
  }[tone];

  return (
    <section className={`rounded-xl border ${toneCls} p-6 shadow-sm`}>
      <header className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-zinc-900">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>
          )}
        </div>
        {extra && <div className="shrink-0">{extra}</div>}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  mono,
  highlight,
  verified,
  editable,
  action,
  meta,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
  verified?: boolean;
  editable?: boolean;
  action?: React.ReactNode;
  meta?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-xs text-zinc-500">{label}</label>
        {action ? (
          <span>{action}</span>
        ) : editable ? (
          <button className="text-xs text-amber-700 hover:underline">
            編輯
          </button>
        ) : null}
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span
          className={`flex-1 ${mono ? "font-mono" : ""} ${highlight ? "rounded bg-amber-100 px-2 py-0.5 inline-block text-amber-900" : "text-zinc-900"} font-medium`}
        >
          {value}
        </span>
        {verified && (
          <span className="flex items-center gap-1 text-xs text-emerald-700">
            <CheckCircle />
            已驗證
          </span>
        )}
      </div>
      {meta && <div className="mt-1 text-[10px] text-zinc-400">{meta}</div>}
    </div>
  );
}
