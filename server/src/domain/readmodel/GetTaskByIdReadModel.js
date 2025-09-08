import db from '../../infrastructure/db/index.js';

class GetTaskByIdReadModel {
  static async query(id) {
    return await db.findById('Task', id);
  }
}

export default GetTaskByIdReadModel;