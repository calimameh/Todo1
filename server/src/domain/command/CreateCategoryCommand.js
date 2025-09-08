import Category from '../entity/Category.js';
import db from '../../infrastructure/db/index.js';
import { v4 as uuid } from 'uuid';

class CreateCategoryCommand {
  static async execute({ categoryName, categoryDescription }) {
    const category = new Category({
      id: uuid(),
      categoryName,
      categoryDescription,
    });
    await db.insert('categories', category);
    return category;
  }
}

export default CreateCategoryCommand;