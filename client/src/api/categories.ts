import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "@/lib/validators";
import { api } from "@/lib/api";

export const useGetCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => api.get("/api/v1/get-all-categorys"),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCategory: Omit<Category, "id">) => api.post("/api/v1/create-category", newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};