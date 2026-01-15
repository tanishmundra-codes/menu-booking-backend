const express = require('express');
const Joi = require("joi")
const categoryRoute = require("./routes/category.routes")
const subcategoryRoutes = require("./routes/subcategory.routes");

const app = express();
const category = require("./controller/category.controller");

app.use(express.json());
app.use("/", categoryRoute);
app.use(subcategoryRoutes);

module.exports = app;