"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/_components/ui/table";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { TApiSuccessResponseWithPagination } from "@/types/response";
import {
  TFrozenFoodCategoryWithTotalItems,
  TFrozenFoodItem,
} from "@/types/database";

export const ItemsTable = () => {
  const client = useAuthenticatedClient();
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");

  const { data: itemsData, isLoading: itemsLoading } = useQuery({
    queryKey: ["items", search, categoryId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (categoryId) params.set("categoryId", categoryId);
      params.set("page", "1");
      params.set("pageSize", "10");

      const response = await client.get<TApiSuccessResponseWithPagination<TFrozenFoodItem>>(
        `/items?${params.toString()}`,
      );

      return response.data.data;
    },
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories", "dashboard-filter"],
    queryFn: async () => {
      const response = await client.get<
        TApiSuccessResponseWithPagination<TFrozenFoodCategoryWithTotalItems>
      >("/categories", {
        params: {
          page: 1,
          pageSize: 200,
        },
      });

      return response.data.data;
    },
  });
  const items = itemsData || [];
  const categories = categoriesData || [];
  const categoryNameById = new Map(
    categories.map((category) => [category.id, category.name]),
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Daftar Barang</CardTitle>
          <Button asChild>
            <Link href="/items/create">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Barang
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama barang..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Select
            value={categoryId || "all"}
            onValueChange={(value) => setCategoryId(value === "all" ? "" : value)}
          >
            <SelectTrigger className="w-full md:w-56">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Stok</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itemsLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Tidak ada barang ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      {item.categoryId
                        ? categoryNameById.get(item.categoryId) || "-"
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={item.stockQuantity === 0 ? "text-red-600 font-medium" : item.stockQuantity <= item.stockMinimum ? "text-yellow-600" : ""}>
                        {item.stockQuantity}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/items/${item.id}`}>Detail</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
