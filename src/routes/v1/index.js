const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");
const BookingRoutes = require("./BookingRoutes");

router.use("/booking", BookingRoutes);
// router.get("/info", controllers.infoController.info);

module.exports = router;
