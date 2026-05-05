"use client";

import { useState } from "react";
import { IconMail } from "@/components/modules/Icons";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "@/components/modules/MockupShell";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"input" | "sent" | "reset">("input");
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F20"
        title="忘記密碼"
        subtitle="Forgot Password"
        desc="Email / LINE 雙通道找回密碼 · 三步驟流程"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupShell url="https://hj.example.com/member/forgot">
            <MockupSiteHeader />

            <div className="px-6 py-16">
              <div className="mx-auto max-w-md">
                {/* Step nav */}
                <div className="mb-8 flex items-center justify-center gap-2 text-xs">
                  {[
                    { id: "input", l: "輸入 Email" },
                    { id: "sent", l: "查收信件" },
                    { id: "reset", l: "重設密碼" },
                  ].map((s, i) => (
                    <div key={s.id} className="flex items-center gap-2">
                      <span
                        className={`flex size-7 items-center justify-center rounded-full text-[11px] font-bold ${
                          step === s.id
                            ? "bg-amber-500 text-white"
                            : "bg-zinc-200 text-zinc-500"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className={step === s.id ? "font-bold text-amber-700" : "text-zinc-500"}>{s.l}</span>
                      {i < 2 && <span className="mx-1 text-zinc-300">→</span>}
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
                  {step === "input" && (
                    <>
                      <h2 className="text-2xl font-bold text-zinc-900">忘記密碼?</h2>
                      <p className="mt-2 text-sm text-zinc-600">
                        輸入您註冊時的 Email,我們會寄送重設密碼連結。
                      </p>
                      <div className="mt-6 space-y-4">
                        <div>
                          <label className="text-xs font-medium text-zinc-700">Email</label>
                          <input
                            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm"
                            placeholder="your@email.com"
                            defaultValue="customer@example.com"
                          />
                        </div>
                        <button onClick={() => setStep("sent")} className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-white hover:bg-amber-600">
                          寄送重設信
                        </button>
                        <div className="text-center text-xs text-zinc-500">
                          或使用 <a className="font-medium text-amber-700">LINE 找回密碼 →</a>
                        </div>
                      </div>
                    </>
                  )}
                  {step === "sent" && (
                    <>
                      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <IconMail size={28} />
                      </div>
                      <h2 className="mt-5 text-center text-2xl font-bold text-zinc-900">郵件已寄出</h2>
                      <p className="mt-3 text-center text-sm text-zinc-600">
                        我們已寄送重設密碼連結到<br />
                        <span className="font-bold text-zinc-900">customer@example.com</span>
                      </p>
                      <div className="mt-6 rounded-lg bg-amber-50 p-4 text-xs text-amber-800">
                        若 5 分鐘內未收到信,請檢查垃圾信件夾,或重新寄送。
                      </div>
                      <button onClick={() => setStep("reset")} className="mt-5 w-full rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-white">
                        我已收到信(模擬點擊連結)
                      </button>
                      <button className="mt-3 w-full text-xs text-zinc-500 hover:text-zinc-900">
                        重新寄送
                      </button>
                    </>
                  )}
                  {step === "reset" && (
                    <>
                      <h2 className="text-2xl font-bold text-zinc-900">重設密碼</h2>
                      <p className="mt-2 text-sm text-zinc-600">請輸入新密碼。</p>
                      <div className="mt-6 space-y-4">
                        <div>
                          <label className="text-xs font-medium text-zinc-700">新密碼</label>
                          <input type="password" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm" />
                          <div className="mt-1 text-xs text-zinc-500">至少 8 字元,需含英數字</div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-zinc-700">確認新密碼</label>
                          <input type="password" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm" />
                        </div>
                        <button className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-white hover:bg-amber-600">
                          完成重設
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-5 text-center text-sm text-zinc-500">
                  想起來了? <a href="/modules/members/auth" className="font-medium text-amber-700">回登入頁</a>
                </div>
              </div>
            </div>

            <MockupSiteFooter />
          </MockupShell>
        </div>
      </section>
      <ModuleFooterNav
        prev={{ title: "登入 / 註冊", href: "/modules/members/auth" }}
        next={{ title: "會員儀表板", href: "/modules/members" }}
      />
    </main>
  );
}
