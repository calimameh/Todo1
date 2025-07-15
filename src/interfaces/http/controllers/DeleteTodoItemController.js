const express = require('express');
const router = express.Router();
const DeleteTodoItemCommand = require('../../../domain/command/DeleteTodoItemCommand');

router.post('/:todoID', async (req, res) => {
  try {
    const result = await DeleteTodoItemCommand.execute({
      todoID: req.params.todoID,
      deletionReason: req.body.deletionReason
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = {
  routeBase: '/delete-todo-item',
  router
};