import { Table, TableRow, TableCell } from "@/components/ui/table";
import { Task } from "@/lib/validators";
import { useGetTasks } from "@/api/tasks";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";

const DataTable = () => {
  const { data, isLoading, isError } = useGetTasks();

  if (isLoading) return <Skeleton />;
  if (isError) return <Alert variant="error">Error loading tasks</Alert>;

  return (
    <Table>
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((task: Task) => (
          <TableRow key={task.id}>
            <TableCell>{task.taskName}</TableCell>
            <TableCell>{task.taskDescription}</TableCell>
            <TableCell>{task.dueDate}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>{task.status}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;

**B. Create the Main Page:**