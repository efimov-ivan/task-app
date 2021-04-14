const {Schema, model} = require('mongoose')

const schema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  col: {type: Number, required: true},
})

module.exports = model('Task', schema)