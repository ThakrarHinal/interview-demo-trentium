const express = require('express')
const route = require('./routes/user.route.js')
const authRoute = require('./routes/auth.route.js')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded(
  { extended: true }
))
app.use(route)
app.use(authRoute)

app.listen(3000, () => {
  console.log('app is running on http://localhost:%s', 3000)
})
