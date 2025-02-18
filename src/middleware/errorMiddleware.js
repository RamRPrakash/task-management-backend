const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error for debugging

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Hide stack trace in production
    });
};

module.exports = errorHandler;
