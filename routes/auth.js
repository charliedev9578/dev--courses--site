import express from 'express';
import {
    userRegister ,
    userLogin ,
    getMe
} from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router
    .route('/me')
    .get(protect , getMe);

router
    .route('/register')
    .post(userRegister);

router
    .route('/login')
    .post(userLogin);

export default router