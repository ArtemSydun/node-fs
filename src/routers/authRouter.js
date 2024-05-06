const express = require("express");
const { asyncWrapper } = require('../helpers/apiWrapper.js');

const router = express.Router();

const {
  registerUserController,
  loginUserController,
  verifyUserController,
  resendUserVerification,
  forgotPasswordController
} = require("../controllers/authController.js");

const {
  validateCreateUser,
  validateCredentialsUser,
} = require('../middlewares/authValidation.js');


router.post('/verify', asyncWrapper(resendUserVerification));

router.get('/verify/:code', asyncWrapper(verifyUserController));

router.post('/signUp', validateCreateUser, asyncWrapper(registerUserController));

router.post('/signIn', validateCredentialsUser, asyncWrapper(loginUserController));

router.post('/resetPassword', asyncWrapper(forgotPasswordController));

module.exports = router;
