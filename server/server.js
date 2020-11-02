import compression from 'compression'
import apiRoutes from './routes'
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()


app.use(compression())


app.use('/', apiRoutes)

let port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('App listening on port', port)
})

