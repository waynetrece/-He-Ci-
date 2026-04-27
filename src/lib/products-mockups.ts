export type ProductsMockup = {
  id: "list" | "detail" | "sample";
  name: string;
  layer: "前台";
  ready: boolean;
  href: string;
};

export const PRODUCTS_MOCKUPS: ProductsMockup[] = [
  {
    id: "list",
    name: "商品列表頁",
    layer: "前台",
    ready: true,
    href: "/modules/products",
  },
  {
    id: "detail",
    name: "商品詳情頁",
    layer: "前台",
    ready: true, // ✅ done
    href: "/modules/products/detail",
  },
  {
    id: "sample",
    name: "樣品申請流程",
    layer: "前台",
    ready: true, // 改：表單實際內容待客戶確認，先做流程圖
    href: "/modules/products/sample",
  },
];
