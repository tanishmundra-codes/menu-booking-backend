const Availability = require("../models/availability.model");

async function addAvailability(req, res) {
  try {
    const { id } = req.params;
    const { day_of_week, start_time, end_time } = req.body;

    const slot = await Availability.create({
      item_id: id,
      day_of_week,
      start_time,
      end_time,
    });

    return res.status(201).json({
      success: true,
      data: slot,
      message: "Availability slot added",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add availability",
      error: error.message,
    });
  }
}

async function getAvailability(req, res) {
  try {
    const { id } = req.params;

    const slots = await Availability.find({
      item_id: id,
      is_active: true,
    });

    return res.status(200).json({
      success: true,
      data: slots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch availability",
      error: error.message,
    });
  }
}

module.exports = { addAvailability, getAvailability };
