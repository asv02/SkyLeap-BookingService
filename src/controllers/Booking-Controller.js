const { StatusCodes } = require("http-status-codes");
const { BookingServices } = require("../services");
const { successResponse, errorResponse } = require("../utils");
const { ApiError } = require("../utils");

class BookingController {
  constructor() {
    this.bookingServices = new BookingServices();
    this.handleCreateBooking = this.handleCreateBooking.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
  }

  async handleCreateBooking(req, res) {
    const flightId = parseInt(req.params.id);
    const userId = parseInt(req.params.userId);
    const totalSeats = parseInt(req.body.totalSeats);

    try {
      const resp = await this.bookingServices.createBooking(
        flightId,
        userId,
        totalSeats
      );
      successResponse.data = resp;
      return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      errorResponse.message = error.message;
      res.status(error.statusCode).send(errorResponse);
    }
  }

  async handlePayment(req, res) {
    //bookingId, userId, totalCost
    const bookingId = req?.params?.bookingId;
    const userId = req?.params?.userId;
    const totalCost = req?.body?.totalCost;

    try {
      const data = {
        bookingId: parseInt(bookingId),
        userId: parseInt(userId),
        totalCost: parseFloat(totalCost),
      };

      const response = await this.bookingServices.makePayment(data);
      console.log("Response->", response);
      successResponse.data = response;
      successResponse.message = "Payment successfull";
      return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      errorResponse.message = error.message;
      res.status(500).send(errorResponse);
    }
  }
}

module.exports = { BookingController };
