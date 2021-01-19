
module.exports = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const validation = error.validation;

    return res.status(status).json({
        error: {
            status: status,
            message: message,
            validation: validation
        }
    });
}