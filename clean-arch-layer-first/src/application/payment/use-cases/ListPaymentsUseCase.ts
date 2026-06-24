import { type Payment, type PaymentRepository } from "../../../domain/payment";

export class ListPaymentsUseCase {
  constructor(private readonly payments: PaymentRepository) {}

  execute(): Promise<Payment[]> {
    return this.payments.findAll();
  }
}
