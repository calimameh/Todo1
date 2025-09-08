import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema, Task } from "@/lib/validators";
import { useCreateTask } from "@/api/tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TaskFormProps = {
  onClose: () => void;
};

export const TaskForm = ({ onClose }: TaskFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<Task, "id">>({
    resolver: zodResolver(createTaskSchema),
  });

  const createTask = useCreateTask();

  const onSubmit = (data: Omit<Task, "id">) => {
    createTask.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("taskName")} placeholder="Task Name" />
      {errors.taskName && <span>{errors.taskName.message}</span>}

      <Input {...register("taskDescription")} placeholder="Task Description" />
      {errors.taskDescription && <span>{errors.taskDescription.message}</span>}

      <Input {...register("dueDate")} placeholder="Due Date" />
      {errors.dueDate && <span>{errors.dueDate.message}</span>}

      <Input {...register("priority")} placeholder="Priority" />
      {errors.priority && <span>{errors.priority.message}</span>}

      <Input {...register("categoryId")} placeholder="Category ID" />
      {errors.categoryId && <span>{errors.categoryId.message}</span>}

      <Button type="submit">Create Task</Button>
    </form>
  );
};