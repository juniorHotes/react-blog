const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()
const port = 3333

app.use(cors())
app.use(express.json())
app.use(routes)

app.get('/', (req, res) => {
    res.send('Página inicial')
})

app.listen(port)