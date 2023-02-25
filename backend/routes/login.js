var { Router } = require('express');
var router = Router();

router.get('/', async(req,res) => {
    const user = await pool.query(`select * from users`)
    res.send("Hi "+ user[0].firstName + " Welcome to Amazon.")
})

module.exports = router