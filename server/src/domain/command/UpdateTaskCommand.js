import db from '../../infrastructure/db/index.js';

class UpdateTaskCommand {
  static async execute({ id, taskName, taskDescription, dueDate, priority, status, categoryId }) {
    const existingTask = await db.findById('tasks', id);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    const updatedTask = {
      ...existingTask,
      taskName,
      taskDescription,
      dueDate,
      priority,
      status,
      categoryId,
    };

    await db.update('tasks', id, updatedTask);
    return updatedTask;
  }
}

export default UpdateTaskCommand;