const serverless = require('serverless-http');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const employee=require('./routers/employeerouter')
app.use(bodyParser.json())
app.use(employee)
app.get('/', function (req, res) {
  res.send('Hello World!')
})

module.exports.handler = serverless(app);