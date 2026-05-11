import { frozenFoodItemTable } from "@/drizzle/schema";
import { db } from "@/lib/db";
import {
  buildPaginatedQuery,
  buildCountQuery,
  TColumnsDefinition,
} from "@/lib/query-builder";
import { TIndexItemQuery } from "@/schemas/item.schema";
import {
  TNewFrozenFoodItem,
  TUpdateFrozenFoodItem,
} from "@/types/database";
import { eq } from "drizzle-orm";

/* =========================
   CREATE
========================= */
export const createItemRepository = async (
  data: TNewFrozenFoodItem
) => {
  return db.insert(frozenFoodItemTable).values(data).returning();
};

/* =========================
   CONFIG
========================= */
const ITEM_COLUMNS: TColumnsDefinition<typeof frozenFoodItemTable> = {
  name: { searchable: true, sortable: true },
  stockQuantity: { sortable: true },
  categoryId: { filterable: true },
};

/* =========================
   LIST
========================= */
export const getItemsWithPaginationRepository = async (
  queryParams: TIndexItemQuery
) => {
  return buildPaginatedQuery({
    table: frozenFoodItemTable,
    columns: ITEM_COLUMNS,
    queryParams,
  });
};

export const getItemsCountRepository = async (
  queryParams: TIndexItemQuery
) => {
  return buildCountQuery({
    table: frozenFoodItemTable,
    columns: ITEM_COLUMNS,
    queryParams,
  });
};

/* =========================
   DETAIL
========================= */
export const getItemByIdRepository = async (id: number) => {
  return db
    .select()
    .from(frozenFoodItemTable)
    .where(eq(frozenFoodItemTable.id, id));
};

/* =========================
   DELETE
========================= */
export const deleteItemByIdRepository = async (id: number) => {
  return db
    .delete(frozenFoodItemTable)
    .where(eq(frozenFoodItemTable.id, id))
    .returning();
};

/* =========================
   UPDATE
========================= */
export const updateItemByIdRepository = async (
  id: number,
  data: TUpdateFrozenFoodItem
) => {
  return db
    .update(frozenFoodItemTable)
    .set(data)
    .where(eq(frozenFoodItemTable.id, id))
    .returning();
};