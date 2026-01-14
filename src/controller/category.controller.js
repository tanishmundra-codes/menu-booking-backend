const Category = require("../models/category.model");

async function createCategory(req, res) {
    try {
        // Read input
        const { name, image, description, tax_applicable, tax_percentage, is_active } = req.body;

        // Apply logic
        const newCategory = new Category({
            name,
            image,
            description,
            tax_applicable,
            tax_percentage,
            is_active
        });
        
        // Query DB
        const savedCategory = await newCategory.save();
        
        // Return response
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
        let { limit, page } = req.query;

        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }

        limit = Number(limit);
        page = Number(page);

        let skip = (page - 1) * limit

        const categories = await Category.find({})
            .skip(skip)
            .limit(limit)

        const total = await Category.countDocuments();

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
