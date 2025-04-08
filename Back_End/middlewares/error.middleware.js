const errorMiddleware = (err, req, res, next) => {
    console.error("Error:", err);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle MongoDB ObjectId errors
    if (err.name === 'CastError') {
        message = 'Resource not found. Invalid ID.';
        statusCode = 404;
    }

    // Handle Mongoose duplicate key errors
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate value entered for field: "${field}"`;
        statusCode = 400;
    }

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map(val => val.message).join(', ');
        statusCode = 400;
    }

    // Handle Firebase auth errors (if any)
    if (err.code?.startsWith('auth/')) {
        message = `Firebase Auth Error: ${err.message}`;
        statusCode = 401;
    }

    res.status(statusCode).json({
        success: false,
        error: message
    });
};

export default errorMiddleware;
