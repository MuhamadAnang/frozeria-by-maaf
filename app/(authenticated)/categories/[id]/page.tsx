"use client";

import Page from "@/app/_components/page";
import { useParams } from "next/navigation";
import { useGetCategory } from "./__hooks/use-get-category.query";
import { Table, TableBody, TableCell, TableRow } from "@/app/_components/ui/table";
import { Card, CardContent } from "@/app/_components/ui/card";
import { convertUtcToLocalTime } from "@/lib/utils";

export default function CategoryDetailPage() {
  const params = useParams();
  const { data, isLoading } = useGetCategory(Number(params.id));

  return (
    <Page
      isLoading={isLoading}
      title="Detail Kategori"
      description="Informasi lengkap kategori produk."
    >
      <Card className="gap-3 shadow-none">
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>{data?.data.id}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>{data?.data.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Deskripsi</TableCell>
                <TableCell>{data?.data.description || "-"}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Dibuat</TableCell>
                <TableCell>
                  {data
                    ? String(convertUtcToLocalTime({
                        utcDateStr: data.data.createdAt.toString(),
                        format: "PPpp",
                      }))
                    : "-"}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Update Terakhir</TableCell>
                <TableCell>
                  {data
                    ? String(convertUtcToLocalTime({
                        utcDateStr: data.data.updatedAt.toString(),
                        format: "PPpp",
                      }))
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