import express from 'express';
import CreateCategoryCommand from '../../../domain/command/CreateCategoryCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;
    const result = await CreateCategoryCommand.execute({ categoryName, categoryDescription });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/create-category',
  router,
};