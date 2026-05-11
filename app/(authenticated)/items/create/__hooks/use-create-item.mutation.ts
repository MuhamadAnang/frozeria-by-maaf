import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import { TCreateOrUpdateItem } from "@/schemas/item.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateItemMutation = () => {
  const api = useAuthenticatedClient();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TCreateOrUpdateItem) => {
      return await api.post("/items", payload);
    },

    onSuccess: () => {
      toast.success("Barang berhasil dibuat", {
        onAutoClose: () => {
          router.push("/items");
        },
        duration: 300,
      });

      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });
};