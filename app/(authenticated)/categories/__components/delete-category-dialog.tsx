"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuthenticatedClient from "@/app/_hooks/use-authenticated-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { toast } from "sonner";

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface DeleteCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category;
  onSuccess: () => void;
}

export const DeleteCategoryDialog = ({
  open,
  onOpenChange,
  category,
  onSuccess,
}: DeleteCategoryDialogProps) => {
  const client = useAuthenticatedClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      // eslint-disable-next-line drizzle/enforce-delete-with-where
      await client.delete(`/categories/${category.id}`);
    },
    onSuccess: () => {
      toast.success("Kategori berhasil dihapus");
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal menghapus kategori");
    },
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMutation.mutateAsync();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Kategori</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus kategori {category.name}?
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" disabled={isDeleting} onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="destructive"
          >
            {isDeleting ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};