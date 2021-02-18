import express from 'express'
import User from '../models/User.js';
const router = express.Router();
import advancedResults from '../middleware/advancedResults.js';

import { protect , authorize } from '../middleware/auth.js';

import {
    getUsers ,
    getUserById,
    createUser,
    updateUserById ,
    deleteUserById
} from '../controllers/users.js';

router.use(protect);
router.use(authorize('admin'));

router
    .route('/')
    .get(advancedResults(User) , getUsers)
    .post(createUser);

router
    .route('/:userId')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

export default router