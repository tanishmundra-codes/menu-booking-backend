const express = require("express");
const {
  addAvailability,
  getAvailability,
} = require("../controller/availability.controller");

const router = express.Router();

router.post("/items/:id/availability", addAvailability);
router.get("/items/:id/availability", getAvailability);

module.exports = router;
