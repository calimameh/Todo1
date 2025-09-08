import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'given-a-category-exists-when-a-user-creates-a-task-then-the-task-is-associated-with-the-category.feature'));

defineFeature(feature, test => {
  let categoryId;

  test('Given a category exists, when a user creates a task, then the task is associated with the category.', ({ given, when, then }) => {
    given('a category exists', async () => {
      const response = await request(app)
        .post('/api/v1/create-category')
        .send({
          id: 'cat1',
          categoryName: 'Work',
          categoryDescription: 'Work related tasks'
        })
        .expect(200);

      categoryId = response.body.id;
    });

    when('a user creates a task', async () => {
      await request(app)
        .post('/api/v1/create-task')
        .send({
          id: 'task1',
          taskName: 'Buy groceries',
          taskDescription: 'Buy milk and eggs',
          dueDate: '2025-09-10',
          priority: 'High',
          categoryId: categoryId
        })
        .expect(200);
    });

    then('the task is associated with the category', async () => {
      const response = await request(app)
        .get('/api/v1/get-all-tasks')
        .expect(200);

      const task = response.body.find(task => task.id === 'task1');
      expect(task).toBeDefined();
      expect(task.categoryId.id).toBe(categoryId);
    });
  });
});