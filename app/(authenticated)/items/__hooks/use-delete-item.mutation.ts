import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteItemMutation = () => {
  const api = useAuthenticatedClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
        // eslint-disable-next-line drizzle/enforce-delete-with-where
      return await api.delete(`/items/${id}`);
    },
    onSuccess: () => {
      toast.success("Barang berhasil dihapus");

      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });
};