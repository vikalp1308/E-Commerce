var { Router } = require('express');
var router = Router();
const pool = require('../database/connection');

router.get('/', async(req,res) => {
    try{
        let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
        let limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;
        let startValue;
        let endValue;
        if(page > 0){
            startValue = ( page*limit ) - limit;
            endValue = ( page*limit );
        } else {
            startValue = 0;
            endValue = 10;
        }
        
        const products = await pool.query(`select c.title, p.title, p.price, p.quantity, p.image, p.id from products as p JOIN categories as c ON p.cat_id = c.id ORDER BY p.id ASC limit ?, ?`, [startValue, endValue])
        if(products.length>0){
            res.status(200).json({
                count: products.length,
                products: products
            })
        } else{
            res.json({message: "No products found."})
        }
    } catch(error){
        console.log(error);
    }
})

router.get('/:id', async(req,res) => {
    try{
        let productId = req.params.id
        const products = await pool.query(`select c.title, p.title, p.price, p.quantity, p.image, p.images, p.id from products as p JOIN categories as c ON p.cat_id = c.id && p.id = ?`, [productId])
        if(products.length>0){
            res.status(200).json(products)
        } else{
            res.json({message: `No products found for product id ${productId}`})
        }
    } catch(error){
        console.log(error);
    }
})

router.get('/category/:catName', async(req,res) => {
    try{
        let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
        let limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;
        let startValue;
        let endValue;
        if(page > 0){
            startValue = ( page*limit ) - limit;
            endValue = page*limit;
        } else {
            startValue = 0;
            endValue = 10;
        }
        let catName = req.params.catName
        const products = await pool.query(`select c.title, p.title, p.price, p.quantity, p.image, p.id from products as p JOIN categories as c ON p.cat_id = c.id  where c.title LIKE '%${catName}%' ORDER BY p.id ASC limit ?, ? `, [startValue, endValue])
        if(products.length>0){
            res.status(200).json({
                count: products.length,
                products: products
            })
        } else{
            res.json({message: `No products found for ${catName} category`})
        }
    } catch(error){
        console.log(error);
    }
})



module.exports = router