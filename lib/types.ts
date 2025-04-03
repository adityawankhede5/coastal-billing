export interface StandardResponse {
  status: "success" | "error";
  error?: unknown;
  message?: string;
}

export interface CreateOrderResponse extends StandardResponse {
  orderId?: string;
}
