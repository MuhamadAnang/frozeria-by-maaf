"use client";

import Page from "@/app/_components/page";
import DataTable from "@/app/_components/data-table";

import { Button } from "@/app/_components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { Eye, Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";

import { useEffect } from "react";

import { useBreadcrumb } from "@/app/_contexts/breadcrumb.context";
import { useFilters } from "@/app/_hooks/use-filters";

import { IndexCategoryQuerySchema } from "@/schemas/category.schema";

import { TFrozenFoodCategoryWithTotalItems } from "@/types/database";

import { TSortOption } from "@/app/_components/data-table/sort";

import { useGetCategoriesQuery } from "./__hooks/use-get-category.query";
import { useDeleteCategoryMutation } from "./__hooks/use-delete-category.mutation";

export default function CategoriesPage() {
  const { setBreadcrumbs } = useBreadcrumb();

  const { handleChange, pagination, filters, search } =
    useFilters(IndexCategoryQuerySchema);

  const { data, isLoading } = useGetCategoriesQuery({
    ...pagination,
    search,
    sort: filters.sort,
  });

  const { mutateAsync, isPending } = useDeleteCategoryMutation();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Kategori",
      },
    ]);
  }, [setBreadcrumbs]);

  const columns: ColumnDef<TFrozenFoodCategoryWithTotalItems>[] = [
    {
      accessorKey: "name",
      header: "Nama Kategori",
    },

    {
      accessorKey: "description",
      header: "Deskripsi",
      cell: ({ row }) => {
        return row.original.description || "-";
      },
    },

    /**
     * NOTE:
     * Ini hanya contoh tampilan.
     * Propernya jumlah item harus dari backend aggregate/join.
     */
    {
      accessorKey: "totalItems",
      header: "Jumlah Barang",
      cell: ({ row }) => {
        return row.original.totalItems;
      },
    },

    {
      accessorKey: "actions",
      header: "Aksi",

      cell: ({ row }) => {
        const category = row.original;
        const id = category.id;

        return (
          <div className="flex gap-2">
            <Link href={`/categories/${id}`}>
              <Button variant="outline" disabled={isPending}>
                <Eye className="text-blue-500" />
              </Button>
            </Link>

            <Link href={`/categories/${id}/update`}>
              <Button variant="outline" disabled={isPending}>
                <Pencil className="text-orange-500" />
              </Button>
            </Link>

            <Button
              variant="outline"
              className="text-destructive"
              isLoading={isPending}
              onClick={async () => {
                await mutateAsync(id);
              }}
            >
              <Trash />
            </Button>
          </div>
        );
      },
    },
  ];

  const sortOptions: TSortOption[] = [
    {
      key: "name",
      label: "Nama Kategori",
      options: [
        {
          direction: "asc",
          label: "A-Z",
        },
        {
          direction: "desc",
          label: "Z-A",
        },
      ],
    },
  ];

  return (
    <Page
      title="Kategori"
      description="Kelola kategori frozen food."
      headerAction={
        <Link href="/categories/create">
          <Button>
            <Plus /> Tambah Kategori
          </Button>
        </Link>
      }
    >
      <DataTable
        columns={columns}
        source={data}
        handleChange={handleChange}
        search={search}
        isLoading={isLoading}
        pagination={pagination}
        sortOptions={sortOptions}
        isSearchable
        sortDefaultValue={filters.sort}
        placeholderSearch="Cari kategori..."
      />
    </Page>
  );
}