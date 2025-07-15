const db = require('../../infrastructure/db');

class FetchUserTodoListReadModel {
  static async query() {
    return await db.findAll('todos');
  }
}

module.exports = FetchUserTodoListReadModel;