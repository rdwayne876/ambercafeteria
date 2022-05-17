const express = require('express')
const conn = require('../db')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('orders/view', {

    })
})
module.exports = router;