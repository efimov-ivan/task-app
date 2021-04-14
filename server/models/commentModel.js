const {Schema, model} = require('mongoose');

const schema = new Schema({
  comment: {type: String, required: true},
  taskId: {type: Schema.ObjectId, required: true}
})

module.exports = model('Comment', schema)