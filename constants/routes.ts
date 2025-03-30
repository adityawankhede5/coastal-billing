export const ROUTES = {
  ORDERS: "/",
  MENU: "/order/:orderId/menu",
  CART: "/order/:orderId/cart",
} as const;

export const getRoute = (orderId: string, route: typeof ROUTES[keyof typeof ROUTES]) => {
  return route.replace(":orderId", orderId);
};


