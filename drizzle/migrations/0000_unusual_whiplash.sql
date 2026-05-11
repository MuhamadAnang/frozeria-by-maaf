CREATE TABLE "frozen_food_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "frozen_food_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"stock_quantity" integer DEFAULT 0 NOT NULL,
	"photo_url" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "frozen_food_items" ADD CONSTRAINT "frozen_food_items_category_id_frozen_food_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."frozen_food_categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_category_name_idx" ON "frozen_food_categories" USING btree (LOWER("name"));--> statement-breakpoint
CREATE INDEX "category_deleted_at_idx" ON "frozen_food_categories" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "item_category_id_idx" ON "frozen_food_items" USING btree ("category_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_item_name_per_category_idx" ON "frozen_food_items" USING btree ("category_id",LOWER("name"));--> statement-breakpoint
CREATE INDEX "item_deleted_at_idx" ON "frozen_food_items" USING btree ("deleted_at");