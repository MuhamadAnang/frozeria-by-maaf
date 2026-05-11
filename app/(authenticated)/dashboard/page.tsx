"use client";

import Page from "@/app/_components/page";
import { useGetDashboardStats } from "./__hooks/use-get-dashboard-stats.query";
import { StatsCard } from "./__components/stats-card";
import { LowStockAlert } from "./__components/low-stock-alert";
import { ItemsTable } from "./__components/items-table";
import { CategoryStockSummary } from "./__components/category-stock-summary";
import { useBreadcrumb } from "@/app/_contexts/breadcrumb.context";
import { useEffect } from "react";
import {
  Package,
  Warehouse,
  AlertTriangle,
  Archive,
  Boxes,
  Wallet,
} from "lucide-react";

export default function DashboardPage() {
  const { setBreadcrumbs } = useBreadcrumb();
  const { data, isLoading } = useGetDashboardStats();
  const dashboardData = data;

  useEffect(() => {
    setBreadcrumbs([{ label: "Dashboard" }]);
  }, [setBreadcrumbs]);
  const stats = dashboardData?.stats;

  return (
    <Page
      title="Dashboard"
      description="Selamat datang di frozerify Inventory System. Pantau stok makanan beku dan kelola inventory di sini."
      isLoading={isLoading}
    >
      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        <StatsCard
          title="Total Barang"
          value={stats?.totalItems || 0}
          icon={Package}
          description="Item aktif"
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Stok Menipis"
          value={stats?.lowStockItems || 0}
          icon={AlertTriangle}
          description="Stok <= minimum"
          iconColor="text-yellow-500"
        />
        <StatsCard
          title="Stok Habis"
          value={stats?.outOfStockItems || 0}
          icon={Archive}
          description="Stok = 0"
          iconColor="text-red-500"
        />
        <StatsCard
          title="Kategori"
          value={stats?.totalCategories || 0}
          icon={Warehouse}
          description="Kategori aktif"
          iconColor="text-green-500"
        />
        <StatsCard
          title="Total Stok"
          value={stats?.totalStock || 0}
          icon={Boxes}
          description="Semua unit"
          iconColor="text-cyan-600"
        />
        <StatsCard
          title="Nilai Inventory"
          value={stats?.inventoryValue || 0}
          icon={Wallet}
          description="Berdasarkan harga jual"
          iconColor="text-emerald-600"
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <LowStockAlert items={dashboardData?.lowStock || []} />
        <CategoryStockSummary items={dashboardData?.categoryStock || []} />
      </div>

      {/* Items Table */}
      <div className="mb-6">
        <ItemsTable />
      </div>
    </Page>
  );
}
