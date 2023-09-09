import { prisma } from "../../utils/prisma/prismaClient";
import { CategoryError } from "./error/category.exceptions";
import { CategoryDTO } from "./categoryDTO";

export class CategoryService {
  static async addCategoryToDb(category: CategoryDTO) {
    const checkIfExits = await this.findCategory(category.name);
    if (!checkIfExits) {
      await prisma.category.create({ data: category });
      return;
    }
    throw new CategoryError({
      name: "CATEGORY_NOT_FOUND",
      message: "Category is already in database",
    });
  }
  static async deleteCategoryFromDb(categoryName: string) {
    const categoryToDelete = await this.findCategory(categoryName);

    if (categoryToDelete) {
      await prisma.category.delete({
        where: {
          name: categoryName,
        },
      });
      return;
    }
    throw new CategoryError({
      name: "CATEGORY_NOT_FOUND",
      message: "Category isn't in database",
    });
  }
  static async findCategory(categoryName: string) {
    return await prisma.category.findUnique({
      where: { name: categoryName },
    });
  }
}
