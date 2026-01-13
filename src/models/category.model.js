const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    tax_applicable: {
      type: Boolean,
      default: false,
    },
    tax_percentage: {
      type: Number,
      validate: {
        validator: function (value) {
          if (this.tax_applicable === true && (value === null || value === undefined)) {
            return false;
          }
          
          if (this.tax_applicable === false && value !== null && value !== undefined) {
            return false;
          }

          return true;
        },
        message:
          "Tax percentage must be present only when tax_applicable is true, and must be absent when tax_applicable is false.",
      },
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
