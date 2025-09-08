import { v4 as uuid } from 'uuid';
import db from '../../infrastructure/db/index.js';
import Category from '../entity/Category.js';

class CreateCategoryCommand {
  static async execute({ categoryName, categoryDescription }) {
    const category = new Category({
      id: uuid(),
      categoryName,
      categoryDescription,
    });
    await db.insert('Category', category);
    return category;
  }
}

export default CreateCategoryCommand;