import { Product, ProductId, Price } from "../../domain";
// Cross-feature reference: the product feature reaches into the category feature's domain. Feature-first organizes code, but by itself does NOT enforce a boundary between features.
import { CategoryId } from "../../../category/domain";
import { type ApiProduct } from "../dtos/ApiProduct";

export const ProductMapper = {
  toDomain(dto: ApiProduct): Product {
    return new Product(
      ProductId.create(dto.id),
      dto.name,
      CategoryId.create(dto.category_id),
      Price.create(dto.price_cents, dto.currency),
    );
  },
  toDto(product: Product): ApiProduct {
    return {
      id: product.id.value,
      name: product.name,
      category_id: product.categoryId.value,
      price_cents: product.price.cents,
      currency: product.price.currency,
    };
  },
};
