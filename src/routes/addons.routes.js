const express = require("express");
const { createAddon, getAddons } = require("../controller/addon.controller");

const router = express.Router();

router.post("/items/:id/addons", createAddon);
router.get("/items/:id/addons", getAddons);

module.exports = router;
