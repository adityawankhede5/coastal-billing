export enum MENU_CATEGORY {
  SANDWICH = "SANDWICH",
  SIDES = "SIDES",
  BEVERAGE = "BEVERAGE",
  GOOD_MORNING = "GOOD_MORNING",
  COMBO = "COMBO",
  TRIPLE_LAYERED_MEAL = "TRIPLE_LAYERED_MEAL",
  PIZZA = "PIZZA",
}
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