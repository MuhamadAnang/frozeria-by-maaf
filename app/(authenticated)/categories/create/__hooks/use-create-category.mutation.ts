import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import { TCreateOrUpdateCategory } from "@/schemas/category.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateCategoryMutation = () => {
  const api = useAuthenticatedClient();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TCreateOrUpdateCategory) => {
      return await api.post("/categories", payload);
    },

    onSuccess: () => {
      toast.success("Kategori berhasil dibuat", {
        onAutoClose: () => {
          router.push("/categories");
        },
        duration: 300,
      });

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};