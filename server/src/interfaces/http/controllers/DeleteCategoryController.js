import express from 'express';
import DeleteCategoryCommand from '../../../domain/command/DeleteCategoryCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const result = await DeleteCategoryCommand.execute({ id: req.body.id });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/delete-category',
  router,
};