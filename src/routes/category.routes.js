const express = require("express");
const validate = require("../middlewares/validate");
const { createCategorySchema, updateCategorySchema } = require("../validations/category.validation");
const {createCategory, getAllCategories,updateCategory} = require("../controller/category.controller");
const router = express.Router();

router.post("/categories", validate(createCategorySchema), createCategory)
router.get("/categories", getAllCategories)
router.put("/categories/:id", validate(updateCategorySchema), updateCategory)

module.exports = router;