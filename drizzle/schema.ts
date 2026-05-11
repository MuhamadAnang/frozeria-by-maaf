import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  timestamp,
  varchar,
  integer,
  text,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/* =========================
   FROZEN FOOD CATEGORIES
========================= */

export const frozenFoodCategoryTable = pgTable(
  "frozen_food_categories",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    // Unique constraint on category name (case-insensitive)
    uniqueNameIdx: uniqueIndex("unique_category_name_idx").on(
      sql`LOWER(${table.name})`
    ),
    // Index for soft delete queries
    deletedAtIdx: index("category_deleted_at_idx").on(table.deletedAt),
  })
);

/* =========================
   FROZEN FOOD ITEMS
========================= */

export const frozenFoodItemTable = pgTable(
  "frozen_food_items",
  {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => frozenFoodCategoryTable.id, {
        onDelete: "restrict", // Prevent deletion of category with items
      }),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    stockQuantity: integer("stock_quantity").notNull().default(0),
    satuan: varchar("satuan", { length: 50 }).notNull().default("unit"),
    stockMinimum: integer("stock_minimum").notNull().default(0),
    hargaBeli: integer("harga_beli").notNull().default(0),
    hargaJual: integer("harga_jual").notNull().default(0),
    berat: integer("berat").notNull().default(0),
    lokasi: varchar("lokasi", { length: 255 }),
    photoUrl: varchar("photo_url", { length: 500 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    // Foreign key index for JOIN performance
    categoryIdIdx: index("item_category_id_idx").on(table.categoryId),
    // Composite unique constraint: name must be unique within category
    uniqueNamePerCategoryIdx: uniqueIndex("unique_item_name_per_category_idx").on(
      table.categoryId,
      sql`LOWER(${table.name})`
    ),
    // Index for soft delete queries
    deletedAtIdx: index("item_deleted_at_idx").on(table.deletedAt),
  })
);
