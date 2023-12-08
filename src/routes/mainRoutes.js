
const express = require("express");

const mainControllers = require("../controllers/mainControllers.js")

const router = express.Router();

router.get('/', mainControllers.home );

router.get('/contact', mainControllers.contact );

module.exports = router;