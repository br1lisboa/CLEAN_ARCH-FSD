import { Payment } from "./Payment";

export interface PaymentRepository {
  findAll(): Promise<Payment[]>;
  save(payment: Payment): Promise<void>;
}
