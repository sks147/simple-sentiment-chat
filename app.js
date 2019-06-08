require('dotenv').config()
const express = require('express'),
  mongoose = require('mongoose'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors')

const dbURI = `${process.env.MONGODB_URI}`

const signin = require('./routes/signin')

const app = express()

mongoose.connect(dbURI, { useNewUrlParser: true, useFindAndModify: false })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'DB Connection Error: '))
db.once('open', () => {
  console.log('DB connected successfully')
})

app.use(cors({ credentials: true, origin: '*' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', signin)

app.set('port', process.env.PORT || 3001)

app.use(express.static(path.resolve(__dirname, './fe/build')))

app.listen(app.get('port'), () => {
  console.log('Node app is running at localhost:' + app.get('port'))
})
