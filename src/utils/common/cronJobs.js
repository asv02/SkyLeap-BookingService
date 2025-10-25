const cron = require("node-cron");
const { BookingServices } = require("../../services");

const cronJobs = async () => {
  const BookingService = new BookingServices();
  cron.schedule("*/30 * * * *", async () => {
    // const methods = Object.getOwnPropertyNames(
    //   Object.getPrototypeOf(BookingService)
    // ).filter((prop) => typeof BookingService[prop] === "function");

    // console.log(methods);
    console.log("running a task every second");
    const response = await BookingService.cancelOldBookings();
    console.log("response->", response.length);
  });
};

module.exports = { cronJobs };
