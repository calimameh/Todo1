import express from 'express';
import UpdateTaskCommand from '../../../domain/command/UpdateTaskCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const result = await UpdateTaskCommand.execute(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/update-task',
  router,
};