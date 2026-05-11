"use client";

import Page from "@/app/_components/page";
import { useParams } from "next/navigation";
import { useGetCategory } from "../__hooks/use-get-category.query";
import { useCategoryForm } from "../../__hooks/use-category-form";
import { useUpdateCategoryMutation } from "./__hooks/use-update-category.mutation";
import { TCreateOrUpdateCategory } from "@/schemas/category.schema";
import { CreateOrUpdateCategoryForm } from "../../__components/create-or-update.form";

function UpdateCategoryForm({
  defaultValues,
  id,
}: {
  defaultValues: TCreateOrUpdateCategory;
  id: number;
}) {
  const { mutateAsync, isPending } = useUpdateCategoryMutation(id);

  const form = useCategoryForm({
    defaultValues,
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  return <CreateOrUpdateCategoryForm form={form} isPending={isPending} />;
}

export default function UpdateCategoryPage() {
  const params = useParams();
  const { data, isLoading } = useGetCategory(Number(params.id));

  return (
    <Page
      className="max-w-xl mx-auto"
      isLoading={isLoading}
      title="Update Kategori"
      description="Perbarui informasi kategori"
    >
      {data?.data && (
        <UpdateCategoryForm
          key={data.data.id}
          id={Number(params.id)}
          defaultValues={{
            name: data.data.name,
            description: data.data.description || "",
          }}
        />
      )}
    </Page>
  );
}