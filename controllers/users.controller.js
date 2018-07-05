const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  signIn: (req, res) => {
    User
      .findOne({
        $or: [{
            username: req.body.username
          },
          {
            email: req.body.email
          }
        ]
      })
      .then(userData => {
        console.log(req.body.username)
        console.log(req.body.email)
        console.log(userData)
        if(userData) {
          let passwordCheck = bcrypt.compareSync(req.body.password, userData.password)
          if(passwordCheck) {
            let token = jwt.sign({
                id: userData._id
              },
              'secret')
            return res.status(200).json({
              message: 'Sign in success',
              data: {
                id: userData._id,
                name: userData.name,
                username: userData.username,
                email: userData.email,
                token
              }
            })
          } else {
            return res.status(400).json({
              message: 'Failed to sign in, wrong password'
            })
          }
        } else {
          return res.status(400).json({
            message: 'Username / email not found'
          })
        }
      })
      .catch(err => {
        return res.status(400).json({
          message: "Cannot get user data",
          err
        })
      })
  },
  signUp: (req, res) => {
    User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .then(data => {
        console.log(data, '====woiiii');
        let token = jwt.sign({
          id: data._id
        }, 'secret');

        return res.status(200)
          .json({
            message: 'User succesfully created',
            id: data._id,
            name: data.name,
            email: data.email,
            username: data.username,
            token
          })
      })
      .catch(err => {
        return res.status(400)
          .json({
            message: 'Unable to register user',
            err
          })
      })
  },
  findAll: (req, res) => {
    User.find()
      .exec()
      .then(data => {
        return res.status(200).json({
          message: "Succeed get all users data",
          data
        })
      })
      .catch(err => {
        return res.status(400).json({
          message: "Failed get all users data",
        })
      })
  },
  findById: (req, res) => {
    User.findOne({
        _id: req.params.id
      })
      .exec()
      .then(data => {
        return res.status(200).json({
          message: "Succeed get user data by id",
          data
        })
      })
      .catch(err => {
        return res.status(400).json({
          message: "Failed to get user data by Id"
        })
      })
  },
  update: (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        req.body, {
          new: true
        }
      )
      .then((data) => {
        return res.status(200).json({
          message: "Succeed to update user data",
          data
        })
      })
      .catch(err => {
        return res.status(400).json({
          message: "failed to update data"
        })
      })
  },
  remove: (req, res) => {
    User.findByIdAndRemove(
        req.params.id
      )
      .then(() => {
        return res.status(200).json({
          message: "Succeed to delete data"
        })
      })
      .catch(() => {
        return res.status(400).json({
          message: "Failed to delete data"
        })
      })
  }
}
