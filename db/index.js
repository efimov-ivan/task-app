const mongoose = require('mongoose')

async function start(){
  try{
    await mongoose.connect('mongodb://localhost:27017/taskapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch(e){
    console.log('error', e.message);
  }
}

start()

const db = mongoose.connection

module.exports = db