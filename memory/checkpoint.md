# Checkpoint - 2026-04-29

## 分支
- `main`（已推 origin，Vercel auto-deploy）
- 最新 commit：`891dc8f chore(cart): 依 scope-checklist §10 Quick Review 補 5 修`
- 公開站：`https://hj-proposal.vercel.app/`

## 已完成範圍
- 架構總覽首頁。
- 公版商品：列表、詳情、樣品申請流程。
- 私版報價：列表、即時報價表單。
- 會員系統：登入/註冊、Dashboard、訂單列表、訂單詳情、詢價紀錄、樣品紀錄、帳號設定。
- 購物車 + 結帳閉環：
  - `/modules/cart`
  - `/modules/checkout`
  - `/modules/checkout/success`

## 最新修補（891dc8f）
- `TopNav`：金物流改成 ready，客戶可從頂部進入 `/modules/checkout`。
- 月結 Q：改成「合作 A 級」示意，不再寫 A / B 級都可。
- 購物車私版報價：保留規格 / 數量鎖定，但可移出購物車。
- Checkout success：畫面通知區移除 LINE 通知承諾，改成其他通知管道待確認。
- ERP 同步文字：改成依需求表先示意，實際機制待 HJ + 凌越確認。

## 驗證
- `npm run lint`：pass
- `npx tsc --noEmit`：pass
- 公開 Vercel 路由 HTTP 200：
  - `/`
  - `/modules/cart`
  - `/modules/checkout`
  - `/modules/checkout/success`
  - `/modules/members`

## 目前工作區整理狀態
- `discussions/scope-checklist.md` 有未提交的 §10 quick review 與 §11 修補後確認，可作為內部協作紀錄。
- `memory/claude-handoff.md` 是給 Claude 的接手摘要。
- `.gitignore` 新增本地 QA 暫存規則：`/.playwright-mcp/`、`/*.png`，只為降低本機截圖/log 洗版。
- 根目錄 PNG 截圖與 `.playwright-mcp/` 未刪除，只是不再建議追蹤。

## 下一步
- 若要保存協作紀錄：commit `.gitignore`、`discussions/scope-checklist.md`、`memory/checkpoint.md`、`memory/claude-handoff.md`。
- 下一個功能方向不要直接開工，需 Wayne 明確指定：
  - 訂單系統深入功能。
  - ERP / 金物流文件包。
  - 客戶版 scope checklist 清稿。
