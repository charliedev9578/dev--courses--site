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
import { protect , authorize } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });


router
    .route('/')
    .get(advancedResults(Course , { path: 'bootcamp' , select: 'name description' }) , getCourses)
    .post(protect , authorize('publisher' , 'admin') , createCourse)

router
    .route('/:id')
    .get(getCourseById)
    .put(protect , authorize('publisher' , 'admin') , updateCourseById)
    .delete(protect , authorize('publisher' , 'admin') , deleteCourseById);

export default router;