import express from 'express';
import checkAuth from '../middleware/checkAuthMiddleware.js';
import getUserProfile from '../controllers/user/getUserProfileController.js';
import updateUserProfile from '../controllers/user/updateUserProfileController.js';
import deleteMyAccount from '../controllers/user/deleteMyAccountController.js';
import role from '../middleware/roleMiddleware.js';
import getAllUserAccounts from '../controllers/user/getAllUserAccountsController.js';

const router = express.Router();

router
  .route('/profile')
  .get(checkAuth, getUserProfile)
  .put(checkAuth, updateUserProfile)
  .delete(checkAuth, deleteMyAccount);

router
  .route('/all')
  .get(checkAuth, role.checkRole(role.ROLES.Admin), getAllUserAccounts);

export default router;
