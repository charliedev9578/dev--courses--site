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
import { protect } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });


router
    .route('/')
    .get(advancedResults(Course , { path: 'bootcamp' , select: 'name description' }) , getCourses)
    .post(protect , createCourse)

router
    .route('/:id')
    .get(getCourseById)
    .put(protect , updateCourseById)
    .delete(protect , deleteCourseById);

export default router;