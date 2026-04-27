export type SitemapKind = "root" | "branch" | "main" | "sub" | "special";

export type SitemapNode = {
  id: string;
  label: string;
  note?: string;
  kind: SitemapKind;
  children?: SitemapNode[];
};

// ========== 前台架構 ==========
export const INITIAL_SITEMAP: SitemapNode = {
  id: "root",
  label: "官網",
  note: "www.hjhj.com.tw",
  kind: "root",
  children: [
    { id: "home", label: "首頁", note: "Hero / 新品 / 暢銷", kind: "main" },
    { id: "about", label: "關於我們", kind: "main" },
    {
      id: "news",
      label: "行銷動態",
      kind: "main",
      children: [
        { id: "news-1", label: "活動訊息", kind: "sub" },
        { id: "news-2", label: "公告通知", kind: "sub" },
        { id: "news-3", label: "FAQ", kind: "sub" },
        { id: "news-4", label: "企劃提案", kind: "sub" },
      ],
    },
    {
      id: "products",
      label: "公版商品系列",
      note: "8 大類 / 49 子類",
      kind: "special",
    },
    {
      id: "custom",
      label: "私版商品系列",
      note: "客製化",
      kind: "special",
      children: [
        { id: "custom-1", label: "即時報價（仿 jcolor）", kind: "sub" },
        { id: "custom-2", label: "LINE 客服轉單", kind: "sub" },
      ],
    },
    {
      id: "portfolio",
      label: "作品集系列",
      note: "新增 · 仿 minlusbr",
      kind: "main",
    },
    {
      id: "design",
      label: "設計服務",
      note: "4 大類 / 27 子類",
      kind: "special",
    },
    { id: "contact", label: "聯絡我們", kind: "main" },
    {
      id: "member",
      label: "會員中心",
      kind: "main",
      children: [
        { id: "member-1", label: "歷史訂單", kind: "sub" },
        { id: "member-2", label: "一鍵再購", kind: "sub" },
        { id: "member-3", label: "訂單配送追蹤", kind: "sub" },
      ],
    },
  ],
};

