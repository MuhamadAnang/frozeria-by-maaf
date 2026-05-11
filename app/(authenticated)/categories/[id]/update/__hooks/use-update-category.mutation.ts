import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import { TCreateOrUpdateCategory } from "@/schemas/category.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUpdateCategoryMutation = (id: number) => {
  const api = useAuthenticatedClient();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: TCreateOrUpdateCategory) => {
      return await api.put(`/categories/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Kategori berhasil diperbarui", {
        onAutoClose: () => {
          router.push(`/categories/${id}`);
        },
      });

      queryClient.invalidateQueries({ queryKey: ["category", id] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};