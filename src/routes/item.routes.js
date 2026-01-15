const express = require("express");
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controller/item.controller");

const router = express.Router();

router.post("/items", createItem);
router.get("/items", getItems);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

module.exports = router;
