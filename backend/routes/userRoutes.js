import express from 'express';
import checkAuth from '../middleware/checkAuthMiddleware.js';
import getUserProfile from '../controllers/user/getUserProfileController.js';
import updateUserProfile from '../controllers/user/updateUserProfileController.js';
import deleteMyAccount from '../controllers/user/deleteMyAccountController.js';
import role from '../middleware/roleMiddleware.js';
import getAllUserAccounts from '../controllers/user/getAllUserAccountsController.js';
import deleteUserAccount from '../controllers/user/deleteUserAccountController.js';
import deactivateUser from '../controllers/user/deactivateUserController.js';

const router = express.Router();

router
  .route('/profile')
  .get(checkAuth, getUserProfile)
  .patch(checkAuth, updateUserProfile)
  .delete(checkAuth, deleteMyAccount);

// ADMIN ONLY
router
  .route('/all')
  .get(checkAuth, role.checkRole(role.ROLES.Admin), getAllUserAccounts);
// ADMIN ONLY
router
  .route('/:id')
  .delete(checkAuth, role.checkRole(role.ROLES.Admin), deleteUserAccount);

router
  .route('/:id/deactivate')
  .patch(checkAuth, role.checkRole(role.ROLES.Admin), deactivateUser);

export default router;
