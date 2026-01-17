const Item = require("../models/item.model");
const { calculateFinalPrice } = require("../services/pricing.service");

async function getItemPrice(req, res) {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);

    if (!item || !item.is_active) {
      return res.status(404).json({
        success: false,
        message: "Item not found or inactive",
      });
    }

    let addonIds = [];

    if (req.query.addons) {
      addonIds = req.query.addons.split(",");
    }

    const priceBreakdown = await calculateFinalPrice(item, addonIds);


    return res.status(200).json({
      success: true,
      data: priceBreakdown,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to calculate price",
      error: error.message,
    });
  }
}

module.exports = { getItemPrice };
