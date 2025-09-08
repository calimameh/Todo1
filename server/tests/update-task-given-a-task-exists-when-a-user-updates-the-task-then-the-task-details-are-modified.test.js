import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, './update-task-given-a-task-exists-when-a-user-updates-the-task-then-the-task-details-are-modified.feature'));

defineFeature(feature, test => {
  test('Given a task exists, when a user updates the task, then the task details are modified.', ({ given, when, then }) => {
    let taskId;
    const originalTask = {
      id: 'task1',
      taskName: 'Finish report',
      taskDescription: 'Complete the quarterly report',
      dueDate: '2023-10-15',
      priority: 'High',
      categoryId: 'cat1'
    };

    const updatedTask = {
      id: 'task1',
      taskName: 'Finish updated report',
      taskDescription: 'Complete the updated quarterly report',
      dueDate: '2023-10-20',
      priority: 'Medium',
      status: 'In Progress',
      categoryId: 'cat1'
    };

    given('a task exists', async () => {
      const response = await request(app)
        .post('/api/v1/create-task')
        .send(originalTask)
        .expect(200);

      taskId = response.body.id;
    });

    when('a user updates the task', async () => {
      await request(app)
        .post('/api/v1/update-task')
        .send(updatedTask)
        .expect(200);
    });

    then('the task details are modified', async () => {
      const response = await request(app)
        .get(`/api/v1/get-task-by-id/${taskId}`)
        .expect(200);

      expect(response.body).toEqual(expect.objectContaining({
        id: taskId,
        taskName: updatedTask.taskName,
        taskDescription: updatedTask.taskDescription,
        dueDate: updatedTask.dueDate,
        priority: updatedTask.priority,
        status: updatedTask.status,
        categoryId: updatedTask.categoryId
      }));
    });
  });
});