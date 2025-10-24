const infoController = require("./info-controller");
const { BookingController } = require("./Booking-Controller");

console.log("1level up->", typeof BookingController);
module.exports = {
  infoController,
  BookingController,
};
