import db from '../../infrastructure/db/index.js';

class DeleteTaskCommand {
  static async execute({ id }) {
    const task = await db.findById('tasks', id);
    if (!task) {
      throw new Error('Task not found');
    }
    const deleted = await db.remove('tasks', id);
    if (!deleted) {
      throw new Error('Failed to delete task');
    }
    return task;
  }
}

export default DeleteTaskCommand;