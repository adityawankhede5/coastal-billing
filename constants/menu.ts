import MealIcon from "@/assets/icons/Meal.icon";
import { MENU_CATEGORY, MENU_ITEM } from "./types";
import BeverageIcon from "@/assets/icons/Beverage.icon";
import MorningIcon from "@/assets/icons/Morning.icon";
import ComboIcon from "@/assets/icons/Combo.icon";
import SandwichIcon from "@/assets/icons/Sandwich.icon";
import { sortBy } from "lodash";
import FriesIcon from "@/assets/icons/Fries.icon";

const SANDWICHES: Record<string, MENU_ITEM> = {
  "bifmcw": { "id": "bifmcw", "name": "Veg Grill", "description": "Onion, capsicum, tomato etc with chips", "price": 55, "type": MENU_CATEGORY.SANDWICH },
  "cjdksa": { "id": "cjdksa", "name": "Cheese Veg Grill", "description": "Veg grill with cheese on top and chips", "price": 60, "type": MENU_CATEGORY.SANDWICH },
  "plokij": { "id": "plokij", "name": "Garlic Veg Grill", "description": "Veg grill with garlic sauce and chips", "price": 60, "type": MENU_CATEGORY.SANDWICH },
  "mdjfke": { "id": "mdjfke", "name": "Schezwan Veg Grill", "description": "Veg grill with schezwan sauce and chips", "price": 60, "type": MENU_CATEGORY.SANDWICH },
  "zmxvbn": { "id": "zmxvbn", "name": "Cheese Corn", "description": "Corn & onion with cheese on top and chips", "price": 60, "type": MENU_CATEGORY.SANDWICH },
  "anxvbn": { "id": "anxvbn", "name": "Cheese Corn Paneer", "description": "Corn, onion and paneer with cheese on top and chips", "price": 70, "type": MENU_CATEGORY.SANDWICH },
  "xswedc": { "id": "xswedc", "name": "Tandoori Paneer", "description": "Paneer and onion in tandoori sauce with cheese on top and chips", "price": 65, "type": MENU_CATEGORY.SANDWICH },
  "yhnujm": { "id": "yhnujm", "name": "Garlic Paneer", "description": "Paneer, onion and capsicum with garlic sauce and chips", "price": 70, "type": MENU_CATEGORY.SANDWICH },
  "rfvtgb": { "id": "rfvtgb", "name": "Schezwan Paneer", "description": "Paneer, onion and capsicum with schezwan sauce and chips", "price": 70, "type": MENU_CATEGORY.SANDWICH },
  "lokmij": { "id": "lokmij", "name": "Chocolate Sandwich", "description": "Chocolate spread sandwich", "price": 65, "type": MENU_CATEGORY.SANDWICH },
  "qasdfg": { "id": "qasdfg", "name": "Cheese Chocolate", "description": "Chocolate spread sandwich with cheese on top", "price": 75, "type": MENU_CATEGORY.SANDWICH },
}

const BEVERAGES: Record<string, MENU_ITEM> = {
  "oirasd": { "id": "oirasd", "name": "Jamaican Hot Chocolate", "description": "A perfectly brewed cup of chocolatey warmth", "price": 60, "type": MENU_CATEGORY.BEVERAGE },
  "werasd": { "id": "werasd", "name": "Cold Coffee", "description": "Chilled and refreshingly smooth", "price": 50, "type": MENU_CATEGORY.BEVERAGE },
  "qazwsx": { "id": "qazwsx", "name": "Chikoo Shake", "description": "Nutritious and naturally sweet chikoo delight", "price": 60, "type": MENU_CATEGORY.BEVERAGE },
  "edcrfv": { "id": "edcrfv", "name": "Mango Shake", "description": "Juicy mangoes blended into a perfectly refreshing shake", "price": 70, "type": MENU_CATEGORY.BEVERAGE },
  "tgbnhy": { "id": "tgbnhy", "name": "Chocolate Shake", "description": "Rich and chocolaty", "price": 70, "type": MENU_CATEGORY.BEVERAGE },
  "ujmikn": { "id": "ujmikn", "name": "Watermelon Juice", "description": "Pure watermelon refreshment in every sip", "price": 55, "type": MENU_CATEGORY.BEVERAGE },
};

