# Checkpoint - 2026-05-05

## 最新狀態：報價單草案 v12 已依馬亞範本語氣與 HJ 架構重寫，待 Wayne review

目前專案已從 2026-05-01 的「凌越 API 判讀 / 問題分流」推進到「HJ 報價單草案整理」階段。

### Git / 工作區狀態

- 分支：`main`
- 與遠端：`main...origin/main [ahead 6]`
- 最新 HEAD：`4698925 docs(quote): v9 — 修正最新消息 = 行銷活動(HJ 原始需求只列行銷活動)`
- 目前本機未提交檔案：
  - `discussions/hj-quote-draft.md`
  - `memory/checkpoint.md`
  - `memory/autoresume.md`
  - `memory/claude-handoff.md`

### 報價單目前基準

- 主檔：`discussions/hj-quote-draft.md`
- Front matter：`status: 草案v12`、`draftedAt: 2026-05-05`
- 依據：
  - `HJ網站客製需求表_1150422`
  - `HJ客戶需求確認紀錄_2026-05-04`
  - `日日欣報價單20250924.xls`
  - `富致科技報價單20240326.xls`
- v12 修訂重點：
  - 參考馬亞既有報價單格式，但以 HJ 架構重新撰寫文字，不直接沿用前一版草稿。
  - 設計區改成頁面清單 + 分點說明，避免長句塞在表格內造成閱讀溢出；設計小計 `$161,500`。
  - 程式區擴寫為前台/CMS、商品/樣品/私版、結帳/訂單/會員、共用模組、第三方整合五段；程式明細加總對齊 `$879,000`。
  - 高複雜度集中在公版商品、購物車/訂單、會員、運費/材積、凌越 ERP。
  - 修正樣品流程為會員登入後申請；私版原始檔走 LINE，不在網站上傳。
  - 主案未稅 `$1,049,750`，營業稅 `$52,488`，含稅 `NT$ 1,102,238`。
  - 主案 + 選配 A+B+C 含稅約 `NT$ 1,233,488`。
  - 付款金額已更新為 50% / 30% / 20%：`551,119` / `330,671` / `220,448`。

### 下一步

1. Wayne review `discussions/hj-quote-draft.md` 的 v12 金額、模組拆法與文字語氣。
2. 若金額與範圍 OK，再輸出客戶版 Excel / Word / PDF 到 `exports/`。
3. 若要更像正式 `.xls`，下一步用參考檔欄位順序產出 Excel。
4. mockup 仍先不要主動改；目前主線是報價單與需求範圍收斂。

### 不要做的事

- 不要把 v12 草案直接當作已可發送客戶版；仍待 Wayne 最終 review。
- 不要在 Wayne 未確認前產出正式對外報價檔。
- 不要主動回去改 cart / checkout / member / product / private quote mockup。
- 不要把 FAQ 加回主案，除非 Wayne 明確決定 FAQ 要重新納入。

---

# Checkpoint - 2026-05-01

## 最新狀態：窗口已回覆，已收到凌越 API 文件，進入架構/API 判讀

Wayne 提供三份新文件：

- `/Users/waynechen/Downloads/HJ 網站需求確認問題清單.docx`
- `/Users/waynechen/Downloads/凌越_最佳拍檔_API匯出入資料清單說明.pdf`
- `/Users/waynechen/Downloads/最佳拍檔API.pdf`

目前方向已從「等待窗口回覆」進入「先整理系統架構、核心關鍵功能、API 可行性、後續問題分流」。mockup 仍暫停，先不要改 cart / checkout / member / product / private quote 畫面。

### 2026-05-01 新增文件

- `discussions/lyserp-api-reference-index.md`
  - Claude 建立的 LYSERP / 最佳拍檔 API 共同索引；Codex 已核對並追加金物流與材積分工雷區。
- `discussions/codex-handoff.md`
  - Claude/Codex 對齊規則與 API 索引變更紀錄。
- `discussions/hj-api-207-full-read-reanalysis.md`
  - 207 頁 API 完整重讀後的架構與需求重新判斷。
- `discussions/hj-maya-to-hj-confirmation-items.md`
  - 馬亞要再跟 HJ 確認的業務 / 流程問題。
- `discussions/hj-maya-to-lingyue-api-confirmation-items.md`
  - 馬亞要跟凌越確認的 API / 欄位 / 環境補件；已標明材積規則不硬推給凌越。
- `discussions/hj-ecpay-logistics-volume-judgement.md`
  - 綠界 ECPay 金物流與材積判斷分工補充。
- 舊版第一輪草稿：`discussions/hj-window-reply-api-architecture-review.md`
  - 窗口回覆轉成系統架構決策。
  - 判讀凌越 API 是否足夠馬亞直接製作。
  - 整理核心關鍵功能防漏清單。
