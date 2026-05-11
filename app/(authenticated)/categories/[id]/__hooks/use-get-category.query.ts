import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import { TFrozenFoodCategory } from "@/types/database";
import { TApiSuccessResponseWithData } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = (id: number) => {
  const api = useAuthenticatedClient();

  return useQuery({
    queryKey: ["category", id],
    queryFn: async (): Promise<TApiSuccessResponseWithData<TFrozenFoodCategory>> => {
      return await api.get(`/categories/${id}`);
    },
    enabled: !!id,
  });
};
