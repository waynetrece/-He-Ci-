"use client";

import Link from "next/link";
import { useState } from "react";
import { Annotated, Questioned } from "../CommentSystem";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

/* ============== Q definitions ============== */

const Q1 = {
  no: "Q1",
  question: "註冊流程是否分為「個人會員 / 企業客戶」兩種？企業客戶是否需後台審核或手動升級？兩種會員各自必填／選填哪些資料？",
  context:
    "目前畫面預設：① 註冊第一步先選會員類型 ② 個人會員填基本資料即可立即啟用 ③ 企業客戶填公司資料後標示「審核中」狀態，由 HJ 業務人工確認 ERP 編號與分級後啟用。實際是否要這樣分流，請貴司確認。",
  clientRef: {
    source: "前台 / 官網 (3) + 後台 / 顧客管理 (1)",
    quote: "註冊方式：LINE.Email（需驗證）；網站客人需與原 ERP 客戶編號相同",
    note: "需求表寫了註冊方式但未指定是否分「個人 / 企業」兩條路徑，以及企業是否需審核流程。",
  },
};

const Q2 = {
  no: "Q2",
  question: "LINE 在系統中是用來「快速登入／註冊」、「接收通知/客服綁定」，還是兩者都要支援？兩者畫面如何分清楚？",
  context:
    "目前畫面預設：①「LINE 一鍵登入／註冊」用來建立或登入會員（在這個 Auth 頁）② 登入後在「帳號設定」會另外有「LINE 帳號綁定」用來接收訂單／報價／出貨通知。兩者是不同功能，避免客戶混淆。",
  clientRef: {
    source: "前台 / 官網 (3) + 私版商品系列 (1)(2)",
    quote: "註冊方式：LINE.Email（需驗證）；複雜客製商品轉 LINE 客服報價",
    note: "需求表只提到「LINE 註冊」與「LINE 客服」，未細分用途。",
  },
};

/* ============== Icons ============== */

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function LineIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.197-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22v-4h6v4" />
      <line x1="8" y1="6" x2="10" y2="6" />
      <line x1="14" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="10" y2="10" />
      <line x1="14" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="10" y2="14" />
      <line x1="14" y1="14" x2="16" y2="14" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ============== Component ============== */

type Mode = "login" | "register";
type AccountType = "personal" | "business";
type Step =
  | "form"
  | "email-sent"
  | "line-redirecting"
  | "personal-done"
  | "business-pending";

