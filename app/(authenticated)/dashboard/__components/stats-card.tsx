"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconColor?: string;
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  iconColor = "text-muted-foreground",
}: StatsCardProps) => {
  const formattedValue =
    typeof value === "number" && title.toLowerCase().includes("nilai")
      ? new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(value)
      : value;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold">{formattedValue}</p>
            {description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {description}
              </p>
            )}
            {trend && (
              <p
                className={`mt-2 text-xs ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "Naik" : "Turun"} {Math.abs(trend.value)}%
                dari bulan lalu
              </p>
            )}
          </div>
          <Icon className={`h-8 w-8 shrink-0 ${iconColor}`} />
        </div>
      </CardContent>
    </Card>
  );
};
