# Claude Handoff - HJ Proposal

## 2026-05-05 最新補充：報價單 v8 已提交，本機正在整理 v9 前修訂

目前專案主線已從 API / 架構判讀推進到 HJ 報價單草案整理。

### Git / 工作區

- 分支：`main`
- 遠端狀態：`main...origin/main [ahead 5]`
- 最新 HEAD：`e58c587 docs(quote): v8 — 拿掉 FAQ(對齊 HJ 原始需求,FAQ 不在 1150422 列表內)`
- 目前唯一未提交檔案：`discussions/hj-quote-draft.md`

### 報價單目前基準

- 主檔：`discussions/hj-quote-draft.md`
- committed 版本：`status: 草案v8`、`draftedAt: 2026-05-05`
- v8 已把 FAQ 從主案拿掉，對齊 HJ 原始需求表 `1150422`。
- v8 committed 金額：
  - 主案未稅：`$1,070,750`
  - 營業稅 5%：`$53,538`
  - 主案含稅：`NT$ 1,124,288`
  - 主案 + 選配 A+B+C 含稅：約 `NT$ 1,255,413`

### 目前本機未提交修訂

`discussions/hj-quote-draft.md` 有本機修改，方向是再收斂報價範圍：

- 形象 / CMS 內頁由 6 頁改 4 頁。
- 最新消息管理併入「行銷活動 / 部落格管理」。
- 設計小計改為 `$161,500`。
- 首頁行銷區改成自動抓取最新部落格 / 活動公告。

但這份修訂還不能交付或提交：

- 多個項目流水號被改成重複的 `13`。
- 報價總計仍殘留設計區 `$170,500`，與前面 `$161,500` 不一致。
- 若保留這次修訂，需重算主案未稅、稅額、含稅、付款分期與選配合計。

### Claude / 下一位接手者不要做

- 不要把目前 dirty 的 `hj-quote-draft.md` 視為可交付版。
- 不要在金額未重新核算前輸出 Word / PDF。
- 不要主動回去改 cart / checkout / member / product / private quote mockup。
- 不要把 FAQ 加回主案，除非 Wayne 明確指示。

### 下一步

1. 先確認 Wayne 是否保留這次本機修訂方向。
2. 若保留，清理 `hj-quote-draft.md` 的流水號與金額，升成 `草案v9`。
3. 清理完成後，再決定是否輸出客戶版報價 Word / PDF。

---

## 2026-05-01 最新補充：窗口已回覆，先做架構/API 整理

Wayne 已提供：

- `/Users/waynechen/Downloads/HJ 網站需求確認問題清單.docx`
- `/Users/waynechen/Downloads/凌越_最佳拍檔_API匯出入資料清單說明.pdf`
- `/Users/waynechen/Downloads/最佳拍檔API.pdf`

Codex / Claude 目前已有新版主檔：

- `discussions/codex-handoff.md`
- `discussions/lyserp-api-reference-index.md`
- `discussions/hj-api-207-full-read-reanalysis.md`
- `discussions/hj-maya-to-hj-confirmation-items.md`
- `discussions/hj-maya-to-lingyue-api-confirmation-items.md`
- `discussions/hj-ecpay-logistics-volume-judgement.md`

舊版第一輪草稿仍可參考：

- `discussions/hj-window-reply-api-architecture-review.md`
- `discussions/hj-followup-questions-customer-maya-lingyue.md`

目前階段不是 mockup 調整，而是：

1. 先把窗口回覆轉成系統架構與資料流決策。
2. 判斷凌越 API 文件是否足夠馬亞直接製作。
3. 把後續問題分成給 HJ 客戶、給馬亞、給凌越三類。
4. 先確認核心關鍵功能，避免之後才發現需要補畫面或補流程。

重要補充：

- `最佳拍檔API.pdf` 207 頁已完整重讀。
- `lyserp-api-reference-index.md` 是 Claude / Codex API 共同基準；後續若改索引，請照 `codex-handoff.md` 在對齊紀錄追加一筆。
- 金物流 / 材積判斷不要硬推給凌越。凌越只確認商品材積/重量來源欄位與物流單號是否回寫；配送可行性由 HJ 規則 + 馬亞網站邏輯 + 金物流通路規範判斷。
- API 文件問題的核心不是問凌越網站功能，而是確認文件是否清楚到馬亞可直接對接。SEO、商品文案、網站上下架、畫面流程等網站功能不要放進給凌越的 API 補件問題。
- Wayne 會再提供 Claude 的 API 分析，Codex 需做差異核對。

Claude 目前不要做：

- 不要先改 cart / checkout / member / product / private quote mockup。
- 不要直接把 API 文件視為已可完整開發。
- 不要把給凌越的 API 補件問題混成給 HJ 客戶的業務問題。

Claude 若接手，先讀：

1. `memory/autoresume.md`
2. `memory/checkpoint.md`
3. `discussions/codex-handoff.md`
4. `discussions/lyserp-api-reference-index.md`
5. `discussions/hj-api-207-full-read-reanalysis.md`
6. `discussions/hj-maya-to-hj-confirmation-items.md`
7. `discussions/hj-maya-to-lingyue-api-confirmation-items.md`
8. `discussions/hj-ecpay-logistics-volume-judgement.md`

