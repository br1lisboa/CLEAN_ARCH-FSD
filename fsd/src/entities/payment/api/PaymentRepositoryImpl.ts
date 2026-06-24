import { type Payment } from "../model/Payment";
import { type PaymentRepository } from "../model/PaymentRepository";
import { type ApiPayment } from "./ApiPayment";
import { PaymentMapper } from "./PaymentMapper";

export class PaymentRepositoryImpl implements PaymentRepository {
  private store: ApiPayment[] = [];

  async findAll(): Promise<Payment[]> {
    return this.store.map(PaymentMapper.toDomain);
  }

  async save(payment: Payment): Promise<void> {
    this.store.push(PaymentMapper.toDto(payment));
  }
}
