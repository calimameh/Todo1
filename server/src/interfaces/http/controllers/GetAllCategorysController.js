import express from 'express';
import GetAllCategorysReadModel from '../../../domain/readmodel/GetAllCategorysReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await GetAllCategorysReadModel.query();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-all-categorys',
  router,
};