import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  categoryName: z.string().min(1, "Category name is required"),
  categoryDescription: z.string().optional(),
});

export const taskSchema = z.object({
  id: z.string(),
  taskName: z.string().min(1, "Task name is required"),
  taskDescription: z.string().optional(),
  dueDate: z.string(),
  priority: z.string(),
  status: z.string(),
  categoryId: z.string(),
});

export const createCategorySchema = categorySchema.omit({ id: true });
export const createTaskSchema = taskSchema.omit({ id: true });

export type Category = z.infer<typeof categorySchema>;
export type Task = z.infer<typeof taskSchema>;

**B. Create a `fetch`-based API Client:**