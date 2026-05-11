"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import { BarChart3 } from "lucide-react";
import { CategoryStockSummary as CategoryStockSummaryItem } from "../__hooks/use-get-dashboard-stats.query";

interface CategoryStockSummaryProps {
  items: CategoryStockSummaryItem[];
}

export const CategoryStockSummary = ({ items }: CategoryStockSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Ringkasan Kategori
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Belum ada kategori.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.totalItems} barang
                  </p>
                </div>
                <Badge variant="secondary">{item.totalStock} stok</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
