const { StatusCodes } = require("http-status-codes");
const { BookingRepositories } = require("../repositories/booking-repositories");
const { ApiError } = require("../utils");
const db = require("../models");

const { serverConfig } = require("../config");
const { json } = require("sequelize");

const { BOOKING_STATUS } = require("../utils");
const { BOOKED } = BOOKING_STATUS;

class BookingServices extends BookingRepositories {
  constructor() {
    super();
  }

  async createBooking(flightId, userId, noOfSeats) {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const flight = await fetch(
          `${serverConfig.SKYLEAP_BASE_SERVICE}/api/v1/flight_routes/getAFlight/${flightId}`
        );

        if (!flight.ok) {
          throw new ApiError(
            "Cannot fetch flight detail at service layer",
            StatusCodes.INTERNAL_SERVER_ERROR
          );
        }
        const resp = await flight.json();
        if (noOfSeats > resp.data.totalSeats) {
          throw new ApiError(
            `${noOfSeats} seats are not available in this flight`,
            StatusCodes.BAD_REQUEST
          );
        }
        console.log("Total cost of Person------>>>", resp);
        const totalCost = parseInt(resp.data.price * noOfSeats);
        const temp = await fetch(
          `${serverConfig.SKYLEAP_BASE_SERVICE}/api/v1/flight_routes/updateflight/${flightId}`,
          {
            method: "PATCH",
            body: JSON.stringify({ seats: noOfSeats, desc: true }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Temp---------->>>>", temp);

        const response = await this.createbooking(
          {
            flightId: flightId,
            userId: userId,
            noOfSeats: noOfSeats,
            totalCost: totalCost,
          },
          transaction
        );
        return response;
      });
      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async makePayment(data) {
    try {
      const result = await db.sequelize.transaction(async (t) => {
        const { bookingId, userId, totalCost } = data;
        const bookingDetails = await this.getBooking(bookingId, t);

        console.log("Booking details->", bookingDetails);

        if (
          !bookingDetails ||
          bookingDetails.userId != userId ||
          bookingDetails.totalCost != totalCost
        ) {
          throw new ApiError("INVALID DATA", StatusCodes.BAD_REQUEST);
        }

        // Here Payment Successfull
        const booked = await this.update(
          { status: BOOKED, bookingId: bookingId },
          t
        );
        return booked;
      });
      return result;
    } catch (error) {
      console.log("Error->", error);
      throw error;
    }
  }
}

module.exports = { BookingServices };
