import express from 'express';
import {
    getReviews ,
    getReviewById ,
    createReview
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
    .get(getReviewById);

export default router