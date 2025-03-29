export type MENU_CATEGORY = "SANDWICH" | "MEAL" | "BEVERAGE" | "GOODMORNING";
export type MENU_ITEM = {
  id: string;
  name: string;
  price: number;
  description: string;
  type: MENU_CATEGORY;
  image?: string;
}

export type TAB_CATEGORY = "MENU" | "CART";
export type CART_STATE = {
  items: Record<string, number>;
  totalPrice: number;
  totalCount: number;
}