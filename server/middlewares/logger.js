import "colors";

const logger = (req, res, next) => {
    const methodLoggers = {
        GET: "green",
        PUT: "blue",
        POST: "yellow",
        DELETE: "red",
        PATCH: "cyan",
    };

    const color = methodLoggers[req.method] || "white";

    const logMessage = `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`;

    console.log(logMessage[color]);

    next();
};

export default logger;
