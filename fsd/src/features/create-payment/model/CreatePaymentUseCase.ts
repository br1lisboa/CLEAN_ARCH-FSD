// This feature composes TWO entities. Cross-domain work happens here, at the
// feature layer — entities themselves stay isolated from each other.
import { Payment, PaymentId, type PaymentRepository } from "@/entities/payment";
import { OrderId, Money } from "@/entities/order";

export interface CreatePaymentInput {
  id: string;
  orderId: string;
  amountCents: number;
}

export class CreatePaymentUseCase {
  constructor(private readonly payments: PaymentRepository) {}

  async execute(input: CreatePaymentInput): Promise<Payment> {
    const payment = new Payment(
      PaymentId.create(input.id),
      OrderId.create(input.orderId),
      Money.create(input.amountCents),
    );
    await this.payments.save(payment);
    return payment;
  }
}
