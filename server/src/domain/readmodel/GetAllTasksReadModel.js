import db from '../../infrastructure/db/index.js';

class GetAllTasksReadModel {
  static async query() {
    return await db.findAll('Task');
  }
}

export default GetAllTasksReadModel;