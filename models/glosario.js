'use strict'

import mongoose from 'mongoose';
import validate from 'mongoose-validator';

var Schema = mongoose.Schema;

const userSchema = Schema({
  
  title: String,
  definition: String,
  history:[{
    _id: false,
    title: String,
    definition: String,
    updated_at: String
  }]
  
})


module.exports = mongoose.model('Glosario', userSchema, 'Glosario');