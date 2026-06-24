import { Payment, PaymentId, type PaymentRepository } from "../../domain";
// Cross-feature reference: the payment feature reaches into the order feature's domain. Feature-first organizes code, but by itself does NOT enforce a boundary between features.
import { OrderId, Money } from "../../../order/domain";

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
