"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { LowStockItem } from "../__hooks/use-get-dashboard-stats.query";

interface LowStockAlertProps {
  items: LowStockItem[];
}

export const LowStockAlert = ({ items }: LowStockAlertProps) => {
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Stok Aman
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Semua barang memiliki stok yang cukup.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Peringatan Stok Menipis ({items.length} item)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-md border bg-muted/30 p-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.categoryName || "Tanpa kategori"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-yellow-600">
                  {item.stockQuantity} {item.satuan}
                </p>
                <p className="text-xs text-muted-foreground">
                  Minimum {item.stockMinimum}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