// ========== 公版商品（8 大類 / 49 子類） ==========
export const INITIAL_PRODUCTS: SitemapNode = {
  id: "p-root",
  label: "公版商品系列",
  note: "8 大類 / 49 子類",
  kind: "root",
  children: [
    {
      id: "p-1",
      label: "植纖容器類",
      note: "4 項",
      kind: "main",
      children: [
        { id: "p-1-1", label: "植纖餐盒", kind: "sub" },
        { id: "p-1-2", label: "植纖碗．盤", kind: "sub" },
        { id: "p-1-3", label: "植纖壽司盒", kind: "sub" },
        { id: "p-1-4", label: "植纖連體餐盒．醬料杯", kind: "sub" },
      ],
    },
    {
      id: "p-2",
      label: "牛皮紙容器類",
      note: "4 項",
      kind: "main",
      children: [
        { id: "p-2-1", label: "牛皮紙餐盒", kind: "sub" },
        { id: "p-2-2", label: "牛卡紙開窗餐盒", kind: "sub" },
        { id: "p-2-3", label: "牛卡紙敞口盒．斜口杯", kind: "sub" },
        { id: "p-2-4", label: "牛皮紙湯杯碗．圓便當盒", kind: "sub" },
      ],
    },
    {
      id: "p-3",
      label: "紙製／塑膠容器類",
      note: "7 項",
      kind: "main",
      children: [
        { id: "p-3-1", label: "紙湯杯．醬料杯", kind: "sub" },
        { id: "p-3-2", label: "紙製餐盒．紙圓便當盒", kind: "sub" },
        { id: "p-3-3", label: "透明輕食盒", kind: "sub" },
        { id: "p-3-4", label: "塑膠便當盒．壽司盒", kind: "sub" },
        { id: "p-3-5", label: "塑膠沙拉盒．食品盒", kind: "sub" },
        { id: "p-3-6", label: "塑膠連體醬料杯", kind: "sub" },
        { id: "p-3-7", label: "塑膠分隔內襯", kind: "sub" },
      ],
    },
    {
      id: "p-4",
      label: "紙杯／膠杯／外帶週邊類",
      note: "10 項 · 最大類",
      kind: "special",
      children: [
        { id: "p-4-1", label: "公版瓦楞杯", kind: "sub" },
        { id: "p-4-2", label: "雙層中空杯", kind: "sub" },
        { id: "p-4-3", label: "單層淋膜杯", kind: "sub" },
        { id: "p-4-4", label: "冷熱共用杯", kind: "sub" },
        { id: "p-4-5", label: "水杯．試飲杯", kind: "sub" },
        { id: "p-4-6", label: "紙杯杯蓋", kind: "sub" },
        { id: "p-4-7", label: "PLA 環保塑膠杯", kind: "sub" },
        { id: "p-4-8", label: "PET．PP 塑膠杯", kind: "sub" },
        { id: "p-4-9", label: "膠杯杯蓋", kind: "sub" },
        { id: "p-4-10", label: "杯套．杯提．杯座．分杯架", kind: "sub" },
      ],
    },
    {
      id: "p-5",
      label: "紙袋／淋膜袋／塑膠袋類",
      note: "7 項",
      kind: "main",
      children: [
        { id: "p-5-1", label: "淋膜袋．淋膜包裝紙", kind: "sub" },
        { id: "p-5-2", label: "麵包袋．點心袋", kind: "sub" },
        { id: "p-5-3", label: "方型捧袋", kind: "sub" },
        { id: "p-5-4", label: "紙繩提袋", kind: "sub" },
        { id: "p-5-5", label: "塑膠提袋", kind: "sub" },
        { id: "p-5-6", label: "塑膠耐熱袋．夾鏈袋", kind: "sub" },
        { id: "p-5-7", label: "塑膠垃圾袋", kind: "sub" },
      ],
    },
    {
      id: "p-6",
      label: "印刷紙品類",
      note: "8 項",
      kind: "main",
      children: [
        { id: "p-6-1", label: "公版餐盒腰封．封套", kind: "sub" },
        { id: "p-6-2", label: "公版餐墊．防油背心", kind: "sub" },
        { id: "p-6-3", label: "公版杯墊", kind: "sub" },
        { id: "p-6-4", label: "公版筷套", kind: "sub" },
        { id: "p-6-5", label: "公版刀叉套．湯匙套", kind: "sub" },
        { id: "p-6-6", label: "公版複寫聯單．熱感紙", kind: "sub" },
        { id: "p-6-7", label: "紙吸管套．蛋糕插卡", kind: "sub" },
        { id: "p-6-8", label: "產品型錄", kind: "sub" },
      ],
    },
    {
      id: "p-7",
      label: "餐具／餐廚用品類",
      note: "4 項",
      kind: "main",
      children: [
        { id: "p-7-1", label: "餐刀叉匙", kind: "sub" },
        { id: "p-7-2", label: "吸管", kind: "sub" },
        { id: "p-7-3", label: "筷子．牙籤．咖啡調棒", kind: "sub" },
        { id: "p-7-4", label: "手套．餐廚用品", kind: "sub" },
      ],
    },
    {
      id: "p-8",
      label: "清潔紙品／用品類",
      note: "5 項",
      kind: "main",
      children: [
        { id: "p-8-1", label: "餐巾紙", kind: "sub" },
        { id: "p-8-2", label: "扇形紙．濕紙巾", kind: "sub" },
        { id: "p-8-3", label: "衛生紙．擦手紙", kind: "sub" },
        { id: "p-8-4", label: "清潔用品．掃除工具", kind: "sub" },
        { id: "p-8-5", label: "清潔劑．粉", kind: "sub" },
      ],
    },
  ],
};

