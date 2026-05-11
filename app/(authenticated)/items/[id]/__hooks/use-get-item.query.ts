import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import { TFrozenFoodItem } from "@/types/database";
import { TApiSuccessResponseWithData } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

export const useGetItem = (id: number) => {
  const api = useAuthenticatedClient();

  return useQuery({
    queryKey: ["item", id],
    queryFn: async (): Promise<TApiSuccessResponseWithData<TFrozenFoodItem>> => {
      return await api.get(`/items/${id}`);
    },
    enabled: !!id,
  });
};
