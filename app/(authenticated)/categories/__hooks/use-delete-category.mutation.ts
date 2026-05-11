import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCategoryMutation = () => {
  const api = useAuthenticatedClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      // eslint-disable-next-line drizzle/enforce-delete-with-where
      return await api.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      toast.success("Kategori berhasil dihapus");

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};