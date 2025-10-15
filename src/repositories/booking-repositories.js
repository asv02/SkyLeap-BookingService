const { CrudRepo } = require("./crud-repo");
const { Booking } = require("../models");

class BookingRepositories extends CrudRepo {
  constructor() {
    super(Booking);
  }
}

module.exports = { BookingRepositories };
