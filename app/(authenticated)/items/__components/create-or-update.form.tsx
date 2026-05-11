// CreateOrUpdateItemForm.tsx - Update dengan semua field
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
import { useItemForm } from "../__hooks/use-item-form";
import { ImageUpload } from "@/app/_components/ui/image-upload";

interface Props {
  form: ReturnType<typeof useItemForm>;
  isPending?: boolean;
  categories: { id: number; name: string }[];
}

export const CreateOrUpdateItemForm = ({
  form,
  isPending,
  categories,
}: Props) => {
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
                <FieldLabel>Nama Barang *</FieldLabel>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Ayam Fillet 1kg"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* CATEGORY */}
        <form.Field
          name="categoryId"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel>Kategori *</FieldLabel>
                <select
                  className="w-full border rounded-md px-3 py-2 bg-background"
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* SATUAN */}
        <form.Field
          name="satuan"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel>Satuan *</FieldLabel>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="kg, pcs, unit, pack"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* STOCK QUANTITY */}
        <form.Field
          name="stockQuantity"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel>Stok</FieldLabel>
                <Input
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(Number(e.target.value))
                  }
                  aria-invalid={isInvalid}
                  min={0}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* STOCK MINIMUM */}
        <form.Field
          name="stockMinimum"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel>Stok Minimum</FieldLabel>
                <Input
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(Number(e.target.value))
                  }
                  aria-invalid={isInvalid}
                  min={0}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* HARGA BELI */}
        <form.Field
          name="hargaBeli"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel>Harga Beli (Rp)</FieldLabel>
                <Input
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(Number(e.target.value))
                  }
                  aria-invalid={isInvalid}
                  min={0}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* HARGA JUAL */}
        <form.Field
          name="hargaJual"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel>Harga Jual (Rp)</FieldLabel>
                <Input
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(Number(e.target.value))
                  }
                  aria-invalid={isInvalid}
                  min={0}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* BERAT */}
        <form.Field
          name="berat"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel>Berat (gram)</FieldLabel>
                <Input
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(Number(e.target.value))
                  }
                  aria-invalid={isInvalid}
                  min={0}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        {/* LOKASI */}
        <form.Field
          name="lokasi"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            return (
              <Field>
                <FieldLabel>Lokasi Penyimpanan</FieldLabel>
                <Input
                  value={field.state.value || ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Rak A1, Freezer 2"
                />
              </Field>
            );
          }}
        />

        {/* PHOTO UPLOAD - NEW! */}
        <form.Field
          name="photoUrl"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel>Foto Barang</FieldLabel>
                <ImageUpload
                  value={field.state.value || undefined}
                  onChange={(url) => field.handleChange(url || "")}
                  onBlur={field.handleBlur}
                  disabled={isPending}
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
            return (
              <Field>
                <FieldLabel>Deskripsi</FieldLabel>
                <Textarea
                  value={field.state.value || ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Deskripsi lengkap barang"
                  rows={4}
                />
              </Field>
            );
          }}
        />

        <Button type="submit" isLoading={isPending || form.state.isSubmitting}>
          Simpan Barang
        </Button>
      </FieldGroup>
    </form>
  );
};