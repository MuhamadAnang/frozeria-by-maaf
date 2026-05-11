"use client";

import Page from "@/app/_components/page";
import { useCategoryForm } from "../__hooks/use-category-form";
import { useCreateCategoryMutation } from "./__hooks/use-create-category.mutation";
import { CreateOrUpdateCategoryForm } from "../__components/create-or-update.form";

export default function CreateCategoryPage() {
  const { mutateAsync, isPending } = useCreateCategoryMutation();

  const form = useCategoryForm({
    defaultValues: {
      name: "",
      description: "",
    },

    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  return (
    <Page
      className="max-w-2xl mx-auto mt-3"
      title="Buat Kategori"
      description="Isi form berikut untuk membuat kategori baru."
    >
      <CreateOrUpdateCategoryForm
        form={form}
        isPending={isPending}
      />
    </Page>
  );
}