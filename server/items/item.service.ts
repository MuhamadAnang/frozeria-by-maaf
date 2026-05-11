import {
  createItemRepository,
  deleteItemByIdRepository,
  getItemByIdRepository,
  getItemsCountRepository,
  getItemsWithPaginationRepository,
  updateItemByIdRepository,
} from "./item.repository";

import { paginationResponseMapper } from "@/lib/pagination";
import { NotFoundException } from "@/common/exception/not-found.exception";
import {
  TCreateOrUpdateItem,
  TIndexItemQuery,
} from "@/schemas/item.schema";
import { TFrozenFoodItem } from "@/types/database";

/* =========================
   CREATE
========================= */
export const createItemService = async (
  data: TCreateOrUpdateItem
) => {
  return createItemRepository(data);
};

/* =========================
   LIST
========================= */
export const getItemsWithPaginationService = async (
  queryParams: TIndexItemQuery
) => {
  const [entries, total] = await Promise.all([
    getItemsWithPaginationRepository(queryParams),
    getItemsCountRepository(queryParams),
  ]);

  return paginationResponseMapper<TFrozenFoodItem>(entries, {
    currentPage: queryParams.page,
    pageSize: queryParams.pageSize,
    totalItems: total,
  });
};

/* =========================
   DETAIL
========================= */
export const getItemByIdService = async (
  id: number
): Promise<TFrozenFoodItem> => {
  const result = await getItemByIdRepository(id);

  if (result.length === 0) {
    throw new NotFoundException(`Item with ID ${id} not found`);
  }

  return result[0];
};

/* =========================
   DELETE
========================= */
export const deleteItemService = async (id: number) => {
  return deleteItemByIdRepository(id);
};

/* =========================
   UPDATE
========================= */
export const updateItemService = async (
  id: number,
  data: TCreateOrUpdateItem
): Promise<TFrozenFoodItem> => {
  await getItemByIdService(id);

  const updated = await updateItemByIdRepository(id, data);
  return updated[0];
};