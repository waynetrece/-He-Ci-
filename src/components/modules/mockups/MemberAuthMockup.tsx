"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

// 32 題 review 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 註冊方式 = LINE 或 Email(需驗證)— C 包
// - 會員 4 等級(北部直客 / 北部盤商 / 中南部直客 / 中南部盤商)由業務指派 — C 包
// - 註冊流程不分「個人 / 企業」(統一一個流程,等級由業務後台指派)
// - 凌越客編綁定機制 = 內部處理,等簽約後對齊(Q-C1 / Q-C2)
// - 訪客可瀏覽 + 看一般價,結帳前需登入

type Mode = "login" | "register";

export function MemberAuthMockup({
  annotations: _annotations,
  pageId: _pageId,
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [mode, setMode] = useState<Mode>("login");

  return (
    <MockupShell url={`https://hj.example.com/member/${mode === "login" ? "login" : "register"}`}>
      <MockupSiteHeader />

      <div className="bg-zinc-50 px-6 py-12">
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex rounded-xl bg-zinc-100 p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${mode === "login" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-600"}`}
            >
              登入
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${mode === "register" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-600"}`}
            >
              註冊
            </button>
          </div>

          {mode === "login" ? <LoginForm /> : <RegisterForm />}

          <div className="mt-5 text-center text-sm text-zinc-500">
            {mode === "login" ? (
              <>還沒有帳號? <button onClick={() => setMode("register")} className="font-medium text-amber-700 hover:underline">立即註冊</button></>
            ) : (
              <>已有帳號? <button onClick={() => setMode("login")} className="font-medium text-amber-700 hover:underline">回登入</button></>
            )}
          </div>
        </div>
      </div>

      <MockupSiteFooter />
    </MockupShell>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("customer@example.com");
  const [password, setPassword] = useState("");

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
      <h2 className="text-2xl font-bold text-zinc-900">會員登入</h2>
      <p className="mt-2 text-sm text-zinc-600">登入後可看會員等級價、下單、查訂單</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-medium text-zinc-700">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm" />
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <label className="text-xs font-medium text-zinc-700">密碼</label>
            <Link href="/modules/members/auth/forgot" className="text-xs text-amber-700 hover:underline">忘記密碼?</Link>
          </div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-xs text-zinc-600">
          <input type="checkbox" /> 記住我(7 天內免登入)
        </label>
        <Link
          href="/modules/members"
          className="block w-full rounded-lg bg-amber-600 py-3 text-center text-sm font-bold text-white hover:bg-amber-700"
        >
          登入
        </Link>
      </div>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-zinc-200" />
        <span className="text-xs text-zinc-400">或</span>
        <div className="h-px flex-1 bg-zinc-200" />
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-3 text-sm font-bold text-white hover:bg-emerald-600">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zM12 .572C5.385.572 0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314c0-5.371-5.385-9.742-12-9.742z" />
        </svg>
        使用 LINE 登入
      </button>
    </div>
  );
}

function RegisterForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const canSubmit = name && phone && email && password.length >= 8 && agree;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
      <h2 className="text-2xl font-bold text-zinc-900">註冊新會員</h2>
      <p className="mt-2 text-sm text-zinc-600">
        註冊後可申請樣品、瀏覽會員價;下單前需 HJ 業務確認等級。
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-medium text-zinc-700">聯絡人姓名 *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-700">公司 / 品牌名稱(若有)</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm" placeholder="例:某某餐飲" />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-700">電話 *</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm" placeholder="0912-345-678" />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-700">Email *(註冊後需驗證)</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-700">密碼 *(至少 8 字元)</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm" />
        </div>
        <label className="flex items-start gap-2 text-xs text-zinc-600">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5" />
          <span>我已閱讀並同意 <Link href="/modules/policy" className="text-amber-700 underline">服務條款</Link> 與 <Link href="/modules/policy" className="text-amber-700 underline">隱私權政策</Link></span>
        </label>
        <button
          disabled={!canSubmit}
          className={`block w-full rounded-lg py-3 text-center text-sm font-bold text-white ${canSubmit ? "bg-amber-600 hover:bg-amber-700" : "bg-zinc-300 cursor-not-allowed"}`}
        >
          註冊並寄送驗證信
        </button>
      </div>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-zinc-200" />
        <span className="text-xs text-zinc-400">或</span>
        <div className="h-px flex-1 bg-zinc-200" />
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-3 text-sm font-bold text-white hover:bg-emerald-600">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zM12 .572C5.385.572 0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314c0-5.371-5.385-9.742-12-9.742z" />
        </svg>
        使用 LINE 一鍵註冊
      </button>

      <div className="mt-5 rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
        <div className="font-bold mb-1">關於會員等級</div>
        <p>會員分 4 等級:北部直客 / 北部盤商 / 中南部直客 / 中南部盤商,由業務依採購地區與通路指派。註冊後業務會在 1 個工作天內聯繫設定等級;設定前可瀏覽公版、申請樣品。</p>
      </div>
    </div>
  );
}
