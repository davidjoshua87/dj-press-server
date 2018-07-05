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

const {
  authentication
} = require('../middlewares/auth')

article
.post('/upload', authentication,
  images.multer.single('image'),
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })
.post('/', authentication, images.multer.single('image'), images.sendUploadToGCS, create)
.get('/', findAll)
.get('/search', searchArticle)
.get('/:id', findById)
.put('/:id', addComment)
.put('/edit/:id', update)
.delete('/:id', remove)

module.exports = article;
