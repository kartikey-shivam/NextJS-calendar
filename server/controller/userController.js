const catchAsync = require('../utils/catchAsync');
const crypto = require('crypto');
const AppError = require('../utils/appError');
const User = require('../model/userModel');
const createSendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

//Register User
exports.registerUser = catchAsync(async (req, res, next) => {
  console.log('body');
  const { Username, Email, Password } = req.body;
  console.log(Username, Email, Password, 'body');
  const user = await User.create({
    Username,
    Email,
    Password,
  });
  console.log(user);
  createSendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsync(async (req, res, next) => {
  const { Email, Password } = req.body;
  console.log(req.body, 'body');
  if (!Email || !Password) {
    return next(new AppError('Please provide Email or Password', 400));
  }
  const user = await User.findOne({ Email }).select('+Password');
  console.log(user, 'user');
  if (!user) {
    return next(new AppError('Invalid Email or Password', 401));
  }

  const isPasswordValid = user.comparePassword(Password);
  if (!isPasswordValid) {
    console.log(isPasswordValid, 'hello');
    return next(new AppError('Invalid Email or Password', 401));
  }
  createSendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchAsync(async (req, res, next) => {
  res.cookie('token', null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

//Forgot Password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ Email: req.body.Email });

  if (!user) {
    return next(new AppError('User not found'), 404);
  }
  const resetToken = user.createResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/Password/reset/${resetToken}`;

  const message = `Your reset Password token is \n\n ${resetURL} \n\n. If you have not requested this Email, please ignore it.`;

  try {
    await sendEmail({
      Email: user.Email,
      subject: 'Reset Password Email',
      message,
    });

    res.status(200).json({
      success: true,
      message: 'Reset Password Email sent successfully',
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new AppError(err.message, 500));
  }
});

//Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const resetToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await Usre.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('The reset token is invalid or expired.'), 400);
  }

  if (req.body.Password !== req.body.confirmPassword) {
    return next(new AppError('Password does not match'), 400);
  }
  user.Password = req.body.Password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

//Get User details
exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//update User Password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+Password');
  const isPasswordMatch = user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatch) {
    return next(new AppError('Old Password does not match'), 400);
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new AppError('Password does not match'), 400);
  }

  user.Password = req.body.newPassword;

  await user.save();

  createSendToken(user, 200, res);
});

//update User details
exports.updateProfile = catchAsync(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    Email: req.body.Email,
  };

  //update avatar --todo

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });
});

//Get all Users -- Admin
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get single User -- Admin
exports.getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('User does not exist'), 400);
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//update User Profile -- Admin
exports.updateUser = catchAsync(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    Email: req.body.Email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });
});

//delete User --Admin
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('User does not exist'), 400);
  }
  // remove avatar
  await user.remove();
  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});
