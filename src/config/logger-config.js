const winston = require("winston");

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp({ format: "YYYY:MM:DD HH:MM:SS" }), myFormat),
  transports: [
    new winston.transports.File({ filename: "combined.log"}),
    new winston.transports.File({ filename: "error.log", level: 'error' }),
    new transports.Console(),
  ],
});

module.exports = { logger };
