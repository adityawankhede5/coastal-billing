export enum ORDER_STATUS {
  PENDING = "pending",
  COMPLETE = "complete",
  CANCELLED = "cancelled",
}
export enum PAYMENT_METHOD {
  CASH = "cash",
  ONLINE = "online",
}
export type Order = {
  id: string;
  name: string;
  number: number;
  cart: Record<string, number>;
  price: number;
  quantity: number;
  createdAt: Date;
  status: ORDER_STATUS;
  payment?: {
    method: PAYMENT_METHOD;
    receivedAt: Date;
  };
};

export type OrdersStore = {
  orders: Order[];
  loading: boolean;
  init: (incomingOrders: Order[]) => void;
  getOrders: () => Order[];
  getOrder: (orderId: string) => Order | undefined;
  setOrder: (orderId: string, order: Order) => void;
  appendOrder: (order: Order) => void;
  updateCart: (orderId: string, itemId: string, quantity: number) => void;
  clearCart: (orderId: string) => void;
};
