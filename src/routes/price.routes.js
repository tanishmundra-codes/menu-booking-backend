const express = require("express");
const { getItemPrice } = require("../controllers/price.controller");

const router = express.Router();

router.get("/items/:id/price", getItemPrice);

module.exports = router;
