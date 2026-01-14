const express = require("express");
const {createCategory} = require("../controller/category.controller");
const router = express.Router();

router.post("/categories", createCategory)

module.exports = router;