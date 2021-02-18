import crypto from 'crypto'
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import sendEmail from '../utils//sendEmail.js'

//@desc     Register users
//@route    POST /api/v1/auth/register
//@access   Public
export const userRegister = asyncHandler(async (req, res, next) => {
    const {
        name,
        email,
        password,
        role
    } = req.body;
    const user = await User.create({
        name,
        email,
        role,
        password
    });
    sendTokenResponse(user, 200, res);
});

//@desc     Login users
//@route    POST /api/v1/auth/login
//@access   Public
export const userLogin = asyncHandler(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse('Please enter email and password', 401));
    }
    const user = await User.findOne({
        email
    }).select('+password');
    if (!user) {
        return next(new ErrorResponse('Invalid credential', 401));
    }
    const matchPassword = await user.matchUserPassword(password);
    if (!matchPassword) {
        return next(new ErrorResponse('Invalid credential', 401));
    }
    // console.log(user);
    sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    // console.log(process.env.JWT_COOKIE_EXPIRE);
    const options = {
        expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRE * 60 * 60 * 24 * 1000)),
        httpOnly: true
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
}

//@desc     Get current logged in user
//@route    GET /api/v1/auth/me
//@access   Private
export const getMe = asyncHandler(async (req, res, next) => {
    // console.log(req.user._id);
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        data: user
    });
});

//@desc     Forgot password
//@route    GET /api/v1/auth/forgotpassword
//@access   Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        return next(new ErrorResponse(`There is no user with email of ${req.body.email}`, 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({
        validateBeforeSave: false
    });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) 
    has requested the reset of the password. Please make a request to \n\n${resetUrl}`;

    try {
        await sendEmail({
            email: user.email ,
            subject: 'Reset Password' ,
            message
        });
        res.status(200).json({
            success: true ,
            message: 'Email has sent'
        });
    } catch (error) {
        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse('Something error with sending email' , 500));
    }
});

//@desc     Reset password
//@route    POST /api/v1/auth/resetpassword/:resetToken
//@access   Public
export const resetPassword = asyncHandler(async (req , res , next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    const user = await User.findOne({
        resetPasswordToken ,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if(!user) {
        return next(new ErrorResponse('Your link has been expired or invalid token. Please try again' , 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    sendTokenResponse(user, 200, res);
});

//@desc     Update user details
//@route    PUT/api/v1/auth/updatedetails
//@access   Private
export const updateDetails = asyncHandler(async (req , res , next) => {
    const fieldsToUpdate = {
        name: req.body.name ,
        email: req.body.email
    };

    let user = await User.findById(req.user.id);

    if(!user) {
        return next(new ErrorResponse(`There is no user with id of` , 404));
    }
    user = await User.findById(req.user.id , fieldsToUpdate , {
        new: true ,
        runValidators: true
    });
    sendTokenResponse(user, 200, res);
});

//@desc     Update user password
//@route    PUT/api/v1/auth/updatepassword
//@access   Private
export const updatePassword = asyncHandler(async (req , res , next) => {
    const { oldPassword , newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');
    if(!user) {
        return next(new ErrorResponse(`There is no user with id of ${req.user.id}` , 404));
    }

    const matchPassword = await user.matchUserPassword(oldPassword);
    if(!matchPassword) {
        return next(new ErrorResponse('Please enter valid password' , 400));
    }
    user.password = newPassword;
    user.save();
    sendTokenResponse(user, 200, res);
})