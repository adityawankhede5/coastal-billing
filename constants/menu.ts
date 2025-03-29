import type { MENU_CATEGORY, MENU_ITEM } from "./types";

const SANDWICHES: Record<string, MENU_ITEM> = {
  "bifmcw": { id: "bifmcw", name: "Veg Grill", description: "Onion, capsicum, tomato etc with chips", price: 55, type: "SANDWICH" },
  "1tqtpj": { id: "1tqtpj", name: "Cheese Veg Grill", description: "Veg grill with cheese on top and chips", price: 60, type: "SANDWICH" },
  "62nfjz": { id: "62nfjz", name: "Garlic Veg Grill", description: "Veg grill with garlic sauce and chips", price: 60, type: "SANDWICH" },
  "kvyvhx": { id: "kvyvhx", name: "Schezwan Veg Grill", description: "Veg grill with schezwan sauce and chips", price: 60, type: "SANDWICH" },
  "gt4s4y": { id: "gt4s4y", name: "Cheese Corn", description: "Corn & onion with cheese on top and chips", price: 60, type: "SANDWICH" },
  "mk314g": { id: "mk314g", name: "Cheese Corn Paneer", description: "Corn, onion and paneer with cheese on top and chips", price: 70, type: "SANDWICH" },
  "x3p7vq": { id: "x3p7vq", name: "Tandoori Paneer", description: "Paneer and onion in tandoori sauce with cheese on top and chips", price: 65, type: "SANDWICH" },
  "z8fl2m": { id: "z8fl2m", name: "Schezwan Paneer", description: "Paneer, onion and capsicum with schezwan sauce and chips", price: 70, type: "SANDWICH" },
  "q5nh9t": { id: "q5nh9t", name: "Chocolate", description: "Chocolate spread sandwich", price: 60, type: "SANDWICH" },
  "v6x1or": { id: "v6x1or", name: "Cheese Chocolate", description: "Chocolate spread sandwich with cheese on top", price: 70, type: "SANDWICH" },
  "m2jk4y": { id: "m2jk4y", name: "Garlic Paneer", description: "Paneer, onion and capsicum with garlic sauce and chips", price: 70, type: "SANDWICH" }
}

const BEVERAGES: Record<string, MENU_ITEM> = {
  "b7x2mf": { id: "b7x2mf", name: "Cold Coffee", description: "Chilled and refreshingly smooth", price: 50, type: "BEVERAGE" },
  "q9l4st": { id: "q9l4st", name: "Chikoo Shake", description: "Nutritious and naturally sweet chikoo delight.", price: 60, type: "BEVERAGE" },
  "v3pf8r": { id: "v3pf8r", name: "Mango Shake", description: "Juicy mangoes blended into a perfectly refreshing shake", price: 70, type: "BEVERAGE" },
  "x2y7nk": { id: "x2y7nk", name: "Chocolate Shake", description: "Rich, chocolaty, and irresistibly refreshing", price: 70, type: "BEVERAGE" },
  "m8j5lw": { id: "m8j5lw", name: "Hot Chocolate", description: "A perfectly brewed cup of chocolatey warmth", price: 60, type: "BEVERAGE" },
  "z4qn1d": { id: "z4qn1d", name: "Watermelon Juice", description: "Pure watermelon refreshment in every sip.", price: 50, type: "BEVERAGE" }
};

const GOODMORNINGS: Record<string, MENU_ITEM> = {
  "h3bt9x": { id: "h3bt9x", name: "Hot Coffee & Bread Butter", description: "Warm, energizing, and full of rich coffee aroma.", price: 55, type: "GOODMORNING" }
}

const MEALS: Record<string, MENU_ITEM> = {
  "g5x1tr": {
    id: "g5x1tr",
    name: "Classic Meal",
    description: "Veg cheese grill + Fries + Cold Coffee + Water Bottle OR Cheese corn + Fries + Cold Coffee + Water Bottle",
    price: 149,
    type: "MEAL"
  },
  "p9m3kv": {
    id: "p9m3kv",
    name: "Paneer Special Meal",
    description: "Tandoori Paneer + Fries + Hot Chocolate + Water Bottle OR Cheese Corn Paneer + Fries + Hot Chocolate + Water Bottle",
    price: 159,
    type: "MEAL"
  },
  "x7q2lf": {
    id: "x7q2lf",
    name: "Ultimate Meal",
    description: "Tandoori Paneer + Veg Cheese Grill + Fries + Cold Coffee + Hot Chocolate + Water Bottle OR Cheese Corn Paneer + Chocolate + Fries + Cold Coffee + Hot Chocolate + Water Bottle",
    price: 259,
    type: "MEAL"
  }
}

export type Menu = Record<MENU_CATEGORY, MENU_ITEM[]>;
export enum CATEGORY {
  SANDWICH = "Sandwiches",
  BEVERAGE = "Beverages",
  GOODMORNING = "Good Mornings",
  MEAL = "Meals",
}

const MENU: Menu = {
  SANDWICH: Object.values(SANDWICHES),
  BEVERAGE: Object.values(BEVERAGES),
  GOODMORNING: Object.values(GOODMORNINGS),
  MEAL: Object.values(MEALS),
}

export const MENU_DICTIONARY: Record<string, MENU_ITEM> = {
  ...SANDWICHES,
  ...BEVERAGES,
  ...GOODMORNINGS,
  ...MEALS,
}

export default MENU;
