import { Category, CategoryId } from "../../domain";
import { type ApiCategory } from "../dtos/ApiCategory";

export const CategoryMapper = {
  toDomain(dto: ApiCategory): Category {
    return new Category(CategoryId.create(dto.id), dto.name);
  },
  toDto(category: Category): ApiCategory {
    return { id: category.id.value, name: category.name };
  },
};
