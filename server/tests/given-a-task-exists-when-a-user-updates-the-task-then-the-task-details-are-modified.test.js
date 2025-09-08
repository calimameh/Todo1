import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, './given-a-task-exists-when-a-user-updates-the-task-then-the-task-details-are-modified.feature'));

defineFeature(feature, test => {
  let taskId;

  test('Given a task exists, when a user updates the task, then the task details are modified.', ({ given, when, then }) => {
    given('a task exists', async () => {
      const createTaskResponse = await request(app)
        .post('/api/v1/create-task')
        .send({
          id: 'task1',
          taskName: 'Buy groceries',
          taskDescription: 'Buy milk and eggs',
          dueDate: '2023-10-10',
          priority: 'High',
          categoryId: 'cat1'
        })
        .expect(200);

      taskId = createTaskResponse.body.id;
    });

    when('a user updates the task', async () => {
      await request(app)
        .post('/api/v1/update-task')
        .send({
          id: taskId,
          taskName: 'Buy groceries and bread',
          taskDescription: 'Buy milk, eggs, and bread',
          dueDate: '2023-10-15',
          priority: 'Medium',
          status: 'In Progress',
          categoryId: 'cat1'
        })
        .expect(200);
    });

    then('the task details are modified', async () => {
      const getTaskResponse = await request(app)
        .get('/api/v1/get-all-tasks')
        .expect(200);

      const updatedTask = getTaskResponse.body.find(task => task.id === taskId);
      expect(updatedTask).toBeDefined();
      expect(updatedTask.taskName).toBe('Buy groceries and bread');
      expect(updatedTask.taskDescription).toBe('Buy milk, eggs, and bread');
      expect(updatedTask.dueDate).toBe('2023-10-15');
      expect(updatedTask.priority).toBe('Medium');
      expect(updatedTask.status).toBe('In Progress');
    });
  });
});