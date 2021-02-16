import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';

//@desc     Register users
//@route    POST /api/v1/auth/register
//@access   Public
export const userRegister = asyncHandler(async (req , res , next) => {
    const  {name , email , password , role} = req.body;
    const user = await User.create({
        name ,
        email ,
        role ,
        password
    });
    sendTokenResponse(user , 200 , res);
});

//@desc     Login users
//@route    POST /api/v1/auth/login
//@access   Public
export const userLogin = asyncHandler(async (req , res , next) => {
    const { email , password } = req.body;
    if(!email || !password) {
        return next(new ErrorResponse('Please enter email and password' , 401));
    }
    const user = await User.findOne({ email }).select('+password');
    if(!user) {
        return next(new ErrorResponse('Invalid credential' , 401));
    }
    const matchPassword = await user.matchUserPassword(password);
    if(!matchPassword) {
        return next(new ErrorResponse('Invalid credential' , 401));
    }
    sendTokenResponse(user , 200 , res);
});

const sendTokenResponse = (user , statusCode , res) => {
    const token = user.getSignedJwtToken();
    // console.log(process.env.JWT_COOKIE_EXPIRE);
    const options = {
        expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRE * 60 * 60 * 24 * 1000)) ,
        httpOnly: true
    };

    res
        .status(statusCode)
        .cookie('token' , token , options)
        .json({
            success: true,
            token
        });
}

//@desc     Get current logged in user
//@route    GET /api/v1/auth/me
//@access   Private
export const getMe = asyncHandler(async (req , res , next) => {
    // console.log(req.user._id);
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true ,
        data: user
    })
});