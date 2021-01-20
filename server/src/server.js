const express = require('express')
const session =require('express-session')
const cors = require('cors')
const routes = require('./routes')
const app = express()

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3600000 } }))

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)