var { Router } = require('express');
var router = Router();

router.get('/', (req,res) => {
    res.send("Home page")
})

module.exports = router