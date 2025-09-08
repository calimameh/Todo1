import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, './create-category-given-no-categories-exist-when-a-user-creates-a-category-then-the-category-is-added-to-the-list.feature'));

defineFeature(feature, test => {
  test('Given no categories exist, when a user creates a category, then the category is added to the list.', ({ given, when, then }) => {
    let response;
    let categoryId;

    given('no categories exist', async () => {
      const res = await request(app).get('/api/v1/get-all-categorys');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    when('a user creates a category', async () => {
      const categoryData = {
        id: 'cat1',
        categoryName: 'Work',
        categoryDescription: 'Work related tasks'
      };
      response = await request(app)
        .post('/api/v1/create-category')
        .send(categoryData);
      expect(response.status).toBe(200);
      categoryId = response.body.id;
    });

    then('the category is added to the list', async () => {
      const res = await request(app).get('/api/v1/get-all-categorys');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: categoryId,
            categoryName: 'Work',
            categoryDescription: 'Work related tasks'
          })
        ])
      );
    });
  });
});