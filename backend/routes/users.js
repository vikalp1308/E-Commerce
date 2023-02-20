var { Router } = require('express');
var router = Router();
var pool = require('../database/connection')
router.get('/', (req,res) => {
    res.send("users page")
})

module.exports = router