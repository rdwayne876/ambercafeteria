const express =  require('express')
const req = require('express/lib/request')
require('dotenv').config()
const app = express()

const indexRoute = require('./routes/index');
const orderRoute = require('./routes/order');

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', indexRoute);
app.use('/addorder', orderRoute);

app.listen(process.env.APP_PORT)
console.log('Server is listening');