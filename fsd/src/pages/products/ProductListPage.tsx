import { useEffect, useState } from "react";
// The page composes BOTH entities + the feature, each through its public API.
import { type Product, ProductRepositoryImpl, ProductCard } from "@/entities/product"; // entity
import { CategoryRepositoryImpl } from "@/entities/category"; //                          entity
import { CreateProductUseCase, ProductForm } from "@/features/create-product"; //         feature
import { Button } from "@/shared/ui/Button"; //                                          shared

const productRepo = new ProductRepositoryImpl();
const categoryRepo = new CategoryRepositoryImpl();
const createProduct = new CreateProductUseCase(productRepo);

export function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  async function refresh() {
    setProducts(await productRepo.findAll());
    const cats = await categoryRepo.findAll();
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
      <Button onClick={() => void refresh()}>Refresh</Button>
      <ul>
        {products.map((p) => (
          <ProductCard key={p.id.value} product={p} />
        ))}
      </ul>
    </section>
  );
}
