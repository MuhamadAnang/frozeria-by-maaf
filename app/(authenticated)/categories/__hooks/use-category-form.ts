"use client";

import {
  CreateOrUpdateCategorySchema,
  TCreateOrUpdateCategory,
} from "@/schemas/category.schema";
import { useForm } from "@tanstack/react-form";

interface Params {
  defaultValues: TCreateOrUpdateCategory;
  onSubmit: (data: TCreateOrUpdateCategory) => Promise<void>;
}

export const useCategoryForm = ({ defaultValues, onSubmit }: Params) => {
  return useForm({
    defaultValues,
    validators: {
      onChange: CreateOrUpdateCategorySchema,
      onSubmit: CreateOrUpdateCategorySchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });
};