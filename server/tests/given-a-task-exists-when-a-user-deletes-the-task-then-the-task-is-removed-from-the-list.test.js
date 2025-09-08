import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'given-a-task-exists-when-a-user-deletes-the-task-then-the-task-is-removed-from-the-list.feature'));

defineFeature(feature, test => {
  let taskId;

  test('Given a task exists, when a user deletes the task, then the task is removed from the list.', ({ given, when, then }) => {
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

    when('a user deletes the task', async () => {
      await request(app)
        .post('/api/v1/delete-task')
        .send({ id: taskId })
        .expect(200);
    });

    then('the task is removed from the list', async () => {
      const getAllTasksResponse = await request(app)
        .get('/api/v1/get-all-tasks')
        .expect(200);

      const tasks = getAllTasksResponse.body;
      expect(tasks).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: taskId })
        ])
      );
    });
  });
});