const port = process.env.PORT || 3000

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
  res.header('Access-Control-Expose-Headers', 'Content-Length')
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Content-Type, X-Requested-With, Range'
  )
  if (req.method === 'OPTIONS') {
    return res.send(200)
  } else {
    return next()
  }
})

app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.send('hello world')
})

app.listen(port, function() {
  console.log('app listening at port %s', port)
})
