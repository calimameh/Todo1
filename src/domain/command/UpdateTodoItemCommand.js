const db = require('../../infrastructure/db/index');

class UpdateTodoItemCommand {
  static async execute({ todoID, todoTitle, description, dueDate, priorityLevel, tags }) {
    const todoItem = await db.findById('todos', todoID);
    if (!todoItem) {
      throw new Error('Todo item not found');
    }

    const updatedTodoItem = {
      ...todoItem,
      todoTitle,
      description,
      dueDate,
      priorityLevel,
      tags
    };

    await db.update('todos', todoID, updatedTodoItem);
    return updatedTodoItem;
  }
}

module.exports = UpdateTodoItemCommand;