require('dotenv').config()
const express = require('express'),
  mongoose = require('mongoose'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors')

const dbURI = `${process.env.MONGODB_URI}`
const publicDir = path.join(__dirname, './public')

const signin = require('./routes/signin')

const app = express()

mongoose.connect(dbURI, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'DB Connection Error: '))
db.once('open', () => {
  console.log('DB connected successfully')
})

app.use(cors({ credentials: true, origin: '*' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(publicDir))

app.use('/api', signin)

app.set('port', process.env.PORT || 5000)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('fe/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'fe', 'build', 'index.html'))
  })
}

app.listen(app.get('port'), () => {
  console.log('Node app is running at localhost:' + app.get('port'))
})
