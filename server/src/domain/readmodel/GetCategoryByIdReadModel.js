import db from '../../infrastructure/db/index.js';

class GetCategoryByIdReadModel {
  static async query(id) {
    return await db.findById('Category', id);
  }
}

export default GetCategoryByIdReadModel;