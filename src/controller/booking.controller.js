const Booking = require("../models/booking.model");
const Availability = require("../models/availability.model");

function getDayOfWeek(dateStr) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateStr);
  return days[date.getDay()];
}

async function bookSlot(req, res) {
  try {
    const { id } = req.params;
    const { date, start_time, end_time } = req.body;

    const day = getDayOfWeek(date);

    const slotExists = await Availability.findOne({
      item_id: id,
      day_of_week: day,
      start_time,
      end_time,
      is_active: true,
    });

    if (!slotExists) {
      return res.status(400).json({
        success: false,
        message: "Slot not available",
      });
    }

    const alreadyBooked = await Booking.findOne({
      item_id: id,
      date,
      start_time,
      end_time,
      status: "BOOKED",
    });

    if (alreadyBooked) {
      return res.status(409).json({
        success: false,
        message: "Slot already booked",
      });
    }

    const booking = await Booking.create({
      item_id: id,
      date,
      start_time,
      end_time,
    });

    return res.status(201).json({
      success: true,
      data: booking,
      message: "Slot booked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Booking failed",
      error: error.message,
    });
  }
}

async function getBookings(req, res) {
  try {
    const { id } = req.params;

    const bookings = await Booking.find({
      item_id: id,
      status: "BOOKED",
    });

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
}

module.exports = { bookSlot, getBookings };
