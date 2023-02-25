var { Router } = require('express');
const pool = require('../database/connection');
var router = Router();

router.get('/', (req,res) => {
    pool.query(`INSERT INTO users (userID, email, firstName, lastName, phoneNumber)
    VALUES ('1', 'vikalp.khandelwal@robomq.io', 'vikalp', 'khandelwal', '6377827429');`)
    res.send("user registered successfully.")
})

module.exports = router