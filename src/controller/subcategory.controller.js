const Subcategory = require("../models/subcategory.model");

async function createSubcategory(req, res) {
  try {
    const { categoryId } = req.params;
    const { name, image, description, tax_applicable, tax_percentage } = req.body;

    const subcategory = await Subcategory.create({
      name,
      image,
      description,
      category_id: categoryId,
      tax_applicable,
      tax_percentage,
    });

    return res.status(201).json({
      success: true,
      data: subcategory,
      message: "Subcategory created successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Subcategory with this name already exists in this category",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

async function getSubcategoriesByCategory(req, res) {
  try {
    const { categoryId } = req.params;
    let { page, limit } = req.query;

    page = page ? Number(page) : 1;
    limit = limit ? Number(limit) : 10;

    const skip = (page - 1) * limit;

    const subcategories = await Subcategory.find({
      category_id: categoryId,
      is_active: true,
    })
      .skip(skip)
      .limit(limit);

    const total = await Subcategory.countDocuments({
      category_id: categoryId,
      is_active: true,
    });

    return res.status(200).json({
      success: true,
      page,
      limit,
      total,
      data: subcategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

async function updateSubcategory(req, res) {
  try {
    const { id } = req.params;

    const allowedFields = [
      "name",
      "image",
      "description",
      "tax_applicable",
      "tax_percentage",
    ];

    let updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedSubcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedSubcategory,
      message: "Subcategory updated successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Subcategory with this name already exists in this category",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

async function deleteSubcategory(req, res) {
  try {
    const { id } = req.params;

    const deletedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      { is_active: false },
      { new: true }
    );

    if (!deletedSubcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedSubcategory,
      message: "Subcategory deactivated successfully",
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
  createSubcategory,
  getSubcategoriesByCategory,
  updateSubcategory,
  deleteSubcategory,
};
