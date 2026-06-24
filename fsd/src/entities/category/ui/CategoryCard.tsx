import { type Category } from "../model/Category";

interface CategoryCardProps {
  category: Category;
}

// Entity-level UI: how a Category renders, owned by the category slice and
// reused by any feature/page that shows a category.
export function CategoryCard({ category }: CategoryCardProps) {
  return <li>{category.name}</li>;
}
