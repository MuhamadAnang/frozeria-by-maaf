ALTER TABLE "frozen_food_items" DROP CONSTRAINT IF EXISTS "frozen_food_items_category_id_frozen_food_categories_id_fk";--> statement-breakpoint
ALTER TABLE "frozen_food_items" ALTER COLUMN "category_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "frozen_food_items" ADD CONSTRAINT "frozen_food_items_category_id_frozen_food_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."frozen_food_categories"("id") ON DELETE set null ON UPDATE no action;
