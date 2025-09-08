import { v4 as uuidv4 } from 'uuid';

class Task {
  constructor({ id = uuidv4(), taskName, taskDescription, dueDate, priority, status, categoryId }) {
    if (!taskName) throw new Error('Task name is required');
    this.id = id;
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
    this.categoryId = categoryId;
  }

  toJSON() {
    return {
      id: this.id,
      taskName: this.taskName,
      taskDescription: this.taskDescription,
      dueDate: this.dueDate,
      priority: this.priority,
      status: this.status,
      categoryId: this.categoryId
    };
  }
}

export default Task;