---

日期：2026-04-29（晚）

## 專案

- 路徑：`/Users/waynechen/01_開發專案/proposals/hj-proposal`
- 公開站：`https://hj-proposal.vercel.app/`
- 技術：Next.js 16.2.4 + React 19.2.4 + Tailwind v4
- 分支：`main`
- 產品碼最新 commit：`471042b refactor(cart-checkout): 依 Wayne 4/29 feedback 簡化進階功能 + 拆備註`
- 客戶確認問題 / Word 交付最新 commit：`ae6865b docs(client-questions): 新增 HJ 窗口確認 Word 檔`
- 進度紀錄最新 commit：`aa712a2 docs(progress): 進度紀錄定型 — autoresume + checkpoint + handoff 三檔對齊`
- LINE 調研最新 commit：`a0ed40c docs(line): LINE 整合可行性調研 — Messaging API 取代已停用的 Notify`
- `main` 已與 `origin/main` 對齊。

> 🆕 **下次新視窗最快接續**：先讀 `memory/autoresume.md`（一句話狀態 + 等待中事項 + 起手式）。

## 最新狀態：客戶確認問題已送 HJ 窗口

Wayne 已將 Codex 整理的 Word 檔提供給 HJ 窗口：

- Word：`exports/HJ-網站需求確認問題清單.docx`
- Markdown：`discussions/hj-client-confirmation-questions.md`
- Obsidian：`1-Projects/禾啟HJ-餐飲包材電商/13-提供客戶確認問題清單.md`

這份客戶版是從 PDF 需求表重新整理，只包含 Wayne 指定要問的範圍，共 32 題，已移除「第一版」用語，改成「網站正式上線時」或具體問法。

### Claude 目前不要做

- 不要再整理舊 31 題。
- 不要再主動修改 cart / checkout / success / member / product mockup。
- 不要把 `advanced-features-memo.md` 進階備案混進客戶問題。
- 不要把內部版 `discussions/hj-pdf-driven-questions.md` 直接給客戶。

### 等窗口回覆後再做

收到 HJ 窗口回覆後，再依答案調整：

- 既有 mockup 內的問題與提示文字。
- cart / checkout / success 的公私版混單、金流、物流、ERP、庫存相關說明。
- 會員 / 訂單狀態 / 樣品申請相關頁面是否需要補強。
- scope-checklist 與 Obsidian 對應文件。

## LINE 客製詢價補充決策（2026-04-29）

Wayne 提供 HJ LINE 官方帳號截圖後，確認 HJ 已有 LINE 官方帳號 `@hjhjtw`，但**沒有第三方 LINE 客服系統**。

後續 LINE 客製詢價方向統一如下：

- **B 當正式目標**：客戶送出私版客製需求後，網站建立詢價單，並自動傳一則詢價摘要到客戶 LINE。
- **A 當保底流程**：客戶尚未加好友 / 尚未綁定 LINE / 推播失敗時，網站仍建立詢價單，並顯示 HJ LINE 與詢價編號，讓客服人工接續。
- **正式資料以網站後台為準**：詢價單、規格、數量、備註、報價狀態不要只留在 LINE 對話。
- **不承諾自動報價**：LINE 只做通知與後續人工對話。

請先讀 `discussions/line-integration-research.md`，不要沿用「送進第三方客服系統」或「LINE 自動完成報價」的說法。

## 前一階段狀態：購物車 + 結帳暫停中

Wayne 親自走過簡化版購物車 + 結帳閉環畫面後，決定先以 LINE 詢問 HJ 窗口拿到實際業務面答案，再回頭調 mockup。

### 2026-04-29 方向調整

Wayne 確認方向要改成：**先整理客戶確認問題，不再先由 Claude / Codex 自行設計功能方案**。

原因：
- 目前很多 Q 是我們自己想出來的流程與例外情境，容易把系統設計得過度複雜。
- 正確順序應是先問 HJ 現況與第一版邊界，再依客戶回覆評估是否需要建議。
- 進階功能仍保留在內部備案，不主動推給客戶。

新增文件：
- `discussions/hj-customer-confirmation-questions.md`：依 `HJ網站客製需求表_1150422.pdf` 重整的乾淨版客戶確認問題清單；v3 已改成核心系統優先。
- `memory/claude-direction-update.md`：給 Claude 的最新方向摘要，可直接貼給 Claude。

Claude 接手時：
- 先讀 `memory/claude-direction-update.md`。
- 先讀 `discussions/hj-customer-confirmation-questions.md`。
- 不要再主動擴充 cart / checkout mockup。
- 不要把 `advanced-features-memo.md` 內容混進客戶問題主體。
- 若要整理給客戶，請以 HJ 原始需求表架構為主，問「目前 HJ 怎麼做 / 第一版是否照現況 / 誰確認」。
- 特別注意：月結、多門市分送、自動信用額度、自動拆單不是 PDF 第一版明確架構，先不要主動放進客戶第一輪問題。
- 第一輪問題主軸改成：訂單管理、金流、物流、ERP、庫存。前台頁面細節與會員問題等核心系統答案回來後再收斂。

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
