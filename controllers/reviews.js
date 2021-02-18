import Bootcamp from '../models/Bootcamp.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';

//@desc     Get all reviews
//@route    GET /api/v1/reviews
//@route    GET /api/v1/bootcamps/:bootcampId/reviews
//@access   Public
export const getReviews = asyncHandler(async (req, res, next) => {
    let reviews;
    if(req.params.bootcampId) {
        const bootcamp = await Bootcamp.findById(req.params.bootcampId);
        if(!bootcamp) {
            return next(new ErrorResponse(`There is no bootcamp with id of ${req.params.bootcampId}` , 404));
        }
        reviews = await Review.find({ bootcamp: req.params.bootcampId });
        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    }
    else {
        res.status(200).json(res.advancedResults);
    }
});

//@desc     Get single review
//@route    GET /api/v1/reviews/:id
//@access   Public
export const getReviewById = asyncHandler(async (req , res , next) => {
    const review = await Review.findById(req.params.id)
        .populate({
            path: 'bootcamp' ,
            select: 'name description'
        })
        .populate({
            path: 'user' ,
            select: 'name'
        });
    if(!review) {
        return next(new ErrorResponse(`There is no review with id of ${req.params.id}` , 404));
    }
    res.status(200).json({
        success: true ,
        data: review
    });
});

//@desc     Add a review
//@route    GET /api/v1/bootcamps/:bootcampId/reviews
//@access   Private
export const createReview = asyncHandler(async (req , res , next) => {
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if(!bootcamp) {
        return next(new ErrorResponse(`There is no bootcamp with id of ${req.params.bootcampId}` , 404));
    }
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;
    //HACK:
    //nb: To this process we added the index to the ReviewSchema.
    /* let review = await Review.findOne({ user: req.user.id , bootcamp: req.params.bootcampId });
    if(review && req.user.role !== 'admin') {
        return next(new ErrorResponse(`You are already added a review for this bootcamp with id of ${req.params.bootcampId}` , 400));
    } */
    const review = await Review.create(req.body);
    res.status(201).json({
        success: true ,
        message: 'Your review is added' ,
        data: review
    });
});

//@desc     Update a review
//@route    PUT /api/v1/reviews/:id
//@access   Private
export const updateReviewById = asyncHandler(async (req, res , next) => {
    let review = await Review.findById(req.params.id);
    if(!review) {
        return next(new ErrorResponse(`There is no review with id of ${req.params.id}` , 404));
    }
    if(review.user.toString() !== req.user.id) {
        return next(new ErrorResponse('Unauthorized actions' , 401));
    }
    review = await Review.findByIdAndUpdate(req.params.id , req.body , {
        new: true ,
        runValidators: true
    });
    res.status(200).json({
        success: true ,
        message: 'Your review is updated' ,
        data: review
    });
});

//@desc     Delete a review
//@route    DELETE /api/v1/reviews/:id
//@access   Private
export const deleteReviewById = asyncHandler(async (req, res , next) => {
    const review = await Review.findById(req.params.id);
    if(!review) {
        return next(new ErrorResponse(`There is no review with id of ${req.params.id}` , 404));
    }
    if(review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse('Unauthorized actions' , 401));
    }
    await review.remove();
    res.status(200).json({
        success: true ,
        message: 'Your review is deleted successfully'
    });
});