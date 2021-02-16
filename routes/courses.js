import express from 'express';
import {
    getCourses ,
    getCourseById ,
    createCourse,
    updateCourseById ,
    deleteCourseById
} from '../controllers/courses.js';

const router = express.Router({ mergeParams: true });


router
    .route('/')
    .get(getCourses)
    .post(createCourse)

router
    .route('/:id')
    .get(getCourseById)
    .put(updateCourseById)
    .delete(deleteCourseById);

export default router;