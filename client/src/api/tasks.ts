import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/lib/validators";
import { api } from "@/lib/api";

export const useGetTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => api.get("/api/v1/get-all-tasks"),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTask: Omit<Task, "id">) => api.post("/api/v1/create-task", newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

### Step 2: UI Layer (Components & Pages)

**A. Create Feature Components:**