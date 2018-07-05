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

const images = require('../helpers/images')

article
.post('/', images.multer.single('pic'), images.sendUploadToGCS, create)
.get('/', findAll)
.get('/search', searchArticle)
.get('/:id', findById)
.put('/:id', addComment)
.put('/edit/:id', update)
.delete('/:id', remove)

module.exports = article;
