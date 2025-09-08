import Task from '../entity/Task.js';
import db from '../../infrastructure/db/index.js';
import { v4 as uuid } from 'uuid';

class CreateTaskCommand {
  static async execute({ taskName, taskDescription, dueDate, priority, categoryId }) {
    const category = await db.findById('categories', categoryId);
    if (!category) {
      throw new Error('Category does not exist');
    }

    const task = new Task({
      id: uuid(),
      taskName,
      taskDescription,
      dueDate,
      priority,
      categoryId,
      status: 'Pending'
    });

    await db.insert('tasks', task);
    return task;
  }
}

export default CreateTaskCommand;