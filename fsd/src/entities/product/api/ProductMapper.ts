import { Product } from "../model/Product";
import { ProductId } from "../model/ProductId";
import { Price } from "../model/Price";
import { CategoryId } from "@/entities/category/@x/product";
import { type ApiProduct } from "./ApiProduct";

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
