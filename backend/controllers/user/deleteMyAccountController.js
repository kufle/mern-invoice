import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

const deleteMyAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await User.findByIdAndDelete(userId);

  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });

  res.json({ success: true, message: 'Your user account has been deleted' });
});

export default deleteMyAccount;
