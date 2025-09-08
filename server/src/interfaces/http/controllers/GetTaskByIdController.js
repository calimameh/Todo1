import express from 'express';
import GetTaskByIdReadModel from '../../../domain/readmodel/GetTaskByIdReadModel.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await GetTaskByIdReadModel.query(id);
    if (!task) {
      return res.status(400).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-task-by-id',
  router,
};