const TRIPLE_LAYERED_MEALS: Record<string, MENU_ITEM> = {
  "lkjhgf": { "id": "lkjhgf", "name": "Cheesy Crunch Meal", "description": "Veg Cheese Grill + Fries + Cold Coffee", "price": 169, "type": MENU_CATEGORY.TRIPLE_LAYERED_MEAL },
  "zxcvbn": { "id": "zxcvbn", "name": "Golden Corn Feast", "description": "Cheese Corn + Fries + Cold Coffee", "price": 169, "type": MENU_CATEGORY.TRIPLE_LAYERED_MEAL },
  "poiuyt": { "id": "poiuyt", "name": "Tandoori Bliss", "description": "Tandoori Paneer + Fries + Hot Chocolate", "price": 179, "type": MENU_CATEGORY.TRIPLE_LAYERED_MEAL },
  "asdfgh": { "id": "asdfgh", "name": "Corn & Cocoa", "description": "Cheese Corn Paneer + Fries + Hot Chocolate", "price": 189, "type": MENU_CATEGORY.TRIPLE_LAYERED_MEAL },
  "mnbvcz": { "id": "mnbvcz", "name": "Ultimate Paneer", "description": "Tandoori Paneer + Veg Cheese Grill + Fries + Cold Coffee + Hot Chocolate", "price": 299, "type": MENU_CATEGORY.TRIPLE_LAYERED_MEAL },
  "lkjpoi": { "id": "lkjpoi", "name": "Ultimate Corn & Cocoa", "description": "Cheese Corn Paneer + Chocolate Sandwich + Fries + Cold Coffee + Hot Chocolate", "price": 299, "type": MENU_CATEGORY.TRIPLE_LAYERED_MEAL }
}

const COMBOS: Record<string, MENU_ITEM> = {
  "vhgtyu": { "id": "vhgtyu", "name": "Tandoori Feast", "description": "Tandoori Paneer + Hot Chocolate", "price": 109, "type": MENU_CATEGORY.COMBO },
  "qwerty": { "id": "qwerty", "name": "Choco Heaven", "description": "Chocolate Sandwich + Hot Chocolate/Chocolate Shake", "price": 109, "type": MENU_CATEGORY.COMBO },
  "ytredf": { "id": "ytredf", "name": "Corn & Paneer Bliss", "description": "Cheese Corn Paneer + Cold Coffee", "price": 109, "type": MENU_CATEGORY.COMBO },
}

const GOODMORNINGS: Record<string, MENU_ITEM> = {
  "gm9101": { "id": "gm9101", "name": "Fruit Jam Bread", "description": "Soft bread layered with delicious fruit jam", "price": 35, "type": MENU_CATEGORY.GOOD_MORNING },
  "gm1234": { "id": "gm1234", "name": "Hot Coffee & Bread Butter", "description": "Classic start to your morning with warm coffee and buttery bread", "price": 55, "type": MENU_CATEGORY.GOOD_MORNING },
}


const SIDES: Record<string, MENU_ITEM> = {
  "yutrgh": { "id": "yutrgh", "name": "Fries", "description": "Crispy fries", "price": 55, "type": MENU_CATEGORY.SIDES },
  "cmert": { "id": "cmert", "name": "Choco Meltwich", "description": "Coastal Special", "price": 80, "type": MENU_CATEGORY.SIDES },
  "wbrtij": { "id": "wbrtij", "name": "Water Bottle 0.5L", "description": "500ml", "price": 10, "type": MENU_CATEGORY.SIDES },
  "wbytrf": { "id": "wbytrf", "name": "Water Bottle 1L", "description": "1L", "price": 20, "type": MENU_CATEGORY.SIDES },
}

export type Menu = Record<MENU_CATEGORY, MENU_ITEM[]>;
export enum CATEGORY {
  SANDWICH = "Sandwiches",
  SIDES = "Sides",
  BEVERAGE = "Beverages",
  COMBO = "Combos",
  TRIPLE_LAYERED_MEAL = "Triple Layered Meals",
  GOOD_MORNING = "Good Morning",
}

const MENU: Menu = {
  SANDWICH: Object.values(SANDWICHES),
  SIDES: Object.values(SIDES),
  BEVERAGE: Object.values(BEVERAGES),
  TRIPLE_LAYERED_MEAL: Object.values(TRIPLE_LAYERED_MEALS),
  COMBO: Object.values(COMBOS),
  GOOD_MORNING: Object.values(GOODMORNINGS),
}
export const MENU_ARRAY = Object.values(MENU).flat();
export const MENU_ARRAY_SORTED = sortBy(MENU_ARRAY, "name");

export const MENU_DICTIONARY: Record<string, MENU_ITEM> = {
  ...SANDWICHES,
  ...SIDES,
  ...BEVERAGES,
  ...TRIPLE_LAYERED_MEALS,
  ...COMBOS,
  ...GOODMORNINGS,
}

export const MENU_CATEGORY_ICONS: Record<MENU_CATEGORY, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  [MENU_CATEGORY.SANDWICH]: SandwichIcon,
  [MENU_CATEGORY.SIDES]: FriesIcon,
  [MENU_CATEGORY.BEVERAGE]: BeverageIcon,
  [MENU_CATEGORY.GOOD_MORNING]: MorningIcon,
  [MENU_CATEGORY.COMBO]: ComboIcon,
  [MENU_CATEGORY.TRIPLE_LAYERED_MEAL]: MealIcon,
}

export default MENU;
