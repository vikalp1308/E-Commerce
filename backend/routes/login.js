var { Router } = require('express');
var router = Router();

router.get('/', async(req,res) => {
    const user = await pool.query(`select * from users`)
    console.log("hello");
    console.log('again hello')
    res.send("Hi "+ user[0].firstName + " Welcome to Amazon.")
})

module.exports = router