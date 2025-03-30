export type CartStore = {
  cart: Record<string, number>;
  totalPrice: number;
  quantity: number;
  updateCart: (itemId: string, quantity: number) => void;
  clearCart: () => void;
};
