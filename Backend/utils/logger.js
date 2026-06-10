import winston from "winston";
import { sendToSQS } from "./sqsSender.js";
import { mkdirSync } from "fs";

mkdirSync("logs", { recursive: true });

const sqsForward = winston.format((info) => {
    // Send every log entry to SQS asynchronously
    const logEntry = {
        ...(typeof info.message === "object" ? info.message : { message: info.message }),
        level: info.level,
        timestamp: info.timestamp || new Date().toISOString()
    };
    sendToSQS(logEntry);
    return info;
});

const logger = winston.createLogger({
    level:"info",
    format:winston.format.combine(
        winston.format.timestamp(),
        sqsForward(),
        winston.format.json()
    ),
    transports: [
         new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/app.log" })
    ]
});
export default logger;