// ========== 設計服務（4 大類 / 27 子類） ==========
export const INITIAL_DESIGN: SitemapNode = {
  id: "d-root",
  label: "設計服務",
  note: "4 大類 / 27 子類",
  kind: "root",
  children: [
    {
      id: "d-1",
      label: "餐飲／紙製品印刷設計",
      note: "9 項",
      kind: "main",
      children: [
        { id: "d-1-1", label: "餐盒腰封．封套．豪華便當盒", kind: "sub" },
        { id: "d-1-2", label: "餐墊紙．防油背心", kind: "sub" },
        { id: "d-1-3", label: "杯墊紙", kind: "sub" },
        { id: "d-1-4", label: "紙杯．膠杯．杯套", kind: "sub" },
        { id: "d-1-5", label: "筷套．筷子套", kind: "sub" },
        { id: "d-1-6", label: "刀叉套．湯匙套", kind: "sub" },
        { id: "d-1-7", label: "淋膜紙．淋膜袋．點心袋", kind: "sub" },
        { id: "d-1-8", label: "餐巾紙．扇形紙．濕紙巾", kind: "sub" },
        { id: "d-1-9", label: "紙包筷．牙籤．吸管", kind: "sub" },
      ],
    },
    {
      id: "d-2",
      label: "店家／宣傳品印刷設計",
      note: "7 項",
      kind: "main",
      children: [
        { id: "d-2-1", label: "菜單本", kind: "sub" },
        { id: "d-2-2", label: "海報大圖", kind: "sub" },
        { id: "d-2-3", label: "文宣傳單", kind: "sub" },
        { id: "d-2-4", label: "名片．店卡．酷卡", kind: "sub" },
        { id: "d-2-5", label: "抵用券．抽獎券", kind: "sub" },
        { id: "d-2-6", label: "貴賓卡．會員卡", kind: "sub" },
        { id: "d-2-7", label: "旗幟．帆布．立牌", kind: "sub" },
      ],
    },
    {
      id: "d-3",
      label: "商品平面／包裝設計",
      note: "5 項",
      kind: "main",
      children: [
        { id: "d-3-1", label: "商品包裝", kind: "sub" },
        { id: "d-3-2", label: "手提紙袋", kind: "sub" },
        { id: "d-3-3", label: "塑膠袋", kind: "sub" },
        { id: "d-3-4", label: "數位貼紙", kind: "sub" },
        { id: "d-3-5", label: "喜帖．紅包袋", kind: "sub" },
      ],
    },
    {
      id: "d-4",
      label: "公司／應用品印刷設計",
      note: "6 項",
      kind: "main",
      children: [
        { id: "d-4-1", label: "品牌標誌", kind: "sub" },
        { id: "d-4-2", label: "型錄．書籍", kind: "sub" },
        { id: "d-4-3", label: "邀請卡．信封．信紙", kind: "sub" },
        { id: "d-4-4", label: "聯單．單色宣傳單", kind: "sub" },
        { id: "d-4-5", label: "資料夾．便條紙．桌曆", kind: "sub" },
        { id: "d-4-6", label: "原子筆．面紙包．荷葉扇", kind: "sub" },
      ],
    },
  ],
};

