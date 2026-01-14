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

async function getAllCategories(req, res) {
    try {
        let { is_active, limit, page } = req.query;

        page = page ? Number(page) : 1;
        limit = limit ? Number(limit) : 10;

        const skip = (page - 1) * limit;

        let filter = {};

        if (is_active !== undefined) {
            if (is_active === "true") {
                filter.is_active = true;
            } else if (is_active === "false") {
                filter.is_active = false;
            }
        }

        const categories = await Category.find(filter)
            .skip(skip)
            .limit(limit);

        const total = await Category.countDocuments(filter);

        return res.status(200).json({
            success: true,
            page,
            limit,
            total,
            data: categories,
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
    createCategory,
    getAllCategories
};
