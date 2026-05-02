# Claude Review Brief - HJ API / 架構整理

> 日期：2026-05-01
> 對象：Claude
> 目的：讓 Claude 審核 Codex 本輪整理時，能快速理解整個 HJ 專案目前狀態、這次文件來源、整理經過、產出文件與審核重點。

---

## 1. 專案目前狀態

- 專案路徑：`/Users/waynechen/01_開發專案/proposals/hj-proposal`
- 公開站：https://hj-proposal.vercel.app/
- 目前已有 mockup：架構總覽、公版商品 3 頁、私版報價 2 頁、會員系統 7 頁、購物車 / 結帳 / 成功頁。
- 目前不要先改 mockup；這一輪重點是先確認系統架構、API 文件可對接性、以及後續要問 HJ / 凌越的事項。

---

## 2. 這次輸入文件

Wayne 提供三份文件：

1. `/Users/waynechen/Downloads/HJ 網站需求確認問題清單.docx`
2. `/Users/waynechen/Downloads/凌越_最佳拍檔_API匯出入資料清單說明.pdf`
3. `/Users/waynechen/Downloads/最佳拍檔API.pdf`（207 頁）

Codex 已確認 `最佳拍檔API.pdf` 是 207 頁，並重讀後整理新版判斷。

---

## 3. 本輪整理經過

1. 先讀窗口回覆文件，整理 HJ 已回覆的業務規則。
2. 讀 5 頁 API 說明，確認五個 API 函式與基本 XML 格式。
3. 讀 207 頁 API 文件，依資料類別整理商品、客戶、訂單、報價、庫存、銷貨、銷退、收款、發票、倉庫、出庫等關聯。
4. 讀 Claude 建立的 `discussions/codex-handoff.md`，確認 `discussions/lyserp-api-reference-index.md` 是共同 API 索引。
5. 依 Wayne 提醒修正邊界：
   - 名稱統一用「馬亞」。
   - 問凌越只問 API 文件 / ERP 對接必要事項。
   - SEO、商品文案、網站上下架、畫面流程不問凌越。
   - 材積 / 重量能否配送不硬推給凌越；由 HJ 規則 + 馬亞網站邏輯 + 金物流通路規範判斷。

---

## 4. 主要產出文件

Claude 審核時請依序讀：

1. `discussions/codex-handoff.md`
   - Claude / Codex API 共同索引規則與變更紀錄。
2. `discussions/lyserp-api-reference-index.md`
   - 207 頁 API 的共同索引。
3. `discussions/hj-api-207-full-read-reanalysis.md`
   - Codex 重讀 207 頁後的架構與 API 可對接性判斷。
4. `discussions/hj-maya-to-hj-confirmation-items.md`
   - 馬亞要再跟 HJ 確認的業務 / 流程問題。
5. `discussions/hj-maya-to-lingyue-api-confirmation-items.md`
   - 馬亞要向凌越確認的 API 文件可對接性與補件項目。
6. `discussions/hj-ecpay-logistics-volume-judgement.md`
   - 金物流與材積判斷分工。

Obsidian 同步檔：

- `17-凌越API_207頁索引.md`
- `18-HJ_API_207頁完整重讀與需求對照.md`
- `19-HJ馬亞需向HJ確認項目.md`
- `20-HJ馬亞需向凌越確認API項目.md`
- `21-HJ金物流與材積判斷補充.md`

---

## 5. Codex 目前核心結論

### 5.1 API 文件可用，但不足以直接開發

207 頁 API 文件已說清楚：

- 凌越採 SOAP Web Service。
- 主要函式為 `LyGetPassKey`、`LyDataIn`、`LyDataOut`、`LyDataDel`、`LyDataPage`。
- 金鑰 30 秒失效。
- XML 使用 `DocumentElement`、`LYDATATITLE`、`LYDATADETAIL`。
- 可依 `idakd` 操作商品、客戶、訂單、報價、銷貨、銷退、收款、發票、庫存、倉庫等資料。

但仍不足以讓馬亞只看文件直接完成 HJ 對接。還需要：

- endpoint / WSDL。
- 測試環境。
- 帳號、密碼、公司代號。
- HJ 已授權可用的 `idakd`。
- HJ 專案欄位對照。
- 實際 XML 範例。
- 必填欄位與預設值。
- 單號規則。
- 錯誤碼與可重送規則。
- 測試資料。

### 5.2 問凌越的邊界

問凌越的重點是：

- API 文件是否清楚到馬亞能直接對接。
- 若不足，凌越需補哪些對接資料。
- 各流程該用哪個 `idakd`、哪些欄位、哪些 XML 範例。

不要問凌越：

- SEO。
- 商品文案。
- 網站上架 / 下架排程。
- 前台畫面流程。
- 網站內容管理。
- 材積規則該怎麼決策。

### 5.3 材積 / 金物流分工

若使用綠界 ECPay 金物流：

- 網站端先依 HJ 規則判斷是否可超商 / 宅配。
- 金物流負責建物流單、列印託運單、貨態通知。
- 凌越只提供商品重量 / 材積來源欄位，或保存物流單號 / 出庫資料。

不要把「能不能配送」這個規則決策推給凌越。

---

## 6. 請 Claude 審核的重點

請檢查：

1. Codex 對 207 頁 API 的理解是否有錯漏。
2. `lyserp-api-reference-index.md` 是否有資料類別、頁碼、用途或風險寫錯。
3. `hj-api-207-full-read-reanalysis.md` 的判斷是否合理。
4. 給 HJ 的問題是否有漏掉會影響架構 / 畫面 / 流程的核心風險。
5. 給凌越的問題是否已限縮在 API 對接必要事項。
6. 是否還有不該問凌越、但被放在凌越文件中的網站功能問題。
7. 金物流與材積判斷分工是否合理。
8. 如果發現索引有錯或漏，請直接改 `discussions/lyserp-api-reference-index.md`，並在 `discussions/codex-handoff.md` 的「對齊紀錄」追加一筆。

---

## 7. 審核後希望 Claude 產出

請 Claude 回覆或新增文件，至少包含：

1. 同意 / 不同意 Codex 主要結論。
2. API 索引錯漏清單。
3. 給 HJ 問題的新增 / 刪除建議。
4. 給凌越 API 補件問題的新增 / 刪除建議。
5. 需要馬亞技術判斷的事項。
6. 需要 Wayne 決策的事項。

