import jwt from 'jsonwebtoken'
import asyncHandler from './async.js';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/User.js';

export const protect = asyncHandler(async (req , res , next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    /* else if(req.cookies.token) {
        token = req.cookies.token;
    } */
    if(!token) {
        return next(new ErrorResponse('Not authorized' , 401));
    }
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRETE);
        // console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('Not authorized to access' , 401));
    }
});

export const authorize = (...roles) => (req , res , next) => {
    if(!roles.includes(req.user.role)) {
        return next(new ErrorResponse('Not authorized' , 403));
    }
    next();
}