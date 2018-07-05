const mongoose = require("mongoose");
const Articles = require('../models/articles.model.js');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);


describe('/GET all articles', function () {
  it('should get all articles when calling with GET method', function (done) {
    this.timeout(5000)
    chai.request(app)
      .get('/articles')
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.data.should.be.an('array');
        done()
      })
  })
})

describe('/POST articles', () => {
  it('it should POST new post', (done) => {
    let articles = new Articles({
      title: "New article for post chai",
      content: "Content for all ages",
      category: "Category post new"
    })
    chai.request(app)
      .post('/articles')
      .send(articles)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.data.should.have.property('_id');
        res.body.data.should.have.property('title');
        res.body.data.should.have.property('content');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
        done();
      })
  })
})

describe('/PUT/:id articles', () => {
  it('it should UPDATE a post given the id', (done) => {
    let articles = new Articles({
      title: "New article for post",
      content: "Content for all +18",
      category: "Category post new content"
    })
    articles.save((err, article) => {
      chai.request(app)
        .put('/articles/' + article._id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.data.should.have.property('_id');
          res.body.data.should.have.property('title');
          res.body.data.should.have.property('content');
          res.body.data.should.have.property('createdAt');
          res.body.data.should.have.property('updatedAt');
          done();
        });
    });
  });
});

describe('/DELETE/:id articles', () => {
  it('it should DELETE a post given the id', (done) => {
    let articles = new Articles({
      title: "New article for post chai",
      content: "Content for all ages",
      category: "Category post new"
    })
    articles.save((err, article) => {
      chai.request(app)
        .get('/articles')
        .end(function (err, res) {
          chai.request(app)
            .delete('/articles/' + article._id)
            .end(function (error, res) {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              done();
            });
        });
    });
  });
});

after(function (done) {
  mongoose.connection.db.dropCollection('articles', function (err, response) {
    console.log('collection successfully dropped')
    done()
  })
})
