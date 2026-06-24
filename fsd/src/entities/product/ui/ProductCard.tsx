import { type Product } from "../model/Product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <li>
      {product.name} — {product.price.format()}
    </li>
  );
}
