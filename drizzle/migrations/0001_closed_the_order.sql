ALTER TABLE "frozen_food_items" ADD COLUMN "satuan" varchar(50) DEFAULT 'unit' NOT NULL;--> statement-breakpoint
ALTER TABLE "frozen_food_items" ADD COLUMN "stock_minimum" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "frozen_food_items" ADD COLUMN "harga_beli" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "frozen_food_items" ADD COLUMN "harga_jual" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "frozen_food_items" ADD COLUMN "berat" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "frozen_food_items" ADD COLUMN "lokasi" varchar(255);