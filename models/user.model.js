const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bycrypt = require('bcryptjs')
const saltRounds = 10

const userSchema = mongoose.Schema({
  name: {
      type: String,
      required: 'Name required',
      unique: [true, 'Please use other name']
  },
  username: {
      type: String,
      required: 'Username required',
      unique: [true, 'Please use other username']
  },
  email: {
    type: String,
    require: [true, 'Email required'],
    unique: [true, 'Email already exits'],
    validate: {
      validator: function (email) {
        return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
      },
      message: 'Email not valid'
    }
  },
  password: {
    type: String,
    require: [true, 'Password required']
  }
}, {
  timestamps: true
})

userSchema.pre('save', function (next) {
    let user = this
    // async method
    bycrypt.genSalt(saltRounds, function (err, salt){
        if (err) return next(err)
        bycrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})
userSchema.pre('update', function (next) {
    let user = this
    if (user._update.$set.password){
        bycrypt.genSalt(saltRounds, function (err, salt){
            if (err) return next(err)
            bycrypt.hash(user._update.$set.password, salt, function(err, hash){
                if (err) return next(err)
                user._update.$set.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


module.exports = mongoose.model('User', userSchema);
