const Joi = require("joi");

const createCategorySchema = Joi.object({
    name: Joi.string().trim().min(1).required,

    image: Joi.string().uri().optional(),

    description: Joi.string().optional(),

    tax_applicable: Joi.boolean().default(false),
    
    tax_percentage: Joi.when("tax_applicable", {
        is: true,
        then: Joi.number().min(0).required(),
        otherwise: Joi.forbidden(),
    }),

    is_active: Joi.boolean.optional(),
});

const updateCategorySchema = Joi.object({
    name: Joi.string().trim().min(1).optional(),

    image: Joi.string().uri().optional(),

    description: Joi.string().optional(),

    tax_applicable: Joi.boolean().optional(),

    tax_percentage: Joi.when("tax_applicable", {
        is: true,
        then: Joi.number().min(0).required(),
        otherwise: Joi.forbidden(),
    }),

    is_active: Joi.boolean().optional(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};