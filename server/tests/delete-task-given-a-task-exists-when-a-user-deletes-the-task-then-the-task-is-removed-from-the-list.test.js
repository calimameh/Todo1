import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, './delete-task-given-a-task-exists-when-a-user-deletes-the-task-then-the-task-is-removed-from-the-list.feature'));

defineFeature(feature, test => {
  let taskId;

  test('Given a task exists, when a user deletes the task, then the task is removed from the list.', ({ given, when, then }) => {
    given('a task exists', async () => {
      const response = await request(app)
        .post('/api/v1/create-task')
        .send({
          id: 'task1',
          taskName: 'Finish report',
          taskDescription: 'Complete the quarterly report',
          dueDate: '2023-10-15',
          priority: 'High',
          categoryId: 'cat1'
        });
      expect(response.status).toBe(200);
      taskId = response.body.id;
    });

    when('a user deletes the task', async () => {
      const response = await request(app)
        .post('/api/v1/delete-task')
        .send({ id: taskId });
      expect(response.status).toBe(200);
    });

    then('the task is removed from the list', async () => {
      const response = await request(app)
        .get(`/api/v1/get-task-by-id/${taskId}`);
      expect(response.status).toBe(400);
    });
  });
});