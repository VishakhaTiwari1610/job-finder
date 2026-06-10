import logger from "../utils/logger.js";

const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;

        const logEntry = {
            event: "api_request",
            method: req.method,
            route: req.originalUrl,
            statusCode: res.statusCode,
            responseTime: duration,
            userId: req.id || null,
            ip: req.ip,
            timestamp: new Date().toISOString()
        };

        logger.info(logEntry);
    });

    next();
};

export default requestLogger;
