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
        courses = await Course.find();
    }
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});