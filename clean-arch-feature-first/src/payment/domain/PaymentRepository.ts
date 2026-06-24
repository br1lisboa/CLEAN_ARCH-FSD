import { Payment } from "./entities/Payment";

export interface PaymentRepository {
  findAll(): Promise<Payment[]>;
  save(payment: Payment): Promise<void>;
}
