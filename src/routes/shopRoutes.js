
const express = require("express");

const shopController = require("../controllers/shopControllers.js");

const router = express.Router();

router.get('/', shopController.products );

router.get('/cart', shopController.cart );

router.get('/product/:id', shopController.product );

module.exports = router;