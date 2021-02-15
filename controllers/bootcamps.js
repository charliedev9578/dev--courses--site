import Bootcamp from '../models/Bootcamp.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import geocoder from '../utils/geocoder.js';

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
export const getBootcamps =  asyncHandler(async (req , res , next) => {
    let query;
    const removeFields = ['select' , 'page' , 'limit' , 'sort'];
    let reqQuery = { ...req.query };
    removeFields.forEach(param => delete reqQuery[param]);
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte|in)\b/g , match => `$${match}`);
    query = Bootcamp.find(JSON.parse(queryStr));

    if(req.query.select) {
        query = query.select(req.query.select.split(',').join(' '));
    }

    if(req.query.sort) {
        query = query.sort(req.query.sort.split(',').join(' '));
    }
    else {
        query = query.sort('-createdAt');
    }

    const page = parseInt(req.query.page , 10) || 1;
    const limit = parseInt(req.query.limit , 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const bootcamps = await query;

    let pagination = {};
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1 ,
            limit
        }
    }
    if(endIndex < total) {
        pagination.next = {
            page: page + 1 ,
            limit
        }
    }
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        pagination ,
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