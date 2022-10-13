const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  phonenumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isProvider: {
    type :Boolean,
  }
});

const jwtPrivateKey = 'jwtTokenPrivateKey';

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id , isProvider : this.isProvider, firstname: this.firstname, email: this.email}, jwtPrivateKey);
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstname: Joi.string().min(5).max(50).required(),
    lastname: Joi.string().min(5).max(50).required(),
    username: Joi.string().min(5).max(50).required(),
    phonenumber: Joi.string().required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isProvider : Joi.string().required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;