'use strict'

import mongoose from 'mongoose';
import validate from 'mongoose-validator';

var Schema = mongoose.Schema;

const countersSchema = Schema({
  
  "_id": String,
  "sequence_value": Number
  
})

/*countersSchema.statics.increment = function (counter, callback) {
    return this.findByIdAndUpdate(counter, { $inc: { next: 1 } }, {new: true, upsert: true, select: {next: 1}}, callback);
};*/

countersSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

module.exports = mongoose.model('Counters', countersSchema, 'Counters');