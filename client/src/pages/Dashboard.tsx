import { useGetTasks, useDeleteTask } from "@/api/tasks";
import { useGetCategories, useDeleteCategory } from "@/api/categories";
import { Button } from "@/components/ui/button";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { TaskForm } from "@/features/task-management/TaskForm";
import { CategoryForm } from "@/features/category-management/CategoryForm";

const Dashboard = () => {
  const { data: tasks, isLoading: tasksLoading } = useGetTasks();
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const deleteTask = useDeleteTask();
  const deleteCategory = useDeleteCategory();
  const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false);

  if (tasksLoading || categoriesLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Button onClick={() => setTaskDialogOpen(true)}>Add Task</Button>
      <Button onClick={() => setCategoryDialogOpen(true)}>Add Category</Button>

      <Dialog open={isTaskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <TaskForm onClose={() => setTaskDialogOpen(false)} />
      </Dialog>

      <Dialog open={isCategoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <CategoryForm onClose={() => setCategoryDialogOpen(false)} />
      </Dialog>

      <h2 className="text-xl font-bold mt-8">Tasks</h2>
      <Table>
        {tasks?.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.taskName}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>
              <Button onClick={() => deleteTask.mutate(task.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>

      <h2 className="text-xl font-bold mt-8">Categories</h2>
      <Table>
        {categories?.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.categoryName}</TableCell>
            <TableCell>
              <Button onClick={() => deleteCategory.mutate(category.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};

export default Dashboard;