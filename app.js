require('dotenv').config()
var express = require('express'),
  mongoose = require('mongoose')

  
const dbURI = `${process.env.MONGODB_URI}`

mongoose.connect(dbURI, { useNewUrlParser: true })
var db = mongoose.connection

db.on('error', console.error.bind(console, 'DB Connection Error: '))
db.once('open', () => {
  console.log('DB connected successfully')
})
  
var app = express()

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public'))

app.get('/', (request, response) => {
  response.send('simple-sentiment-chat')
})

app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'))
})