// ========== 後台模組（12 個） ==========
export const INITIAL_BACKEND: SitemapNode = {
  id: "b-root",
  label: "後台管理系統",
  note: "12 個模組",
  kind: "root",
  children: [
    {
      id: "b-1",
      label: "公版商品管理",
      note: "材積、Excel、預約、3D 圖",
      kind: "main",
    },
    {
      id: "b-2",
      label: "私版商品管理",
      note: "Excel、預約上架",
      kind: "main",
    },
    {
      id: "b-3",
      label: "訂單管理",
      note: "★ API 串 ERP",
      kind: "special",
      children: [
        { id: "b-3-1", label: "訂單匯入 ERP（API）", kind: "sub" },
        { id: "b-3-2", label: "批次列印物流單", kind: "sub" },
        { id: "b-3-3", label: "撿貨單匯出", kind: "sub" },
        { id: "b-3-4", label: "訂單修改 / 退換貨", kind: "sub" },
      ],
    },
    {
      id: "b-4",
      label: "庫存管理",
      note: "★ API 串 ERP",
      kind: "special",
      children: [
        { id: "b-4-1", label: "即時更新（API）", kind: "sub" },
        { id: "b-4-2", label: "預留庫存", kind: "sub" },
        { id: "b-4-3", label: "缺貨提醒", kind: "sub" },
      ],
    },
    {
      id: "b-5",
      label: "顧客管理",
      note: "★ API 串 ERP",
      kind: "special",
      children: [
        { id: "b-5-1", label: "客戶編號同步（API）", kind: "sub" },
        { id: "b-5-2", label: "多層會員分級價", kind: "sub" },
      ],
    },
    {
      id: "b-6",
      label: "網頁設計",
      note: "彈跳/浮動/公告",
      kind: "main",
      children: [
        { id: "b-6-1", label: "拖曳式版型？（待確認）", kind: "sub" },
        { id: "b-6-2", label: "搜尋瀏覽紀錄", kind: "sub" },
        { id: "b-6-3", label: "公版／私版底色不同", kind: "sub" },
      ],
    },
    {
      id: "b-7",
      label: "金流",
      note: "綠界 + 匯款 + 貨到付款",
      kind: "main",
    },
    {
      id: "b-8",
      label: "物流",
      note: "超商 + 宅配 + 自取",
      kind: "main",
    },
    {
      id: "b-9",
      label: "數據分析",
      note: "瀏覽 / 加購 / 購買量",
      kind: "main",
    },
    {
      id: "b-10",
      label: "行銷工具",
      note: "Google Ads / Meta / SEO",
      kind: "main",
    },
    {
      id: "b-11",
      label: "網站維護",
      note: "防火牆 / SSL / 保固",
      kind: "main",
    },
    {
      id: "b-12",
      label: "權限管理",
      note: "登入紀錄 / 人員權限",
      kind: "main",
    },
  ],
};

// ========== 完整架構（前台 + 後台 整合）==========
export const INITIAL_FULL: SitemapNode = {
  id: "hj-root",
  label: "禾啟 HJ",
  note: "餐飲包材電商平台",
  kind: "root",
  children: [
    {
      id: "frontend",
      label: "前台網站",
      note: "使用者看到的內容",
      kind: "branch",
      children: [
        { id: "f-home", label: "首頁", note: "Hero / 新品 / 暢銷 / 節慶", kind: "main" },
        { id: "f-about", label: "關於我們", kind: "main" },
        {
          id: "f-news",
          label: "行銷動態",
          kind: "main",
          children: [
            { id: "f-news-1", label: "活動訊息", kind: "sub" },
            { id: "f-news-2", label: "公告通知", kind: "sub" },
            { id: "f-news-3", label: "FAQ", kind: "sub" },
            { id: "f-news-4", label: "企劃提案", kind: "sub" },
          ],
        },
        {
          id: "f-products",
          label: "公版商品系列",
          note: "8 大類 / 49 子類",
          kind: "special",
          children: INITIAL_PRODUCTS.children?.map((c) => ({
            ...c,
            id: `f-${c.id}`,
            children: c.children?.map((g) => ({ ...g, id: `f-${g.id}` })),
          })),
        },
        {
          id: "f-custom",
          label: "私版商品系列",
          note: "客製化",
          kind: "special",
          children: [
            { id: "f-custom-1", label: "即時報價（仿 jcolor）", kind: "sub" },
            { id: "f-custom-2", label: "LINE 客服轉單", kind: "sub" },
          ],
        },
        {
          id: "f-portfolio",
          label: "作品集系列",
          note: "新增 · 仿 minlusbr",
          kind: "main",
        },
        {
          id: "f-design",
          label: "設計服務",
          note: "4 大類 / 27 子類",
          kind: "special",
          children: INITIAL_DESIGN.children?.map((c) => ({
            ...c,
            id: `f-${c.id}`,
            children: c.children?.map((g) => ({ ...g, id: `f-${g.id}` })),
          })),
        },
        { id: "f-contact", label: "聯絡我們", kind: "main" },
        {
          id: "f-member",
          label: "會員中心",
          kind: "main",
          children: [
            { id: "f-member-1", label: "歷史訂單", kind: "sub" },
            { id: "f-member-2", label: "一鍵再購", kind: "sub" },
            { id: "f-member-3", label: "訂單配送追蹤", kind: "sub" },
          ],
        },
      ],
    },
    {
      id: "backend",
      label: "後台管理系統",
      note: "12 個模組 · ★ = 需串凌越 ERP",
      kind: "branch",
      children: INITIAL_BACKEND.children!.map((c) => ({
        ...c,
        id: `b-x-${c.id}`,
        children: c.children?.map((g) => ({ ...g, id: `b-x-${g.id}` })),
      })),
    },
  ],
};

