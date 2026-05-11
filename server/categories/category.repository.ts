import { frozenFoodCategoryTable, frozenFoodItemTable } from "@/drizzle/schema";
import { db } from "@/lib/db";
import {
  buildCountQuery,
  TColumnsDefinition,
} from "@/lib/query-builder";
import { TIndexCategoryQuery } from "@/schemas/category.schema";
import {
  TNewFrozenFoodCategory,
  TUpdateFrozenFoodCategory,
} from "@/types/database";
import { eq, isNull, sql } from "drizzle-orm";

/* =========================
   CREATE
========================= */
export const createCategoryRepository = async (
  data: TNewFrozenFoodCategory
) => {
  return await db.insert(frozenFoodCategoryTable).values(data).returning();
};

/* =========================
   QUERY CONFIG
========================= */
const CATEGORY_COLUMNS: TColumnsDefinition<typeof frozenFoodCategoryTable> = {
  name: { searchable: true, sortable: true },
};

/* =========================
   LIST
========================= */
export const getCategoriesWithPaginationRepository = async (
  queryParams: TIndexCategoryQuery,
) => {
  const data = await db
    .select({
      id: frozenFoodCategoryTable.id,
      name: frozenFoodCategoryTable.name,
      description: frozenFoodCategoryTable.description,
      createdAt: frozenFoodCategoryTable.createdAt,
      updatedAt: frozenFoodCategoryTable.updatedAt,

      totalItems: sql<number>`COUNT(${frozenFoodItemTable.id})`,
    })
    .from(frozenFoodCategoryTable)

    .leftJoin(
      frozenFoodItemTable,
      eq(frozenFoodCategoryTable.id, frozenFoodItemTable.categoryId),
    )

    .where(isNull(frozenFoodCategoryTable.deletedAt))

    .groupBy(frozenFoodCategoryTable.id)

    .limit(queryParams.pageSize)
    .offset((queryParams.page - 1) * queryParams.pageSize);

  return data;
};

export const getCategoriesCountRepository = async (
  queryParams: TIndexCategoryQuery
) => {
  return buildCountQuery({
    table: frozenFoodCategoryTable,
    columns: CATEGORY_COLUMNS,
    queryParams,
  });
};

/* =========================
   DETAIL
========================= */
export const getCategoryByIdRepository = async (id: number) => {
  return db
    .select()
    .from(frozenFoodCategoryTable)
    .where(eq(frozenFoodCategoryTable.id, id));
};

/* =========================
   DELETE
========================= */
export const deleteCategoryByIdRepository = async (id: number) => {
  return db
    .delete(frozenFoodCategoryTable)
    .where(eq(frozenFoodCategoryTable.id, id))
    .returning();
};

/* =========================
   UPDATE
========================= */
export const updateCategoryByIdRepository = async (
  id: number,
  data: TUpdateFrozenFoodCategory
) => {
  return db
    .update(frozenFoodCategoryTable)
    .set(data)
    .where(eq(frozenFoodCategoryTable.id, id))
    .returning();
};