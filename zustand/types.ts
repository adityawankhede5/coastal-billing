export type CartStore = {
  items: Record<string, number>;
  totalPrice: number;
  quantity: number;
  updateCart: (itemId: string, quantity: number) => void;
  clearCart: () => void;
};
