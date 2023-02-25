var { Router } = require('express');
var router = Router();
var pool = require('../database/connection');

router.get('/', async(req,res) => {
    try{
        const orders = await pool.query(`select o.id, p.title as name, p.description, p.price, u.username from orders_details as od JOIN orders as o ON o.id = od.order_id JOIN products as p ON p.id = od.product_id JOIN users as u ON u.id = o.user_id order BY o.id ASC`);
        if(orders.length>0){
            res.status(200).json(orders)
        } else{
            res.json({message: `No orders found.`})
        }
    }
    catch(error){
        console.log(error);
    }
})

router.get('/:id', async(req,res) => {
    try{
        orderId = req.params.id
        const orders = await pool.query(`select o.id as orderId, p.title as name, p.description, p.price, u.username from orders_details as od JOIN orders as o ON o.id = od.order_id JOIN products as p ON p.id = od.product_id JOIN users as u ON u.id = o.user_id  where o.id = '${orderId}' order BY o.id ASC`);
        if(orders.length>0){
            res.status(200).json(orders)
        } else{
            res.json({message: `No orders found with orderId ${orderId}`})
        }
    }
    catch(error){
        console.log(error);
    }
})


router.post('/new', async(req,res) => {
    try{
        let {userId, products} = req.body;
        if(userId!== null && userId>0 && !isNaN(userId)){
            try{
                let newOrderId = await pool.query(`Insert into orders (user_id) values ('${userId}')`);
                newOrderId = newOrderId.insertId
                if(newOrderId > 0){
                    products.forEach(async p => {
                        let data = await pool.query(`select quantity from products where id = '${p.id}'`);
                        let incart = p.incart;
                        if(data.quantity>0){
                            data.quantity = data.quantity - incart;
                            if(data.quantity<0) data.quantity=0;
                        }else{
                            data.quantity = 0;
                        }
                        try{
                            await pool.query(`Insert into orders_details (order_id, product_id, quantity) values ('${newOrderId}', '${p.id}', '${incart}')`);
                            try{
                                await pool.query(`update products set quantity = '${data.quantity}' where id = '${p.id}'`)
                            }catch(error){
                                console.log(error)
                            };
                        }catch(error){
                            console.log(error)
                        };
                        
                    });
                }else{
                    res.json({message: 'New order failed while adding order details', success: false})
                }
                res.json({
                    message: `Order successfully placed with order id ${newOrderId}`,
                    success: true,
                    order_id: newOrderId,
                    products: products
                })
            }catch(error){
                console.log(error);
            } 
        } else {
            res.json({
                message: 'New order failed',
                success: false
            })
        }
    }
    catch(error){
        console.log(error);
    }
});

router.post('/payment', (req,res) => {
    setTimeout(() => {
        res.status(200).json({success: true})
    }, 3000);
})

module.exports = router