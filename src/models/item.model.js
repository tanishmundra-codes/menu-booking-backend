const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },

    parent_type: {
      type: String,
      enum: ["category", "subcategory"],
      required: true,
    },

    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "parent_type",
    },

    tax_applicable: {
      type: Boolean,
    },

    tax_percentage: {
      type: Number,
      min: 0,
    },

    pricing_type: {
      type: String,
      enum: ["STATIC", "DISCOUNTED", "TIERED", "DYNAMIC", "FREE"],
      required: true,
    },

    pricing_config: {
      type: Object,
      required: true,
    },

    is_bookable: {
      type: Boolean,
      default: false,
    },

    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

itemSchema.index(
  { parent_type: 1, parent_id: 1, name: 1 },
  { unique: true }
);

module.exports = mongoose.model("Item", itemSchema);
