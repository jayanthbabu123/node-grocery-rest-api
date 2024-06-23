const express = require("express");
const router = express.Router();
const Product = require("../model/Products");
const Order = require("../model/Order");

// Route to create a new order
router.post("/", async (req, res) => {
    try {
        const { productList } = req.body; // Expecting an array of objects { productId, quantity }
        let totalCost = 0;

        const productDetails = await Promise.all(
            productList.map(item =>
                Product.findById(item.productId).then(product => {
                    if (!product) {
                        throw new Error(`Product with ID ${item.productId} not found`);
                    }
                    
                    return {
                        product: product._id,
                        quantity: item.quantity,
                        price: product.price
                    };
                })
            )
        );

        productDetails.forEach(item => {
            totalCost += item.quantity * item.price;
        });

        const order = new Order({
            products: productDetails.map(item => ({
                product: item.product,
                quantity: item.quantity
            })),
            totalCost
        });

        await order.save();

        res.status(201).send(order);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Route to get all orders
router.get("/totalorders", async (req, res) => {
    try {
        const orders = await Order.find({})
                                .populate('products.product', 'name price description image');
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



module.exports = router;
