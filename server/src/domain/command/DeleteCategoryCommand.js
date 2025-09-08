import db from '../../infrastructure/db/index.js';

class DeleteCategoryCommand {
  static async execute({ id }) {
    const category = await db.findById('Category', id);
    if (!category) {
      throw new Error('Category not found');
    }
    const success = await db.remove('Category', id);
    if (!success) {
      throw new Error('Failed to delete category');
    }
    return category;
  }
}

export default DeleteCategoryCommand;