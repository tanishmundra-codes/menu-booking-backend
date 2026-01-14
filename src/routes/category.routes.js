const express = require("express");
const {createCategory, getAllCategories} = require("../controller/category.controller");
const router = express.Router();

router.post("/categories", createCategory)
router.get("/categories", getAllCategories)

module.exports = router;