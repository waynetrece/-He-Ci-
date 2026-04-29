# Claude Handoff - HJ Proposal

日期：2026-04-29（晚）

## 專案

- 路徑：`/Users/waynechen/01_開發專案/proposals/hj-proposal`
- 公開站：`https://hj-proposal.vercel.app/`
- 技術：Next.js 16.2.4 + React 19.2.4 + Tailwind v4
- 分支：`main`
- 產品碼最新 commit：`471042b refactor(cart-checkout): 依 Wayne 4/29 feedback 簡化進階功能 + 拆備註`
- 文件 / 進度最新 commit：`c15b49a docs(progress): 4/29 暫停狀態 + LINE 6 題 — 給 Codex 進度更新`
- `main` 已與 `origin/main` 對齊。

## 目前狀態：購物車 + 結帳暫停中

Wayne 親自走過簡化版購物車 + 結帳閉環畫面後，決定先以 LINE 詢問 HJ 窗口拿到實際業務面答案，再回頭調 mockup。

### 已完成

- 架構總覽首頁
- 公版商品 3 頁（列表 / 詳情 / 樣品申請）
- 私版報價 2 頁（列表 / 即時報價）
- 會員系統 7 頁
- **購物車 + 結帳閉環（簡化版）**：`/modules/cart`、`/modules/checkout`、`/modules/checkout/success`

`TopNav` 目前 ready：
- 公版商品
- 私版報價
- 會員系統
- 金物流

`訂單系統` 仍是「製作中」，不要直接補，除非 Wayne 明確指定。

## 471042b 做了什麼

依 Wayne 4/29 feedback「好推動但堪用，進階功能拆出」原則：

1. CartMockup Q1：公私版混單問法擴成 4 子題（拆訂單 / 出貨單 / ERP / 運費），對到食品冷藏類比。
2. CheckoutMockup：拿掉分送多門市整段（splitDelivery state、checkbox、逐項指定 UI、原 Q2）。
3. CheckoutMockup：月結拿掉自動信用額度檢查 UI，改「人工審核」流程。
4. CheckoutMockup Q1（原 Q3）：付款方式從「指定式」改「列 4 種 + 建議匹配」開放式。
5. CheckoutSuccessMockup MonthlyReviewView：拿掉自動扣額度數字，改「月結一律審核」。
6. 新增 `discussions/advanced-features-memo.md`：Wayne 內部進階功能口袋備案。
7. `discussions/scope-checklist.md` 補 §12 給 Codex 審。

## Wayne 4/29 晚送出的 LINE 6 題（給 HJ 窗口）

| # | 主題 | 主要問題 |
|---|---|---|
| 1 | 公版 + 私版混單處理 | 同單分批 / 自動拆單 / 規定分開結帳？ |
| 2 | 月結客戶 SOP | 哪些等級可月結 / 每筆人工審核還是老客戶自動通過 / 由誰審 |
| 3 | 付款方式組合 | 4 種要不要增減 / 個人是否可月結 / 私版是否禁信用卡 |
| 4 | 訂單同步凌越 ERP | 即時 API / 批次 / 手動 / 失敗是否擋下單 |
| 5 | 發票 | 三聯式記憶 OK 嗎 / 個人會員強制綁載具？ |
| 6 | 運費 | 算法 / 合作客戶 A、B 級優惠 |

> Wayne 強調 Q1 / Q2 / Q4 是最關鍵；其他算補強。

## 暫停期間 Claude 的邊界

- ❌ **不主動改 cart / checkout mockup**（避免猜錯方向二次工）
- ❌ **不主動改 §12 / §13 提的 Q 措辭**
- ❌ **不主動改 `discussions/advanced-features-memo.md`**
- ✅ Wayne 拿到窗口回覆並貼給 Claude 後，依答案調整 mockup + Q + scope-checklist
- ✅ 期間若 Wayne 指定其他模組（客戶版 scope 清稿、訂單系統深入、會員補強），可進行不衝突的工作

## 驗證

Claude 於 2026-04-29 確認：

- `npm run lint`：pass
- `npx tsc --noEmit`：pass
- 公開 Vercel routes：HTTP 200
  - `/`
  - `/modules/cart`
  - `/modules/checkout`
  - `/modules/checkout/success`
  - `/modules/members`

## 工作區狀態

提交後應該乾淨：

- `discussions/scope-checklist.md`：含 §10 §11 §12 §13（內部協作版，非客戶交付版）。
- `discussions/advanced-features-memo.md`：Wayne 內部進階功能口袋備案。
- `discussions/member-system-review-pack.md`：會員系統 review pack。
- `memory/checkpoint.md`：本日進度（同步到 471042b + 暫停狀態）。
- `memory/claude-handoff.md`：本檔。

根目錄 PNG 截圖與 `.playwright-mcp/` 是本地 QA 證據 / 暫存物，已被 `.gitignore` 忽略。

## 重要邊界

- **不要重做購物車 + 結帳閉環**；目前是 Wayne 簡化版定稿暫停點，等窗口回覆才能繼續。
- **不要把 `discussions/scope-checklist.md` 當客戶交付版**。內部協作版含 Codex / Claude review 紀錄。
- **不要把 `discussions/advanced-features-memo.md` 給客戶**。是 Wayne 內部口袋備案。
- 若 Wayne 要客戶版 scope，請另輸出乾淨版，只保留客戶要回答的問題，移除所有內部 review 紀錄。
- 訂單系統 TopNav 仍「製作中」，待 Wayne 明確指定才開。

## 下一步候選（Wayne 要明確指定才動）

1. **等窗口 LINE 回覆**（被動，最大可能性）：拿到答案後依答案調 cart / checkout mockup + Q。
2. **客戶版 scope checklist 清稿**：純文件，不動畫面，可在等待期間做。
3. **訂單系統深入功能**：TopNav 製作中那塊。
4. **會員系統補強**：若 Codex 審 §12 / §13 點出會員系統盲點。

## Codex 審查請求（這次）

詳見 `scope-checklist.md` §12（4/29 簡化內容）+ §13（暫停理由 + LINE 6 題 + 給 Codex 的請求）。

簡述：
1. §12 review 仍進行（4/29 簡化方向、mockup 是否乾淨、Q 一致性）
2. 不需要再提 cart / checkout 進階建議（等窗口）
3. 若注意到 LINE 6 題之外的盲點，列給 Wayne 補問
4. 非 cart / checkout 議題可正常提
