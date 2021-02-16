import path from 'path'
import Bootcamp from '../models/Bootcamp.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import geocoder from '../utils/geocoder.js';

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
export const getBootcamps =  asyncHandler(async (req , res , next) => {
    res.status(200).json(res.advancedResults);
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

//@desc     Delete bootcamp with id
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
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
});

//@desc     Get all bootcamps within a radius
//@route    GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access   Public
export const getBootcampsWithinRadius = asyncHandler(async (req, res, next) => {
    const { zipcode , distance } = req.params;
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    const radius = distance / 3963

    //nb: Earth radius = 3963 mi / 6378 km
    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng , lat] , radius]
            }
        }
    });

    res.status(200).json({
        success: true ,
        count: bootcamps.length ,
        data: bootcamps
    });
});

//@desc     Upload bootcamp image
//@route    PUT /api/v1/bootcamps/:id/image
//@access   Private
export const uploadBootcampImage = asyncHandler(async (req , res , next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp) {
        return next(new ErrorResponse(`There is no bootcamp with id of ${req.params.id}` , 404));
    }
    if(!req.files) {
        return next(new ErrorResponse('Please upload an images file' , 400));
    }
    const file = req.files.file;
    if(!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse('Please upload an image file' , 400));
    }
    if(file.size > process.env.FILE_UPLOAD_SIZE) {
        return next(new ErrorResponse('Please upload an image with size smaller than 5MB' , 400));
    }
    file.name = `image_${bootcamp._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}` , async (err) => {
        if(err) {
            console.error(err);
            return next(new ErrorResponse('There is an error with file uploading.' , 500));
        }
        await Bootcamp.findByIdAndUpdate(req.params.id , {
            photo: file.name
        });
        res.status(200).json({
            success: true ,
            message: 'Your Bootcamp image is uploaded successfully'
        });
    });
    // console.log(req.files);
});