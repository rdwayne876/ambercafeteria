const express =  require('express')
require('dotenv').config()
const app = express()

const indexRoute = require('/routes/index')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', indexRoute)

app.listen(process.env.APP_PORT)
console.log('Server is listening');