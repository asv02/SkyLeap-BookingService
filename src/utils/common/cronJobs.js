const cron = require("node-cron");

const cronJobs = () => {
  cron.schedule("* * * * *", () => {
    console.log("running a task every minute");
  });
};

module.exports = { cronJobs };
