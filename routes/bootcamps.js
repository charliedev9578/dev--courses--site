import express from 'express';
import {
    getBootcamps ,
    getBootcampById ,
    createNewBootcamp ,
    updateBootcampById ,
    deleteBootcampById
} from '../controllers/bootcamps.js';

const router = express.Router();

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