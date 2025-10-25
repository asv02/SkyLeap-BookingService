const { CrudRepo } = require("./crud-repo");
const { Booking } = require("../models");
const { Op } = require("sequelize");
const { BOOKING_STATUS } = require("../utils");
const { BOOKED, CANCELLED, INITIATED } = BOOKING_STATUS;

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

  async cancelOldBooking(timeStamp) {
    try {
      const response = await Booking.update(
        { status: CANCELLED },
        {
          where: {
            createdAt: { [Op.lt]: timeStamp},status: { [Op.ne]: BOOKED }
          },
        }
      );
      return response;
    } catch (error) {
      console.log("error in timestamp->", error);
    }
  }
}

module.exports = { BookingRepositories };
