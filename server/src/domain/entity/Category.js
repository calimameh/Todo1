import { v4 as uuidv4 } from 'uuid';

class Category {
  constructor({ id = uuidv4(), categoryName, categoryDescription }) {
    if (!categoryName) throw new Error('Category name is required');
    this.id = id;
    this.categoryName = categoryName;
    this.categoryDescription = categoryDescription;
  }

  toJSON() {
    return {
      id: this.id,
      categoryName: this.categoryName,
      categoryDescription: this.categoryDescription
    };
  }
}

export default Category;