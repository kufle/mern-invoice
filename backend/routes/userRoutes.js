import express from 'express';
import checkAuth from '../middleware/checkAuthMiddleware.js';
import getUserProfile from '../controllers/user/getUserProfileController.js';
import updateUserProfile from '../controllers/user/updateUserProfileController.js';

const router = express.Router();

router
  .route('/profile')
  .get(checkAuth, getUserProfile)
  .put(checkAuth, updateUserProfile);

export default router;
