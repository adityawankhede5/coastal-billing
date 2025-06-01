import { Expense } from "@/zustand/types";

export interface StandardResponse {
  status: "success" | "error";
  error?: unknown;
  message?: string;
}

export interface CreateOrderResponse extends StandardResponse {
  orderId?: string;
}

export interface CreateExpenseResponse extends StandardResponse {
  expense?: Expense;
}
export interface UpdateExpenseResponse extends StandardResponse {
  expense?: Omit<Expense, "createdAt">;
}
