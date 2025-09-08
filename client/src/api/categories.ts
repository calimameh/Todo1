import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Category, createCategorySchema } from "@/lib/validators";
import { api } from "@/lib/api";

export const useGetCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => api.get("/get-all-categorys"),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCategory: Omit<Category, "id">) => {
      createCategorySchema.parse(newCategory);
      return api.post("/create-category", newCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.post("/delete-category", { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};