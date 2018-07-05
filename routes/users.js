const express = require('express');
const user = express.Router();
const {
  remove,
  signIn,
  signUp,
  findAll
} = require('../controllers/users.controller');
/* GET users listing. */
user
  .get('/', findAll)
  .post('/signup', signUp)
  .post('/signin', signIn)
  .delete('/:id', remove);

module.exports = user;
