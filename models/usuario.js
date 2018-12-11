'use strict'

import mongoose from 'mongoose';
import validate from 'mongoose-validator';

var Schema = mongoose.Schema;

const userSchema = Schema({
  
  user: String,
  pass: String
  
})


module.exports = mongoose.model('Usuarios', userSchema, 'Usuarios');