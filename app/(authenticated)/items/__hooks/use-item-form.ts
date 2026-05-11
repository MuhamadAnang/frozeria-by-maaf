"use client";

import {
  CreateOrUpdateItemSchema,
  TCreateOrUpdateItem,
} from "@/schemas/item.schema";
import { useForm } from "@tanstack/react-form";
import type { z } from "zod";

type TCreateOrUpdateItemFormValues = z.input<typeof CreateOrUpdateItemSchema>;

interface Params {
  defaultValues: TCreateOrUpdateItemFormValues;
  onSubmit: (data: TCreateOrUpdateItem) => Promise<void>;
}

export const useItemForm = ({ defaultValues, onSubmit }: Params) => {
  return useForm({
    defaultValues,
    validators: {
      onChange: CreateOrUpdateItemSchema,
      onSubmit: CreateOrUpdateItemSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(CreateOrUpdateItemSchema.parse(value));
    },
  });
};
