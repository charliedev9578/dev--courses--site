import Bootcamp from '../models/Bootcamp.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
export const getBootcamps =  asyncHandler(async (req , res , next) => {
    const bootcamps = await Bootcamp.find();
    console.log(process.env.GEOCODER_API_KEY);
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
        
})

//@desc     Get single Bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
export const getBootcampById = asyncHandler(async (req , res , next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp) {
        return next(new ErrorResponse(`There is no resource with id ${req.params.id}` , 404))
    }
    res.status(200).json({
        success: true,
        data: bootcamp
    });
})

//@desc     Create a new Bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
export const createNewBootcamp = asyncHandler(async (req , res , next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        success: true ,
        message: 'Your bootcamp is created successfully' ,
        data: bootcamp
    });
        
})

//@desc     Update a Bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
export const updateBootcampById = asyncHandler(async (req , res , next) => {
    let bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp) {
        return next(new ErrorResponse(`There is no resource with id ${req.params.id}` , 404))
    }
    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id , req.body , {
        new: true ,
        runValidators: true
    });
    res.status(200).json({
        success: true ,
        data: bootcamp
    })
})

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
export const deleteBootcampById = asyncHandler(async (req , res , next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp) {
        return next(new ErrorResponse(`There is no resource with id ${req.params.id}` , 404));
    }
    await bootcamp.remove();
    res.status(200).json({
        success: true ,
        message: `Bootcamp with id of ${req.params.id} is deleted successfully`
    })
})