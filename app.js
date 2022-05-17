const express = require('express')
require('dotenv').config()
const app = express()
const layout = require('express-ejs-layouts')
const path = require('path');

app.use(layout)
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static('images'));


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout')


const indexRoute = require('./routes/index')
app.use('/', indexRoute)

app.listen(process.env.APP_PORT)
console.log('Server is listening');