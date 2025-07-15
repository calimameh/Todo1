const db = require('../../infrastructure/db');

class GetTodoItemDetailsReadModel {
  static async query(todoId) {
    return await db.findById('todos', todoId);
  }
}

module.exports = GetTodoItemDetailsReadModel;