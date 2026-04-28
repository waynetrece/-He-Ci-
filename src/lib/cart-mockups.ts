export type CartMockup = {
  id: "cart" | "checkout" | "success";
  name: string;
  layer: "前台";
  ready: boolean;
  href: string;
};

export const CART_MOCKUPS: CartMockup[] = [
  {
    id: "cart",
    name: "購物車",
    layer: "前台",
    ready: true,
    href: "/modules/cart",
  },
  {
    id: "checkout",
    name: "結帳",
    layer: "前台",
    ready: true,
    href: "/modules/checkout",
  },
  {
    id: "success",
    name: "訂單成立",
    layer: "前台",
    ready: true,
    href: "/modules/checkout/success",
  },
];
