import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task, createTaskSchema, updateTaskSchema } from "@/lib/validators";
import { api } from "@/lib/api";

export const useGetTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => api.get("/get-all-tasks"),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTask: Omit<Task, "id">) => {
      createTaskSchema.parse(newTask);
      return api.post("/create-task", newTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedTask: Task) => {
      updateTaskSchema.parse(updatedTask);
      return api.post("/update-task", updatedTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.post("/delete-task", { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};