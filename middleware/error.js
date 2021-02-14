import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = async (err , req , res , next) => {
    let error = { ...err };

    error.message = err.message;
    console.log(err);

    if(err.name === 'CastError') {
        const message = `There is no resource with id of ${err.value}`;
        error = new ErrorResponse(message , 400);
    }

    if(err.code === 11000) {
        const message = 'Duplicate values entered';
        error = new ErrorResponse(message , 400);
    }

    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorResponse(message , 400);
    }

    res.status(error.status || 500).json({
        success: false ,
        message: error.message || 'Server error'
    });
}

export default errorHandler