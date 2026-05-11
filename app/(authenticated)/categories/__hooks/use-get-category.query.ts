import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import { TIndexCategoryQuery } from "@/schemas/category.schema";
import { TFrozenFoodCategoryWithTotalItems } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { TPaginationResponse } from "@/types/meta";

export const useGetCategoriesQuery = (queryParams: TIndexCategoryQuery) => {
  const api = useAuthenticatedClient();

  return useQuery({
    queryKey: ["categories", queryParams],
    queryFn: async (): Promise<TPaginationResponse<TFrozenFoodCategoryWithTotalItems>> => {
      return await api.get("/categories", { params: queryParams });
    },
  });
};
