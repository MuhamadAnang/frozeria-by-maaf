import { db } from "@/lib/db";import { and, asc, eq, isNull, sql } from "drizzle-orm";
import {
  frozenFoodItemTable,
  frozenFoodCategoryTable,
} from "@/drizzle/schema";

export interface DashboardStats {
  totalItems: number;
  totalStock: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalCategories: number;
  inventoryValue: number;
}

export interface LowStockItem {
  id: number;
  name: string;
  stockQuantity: number;
  stockMinimum: number;
  satuan: string;
  categoryName: string | null;
}

export interface CategoryStockSummary {
  id: number;
  name: string;
  totalItems: number;
  totalStock: number;
}

export interface DashboardData {
  stats: DashboardStats;
  lowStock: LowStockItem[];
  categoryStock: CategoryStockSummary[];
}

export const getDashboardStatsService = async (): Promise<DashboardData> => {
  const LOW_STOCK_THRESHOLD = 10;
  
  const [statsResult] = await db
    .select({
      totalItems: sql<number>`count(${frozenFoodItemTable.id})`.mapWith(Number),
      totalStock: sql<number>`coalesce(sum(${frozenFoodItemTable.stockQuantity}), 0)`.mapWith(Number),
      lowStockItems: sql<number>`
        count(case 
          when ${frozenFoodItemTable.stockQuantity} > 0 
          and (
            ${frozenFoodItemTable.stockQuantity} <= ${LOW_STOCK_THRESHOLD} 
            or ${frozenFoodItemTable.stockQuantity} <= ${frozenFoodItemTable.stockMinimum}
          )
          then 1 
        end)
      `.mapWith(Number),
      outOfStockItems: sql<number>`
        count(case when ${frozenFoodItemTable.stockQuantity} <= 0 then 1 end)
      `.mapWith(Number),
      totalCategories: sql<number>`
        (select count(*) from ${frozenFoodCategoryTable} where ${frozenFoodCategoryTable.deletedAt} is null)
      `.mapWith(Number),
      inventoryValue: sql<number>`
        coalesce(sum(${frozenFoodItemTable.stockQuantity} * ${frozenFoodItemTable.hargaJual}), 0)
      `.mapWith(Number),
    })
    .from(frozenFoodItemTable)
    .where(isNull(frozenFoodItemTable.deletedAt));

  const lowStockItems = await db
    .select({
      id: frozenFoodItemTable.id,
      name: frozenFoodItemTable.name,
      stockQuantity: frozenFoodItemTable.stockQuantity,
      stockMinimum: frozenFoodItemTable.stockMinimum,
      satuan: frozenFoodItemTable.satuan,
      categoryName: frozenFoodCategoryTable.name,
    })
    .from(frozenFoodItemTable)
    .leftJoin(
      frozenFoodCategoryTable,
      eq(frozenFoodItemTable.categoryId, frozenFoodCategoryTable.id),
    )
    .where(
      and(
        isNull(frozenFoodItemTable.deletedAt),
        sql`${frozenFoodItemTable.stockQuantity} > 0`,
        sql`(
          ${frozenFoodItemTable.stockQuantity} <= ${LOW_STOCK_THRESHOLD} 
          OR ${frozenFoodItemTable.stockQuantity} <= ${frozenFoodItemTable.stockMinimum}
        )`,
      ),
    )
    .orderBy(asc(frozenFoodItemTable.stockQuantity))
    .limit(10);

  const categoryStock = await db
    .select({
      id: frozenFoodCategoryTable.id,
      name: frozenFoodCategoryTable.name,
      totalItems: sql<number>`count(${frozenFoodItemTable.id})`.mapWith(Number),
      totalStock:
        sql<number>`coalesce(sum(${frozenFoodItemTable.stockQuantity}), 0)`.mapWith(Number),
    })
    .from(frozenFoodCategoryTable)
    .leftJoin(
      frozenFoodItemTable,
      and(
        eq(frozenFoodCategoryTable.id, frozenFoodItemTable.categoryId),
        isNull(frozenFoodItemTable.deletedAt),
      ),
    )
    .where(isNull(frozenFoodCategoryTable.deletedAt))
    .groupBy(frozenFoodCategoryTable.id)
    .orderBy(asc(frozenFoodCategoryTable.name));

  return {
    stats: statsResult ?? {
      totalItems: 0,
      totalStock: 0,
      lowStockItems: 0,
      outOfStockItems: 0,
      totalCategories: 0,
      inventoryValue: 0,
    },
    lowStock: lowStockItems,
    categoryStock,
  };
};


