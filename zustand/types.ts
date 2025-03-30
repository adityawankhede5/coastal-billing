export type Order = {
  id: string;
  name: string;
  cart: Record<string, number>;
  price: number;
  quantity: number;
  createdAt: Date;
};

export type OrdersStore = {
  orders: Order[];
  getOrder: (orderId: string) => Order | undefined;
  createOrder: (name?: string) => void;
  updateCart: (orderId: string, itemId: string, quantity: number) => void;
  clearCart: (orderId: string) => void;
};
