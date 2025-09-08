import express from 'express';
import GetCategoryByIdReadModel from '../../../domain/readmodel/GetCategoryByIdReadModel.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await GetCategoryByIdReadModel.query(id);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-category-by-id',
  router,
};