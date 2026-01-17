const express = require("express");
const {
  bookSlot,
  getBookings,
} = require("../controller/booking.controller");

const router = express.Router();

router.post("/items/:id/book", bookSlot);
router.get("/items/:id/bookings", getBookings);

module.exports = router;
