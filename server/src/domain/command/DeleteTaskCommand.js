import db from '../../infrastructure/db/index.js';

class DeleteTaskCommand {
  static async execute({ id }) {
    const task = await db.findById('tasks', id);
    if (!task) {
      throw new Error('Task not found');
    }
    const success = await db.remove('tasks', id);
    if (!success) {
      throw new Error('Failed to delete task');
    }
    return task;
  }
}

export default DeleteTaskCommand;