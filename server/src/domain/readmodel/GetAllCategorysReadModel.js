import db from '../../infrastructure/db/index.js';

class GetAllCategorysReadModel {
  static async query() {
    return await db.findAll('Category');
  }
}

export default GetAllCategorysReadModel;