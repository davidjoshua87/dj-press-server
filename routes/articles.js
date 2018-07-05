const article = require('express').Router();
const {
  findAll,
  findById,
  create,
  update,
  remove,
  addComment,
  searchArticle
} = require('../controllers/articles.controller');

article
.get('/', findAll)
.get('/search', searchArticle)
.get('/:id', findById)
.post('/', create)
.put('/:id', addComment)
.put('/edit/:id', update)
.delete('/:id', remove)

module.exports = article;
