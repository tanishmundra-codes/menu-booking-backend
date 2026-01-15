const express = require('express');
const Joi = require("joi")
const categoryRoute = require("./routes/category.routes")
const subcategoryRoutes = require("./routes/subcategory.routes");
const itemRoutes = require("./routes/item.routes");
const priceRoutes = require("./routes/price.routes");

const app = express();


app.use(express.json());
app.use("/", categoryRoute);
app.use(subcategoryRoutes);
app.use(itemRoutes);
app.use(priceRoutes);

module.exports = app;