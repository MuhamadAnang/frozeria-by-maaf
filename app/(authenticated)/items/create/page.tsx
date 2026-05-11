"use client";

import Page from "@/app/_components/page";

import { useItemForm } from "../__hooks/use-item-form";

import { useCreateItemMutation } from "./__hooks/use-create-item.mutation";
import { useGetCategoriesQuery } from "../../categories/__hooks/use-get-category.query";
import { CreateOrUpdateItemForm } from "../__components/create-or-update.form";

export default function CreateItemPage() {
  const { mutateAsync, isPending } = useCreateItemMutation();

  /**
   * Fetch categories
   */
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery({
      page: 1,
      pageSize: 200,
    });

  const categories =
    categoriesData?.data.map((category) => ({
      id: category.id,
      name: category.name,
    })) || [];

  const form = useItemForm({
    defaultValues: {
      name: "",
      categoryId: 0,
      stockQuantity: 0,
      stockMinimum: 0,
      hargaBeli: 0,
      hargaJual: 0,
      berat: 0,
      lokasi: "",
      description: "",
      photoUrl: "",
    },

    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  return (
    <Page
      isLoading={isLoadingCategories}
      className="max-w-3xl mx-auto mt-3"
      title="Tambah Barang"
      description="Isi form berikut untuk menambahkan barang baru."
    >
      <CreateOrUpdateItemForm
        form={form}
        isPending={isPending}
        categories={categories}
      />
    </Page>
  );
}