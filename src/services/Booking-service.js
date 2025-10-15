const { BookingRepositories } = require("../repositories/booking-repositories");

class BookingServices extends BookingRepositories {
  constructor() {
    super();
  }
}

module.exports = {BookingServices}
