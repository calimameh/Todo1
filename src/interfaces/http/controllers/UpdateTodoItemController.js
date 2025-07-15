const express = require('express');
const router = express.Router();
const UpdateTodoItemCommand = require('../../../domain/command/UpdateTodoItemCommand');

router.post('/:todoID', async (req, res) => {
  try {
    const { todoID } = req.params;
    const { todoTitle, description, dueDate, priorityLevel, tags } = req.body;
    const result = await UpdateTodoItemCommand.execute({ todoID, todoTitle, description, dueDate, priorityLevel, tags });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = {
  routeBase: '/update-todo-item',
  router
};