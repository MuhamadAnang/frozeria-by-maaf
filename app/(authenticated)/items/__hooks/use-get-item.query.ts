import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import { TIndexItemQuery } from "@/schemas/item.schema";
import { TFrozenFoodItem } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { TPaginationResponse } from "@/types/meta";

export const useGetItemsQuery = (queryParams: TIndexItemQuery) => {
  const api = useAuthenticatedClient();

  return useQuery({
    queryKey: ["items", queryParams],
    queryFn: async (): Promise<TPaginationResponse<TFrozenFoodItem>> => {
      return await api.get("/items", { params: queryParams });
    },
  });
};
