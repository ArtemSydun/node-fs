const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController.js");

const {
  validateCreateUser,
  validateUpdateUser
} = require('../middlewares/usersValidation')


router.get("/", getAllUsers);

router.get("/:id", getUser);

router.post("/", validateCreateUser, createUser);

router.put("/:id", validateUpdateUser, updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
