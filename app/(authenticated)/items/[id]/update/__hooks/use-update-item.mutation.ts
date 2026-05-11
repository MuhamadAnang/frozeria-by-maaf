import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import { TCreateOrUpdateItem } from "@/schemas/item.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUpdateItemMutation = (id: number) => {
  const api = useAuthenticatedClient();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: TCreateOrUpdateItem) => {
      return await api.put(`/items/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Barang berhasil diperbarui", {
        onAutoClose: () => {
          router.push(`/items/${id}`);
        },
      });

      queryClient.invalidateQueries({ queryKey: ["item", id] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};