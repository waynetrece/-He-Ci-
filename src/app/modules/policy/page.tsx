"use client";

import { useState } from "react";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import { MockupCmsPage } from "@/components/modules/MockupCmsPage";

const TABS = [
  { id: "privacy", label: "隱私權政策" },
  { id: "terms", label: "服務條款" },
  { id: "shipping", label: "購物與運送" },
  { id: "return", label: "退換貨政策" },
];

export default function PolicyPage() {
  const [tab, setTab] = useState("privacy");
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F7"
        title="政策條款"
        subtitle="Policies"
        desc="隱私權政策 · 服務條款 · 購物運送 · 退換貨"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupCmsPage
            url="https://hj.example.com/policy"
            pageTitle="政策與條款"
            pageDesc="網站使用前請詳閱以下條款,有任何疑問可透過客服詢問。"
            breadcrumb={[{ label: "政策條款" }]}
          >
            {/* Tabs */}
            <div className="mb-8 flex flex-wrap gap-2 border-b border-zinc-200">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative px-5 py-3 text-sm font-medium transition-colors ${
                    tab === t.id ? "text-amber-700" : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {t.label}
                  {tab === t.id && (
                    <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-amber-500" />
                  )}
                </button>
              ))}
            </div>

            <div className="prose max-w-none space-y-5 text-sm leading-relaxed text-zinc-700">
              {tab === "privacy" && (
                <>
                  <h3 className="text-2xl font-bold text-zinc-900">隱私權政策</h3>
                  <p className="text-xs text-zinc-500">最後更新:2026.05.01</p>
                  <p>
                    禾啟股份有限公司(以下簡稱「本公司」)非常重視會員與客戶的隱私權保護,
                    為使您能夠安心使用本網站的各項服務與資訊,特此向您說明本網站之隱私權保護政策。
                  </p>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">1. 個資蒐集範圍</h4>
                  <p>
                    為提供您完整的服務,我們蒐集的資料包括:姓名、公司名稱、統一編號、聯絡電話、Email、收件地址、
                    LINE ID(若採用 LINE 註冊或通知)。
                  </p>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">2. 個資使用方式</h4>
                  <p>蒐集的個資僅用於訂單處理、客戶服務、出貨配送、發票開立、行銷通知(可隨時取消)。</p>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">3. 第三方資料分享</h4>
                  <p>
                    為完成訂單,我們會將必要資料提供給:綠界(金流)、宅配 / 黑貓 / 7-11(物流)、凌越 ERP(訂單同步)、
                    LINE Messaging API(訂單通知)。除上述用途外,不會將您的個資提供給其他第三方。
                  </p>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">4. Cookie 使用</h4>
                  <p>本網站使用 Cookie 提供個人化體驗、進行流量分析(Google Analytics)。您可於瀏覽器設定中拒絕。</p>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">5. 個資查詢與刪除</h4>
                  <p>您可隨時透過會員中心查詢、修改個資;若需刪除帳號,請聯繫客服協助。</p>
                </>
              )}
              {tab === "terms" && (
                <>
                  <h3 className="text-2xl font-bold text-zinc-900">服務條款</h3>
                  <p className="text-xs text-zinc-500">最後更新:2026.05.01</p>
                  <p>使用禾啟網站表示您同意以下條款。本公司有權隨時修訂條款,修訂內容將公告於本頁。</p>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">1. 會員資格</h4>
                  <p>會員需年滿 18 歲,並提供真實聯絡資訊。會員資料如有不實,本公司有權暫停服務。</p>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">2. 訂單成立</h4>
                  <p>客戶下單後,訂單於本公司確認付款後成立。本公司保留審核訂單的權利,如商品錯標、無庫存等情況可取消訂單並全額退款。</p>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">3. 智慧財產權</h4>
                  <p>網站所有內容(文字、圖片、商品設計)為本公司或合法授權人所有,未經許可不得轉載。</p>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">4. 私版客製</h4>
                  <p>客戶提供的 Logo / 設計檔需擁有合法使用權,如有侵權糾紛由客戶自行負責。</p>
                </>
              )}
              {tab === "shipping" && (
                <>
                  <h3 className="text-2xl font-bold text-zinc-900">購物與運送</h3>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">1. 出貨時程</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>公版商品:付款完成後 1–3 個工作天內出貨</li>
                    <li>私版客製:訂金確認後 2–4 週製作 + 1–3 工作天出貨</li>
                    <li>樣品申請:審核通過後 3 個工作天內寄出</li>
                  </ul>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">2. 運費規則</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>滿 NT$ 3,000 免運</li>
                    <li>未滿 NT$ 3,000 依重量 / 體積試算,結帳頁會顯示</li>
                    <li>離島運費另計(澎湖 / 金門 / 馬祖 / 綠島 / 蘭嶼 / 小琉球 / 東引 / 烏坵)</li>
                    <li>自取免運</li>
                  </ul>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">3. 物流商</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>宅配:黑貓 / 嘉里 / 新竹 / 台灣宅配通 / 大榮</li>
                    <li>超商取貨:7-11 / 全家(滿 6,000 元以上不適用,因超商重量限制)</li>
                  </ul>
                </>
              )}
              {tab === "return" && (
                <>
                  <h3 className="text-2xl font-bold text-zinc-900">退換貨政策</h3>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">1. 公版商品</h4>
                  <p>收到商品 7 天內可申請退換,需保持商品完整(未拆封、未使用),透過客服(LINE / 電話)聯繫。退款依原付款方式辦理。</p>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">2. 私版客製</h4>
                  <p>因客製化生產,**原則上不接受退貨**,品質瑕疵除外。如有瑕疵請於收件 3 天內提供照片,我們會評估換貨或退款。</p>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">3. 樣品</h4>
                  <p>樣品為免費試用,不接受退換貨。</p>
                  <h4 className="text-lg font-bold text-zinc-900 pt-2">4. 退款流程</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>信用卡:綠界自動退刷,3–7 個工作天</li>
                    <li>匯款:會計手動匯回,5–10 個工作天</li>
                    <li>發票:全退作廢、部分退開立折讓單</li>
                  </ul>
                </>
              )}
            </div>
          </MockupCmsPage>
        </div>
      </section>
      <ModuleFooterNav
        prev={{ title: "Q&A 常見問題", href: "/modules/faq" }}
        next={{ title: "搜尋結果", href: "/modules/search" }}
      />
    </main>
  );
}
