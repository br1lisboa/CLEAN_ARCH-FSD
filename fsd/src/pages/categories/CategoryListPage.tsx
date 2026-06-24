import { useEffect, useState } from "react";
import { type Category, CategoryRepositoryImpl, CategoryCard } from "@/entities/category"; // entity
import { CreateCategoryUseCase, CategoryForm } from "@/features/create-category"; //         feature
import { Button } from "@/shared/ui/Button"; //                                              shared

const categoryRepo = new CategoryRepositoryImpl();
const createCategory = new CreateCategoryUseCase(categoryRepo);

export function CategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  async function refresh() {
    setCategories(await categoryRepo.findAll());
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <section>
      <h1>Categories</h1>
      <CategoryForm
        onSubmit={async (input) => {
          await createCategory.execute(input);
          await refresh();
        }}
      />
      <Button onClick={() => void refresh()}>Refresh</Button>
      <ul>
        {categories.map((c) => (
          <CategoryCard key={c.id.value} category={c} />
        ))}
      </ul>
    </section>
  );
}
