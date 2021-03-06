import express from 'express';
import {
    userRegister ,
    userLogin ,
    getMe ,
    forgotPassword ,
    resetPassword ,
    updateDetails ,
    updatePassword
} from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router
    .route('/updatepassword')
    .put(protect , updatePassword);

router
    .route('/updatedetails')
    .put(protect , updateDetails)

router
    .route('/resetpassword/:resetToken')
    .post(resetPassword);

router
    .route('/forgotpassword')
    .post(forgotPassword);

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