- 舊版第一輪草稿：`discussions/hj-followup-questions-customer-maya-lingyue.md`
  - 分成給 HJ 客戶、給馬亞、給凌越三種問題。
  - 凌越補件獨立整理，不混在馬亞技術問題裡。

### 2026-05-01 Obsidian 同步

- `17-凌越API_207頁索引.md`
- `18-HJ_API_207頁完整重讀與需求對照.md`
- `19-HJ馬亞需向HJ確認項目.md`
- `20-HJ馬亞需向凌越確認API項目.md`
- `21-HJ金物流與材積判斷補充.md`

### 目前初步結論

- 凌越 API 文件可作為開發評估起點，但不是 HJ 專案可直接開工的完整串接規格。
- 還需要凌越補 endpoint / WSDL、測試環境、帳密、公司代號、HJ 實際欄位對照、XML 範例、權限、錯誤處理、狀態碼、庫存同步方式。
- 需優先確認樣品與公版商品分流、私版詢價與 LINE、訂單即時進凌越、庫存即時更新、會員分級價、材積運費、超商寄件單、綠界金流與退刷。
- 材積 / 重量能否配送不是凌越責任；凌越只確認商品材積/重量來源欄位與物流單號是否回寫。配送可行性由 HJ 規則 + 馬亞網站邏輯 + 金物流通路規範判斷。
- 問凌越的重點已收斂為 API 文件可對接性：文件是否足夠馬亞直接寫對接程式；若不足，要補 endpoint / WSDL、帳密、公司代號、可用 `idakd`、必填欄位、XML 範例、錯誤碼、測試資料、欄位對照。SEO、商品文案、網站上下架不問凌越。
- 等 Wayne 提供 Claude 的 API 分析後，再依 `discussions/codex-handoff.md` 做差異核對。

### 下一步

1. Wayne 先 review 新版主檔：`hj-api-207-full-read-reanalysis.md`、`hj-maya-to-hj-confirmation-items.md`、`hj-maya-to-lingyue-api-confirmation-items.md`、`hj-ecpay-logistics-volume-judgement.md`。
2. Wayne 貼上或提供 Claude API 分析後，Codex 做差異核對。
3. 決定哪些問題要先發給 HJ、馬亞、凌越。
4. 等架構與 API 問題收斂後，再回頭調整 mockup。

---

# Checkpoint - 2026-04-29（晚）

## 分支
- `main`（已推 origin，Vercel auto-deploy）
- 產品碼最新 commit：`471042b refactor(cart-checkout): 依 Wayne 4/29 feedback 簡化進階功能 + 拆備註`
- 客戶確認問題 / Word 交付最新 commit：`ae6865b docs(client-questions): 新增 HJ 窗口確認 Word 檔`
- 公開站：`https://hj-proposal.vercel.app/`

## 最新狀態：客戶確認問題已送窗口，等待回覆

Wayne 已將 `HJ-網站需求確認問題清單.docx` 提供給 HJ 窗口。接下來先等待窗口回覆，再依答案調整之前做好的 mockup / 版面 / Q。

### 2026-04-29 LINE 客製詢價補充決策

Wayne 提供 HJ LINE 官方帳號截圖後，確認 HJ 目前**沒有使用第三方 LINE 客服系統**。因此 LINE 功能方向調整為：

- **B 當正式目標**：客戶送出私版客製需求後，網站建立詢價單，並自動傳一則詢價摘要到客戶 LINE。
- **A 當保底流程**：如果客戶尚未加 LINE / 尚未綁定 LINE / 推播失敗，網站仍建立詢價單，並顯示 HJ LINE 與詢價編號，讓客服人工接續。
- **正式資料以網站後台為準**：詢價單、規格、數量、備註、報價狀態不能只留在 LINE 對話。
- **不承諾自動報價**：LINE 只負責通知與後續人工對話。

已更新：`discussions/line-integration-research.md`。

### 客戶版交付檔
- Repo Word：`exports/HJ-網站需求確認問題清單.docx`
- Repo Markdown：`discussions/hj-client-confirmation-questions.md`
- Obsidian Word：`1-Projects/禾啟HJ-餐飲包材電商/HJ-網站需求確認問題清單.docx`
- Obsidian Markdown：`1-Projects/禾啟HJ-餐飲包材電商/13-提供客戶確認問題清單.md`
- 快速接續檔：`memory/autoresume.md`

### 目前工作邊界
- ✅ 等 HJ 窗口回覆。
- ✅ 回覆後再回頭調整 cart / checkout / member / product mockup 內的問題與說明。
- ✅ LINE 題後續以「B 目標 + A 保底」為內部方向。
- ❌ 等待期間不要再主動修改既有 mockup。
- ❌ 不要再從舊 31 題或 `window-line-batch2.md` 往外擴。
- ❌ 不要把 `advanced-features-memo.md` 的進階備案主動給客戶。
- ❌ 不要把 LINE 寫成第三方客服系統，也不要說 LINE 會自動完成報價。

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
