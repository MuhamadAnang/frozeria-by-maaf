"use client";

import Page from "@/app/_components/page";
import { useParams } from "next/navigation";
import { useGetItem } from "../__hooks/use-get-item.query";
import { useItemForm } from "../../__hooks/use-item-form";
import { useUpdateItemMutation } from "./__hooks/use-update-item.mutation";
import { TCreateOrUpdateItem } from "@/schemas/item.schema";
import { CreateOrUpdateItemForm } from "../../__components/create-or-update.form";
import { useGetCategoriesQuery } from "../../../categories/__hooks/use-get-category.query";

function UpdateItemForm({
  defaultValues,
  id,
  categories,
}: {
  defaultValues: TCreateOrUpdateItem;
  id: number;
  categories: { id: number; name: string }[];
}) {
  const { mutateAsync, isPending } = useUpdateItemMutation(id);

  const form = useItemForm({
    defaultValues,
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  return (
    <CreateOrUpdateItemForm
      form={form}
      isPending={isPending}
      categories={categories}
    />
  );
}

export default function UpdateItemPage() {
  const params = useParams();
  const { data, isLoading: isLoadingItem } = useGetItem(Number(params.id));
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

  return (
    <Page
      isLoading={isLoadingItem || isLoadingCategories}
      title="Update Barang"
    >
      {data?.data && (
        <UpdateItemForm
          key={data.data.id}
          id={Number(params.id)}
          categories={categories}
          defaultValues={{
            name: data.data.name,
            categoryId: data.data.categoryId,
            stockQuantity: data.data.stockQuantity,
            stockMinimum: data.data.stockMinimum,
            hargaBeli: data.data.hargaBeli,
            hargaJual: data.data.hargaJual,
            berat: data.data.berat,
            lokasi: data.data.lokasi ?? undefined,
            description: data.data.description || "",
            photoUrl: data.data.photoUrl ?? undefined,
          }}
        />
      )}
    </Page>
  );
}
