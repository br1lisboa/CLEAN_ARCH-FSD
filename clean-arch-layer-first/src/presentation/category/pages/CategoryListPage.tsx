import { useEffect, useState } from "react";
// To wire ONE screen, the page must reach into FOUR separate top-level layers:
import { type Category } from "../../../domain/category"; //            domain
import { ListCategoriesUseCase } from "../../../application/category/use-cases/ListCategoriesUseCase"; //   application
import { CreateCategoryUseCase } from "../../../application/category/use-cases/CreateCategoryUseCase"; // application
import { CategoryRepositoryImpl } from "../../../infrastructure/category/CategoryRepositoryImpl"; //      infrastructure
import { CategoryForm } from "../components/CategoryForm"; //            presentation (local)

// advanced-init-once: build the dependency graph once per module load.
const repo = new CategoryRepositoryImpl();
const listCategories = new ListCategoriesUseCase(repo);
const createCategory = new CreateCategoryUseCase(repo);

export function CategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  async function refresh() {
    setCategories(await listCategories.execute());
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
      <ul>
        {categories.map((c) => (
          <li key={c.id.value}>{c.name}</li>
        ))}
      </ul>
    </section>
  );
}
