"use client";

import Page from "@/app/_components/page";
import DataTable from "@/app/_components/data-table";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useBreadcrumb } from "@/app/_contexts/breadcrumb.context";
import { useFilters } from "@/app/_hooks/use-filters";
import { IndexItemQuerySchema } from "@/schemas/item.schema";
import { TFrozenFoodItem } from "@/types/database";
import { TSortOption } from "@/app/_components/data-table/sort";
import { useDeleteItemMutation } from "./__hooks/use-delete-item.mutation";
import { useGetItemsQuery } from "./__hooks/use-get-item.query";

export default function ItemsPage() {
  const { setBreadcrumbs } = useBreadcrumb();

  const { handleChange, pagination, filters, search } =
    useFilters(IndexItemQuerySchema);

  const { data, isLoading } = useGetItemsQuery({
    ...pagination,
    search,
    sort: filters.sort,
    categoryId: filters.categoryId,
  });

  const { mutateAsync, isPending } = useDeleteItemMutation();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Barang",
      },
    ]);
  }, [setBreadcrumbs]);

  const columns: ColumnDef<TFrozenFoodItem>[] = [
    {
      accessorKey: "name",
      header: "Nama Barang",
    },

    /**
     * HARUSNYA category name
     * bukan categoryId
     */
    {
      accessorKey: "categoryId",
      header: "Kategori",
      cell: ({ row }) => {
        return (
          <Badge>
            ID: {row.original.categoryId}
          </Badge>
        );
      },
    },

    {
      accessorKey: "stockQuantity",
      header: "Stok",
    },

    {
      accessorKey: "hargaJual",
      header: "Harga Jual",
      cell: ({ row }) => {
        return `Rp ${row.original.hargaJual.toLocaleString("id-ID")}`;
      },
    },

    {
      accessorKey: "actions",
      header: "Aksi",

      cell: ({ row }) => {
        const item = row.original;
        const id = item.id;

        return (
          <div className="flex gap-2">
            <Link href={`/items/${id}`}>
              <Button variant="outline" disabled={isPending}>
                <Eye className="text-blue-500" />
              </Button>
            </Link>

            <Link href={`/items/${id}/update`}>
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
      label: "Nama Barang",
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

    {
      key: "stockQuantity",
      label: "Stok",
      options: [
        {
          direction: "asc",
          label: "Terkecil",
        },
        {
          direction: "desc",
          label: "Terbesar",
        },
      ],
    },
  ];

  return (
    <Page
      title="Barang Frozen Food"
      description="Kelola seluruh data barang frozen food."
      headerAction={
        <Link href="/items/create">
          <Button>
            <Plus /> Tambah Barang
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
        placeholderSearch="Cari barang..."
      />
    </Page>
  );
}