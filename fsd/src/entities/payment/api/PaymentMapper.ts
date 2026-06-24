import { Payment } from "../model/Payment";
import { PaymentId } from "../model/PaymentId";
import { OrderId, Money } from "@/entities/order/@x/payment";
import { type ApiPayment } from "./ApiPayment";

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
