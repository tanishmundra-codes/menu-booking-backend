const Category = require("../models/category.model");

async function createCategory(req, res) {
    try {
        const { name, image, description, tax_applicable, tax_percentage, is_active } = req.body;

        const newCategory = new Category({
            name,
            image,
            description,
            tax_applicable,
            tax_percentage,
            is_active
        });

        const savedCategory = await newCategory.save();

        return res.status(201).json({
            success: true,
            data: savedCategory,
            message: "Category created successfully",
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Category already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
}

module.exports = {
    createCategory,
};
