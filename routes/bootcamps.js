import express from 'express';
import {
    getBootcamps ,
    getBootcampById ,
    createNewBootcamp ,
    updateBootcampById ,
    deleteBootcampById ,
    getBootcampsWithinRadius
} from '../controllers/bootcamps.js';

const router = express.Router();

router
    .route('/radius/:zipcode/:distance')
    .get(getBootcampsWithinRadius);

router
    .route('/')
    .get(getBootcamps)
    .post(createNewBootcamp)

router
    .route('/:id')
    .get(getBootcampById)
    .put(updateBootcampById)
    .delete(deleteBootcampById);

export default router