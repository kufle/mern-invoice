import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// $-title   Update User Profile
// $-path    PATCH /api/v1/user/profile
// $-auth    Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { firstName, lastName, phoneNumber } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error('That user does not exist in our system');
  }

  const updateProfile = await User.findByIdAndUpdate(
    userId,
    {
      firstName,
      lastName,
      phoneNumber,
    },
    { new: true, runValidators: true }
  ).select('-refreshToken');

  res.status(200).json({
    success: true,
    message: `${user.firstName}, your profile was successfully updated`,
    updateProfile,
  });
});

export default updateUserProfile;
