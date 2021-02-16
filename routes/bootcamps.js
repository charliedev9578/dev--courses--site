import express from 'express';
import {
    getBootcamps ,
    getBootcampById ,
    createNewBootcamp ,
    updateBootcampById ,
    deleteBootcampById ,
    getBootcampsWithinRadius ,
    uploadBootcampImage
} from '../controllers/bootcamps.js';
import courseRouter from './courses.js';

const router = express.Router();

import advancedResults from '../middleware/advancedResults.js'
import Bootcamp from '../models/Bootcamp.js';

router.use('/:bootcampId/courses' , courseRouter);

router
    .route('/:id/image')
    .put(uploadBootcampImage);

router
    .route('/radius/:zipcode/:distance')
    .get(getBootcampsWithinRadius);

router
    .route('/')
    .get(advancedResults(Bootcamp , { path: 'courses' , select: 'title , description , tuition' }) , getBootcamps)
    .post(createNewBootcamp)

router
    .route('/:id')
    .get(getBootcampById)
    .put(updateBootcampById)
    .delete(deleteBootcampById);

export default router