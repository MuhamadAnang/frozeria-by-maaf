import {
  createCategoryRepository,
  deleteCategoryByIdRepository,
  getCategoryByIdRepository,
  getCategoriesCountRepository,
  getCategoriesWithPaginationRepository,
  updateCategoryByIdRepository,
} from "./category.repository";

import { paginationResponseMapper } from "@/lib/pagination";
import { NotFoundException } from "@/common/exception/not-found.exception";
import {
  TCreateOrUpdateCategory,
  TIndexCategoryQuery,
} from "@/schemas/category.schema";
import { TFrozenFoodCategory, TFrozenFoodCategoryWithTotalItems } from "@/types/database";

/* =========================
   CREATE
========================= */
export const createCategoryService = async (
  data: TCreateOrUpdateCategory
) => {
  return await createCategoryRepository(data);
};

/* =========================
   LIST
========================= */
export const getCategoriesWithPaginationService = async (
  queryParams: TIndexCategoryQuery
) => {
  const [entries, total] = await Promise.all([
    getCategoriesWithPaginationRepository(queryParams),
    getCategoriesCountRepository(queryParams),
  ]);

  return paginationResponseMapper<TFrozenFoodCategoryWithTotalItems>(entries, {
    currentPage: queryParams.page,
    pageSize: queryParams.pageSize,
    totalItems: total,
  });
};

/* =========================
   DETAIL
========================= */
export const getCategoryByIdService = async (
  id: number
): Promise<TFrozenFoodCategory> => {
  const result = await getCategoryByIdRepository(id);

  if (result.length === 0) {
    throw new NotFoundException(`Category with ID ${id} not found`);
  }

  return result[0];
};

/* =========================
   DELETE
========================= */
export const deleteCategoryService = async (id: number) => {
  return deleteCategoryByIdRepository(id);
};

/* =========================
   UPDATE
========================= */
export const updateCategoryService = async (
  id: number,
  data: TCreateOrUpdateCategory
): Promise<TFrozenFoodCategory> => {
  await getCategoryByIdService(id);

  const updated = await updateCategoryByIdRepository(id, data);
  return updated[0];
};