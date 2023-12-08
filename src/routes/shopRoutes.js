
const express = require("express");

const shopController = require("../controllers/shopControllers.js");

const router = express.Router();

router.get('/', shopController.products );

router.get('/:id', shopController.product );

router.get('/cart', shopController.cart );

module.exports = router;