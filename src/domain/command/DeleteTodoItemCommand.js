const db = require('../../infrastructure/db/index');

class DeleteTodoItemCommand {
  static async execute({ todoID, deletionReason }) {
    const todo = await db.findById('todos', todoID);
    if (!todo) {
      throw new Error('Todo item not found');
    }
    await db.remove('todos', todoID);
    return { todoID, deletionReason };
  }
}

module.exports = DeleteTodoItemCommand;