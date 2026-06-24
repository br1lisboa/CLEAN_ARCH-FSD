import { useEffect, useState } from "react";
// Showing the product screen touches category AND product slices across every layer.
import { type Product } from "../../../domain/product"; //          domain (product)
import { ListProductsUseCase } from "../../../application/product/use-cases/ListProductsUseCase"; //  application (product)
import { CreateProductUseCase } from "../../../application/product/use-cases/CreateProductUseCase"; // application (product)
import { ListCategoriesUseCase } from "../../../application/category/use-cases/ListCategoriesUseCase"; //     application (category)
import { ProductRepositoryImpl } from "../../../infrastructure/product/ProductRepositoryImpl"; //     infrastructure (product)
import { CategoryRepositoryImpl } from "../../../infrastructure/category/CategoryRepositoryImpl"; //        infrastructure (category)
import { ProductForm } from "../components/ProductForm"; //          presentation (local)

const productRepo = new ProductRepositoryImpl();
const categoryRepo = new CategoryRepositoryImpl();
const listProducts = new ListProductsUseCase(productRepo);
const createProduct = new CreateProductUseCase(productRepo);
const listCategories = new ListCategoriesUseCase(categoryRepo);

export function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  async function refresh() {
    setProducts(await listProducts.execute());
    const cats = await listCategories.execute();
    setCategories(cats.map((c) => ({ id: c.id.value, name: c.name })));
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <section>
      <h1>Products</h1>
      <ProductForm
        categories={categories}
        onSubmit={async (input) => {
          await createProduct.execute(input);
          await refresh();
        }}
      />
      <ul>
        {products.map((p) => (
          <li key={p.id.value}>
            {p.name} — {p.price.format()}
          </li>
        ))}
      </ul>
    </section>
  );
}
