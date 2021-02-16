import Course from '../models/Course.js';
import Bootcamp from '../models/Bootcamp.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';

//@desc     Get all courses
//@route    GET /api/v1/courses
//@route    GET /api/v1/bootcamps/:bootcampId/courses
//@access   Public
export const getCourses = asyncHandler(async (req, res, next) => {
    let courses;
    if(req.params.bootcampId) {
        const bootcamp = await Bootcamp.findById(req.params.bootcampId);
        if(!bootcamp) {
            return next(new ErrorResponse(`There is no bootcamp with id of ${req.params.bootcampId}` , 404));
        }
        courses = await Course.find({ bootcamp: req.params.bootcampId });
    }
    else {
        courses = await Course.find().populate({
            path: 'bootcamp' ,
            select: 'name description'
        });
    }
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});

//@desc     Get single courses
//@route    GET /api/v1/courses/:id
//@access   Public
export const getCourseById = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp' ,
        select: 'name description'
    });
    if(!course) {
        return next(new ErrorResponse(`There is no course with id of ${req.params.id}` , 404));
    }
    res.status(200).json({
        success: true ,
        data: course
    });
});

//@desc     Create new course
//@route    POST /api/v1/bootcamps/:bootcampId/courses/
//@access   Private
export const createCourse = asyncHandler(async (req , res , next) => {
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if(!bootcamp) {
        return next(new ErrorResponse(`There is no bootcamp with id of ${req.params.id}` , 404));
    }
    const course = await Course.create(req.body);
    res.status(201).json({
        success: true ,
        message: `Your course is created successfully` ,
        data: course
    });
});

//@desc     Update course
//@route    PUT /api/v1/courses/:id
//@access   Private
export const updateCourseById = asyncHandler(async (req , res , next) => {
    let course = await Course.findById(req.params.id);
    if(!course) {
        return next(new ErrorResponse(`There is no course with id of ${req.params.id}` , 404));
    }
    course = await Course.findByIdAndUpdate(req.params.id , req.body , {
        new: true ,
        runValidators: true
    });
    res.status(200).json({
        success: true ,
        message: `Your course is updated successfully` ,
        data: course
    });
});

//@desc     Delete course
//@route    DELETE /api/v1/courses/:id
//@access   Private
export const deleteCourseById = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if(!course) {
        return next(new ErrorResponse(`There is no course with id of ${req.params.id}` , 404));
    }
    await course.remove();
    res.status(200).json({
        success: true ,
        message: 'Your course is deleted successfully' ,
        data: {}
    });
});