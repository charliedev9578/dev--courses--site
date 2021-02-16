import express from 'express';
import {
    getCourses ,
    getCourseById ,
    createCourse,
    updateCourseById ,
    deleteCourseById
} from '../controllers/courses.js';

import advancedResults from '../middleware/advancedResults.js';
import Course from '../models/Course.js';

const router = express.Router({ mergeParams: true });


router
    .route('/')
    .get(advancedResults(Course , { path: 'bootcamp' , select: 'name description' }) , getCourses)
    .post(createCourse)

router
    .route('/:id')
    .get(getCourseById)
    .put(updateCourseById)
    .delete(deleteCourseById);

export default router;