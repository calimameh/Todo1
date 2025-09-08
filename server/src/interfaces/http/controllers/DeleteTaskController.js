import express from 'express';
import DeleteTaskCommand from '../../../domain/command/DeleteTaskCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const result = await DeleteTaskCommand.execute({ id: req.body.id });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/delete-task',
  router,
};