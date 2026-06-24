import { Category } from "../model/Category";
import { CategoryId } from "../model/CategoryId";
import { type ApiCategory } from "./ApiCategory";

export const CategoryMapper = {
  toDomain(dto: ApiCategory): Category {
    return new Category(CategoryId.create(dto.id), dto.name);
  },
  toDto(category: Category): ApiCategory {
    return { id: category.id.value, name: category.name };
  },
};
