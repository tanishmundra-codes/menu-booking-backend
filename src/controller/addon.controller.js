const Addon = require("../models/addon.model");

async function createAddon(req, res) {
  try {
    const { id } = req.params;
    const { name, price, is_mandatory } = req.body;

    const addon = await Addon.create({
      item_id: id,
      name,
      price,
      is_mandatory,
    });

    return res.status(201).json({
      success: true,
      data: addon,
      message: "Addon created successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Addon already exists for this item",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create addon",
      error: error.message,
    });
  }
}

async function getAddons(req, res) {
  try {
    const { id } = req.params;

    const addons = await Addon.find({
      item_id: id,
      is_active: true,
    });

    return res.status(200).json({
      success: true,
      data: addons,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch addons",
      error: error.message,
    });
  }
}

module.exports = { createAddon, getAddons };
