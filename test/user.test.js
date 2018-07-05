const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const baseUrl = 'http://localhost:3000'
const mongoose = require("mongoose");
chai.use(chaiHttp)

describe('API /users', () => {
  describe('POST /users/signup', () => {
    it('Signup new user', done => {
      chai.request(app)
        .post('/users/signup')
        .send({
          username: 'david',
          email: 'google@david.com',
          password: 'qwerty'
        })
        .end((err, res) => {
          if(!err) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('object')
            expect(res.body).to.have.property('message').to.include('User succesfully created');
            expect(res.body).to.have.property('data').to.be.an('object').to.include.keys('_id');
            expect(res.body).to.have.property('data').to.be.an('object').to.include.keys('username');
            expect(res.body).to.have.property('data').to.be.an('object').to.include.keys('password');
            expect(res.body).to.have.property('data').to.be.an('object').to.include.keys('email');
            expect(res.body).to.have.property('data').to.be.an('object').to.include.keys('createdAt');
            expect(res.body).to.have.property('data').to.be.an('object').to.include.keys('updatedAt');
          }
          done()
        })
    })
  })

  describe('POST /users/signin', () => {
      it('Signin user', done => {
        chai.request(app)
          .post('/users/signin')
          .send({
            username: 'david',
            password: 'qwerty'
          })
          .end((err, res) => {
            if(!err) {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('message').to.include('Signin success');
              expect(res.body).to.have.property('token').to.be.a('string');
            }
            done()
          })
      })
    })
})

after(function (done) {
  mongoose.connection.db.dropCollection('users', function (err, response) {
    console.log('collection successfully dropped')
    done()
  })
})
