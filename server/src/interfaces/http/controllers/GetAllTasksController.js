import express from 'express';
import GetAllTasksReadModel from '../../../domain/readmodel/GetAllTasksReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await GetAllTasksReadModel.query();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-all-tasks',
  router,
};