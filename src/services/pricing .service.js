const Category = require("../models/category.model");
const Subcategory = require("../models/subcategory.model");

async function resolveTax(item) {

  if (item.tax_applicable !== undefined) {
    return {
      tax_applicable: item.tax_applicable,
      tax_percentage: item.tax_percentage || 0,
    };
  }

  if (item.parent_type === "subcategory") {
    const subcategory = await Subcategory.findById(item.parent_id);
    if (subcategory && subcategory.tax_applicable !== undefined) {
      return {
        tax_applicable: subcategory.tax_applicable,
        tax_percentage: subcategory.tax_percentage || 0,
      };
    }

    if (subcategory) {
      const category = await Category.findById(subcategory.category_id);
      if (category) {
        return {
          tax_applicable: category.tax_applicable,
          tax_percentage: category.tax_percentage || 0,
        };
      }
    }
  }

  if (item.parent_type === "category") {
    const category = await Category.findById(item.parent_id);
    if (category) {
      return {
        tax_applicable: category.tax_applicable,
        tax_percentage: category.tax_percentage || 0,
      };
    }
  }

  return { tax_applicable: false, tax_percentage: 0 };
}

function resolveBasePrice(item) {
  const { pricing_type, pricing_config } = item;

  if (pricing_type === "STATIC") {
    return {
      base_price: pricing_config.price,
      discount: 0,
      discounted_price: pricing_config.price,
    };
  }

  if (pricing_type === "DISCOUNTED") {
    const { base_price, discount_type, discount_value } = pricing_config;

    let discount = 0;

    if (discount_type === "FLAT") {
      discount = discount_value;
    } else if (discount_type === "PERCENT") {
      discount = (base_price * discount_value) / 100;
    }

    let discounted_price = base_price - discount;
    if (discounted_price < 0) discounted_price = 0;

    return {
      base_price,
      discount,
      discounted_price,
    };
  }

  throw new Error("Unsupported pricing type");
}

async function calculateFinalPrice(item) {
  const priceResult = resolveBasePrice(item);
  const taxResult = await resolveTax(item);

  let tax_amount = 0;
  if (taxResult.tax_applicable) {
    tax_amount = (priceResult.discounted_price * taxResult.tax_percentage) / 100;
  }

  const final_price = priceResult.discounted_price + tax_amount;

  return {
    pricing_type: item.pricing_type,
    base_price: priceResult.base_price,
    discount: priceResult.discount,
    discounted_price: priceResult.discounted_price,
    tax_percentage: taxResult.tax_percentage,
    tax_amount,
    final_price,
  };
}

module.exports = { calculateFinalPrice };
