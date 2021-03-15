const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const db = require('./db');
const app = express();
const apiPort = 5000

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api', require('./routes/tasks.routes'))

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))