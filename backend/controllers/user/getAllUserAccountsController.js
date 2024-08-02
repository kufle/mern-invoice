import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// $-title   Get All Users
// $-path    GET /api/v1/user/all
// $-auth    Private/Admin
const getAllUserAccounts = asyncHandler(async (req, res) => {
  const pageSize = 10;

  const page = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments();
});

export default getAllUserAccounts;
