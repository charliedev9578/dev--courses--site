import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';


//@desc     Get all users
//@route    GET /api/v1/users
//@access   Admin
export const getUsers = asyncHandler(async (req , res , next) => {
    res.status(200).json(res.advancedResults);
});

//@desc     Get single user
//@route    GET /api/v1/users/:userId
//@access   Admin
export const getUserById = asyncHandler(async (req , res , next) => {
    const user = await User.findById(req.params.userId);
    if(!user) {
        return next(new ErrorResponse(`There is no user with id of ${req.params.userId}` , 404));
    }
    res.status(200).json({
        success: true ,
        data: user
    });
});

//@desc     Create new User
//@route    POST /api/v1/users
//@access   Admin
export const createUser = asyncHandler(async (req , res , next) => {
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
    res.status(201).json({
        success: true ,
        data: user
    });
});

//@desc     Update User
//@route    PUT /api/v1/users/:userId
//@access   Admin
export const updateUserById = asyncHandler(async (req , res , next) => {
    let user = await User.findById(req.params.userId);
    if(!user) {
        return next(ErrorResponse(`There is no user with id of ${req.params.userId}` , 404));
    }
    user = await User.findByIdAndUpdate(req.params.userId , req.body , {
        new: true ,
        runValidators: true
    });
    res.status(200).json({
        success: true ,
        message: `User with id of ${req.params.userId} is updated successfully` ,
        data: user
    });
});

//@desc     Delete User
//@route    DELETE /api/v1/users/:userId
//@access   Admin
export const deleteUserById = asyncHandler(async (req , res , next) => {
    const user = await User.findById(req.params.userId);
    if(!user) {
        return next(new ErrorResponse(`There is no user with id of ${req.params.userId}` , 404));
    }
    await user.remove();
    res.status(200).json({
        success: true ,
        message: `User with id of ${req.params.userId} is deleted successfully`
    });
});