const express = require("express");
const {
  createSubcategory,
  getSubcategoriesByCategory,
  updateSubcategory,
  deleteSubcategory,
} = require("../controller/subcategory.controller");

const router = express.Router();

router.post("/categories/:categoryId/subcategories", createSubcategory);
router.get("/categories/:categoryId/subcategories", getSubcategoriesByCategory);
router.put("/subcategories/:id", updateSubcategory);
router.delete("/subcategories/:id", deleteSubcategory);

module.exports = router;
