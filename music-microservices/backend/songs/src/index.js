const express = require('express')
const songs = require('./routes')
const { port } = require('./config')

console.log(port)

const app = express()

app.use(express.json())

songs(app)


app.listen(4000, () => {
  console.log('listening on: http://localhost:' + port)
})