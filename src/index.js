const express = require('express');
const Joi = require("joi")
const categoryRoute = require("./routes/category.routes")
const subcategoryRoutes = require("./routes/subcategory.routes");
const itemRoutes = require("./routes/item.routes");
const priceRoutes = require("./routes/price.routes");
const availabilityRoutes = require("./routes/availability.routes");
const bookingRoutes = require("./routes/booking.routes");
const addonsRoutes = require("./routes/addons.routes");

const app = express();


app.use(express.json());
app.use("/", categoryRoute);
app.use(subcategoryRoutes);
app.use(itemRoutes);
app.use(priceRoutes);
app.use(availabilityRoutes);
app.use(bookingRoutes);
app.use(addonsRoutes);

module.exports = app;