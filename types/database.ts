import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import {
  frozenFoodCategoryTable,
  frozenFoodItemTable,
} from "@/drizzle/schema";

// ==================== FROZEN FOOD CATEGORY TYPES ====================

export type TFrozenFoodCategory = InferSelectModel<typeof frozenFoodCategoryTable>;
export type TNewFrozenFoodCategory = InferInsertModel<typeof frozenFoodCategoryTable>;
export type TUpdateFrozenFoodCategory = Omit<TNewFrozenFoodCategory, "createdAt" | "updatedAt">;
export type TFrozenFoodCategoryWithTotalItems = {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  totalItems: number;
};
// ==================== FROZEN FOOD ITEM TYPES ====================
export type TFrozenFoodItem = InferSelectModel<typeof frozenFoodItemTable>;
export type TNewFrozenFoodItem = InferInsertModel<typeof frozenFoodItemTable>;
export type TUpdateFrozenFoodItem = Omit<TNewFrozenFoodItem, "createdAt" | "updatedAt">;
