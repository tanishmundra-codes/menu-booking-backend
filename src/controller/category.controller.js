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

async function updateCategory(req, res) {
    try {
        const { id } = req.params;

        let updateData = {};

        const allowedFields = [
            "name",
            "image",
            "description",
            "tax_applicable",
            "tax_percentage",
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedCategory,
            message: "Category updated successfully",
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Category with this name already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
}

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { is_active: false },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedCategory,
            message: "Category deactivated successfully",
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
    getAllCategories,
    updateCategory,
    deleteCategory,
};
