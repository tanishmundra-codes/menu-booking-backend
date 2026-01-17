const express = require("express");
const { getItemPrice } = require("../controller/price.controller");

const router = express.Router();

router.get("/items/:id/price", getItemPrice);

module.exports = router;
