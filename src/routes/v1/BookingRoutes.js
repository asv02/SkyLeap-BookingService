const express = require("express");
const router = express.Router();
const { BookingController } = require("../../controllers");

const bookingController = new BookingController();

router.post(
  "/:userId/createBooking/:id/",
  bookingController.handleCreateBooking
);
router.post(
  "/:userId/handlePayment/:bookingId/",
  bookingController.handlePayment
);

module.exports = router;
