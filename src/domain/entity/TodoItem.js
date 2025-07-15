const { v4: uuidv4 } = require('uuid');

class TodoItem {
  constructor({
    todoID = uuidv4(),
    todoTitle,
    description,
    dueDate,
    priorityLevel,
    category,
    tags,
    completionDate,
    completionNotes,
    deletionReason,
    technology,
    field
  }) {
    if (!todoTitle) throw new Error('Todo Title is required');
    this.todoID = todoID;
    this.todoTitle = todoTitle;
    this.description = description;
    this.dueDate = dueDate;
    this.priorityLevel = priorityLevel;
    this.category = category;
    this.tags = tags;
    this.completionDate = completionDate;
    this.completionNotes = completionNotes;
    this.deletionReason = deletionReason;
    this.technology = technology;
    this.field = field;
  }

  toJSON() {
    return {
      todoID: this.todoID,
      todoTitle: this.todoTitle,
      description: this.description,
      dueDate: this.dueDate,
      priorityLevel: this.priorityLevel,
      category: this.category,
      tags: this.tags,
      completionDate: this.completionDate,
      completionNotes: this.completionNotes,
      deletionReason: this.deletionReason,
      technology: this.technology,
      field: this.field
    };
  }
}

module.exports = TodoItem;