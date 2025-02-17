import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import VerifyResetTokenModel from '../../models/verifyResetTokenModel.js';
import { randomBytes } from 'crypto';
import sendEmail from '../../utils/sendEmail.js';

const domainURL = process.env.DOMAIN;

// $-title   Send password reset email link
// $-path    POST /api/v1/auth/reset_password_request
// $-auth    Public
const resetPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw Error('You must enter your email address');
  }

  const existingUser = await User.findOne({ email }).select('-passwordConfirm');

  if (!existingUser) {
    res.status(400);
    throw new Error('That email is not associated with any account');
  }

  let verificationToken = await VerifyResetTokenModel.findOne({
    _userId: existingUser._id,
  });

  if (verificationToken) {
    await verificationToken.deleteOne();
  }

  if (existingUser && existingUser.isEmailVerified) {
    const resetToken = await randomBytes(32).toString('hex');

    let newVerificationToken = await new VerifyResetTokenModel({
      _userId: existingUser._id,
      token: resetToken,
      createdAt: Date.now(),
    }).save();

    const emailLink = `${domainURL}/auth/reset_password?emailToken=${newVerificationToken.token}&userId=${existingUser._id}`;
    const payload = {
      name: existingUser.firstName,
      link: emailLink,
    };

    await sendEmail(
      existingUser.email,
      'Password Reset Request',
      payload,
      './emails/template/requestResetPassword.handlebars'
    );

    res.status(200).json({
      success: true,
      message: `Hey ${existingUser.firstName}, an email has been sent to your account with the password reset link`,
    });
  } else {
    res.status(401);
    throw new Error(
      'You are not yet verified your account, please verify your account first'
    );
  }
});

// $-title   Reset User Password
// $-path    POST /api/v1/auth/reset_password
// $-auth    Public
const resetPassword = asyncHandler(async (req, res) => {
  const { password, passwordConfirm, userId, emailToken } = req.body;

  if (!password) {
    res.status(400);
    throw new Error('A password is required');
  }

  if (!passwordConfirm) {
    res.status(400);
    throw new Error('A confirm password field is required');
  }

  if (password != passwordConfirm) {
    res.status(400);
    throw new Error('Passwords do not match');
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error('Passwords must be at least 8 characters long');
  }

  if (!emailToken || !userId) {
    res.status(400);
    throw new Error(
      'Your token is either invalid or expired. Try resetting your password again'
    );
  }

  const passwordResetToken = await VerifyResetTokenModel.findOne({
    _userId: userId,
    token: emailToken,
  });

  if (!passwordResetToken) {
    res.status(400);
    throw new Error(
      'Your token is either invalid or expired. Try resetting your password again b'
    );
  }

  const user = await User.findById({ _id: passwordResetToken._userId }).select(
    '-passwordConfirm'
  );

  if (user && passwordResetToken) {
    user.password = password;
    await user.save();

    const payload = {
      name: user.firstName,
    };

    await sendEmail(
      user.email,
      'Password Reset Success',
      payload,
      './emails/template/resetPassword.handlebars'
    );

    res.json({
      success: true,
      message: `Hi ${user.firstName},Your password reset was successful. An email has been sent to confirm the same`,
    });
  } else {
    res.status(400);
    throw new Error(
      'Your token is either invalid or expired. Try resetting your password again c'
    );
  }
});

export { resetPasswordRequest, resetPassword };
