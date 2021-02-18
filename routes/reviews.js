import express from 'express';
import {
    getReviews ,
    getReviewById ,
    createReview ,
    updateReviewById ,
    deleteReviewById
} from '../controllers/reviews.js';

import advancedResults from '../middleware/advancedResults.js';
import Review from '../models/Review.js';
import { protect , authorize } from '../middleware/auth.js';


const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(advancedResults(Review , {
        path: 'bootcamp' ,
        select: 'name description'
    }) , getReviews)
    .post(protect , authorize('user' , 'admin') , createReview);

router
    .route('/:id')
    .get(getReviewById)
    .put(protect , authorize('user') , updateReviewById)
    .delete(protect , authorize('user' , 'admin') , deleteReviewById);

export default router