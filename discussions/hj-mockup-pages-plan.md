# HJ Mockup 頁數規劃 v1

> 基準:32 題客戶 review(2026-05-04)+ 報價草案(2026-05-05)
> 原則:**寧可多報不少報**,前端介面不能漏掉
> 後台:沿用既有 admin UI 元件,但每頁仍要 mockup 給 HJ 看

---

## 前台 27 頁(原報價 25,實列 27)

### A. 形象 / CMS(7 頁)
| # | 路由 | 對應報價 | 既有? |
|---|---|---|---|
| F1 | `/` 消費端首頁 | A2 動態形象首頁 | ⚠️ 被架構地圖佔用 |
| F2 | `/about` 關於禾啟 | A8 一般 CMS | ❌ 新建 |
| F3 | `/contact` 聯絡我們 | A8 一般 CMS | ❌ 新建 |
| F4 | `/news` 最新消息列表 | A8 一般 CMS | ❌ 新建 |
| F5 | `/news/[id]` 最新消息詳情 | A8 一般 CMS | ❌ 新建 |
| F6 | `/faq` 常見問題 Q&A | A8 一般 CMS | ❌ 新建 |
| F7 | `/policy` 隱私權 / 條款 | A8 一般 CMS | ❌ 新建 |

### B. 商品瀏覽(7 頁)
| # | 路由 | 對應報價 | 既有? |
|---|---|---|---|
| F8 | `/modules/products` 商品分類入口 | A3 商品列表 | ✅ |
| F9 | `/modules/products/category` 分類列表(篩選+搜尋) | A3 | ❌ 新建 |
| F10 | `/modules/products/detail` 商品詳情 | A3 規格選擇器+加購 | ✅ |
| F11 | `/modules/products/sample` 樣品申請流程 | A6 | ✅ |
| F12 | `/modules/private-quote` 私版商品入口 | A7 | ✅ |
| F13 | `/modules/private-quote/quote-form` 私版詢價表單 | A7 | ✅ |
| F14 | `/search` 搜尋結果 | A3 | ❌ 新建 |

### C. 結帳流程(4 頁)
| # | 路由 | 對應報價 | 既有? |
|---|---|---|---|
| F15 | `/modules/cart` 購物車 | A4 | ✅ |
| F16 | `/modules/checkout` 結帳填表 | A4 | ✅ |
| F17 | `/modules/checkout/payment` 付款選擇(綠界跳轉前) | A4 | ❌ 新建 |
| F18 | `/modules/checkout/success` 付款結果 | A4 | ✅ |

### D. 會員中心(9 頁,原 6 頁太擠)
| # | 路由 | 對應報價 | 既有? |
|---|---|---|---|
| F19 | `/modules/members/auth` 登入 / 註冊 | A5 | ✅ |
| F20 | `/modules/members/auth/forgot` 忘記密碼 | A5 | ❌ 新建 |
| F21 | `/modules/members` 會員儀表板 | A5 | ✅ |
| F22 | `/modules/members/orders` 訂單列表(含凌越歷史) | A5 | ✅ |
| F23 | `/modules/members/orders/[id]` 訂單詳情 | A5 | ✅ |
| F24 | `/modules/members/quote-list` 詢價單列表 | A5 | ✅ |
| F25 | `/modules/members/samples` 樣品申請列表 | A5 | ✅ |
| F26 | `/modules/members/settings` 個人資料設定 | A5 | ✅ |
| F27 | `/modules/members/addresses` 收件地址簿 | A5 | ❌ 新建 |

**前台 27 頁 = 既有 16 + 新建 11**

> 移除既有但報價未列:`logistics-automation`、`logistics-front-demo`(會在 audit 階段確認去留)

---

## 後台 22 頁(全新建立)

### E. 訂單管理(4 頁)
| # | 路由 | 功能 |
|---|---|---|
| B1 | `/admin/orders` 訂單列表 | 7 狀態篩選 + 搜尋 + 批次操作 |
| B2 | `/admin/orders/[id]` 訂單詳情 | 切狀態 + 操作 log + 凌越同步狀態 |
| B3 | `/admin/orders/picking` 撿貨單匯出 | 按商品+物流分組,匯出 PDF/Excel |
| B4 | `/admin/orders/refunds` 退款處理 | 信用卡退刷 + 匯款手動 + 已退款狀態 |

### F. 商品管理(5 頁)
| # | 路由 | 功能 |
|---|---|---|
| B5 | `/admin/products` 商品列表 | 公版+私版混合,上下架切換 |
| B6 | `/admin/products/edit` 商品編輯 | 規格矩陣 SKU + 加購設定 + 樣品開關 |
| B7 | `/admin/products/import` Excel 匯入匯出 | Shopline 範本格式 |
| B8 | `/admin/products/schedule` 預約上下架 | 日曆+ list 雙視圖 |
| B9 | `/admin/products/categories` 商品分類 | 多層分類管理 |

### G. 會員管理(3 頁)
| # | 路由 | 功能 |
|---|---|---|
| B10 | `/admin/members` 會員列表 | 4 等級 + 凌越綁定狀態 |
| B11 | `/admin/members/[id]` 會員詳情 | 歷史訂單 + 會員價 + 凌越客編 |
| B12 | `/admin/members/levels` 等級設定 | 4 等級維護 + 會員價規則 |

### H. 詢價單管理(2 頁)
| # | 路由 | 功能 |
|---|---|---|
| B13 | `/admin/quotes` 詢價單列表 | 狀態篩選 |
| B14 | `/admin/quotes/[id]` 詢價單詳情 | 訂金確認 + 轉正式訂單(觸發進凌越) |

### I. 庫存管理(2 頁)
| # | 路由 | 功能 |
|---|---|---|
| B15 | `/admin/inventory` 庫存儀表板 | 凌越同步狀態 + 缺貨提醒 |
| B16 | `/admin/inventory/reservations` 預留量設定 | 網站可售量 = 凌越庫存 - 預留量 |

### J. 內容管理(3 頁)
| # | 路由 | 功能 |
|---|---|---|
| B17 | `/admin/cms/banners` Banner 輪播 | 排序 + 啟用切換 |
| B18 | `/admin/cms/news` 最新消息 | 編輯器 + 標籤 + 排程 |
| B19 | `/admin/cms/pages` CMS 頁面 | 關於 / Q&A / 政策 / 條款 |

### K. 系統設定(3 頁)
| # | 路由 | 功能 |
|---|---|---|
| B20 | `/admin/settings/payment` 付款設定 | 綠界帳號 + 匯款帳號 + 自動取消期限 |
| B21 | `/admin/settings/shipping` 物流設定 | 物流商 + 運費規則 + 離島清單 + 貨到付款支援 |
| B22 | `/admin/settings/invoice` 發票設定 | 發票服務商 + 載具 + 觸發時機(待 HJ 補) |

**後台 22 頁 = 0 既有 + 22 新建**

---

## 工作量估算

- 既有 16 頁:audit + 微調(每頁 5 分鐘 × 16 = ~80 min)
- 新建 33 頁(前台 11 + 後台 22):每頁 ~10–15 min × 33 = ~6 小時
- 共用元件(AdminShell + 表格元件 + 表單元件):~30 min

> 採「複用既有元件」策略 → 大量靜態資料 + 共用版型,避免逐頁雕細節

---

## 報價單調整建議(等 mockup 完才定)

- **前台原 25 頁 → 實際 27 頁**(若 logistics 兩頁併入則 25+2=27)
- **後台維持 22 頁**(對齊報價)
- 若 mockup 過程發現再多頁就再加
