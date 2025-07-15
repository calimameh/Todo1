const db = require('../../infrastructure/db/index');

class CreateTodoItemCommand {
  static async execute({ todoTitle, description, dueDate, priorityLevel, category, tags }) {
    const todoItem = {
      todoTitle,
      description,
      dueDate,
      priorityLevel,
      category,
      tags
    };
    await db.insert('todoItems', todoItem);
    return todoItem;
  }
}

module.exports = CreateTodoItemCommand;