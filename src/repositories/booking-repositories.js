const { CrudRepo } = require("./crud-repo");
const { Booking } = require("../models");

class BookingRepositories extends CrudRepo {
  constructor() {
    super(Booking);
  }

  async createbooking(data, transaction) {
    try {
      const res = await Booking.create(data, { transaction });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getBooking(data, transaction) {
    try {
      const res = await Booking.findByPk(data, { transaction });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(data, transaction) {
    try {
      const res = await Booking.update(
        data,
        {
          where: {
            id: data.bookingId,
          },
        },
        { transaction }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = { BookingRepositories };