export function MemberAuthMockup({
  annotations = false,
  pageId = "members-auth",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [mode, setMode] = useState<Mode>("register");
  const [type, setType] = useState<AccountType>("business");
  const [step, setStep] = useState<Step>("form");

  const reset = () => setStep("form");

  return (
    <MockupShell url="https://hjhj.com.tw/auth">
      <MockupSiteHeader />

      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white px-6 py-6">
        <div className="mx-auto max-w-[1760px]">
          <h1 className="text-2xl font-bold text-zinc-900">
            {mode === "register" ? "註冊會員" : "會員登入"}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            個人購買、餐飲業者皆可使用 — 客製商品、會員價、訂單追蹤一站搞定
          </p>
        </div>
      </section>

      {/* Mode toggle (註冊 / 登入) */}
      <section className="bg-zinc-50/50 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] gap-1 rounded-lg bg-white p-1 shadow-sm border border-zinc-200 w-fit">
          {(["register", "login"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                reset();
              }}
              className={`rounded-md px-5 py-2 text-sm font-bold transition-colors ${
                mode === m
                  ? "bg-amber-700 text-white"
                  : "text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              {m === "register" ? "註冊新帳號" : "我已有帳號"}
            </button>
          ))}
        </div>
      </section>

      {/* Main */}
      <section className="bg-zinc-50/50 px-6 py-8">
        <div className="mx-auto max-w-2xl">
          {/* === REGISTER === */}
          {mode === "register" && step === "form" && (
            <div className="space-y-5">
              {/* Step 1: choose type */}
              <Annotated
                show={annotations}
                source="ours"
                label="加值功能"
                title="會員類型分流"
                rationale={
                  "B2B 餐飲包材會員與個人會員的需求差異很大（公司資料、發票、ERP 編號、分級價）。一進註冊就分流可以避免後續資料補不齊。\n\n企業客戶會多一道「審核中」狀態，由 HJ 業務確認 ERP 編號與分級後才啟用，避免價格資訊錯配。"
                }
                pageId={pageId}
                elementId="account-type"
                elementLabel="會員類型分流"
                position="top-right"
              >
                <Questioned
                  show={annotations}
                  questions={[Q1]}
                  pageId={pageId}
                  position="top-left"
                >
                  <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                        1
                      </span>
                      <h2 className="text-lg font-bold text-zinc-900">
                        選擇會員類型
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        onClick={() => setType("personal")}
                        className={`flex items-start gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                          type === "personal"
                            ? "border-amber-600 bg-amber-50"
                            : "border-zinc-200 bg-white hover:border-amber-400"
                        }`}
                      >
                        <PersonIcon />
                        <div className="min-w-0">
                          <div className={`font-bold ${type === "personal" ? "text-amber-900" : "text-zinc-900"}`}>
                            個人會員
                          </div>
                          <div className="mt-0.5 text-xs text-zinc-500">
                            個人購買、自家活動使用
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setType("business")}
                        className={`flex items-start gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                          type === "business"
                            ? "border-amber-600 bg-amber-50"
                            : "border-zinc-200 bg-white hover:border-amber-400"
                        }`}
                      >
                        <BuildingIcon />
                        <div className="min-w-0">
                          <div className={`font-bold ${type === "business" ? "text-amber-900" : "text-zinc-900"}`}>
                            企業／餐飲業客戶
                          </div>
                          <div className="mt-0.5 text-xs text-zinc-500">
                            公司、餐廳、店家、咖啡廳
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </Questioned>
              </Annotated>

              {/* Step 2: registration form */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                    2
                  </span>
                  <h2 className="text-lg font-bold text-zinc-900">填寫資料</h2>
                </div>

                <div className="space-y-3 text-sm">
                  {type === "business" && (
                    <>
                      <Field label="公司名稱" required placeholder="禾啟餐飲有限公司" />
                      <Field label="統一編號" required placeholder="12345678" />
                    </>
                  )}
                  <Field label="姓名" required placeholder={type === "business" ? "聯絡人姓名" : "您的姓名"} />
                  <Field label="Email" required placeholder="email@example.com" />
                  <Field label="行動電話" required placeholder="0912-345-678" />
                  <Field label="密碼" type="password" required placeholder="至少 8 碼" />
                  <Field label="確認密碼" type="password" required />
                  {type === "business" && (
                    <div className="rounded-md border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-900">
                      註冊送出後，您的帳號將進入「審核中」狀態。HJ 業務人員會於 1 個工作日內確認您的公司資料與 ERP 客戶編號，啟用後您將收到 Email 通知。
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => {
                      setStep("email-sent");
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-amber-700 px-4 py-3 text-sm font-bold text-white hover:bg-amber-800"
                  >
                    <MailIcon />
                    送出註冊（Email 驗證）
                  </button>

                  <div className="relative my-2 text-center text-xs text-zinc-400">
                    <span className="relative z-10 bg-white px-3">或</span>
                    <div className="absolute inset-0 top-1/2 -translate-y-1/2 border-t border-zinc-200" />
                  </div>

                  <Questioned
                    show={annotations}
                    questions={[Q2]}
                    pageId={pageId}
                    position="top-right"
                  >
                    <button
                      onClick={() => {
                        setStep("line-redirecting");
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                    >
                      <LineIcon />
                      使用 LINE 一鍵註冊
                    </button>
                  </Questioned>
                </div>
              </div>
            </div>
          )}

          {/* === Email 驗證信已寄 === */}
          {mode === "register" && step === "email-sent" && (
            <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <MailIcon />
              </div>
              <h2 className="mt-5 text-xl font-bold text-zinc-900">
                驗證信已寄至您的信箱
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                請至 <span className="font-mono font-bold text-amber-800">your-email@example.com</span> 收信，<br />
                點擊信中連結完成 Email 驗證。
              </p>
              <div className="mx-auto mt-5 max-w-md rounded-md bg-zinc-50 p-3 text-xs text-zinc-500">
                沒收到？檢查垃圾信件匣，或 <button className="text-amber-700 hover:underline">重新寄送</button>
              </div>
              {type === "business" ? (
                <button
                  onClick={() => setStep("business-pending")}
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-amber-700 px-6 py-3 text-sm font-bold text-white hover:bg-amber-800"
                >
                  我已完成 Email 驗證
                  <ArrowRight />
                </button>
              ) : (
                <Link
                  href="/modules/members"
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-amber-700 px-6 py-3 text-sm font-bold text-white hover:bg-amber-800"
                  onClick={() => setStep("personal-done")}
                >
                  我已完成 Email 驗證 → 進入會員首頁
                  <ArrowRight />
                </Link>
              )}
            </div>
          )}

          {/* === LINE 跳轉中 === */}
          {mode === "register" && step === "line-redirecting" && (
            <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <LineIcon className="size-12" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-zinc-900">
                正在前往 LINE 授權頁
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                完成 LINE 授權後系統會自動建立您的會員帳號。
              </p>
              <Link
                href="/modules/members"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
              >
                模擬授權完成 → 進入會員首頁
                <ArrowRight />
              </Link>
              <p className="mt-3 text-xs text-zinc-400">
                （Demo 用：點此跳過 LINE 授權步驟）
              </p>
            </div>
          )}

          {/* === 企業客戶審核中 === */}
          {mode === "register" && step === "business-pending" && (
            <div className="rounded-xl border-2 border-amber-300 bg-amber-50/40 p-8 shadow-sm text-center">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <ClockIcon className="size-12" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-amber-900">
                您的企業帳號審核中
              </h2>
              <p className="mt-2 text-sm text-zinc-700">
                Email 驗證完成。HJ 業務人員會於 1 個工作日內確認您的公司資料與 ERP 客戶編號。
              </p>
              <div className="mx-auto mt-4 max-w-md rounded-md bg-white p-4 text-left text-xs">
                <div className="font-bold text-zinc-900 mb-2">審核中可使用功能</div>
                <ul className="space-y-1 text-zinc-600">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="size-4 text-emerald-600" />
                    瀏覽公版商品與一般價
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="size-4 text-emerald-600" />
                    申請樣品
                  </li>
                  <li className="flex items-center gap-2 opacity-50">
                    <span className="size-4">✕</span>
                    查看企業價、下單、私版報價（待審核完成後解鎖）
                  </li>
                </ul>
              </div>
              <Link
                href="/modules/members"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-amber-700 px-6 py-3 text-sm font-bold text-white hover:bg-amber-800"
              >
                先進入會員首頁
                <ArrowRight />
              </Link>
            </div>
          )}

          {/* === LOGIN === */}
          {mode === "login" && (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="space-y-3 text-sm">
                <Field label="Email" placeholder="email@example.com" />
                <Field label="密碼" type="password" />
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-1.5 text-zinc-600">
                    <input type="checkbox" className="size-3.5 rounded border-zinc-300 accent-amber-700" />
                    記住我
                  </label>
                  <button className="text-amber-700 hover:underline">忘記密碼？</button>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <Link
                  href="/modules/members"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-amber-700 px-4 py-3 text-sm font-bold text-white hover:bg-amber-800"
                >
                  登入
                  <ArrowRight />
                </Link>
                <div className="relative my-2 text-center text-xs text-zinc-400">
                  <span className="relative z-10 bg-white px-3">或</span>
                  <div className="absolute inset-0 top-1/2 -translate-y-1/2 border-t border-zinc-200" />
                </div>
                <Link
                  href="/modules/members"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                >
                  <LineIcon />
                  使用 LINE 登入
                </Link>
              </div>
            </div>
          )}

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-zinc-500">
            {mode === "register"
              ? "已有帳號？ "
              : "還沒有帳號？ "}
            <button
              onClick={() => {
                setMode(mode === "register" ? "login" : "register");
                reset();
              }}
              className="font-bold text-amber-700 hover:underline"
            >
              {mode === "register" ? "前往登入" : "立即註冊"}
            </button>
          </p>
        </div>
      </section>

      <MockupSiteFooter />
    </MockupShell>
  );
}

/* ============== Field component ============== */

function Field({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block font-medium text-zinc-700">
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-zinc-300 px-3 py-2 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
      />
    </div>
  );
}
