import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import { TApiSuccessResponseWithData } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

export interface DashboardStats {
  totalItems: number;
  totalStock: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalCategories: number;
  inventoryValue: number;
}

export interface LowStockItem {
  id: number;
  name: string;
  stockQuantity: number;
  stockMinimum: number;
  satuan: string;
  categoryName: string | null;
}

export interface CategoryStockSummary {
  id: number;
  name: string;
  totalItems: number;
  totalStock: number;
}

export interface DashboardData {
  stats: DashboardStats;
  lowStock: LowStockItem[];
  categoryStock: CategoryStockSummary[];
}

const useGetDashboardStats = () => {
  const client = useAuthenticatedClient();

  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response =
        await client.get<TApiSuccessResponseWithData<DashboardData>>(
          "/dashboard",
        );

      return response.data.data;
    },
  });
};

export { useGetDashboardStats };
