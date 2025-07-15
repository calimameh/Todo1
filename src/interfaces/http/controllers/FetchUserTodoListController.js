const express = require('express');
const router = express.Router();
const FetchUserTodoListReadModel = require('../../../domain/readmodel/FetchUserTodoListReadModel');

router.get('/', async (req, res) => {
  try {
    const todos = await FetchUserTodoListReadModel.query();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {
  routeBase: '/fetch-user-todo-list',
  router
};