const Item = require("../models/item.model");

async function createItem(req, res) {
  try {
    const {
      name,
      description,
      image,
      parent_type,
      parent_id,
      tax_applicable,
      tax_percentage,
      pricing_type,
      pricing_config,
      is_bookable,
    } = req.body;

    const item = await Item.create({
      name,
      description,
      image,
      parent_type,
      parent_id,
      tax_applicable,
      tax_percentage,
      pricing_type,
      pricing_config,
      is_bookable,
    });

    return res.status(201).json({
      success: true,
      data: item,
      message: "Item created successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Item with this name already exists under this parent",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

async function getItems(req, res) {
  try {
    let { parent_type, parent_id, page, limit } = req.query;

    page = page ? Number(page) : 1;
    limit = limit ? Number(limit) : 10;
    const skip = (page - 1) * limit;

    let filter = { is_active: true };

    if (parent_type && parent_id) {
      filter.parent_type = parent_type;
      filter.parent_id = parent_id;
    }

    const items = await Item.find(filter).skip(skip).limit(limit);
    const total = await Item.countDocuments(filter);

    return res.status(200).json({
      success: true,
      page,
      limit,
      total,
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

async function updateItem(req, res) {
  try {
    const { id } = req.params;

    const allowedFields = [
      "name",
      "description",
      "image",
      "tax_applicable",
      "tax_percentage",
      "pricing_type",
      "pricing_config",
      "is_bookable",
    ];

    let updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedItem,
      message: "Item updated successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Item with this name already exists under this parent",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndUpdate(
      id,
      { is_active: false },
      { new: true }
    );

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedItem,
      message: "Item deactivated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
