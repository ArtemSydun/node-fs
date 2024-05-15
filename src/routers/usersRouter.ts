import { userController } from '../controllers/usersController';

const express = require("express");

const router = express.Router();


const {
  validateCreateUser,
  validateUpdateUser
} = require('../middlewares/usersValidation')


router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUser);

router.post("/", validateCreateUser, userController.createUser);

router.put("/:id", validateUpdateUser, userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;
