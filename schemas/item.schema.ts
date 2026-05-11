import z from "zod";
import { createSortSchema } from "@/lib/validation";
import { IndexQueryParams } from "@/types/query-params";

export const CreateOrUpdateItemSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Nama barang harus diisi")
    .max(255, "Nama maksimal 255 karakter"),

  categoryId: z
    .number({
      required_error: "Kategori harus dipilih",
      invalid_type_error: "Kategori tidak valid",
    })
    .int()
    .positive("Kategori tidak valid"),

  stockQuantity: z
    .number({
      required_error: "Stok harus diisi",
    })
    .int("Stok harus bilangan bulat")
    .min(0, "Stok tidak boleh negatif"),

  stockMinimum: z
    .number()
    .int("Stok minimum harus bilangan bulat")
    .min(0, "Stok minimum tidak boleh negatif")
    .default(0),

  hargaBeli: z
    .number()
    .int("Harga beli harus angka")
    .min(0, "Harga beli tidak boleh negatif")
    .default(0),

  hargaJual: z
    .number()
    .int("Harga jual harus angka")
    .min(0, "Harga jual tidak boleh negatif")
    .default(0),

  satuan: z
    .string()
    .trim()
    .max(50, "Satuan maksimal 50 karakter")
    .default("unit"),

  berat: z
    .number()
    .int("Berat harus angka")
    .min(0, "Berat tidak boleh negatif")
    .default(0),

  lokasi: z
    .string()
    .trim()
    .max(255, "Lokasi maksimal 255 karakter")
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .trim()
    .max(1000, "Deskripsi maksimal 1000 karakter")
    .optional()
    .or(z.literal("")),

  photoUrl: z
    .string()
    .max(500, "URL foto maksimal 500 karakter")
    .optional()
    .nullable(),
});


export const IndexItemQuerySchema = IndexQueryParams.extend({
  sort: createSortSchema(["name", "stockQuantity", "createdAt"]).optional(),
  search: z.string().trim().optional(),
  categoryId: z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    z.coerce.number().optional()
  ),
});

export type TCreateOrUpdateItem = z.infer<typeof CreateOrUpdateItemSchema>;
export type TIndexItemQuery = z.infer<typeof IndexItemQuerySchema>;
