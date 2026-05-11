"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { useCategoryForm } from "../__hooks/use-category-form";

interface Props {
  form: ReturnType<typeof useCategoryForm>;
  isPending?: boolean;
}

export const CreateOrUpdateCategoryForm = ({ form, isPending }: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit(e);
      }}
    >
      <FieldGroup>
        {/* NAME */}
        <form.Field
          name="name"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel>Nama Kategori</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Frozen Chicken"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* DESCRIPTION */}
        <form.Field
          name="description"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel>Deskripsi</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value || ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Kategori untuk produk ayam beku"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <Button isLoading={isPending || form.state.isSubmitting}>
          Simpan Kategori
        </Button>
      </FieldGroup>
    </form>
  );
};