"use client";

import Page from "@/app/_components/page";
import { useParams } from "next/navigation";
import { useGetItem } from "./__hooks/use-get-item.query";
import { Table, TableBody, TableCell, TableRow } from "@/app/_components/ui/table";
import { Card, CardContent } from "@/app/_components/ui/card";
import { convertUtcToLocalTime } from "@/lib/utils";
import { Badge } from "@/app/_components/ui/badge";
import NextImage from "next/image";

export default function ItemDetailPage() {
  const params = useParams();
  const { data, isLoading } = useGetItem(Number(params.id));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getStockStatus = (stock: number, minimum: number): { label: string; variant: "destructive" | "warning" | "default" } => {
    if (stock <= 0) return { label: "Habis", variant: "destructive" };
    if (stock <= minimum) return { label: "Menipis", variant: "warning" };
    return { label: "Tersedia", variant: "default" };
  };

  return (
    <Page isLoading={isLoading} title="Detail Barang" description="Informasi lengkap barang">
       {/* Image Section */}
        <Card className="lg:col-span-1 shadow-none">
          <CardContent className="pt-6">
            {data?.data.photoUrl ? (
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
                <NextImage
                  src={data.data.photoUrl}
                  alt={data.data.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-lg border bg-muted">
                <p className="text-sm text-muted-foreground">Tidak ada gambar</p>
              </div>
            )}
          </CardContent>
        </Card>
      <Card className="shadow-none">
        <CardContent className="pt-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium w-40">ID</TableCell>
                <TableCell>{data?.data.id}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Nama Barang</TableCell>
                <TableCell>{data?.data.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Kategori</TableCell>
                <TableCell>{data?.data.categoryId ?? "-"}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Deskripsi</TableCell>
                <TableCell>{data?.data.description || "-"}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Stok</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{data?.data.stockQuantity} {data?.data.satuan}</span>
                    {data && (
                      <Badge variant={getStockStatus(data.data.stockQuantity, data.data.stockMinimum).variant}>
                        {getStockStatus(data.data.stockQuantity, data.data.stockMinimum).label}
                      </Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Stok Minimum</TableCell>
                <TableCell>{data?.data.stockMinimum} {data?.data.satuan}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Satuan</TableCell>
                <TableCell>{data?.data.satuan}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Harga Beli</TableCell>
                <TableCell>{formatCurrency(data?.data.hargaBeli || 0)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Harga Jual</TableCell>
                <TableCell>{formatCurrency(data?.data.hargaJual || 0)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Berat</TableCell>
                <TableCell>{data?.data.berat} gram</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Lokasi</TableCell>
                <TableCell>{data?.data.lokasi || "-"}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Foto URL</TableCell>
                <TableCell>
                  {data?.data.photoUrl ? (
                    <a href={data?.data.photoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Lihat Foto
                    </a>
                  ) : "-"}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Dibuat</TableCell>
                <TableCell>
                  {data?.data.createdAt
                    ? convertUtcToLocalTime({
                        utcDateStr: data?.data.createdAt.toString(),
                        format: "PPpp",
                      })?.toString()
                    : "-"}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Update Terakhir</TableCell>
                <TableCell>
                  {data?.data.updatedAt
                    ? convertUtcToLocalTime({
                        utcDateStr: data?.data.updatedAt.toString(),
                        format: "PPpp",
                      })?.toString()
                    : "-"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Page>
  );
}
