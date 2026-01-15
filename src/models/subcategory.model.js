const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        tax_applicable: {
            type: Boolean,
        },
        tax_percentage: {
            type: Number,
            min: 0,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

subcategorySchema.index({ category_id: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Subcategory', subcategorySchema);