import express from 'express';
import {
    userRegister ,
    userLogin
} from '../controllers/auth.js';
const router = express.Router();

router
    .route('/register')
    .post(userRegister);

router
    .route('/login')
    .post(userLogin);

export default router