let _seq = 0;
export const newId = () => `n${Date.now().toString(36)}${(_seq++).toString(36)}`;

function clone(node: SitemapNode): SitemapNode {
  return {
    ...node,
    children: node.children?.map(clone),
  };
}

export function addChild(
  root: SitemapNode,
  parentId: string,
  label = "新項目",
): SitemapNode {
  const next = clone(root);
  const visit = (n: SitemapNode): boolean => {
    if (n.id === parentId) {
      const kind: SitemapKind = n.kind === "root" ? "main" : "sub";
      n.children = [...(n.children ?? []), { id: newId(), label, kind }];
      return true;
    }
    return n.children?.some(visit) ?? false;
  };
  visit(next);
  return next;
}

export function deleteNode(root: SitemapNode, id: string): SitemapNode {
  if (root.id === id) return root;
  const next = clone(root);
  const visit = (n: SitemapNode) => {
    if (!n.children) return;
    n.children = n.children.filter((c) => c.id !== id);
    n.children.forEach(visit);
  };
  visit(next);
  return next;
}

export function renameNode(
  root: SitemapNode,
  id: string,
  label: string,
): SitemapNode {
  const next = clone(root);
  const visit = (n: SitemapNode): boolean => {
    if (n.id === id) {
      n.label = label;
      return true;
    }
    return n.children?.some(visit) ?? false;
  };
  visit(next);
  return next;
}

export function flatten(
  root: SitemapNode,
  collapsed?: Set<string>,
): {
  nodeList: SitemapNode[];
  edgeList: { source: string; target: string }[];
} {
  const nodeList: SitemapNode[] = [];
  const edgeList: { source: string; target: string }[] = [];
  const visit = (n: SitemapNode, parentId?: string) => {
    nodeList.push(n);
    if (parentId) edgeList.push({ source: parentId, target: n.id });
    if (!collapsed?.has(n.id)) {
      n.children?.forEach((c) => visit(c, n.id));
    }
  };
  visit(root);
  return { nodeList, edgeList };
}

/**
 * 預設摺疊：折疊所有「深度 >= 2」的有子節點（即收合所有 sub 層）
 * 結果會顯示：root → branches → main categories，但不顯示 subs
 */
export function initialCollapsed(root: SitemapNode): Set<string> {
  const collapsed = new Set<string>();
  const visit = (n: SitemapNode, depth: number) => {
    if (depth >= 2 && n.children?.length) {
      collapsed.add(n.id);
    }
    n.children?.forEach((c) => visit(c, depth + 1));
  };
  visit(root, 0);
  return collapsed;
}

export function collectAllParentIds(root: SitemapNode): Set<string> {
  const ids = new Set<string>();
  const visit = (n: SitemapNode) => {
    if (n.children?.length) ids.add(n.id);
    n.children?.forEach(visit);
  };
  visit(root);
  return ids;
}
