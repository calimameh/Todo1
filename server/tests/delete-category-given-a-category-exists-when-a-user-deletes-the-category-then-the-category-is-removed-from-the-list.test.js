import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, './delete-category-given-a-category-exists-when-a-user-deletes-the-category-then-the-category-is-removed-from-the-list.feature'));

defineFeature(feature, test => {
  let categoryId;

  test('Given a category exists, when a user deletes the category, then the category is removed from the list.', ({ given, when, then }) => {
    given('a category exists', async () => {
      const response = await request(app)
        .post('/api/v1/create-category')
        .send({
          id: 'cat1',
          categoryName: 'Work',
          categoryDescription: 'Work related tasks'
        });
      expect(response.status).toBe(200);
      categoryId = response.body.id;
    });

    when('a user deletes the category', async () => {
      const response = await request(app)
        .post('/api/v1/delete-category')
        .send({ id: categoryId });
      expect(response.status).toBe(200);
    });

    then('the category is removed from the list', async () => {
      const response = await request(app)
        .get('/api/v1/get-all-categorys');
      expect(response.status).toBe(200);
      const categories = response.body;
      expect(categories.find(category => category.id === categoryId)).toBeUndefined();
    });
  });
});