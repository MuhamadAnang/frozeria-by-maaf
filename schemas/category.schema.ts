import z from "zod";
import { createSortSchema } from "@/lib/validation";
import { IndexQueryParams } from "@/types/query-params";


export const CreateOrUpdateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Nama kategori harus diisi")
    .max(100, "Nama kategori maksimal 100 karakter"),

  description: z
    .string()
    .trim()
    .max(500, "Deskripsi maksimal 500 karakter")
    .optional()
    .or(z.literal("")), 
});

export type TCreateOrUpdateCategory = z.infer<typeof CreateOrUpdateCategorySchema>;

export const IndexCategoryQuerySchema = IndexQueryParams.extend({
  sort: createSortSchema(["name", "createdAt"]).optional(),
  search: z.string().trim().optional(),
});

export type TIndexCategoryQuery = z.infer<typeof IndexCategoryQuerySchema>;