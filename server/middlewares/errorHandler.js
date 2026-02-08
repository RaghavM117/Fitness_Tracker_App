const errorHandler = (err, req, res, next) => {
    // handling duplicate mongoDB value
    if (err.code === 11000) {
        ((err.status = 409), (err.message = "Duplicate Field Value"));
    }

    const statusCode = err.status || err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message || "Internal Server Error",
            statusCode,
        },
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

export default errorHandler;
