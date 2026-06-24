export interface ApiPayment {
  id: string;
  order_id: string;
  amount_cents: number;
  currency: string;
}
