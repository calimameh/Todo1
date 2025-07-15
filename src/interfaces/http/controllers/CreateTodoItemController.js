const express = require('express');
const router = express.Router();
const CreateTodoItemCommand = require('../../../domain/command/CreateTodoItemCommand');

router.post('/', async (req, res) => {
  try {
    const result = await CreateTodoItemCommand.execute(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = {
  routeBase: '/create-todo-item',
  router
};