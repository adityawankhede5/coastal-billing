export type Order = {
  id: string;
  name: string;
  number: number;
  cart: Record<string, number>;
  price: number;
  quantity: number;
  createdAt: Date;
};

export type OrdersStore = {
  orders: Order[];
  init: (incomingOrders: Order[]) => void;
  getOrder: (orderId: string) => Order | undefined;
  createOrder: (orderId: string, name?: string) => void;
  appendOrder: (order: Order) => void;
  updateCart: (orderId: string, itemId: string, quantity: number) => void;
  clearCart: (orderId: string) => void;
};
