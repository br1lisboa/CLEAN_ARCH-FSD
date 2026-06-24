import { Payment, PaymentId } from "../../domain";
// Cross-feature reference: the payment feature reaches into the order feature's domain. Feature-first organizes code, but by itself does NOT enforce a boundary between features.
import { OrderId, Money } from "../../../order/domain";
import { type ApiPayment } from "../dtos/ApiPayment";

export const PaymentMapper = {
  toDomain(dto: ApiPayment): Payment {
    return new Payment(
      PaymentId.create(dto.id),
      OrderId.create(dto.order_id),
      Money.create(dto.amount_cents, dto.currency),
    );
  },
  toDto(payment: Payment): ApiPayment {
    return {
      id: payment.id.value,
      order_id: payment.orderId.value,
      amount_cents: payment.amount.cents,
      currency: payment.amount.currency,
    };
  },
};
