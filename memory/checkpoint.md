# Checkpoint - 2026-04-29（晚）

## 分支
- `main`（已推 origin，Vercel auto-deploy）
- 產品碼最新 commit：`471042b refactor(cart-checkout): 依 Wayne 4/29 feedback 簡化進階功能 + 拆備註`
- 客戶確認問題 / Word 交付最新 commit：`ae6865b docs(client-questions): 新增 HJ 窗口確認 Word 檔`
- 公開站：`https://hj-proposal.vercel.app/`

## 最新狀態：客戶確認問題已送窗口，等待回覆

Wayne 已將 `HJ-網站需求確認問題清單.docx` 提供給 HJ 窗口。接下來先等待窗口回覆，再依答案調整之前做好的 mockup / 版面 / Q。

### 客戶版交付檔
- Repo Word：`exports/HJ-網站需求確認問題清單.docx`
- Repo Markdown：`discussions/hj-client-confirmation-questions.md`
- Obsidian Word：`1-Projects/禾啟HJ-餐飲包材電商/HJ-網站需求確認問題清單.docx`
- Obsidian Markdown：`1-Projects/禾啟HJ-餐飲包材電商/13-提供客戶確認問題清單.md`
- 快速接續檔：`memory/autoresume.md`

### 目前工作邊界
- ✅ 等 HJ 窗口回覆。
- ✅ 回覆後再回頭調整 cart / checkout / member / product mockup 內的問題與說明。
- ❌ 等待期間不要再主動修改既有 mockup。
- ❌ 不要再從舊 31 題或 `window-line-batch2.md` 往外擴。
- ❌ 不要把 `advanced-features-memo.md` 的進階備案主動給客戶。

## 前一階段狀態：購物車 + 結帳暫停中

Wayne 走過畫面後決定先用 LINE 問 HJ 窗口拿到實際業務面答案，再回頭調 mockup。

### 2026-04-29 方向調整
- 已讀 `/Users/waynechen/Downloads/HJ網站客製需求表_1150422.pdf`，它是 1 頁簡化需求架構，不是完整流程規格。
- 客戶問題清單改為依需求表的核心系統提問。
- 新增 `discussions/hj-customer-confirmation-questions.md` v3。
- 新增 `memory/claude-direction-update.md`，給 Claude 的最新方向摘要。
- 第一輪主軸：訂單管理、金流、物流、ERP、庫存。
- 第一輪先問需求表已列的核心問題，不主動推月結、多門市分送、自動信用額度、自動拆單等進階功能。

### 暫停理由
- CartMockup Q1（公私版混單）文字仍偏複雜
- Wayne 業務直覺：私版有製作期，公版可即出，傾向「分開出單」，但需窗口確認 HJ 實際做法
- 為避免猜錯方向二次工，暫停 mockup 進一步調整

### 已送 LINE 6 題（給窗口）
1. 公版 + 私版同時下單怎麼處理（同單分批 / 自動拆單 / 規定分開結帳）
2. 月結客戶 SOP（等級 / 是否每筆審 / 由誰審）
3. 付款方式組合（信用卡 / ATM / 貨到付款 / 月結 — 是否要增減 / 個人能否月結 / 私版是否禁信用卡）
4. 訂單同步凌越 ERP（即時 API / 批次 / 手動 — 失敗是否擋下單）
5. 發票（三聯式記憶 / 個人會員載具強制）
6. 運費（算法 / 合作客戶優惠）

## 已完成範圍
- 架構總覽首頁
- 公版商品 3 頁（列表 / 詳情 / 樣品申請）
- 私版報價 2 頁（列表 / 即時報價）
- 會員系統 7 頁
- **購物車 + 結帳閉環（簡化版）**：
  - `/modules/cart` — 公版 + 私版分區，私版可移出
  - `/modules/checkout` — 拿掉分送多門市；月結改人工審核版
  - `/modules/checkout/success` — 拿掉自動信用額度判斷

## 471042b 改了什麼
- CartMockup Q1：擴成 4 子題（拆訂單 / 出貨單 / ERP / 運費），對到食品冷藏類比
- CheckoutMockup：拿掉 splitDelivery state、checkbox、逐項指定 UI、原 Q2（多門市）
- CheckoutMockup：月結拿掉自動信用額度檢查 UI
- CheckoutMockup Q1（原 Q3）：付款方式從「指定式」改「列 4 種 + 建議匹配」
- CheckoutSuccessMockup MonthlyReviewView：拿掉自動扣額度數字
- 新增 `discussions/advanced-features-memo.md` — Wayne 內部進階功能口袋備案

## 驗證
- `npm run lint`：pass
- `npx tsc --noEmit`：pass

## 下次接手要做的
1. 等 Wayne 拿到窗口 LINE 回覆，貼回對話。
2. 依答案：
   - CartMockup Q1：決定保留同單 vs 改拆單，文字精簡到 1-2 行。
   - CheckoutMockup Q1 / Q2 / Q3：依答案調 Q 措辭。
   - CheckoutSuccessMockup Q1：依答案寫具體 ERP 機制。
3. 補問窗口可能盲點：訪客結帳、退換貨後續、樣品後續、SMS、保固 / SLA。
4. scope-checklist.md §13 已標明暫停期間 Claude 的行為邊界。

## 不要做的事
- 不主動改 cart / checkout mockup。
- 不主動改 §12 / §13 提的 Q 措辭。
- 不主動改 `advanced-features-memo.md`。
- 訂單系統 TopNav 仍「製作中」，待 Wayne 指定。
