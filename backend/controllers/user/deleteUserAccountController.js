import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// $-title   Delete User Account
// $-path    DELETE /api/v1/user/:id
// $-auth    Private/Admin
// an admin user can delete any other user account
const deleteUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (user) {
    res.json({
      success: true,
      message: `User ${user.firstName} deleted successfully`,
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

export default deleteUserAccount;
