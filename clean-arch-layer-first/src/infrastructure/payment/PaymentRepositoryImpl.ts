import { type Payment, type PaymentRepository } from "../../domain/payment";
import { type ApiPayment } from "./dtos/ApiPayment";
import { PaymentMapper } from "./mappers/PaymentMapper";

export class PaymentRepositoryImpl implements PaymentRepository {
  private store: ApiPayment[] = [];

  async findAll(): Promise<Payment[]> {
    return this.store.map(PaymentMapper.toDomain);
  }

  async save(payment: Payment): Promise<void> {
    this.store.push(PaymentMapper.toDto(payment));
  }
}
