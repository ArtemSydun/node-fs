const { statusCode } = require("../helpers/constants.js");
const {
  getUsers,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../services/usersService.js");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getUsers();

    res.status(statusCode.OK).send(users);
  } catch (err) {
    next(err)
  }
};

const createUser = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const newUser = await addUser(userInfo);
    res.status(statusCode.CREATED).json(newUser);
  } catch (err) {
    throw err;
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await getUserById(id);

    if (!userById) {
      return next({
        status: statusCode.NOT_FOUND,
        message: `Not found user with id ${id}`,
      });
    }

    res.status(statusCode.OK).send(userById);
  } catch (err) {
    throw err;
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return next({
        status: statusCode.NOT_FOUND,
        message: `Not found user with id ${id}`,
      });
    }

    const updatedUser = await updateUserById(id, req.body);
    res.status(statusCode.OK).json(updatedUser);
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      return next({
        status: statusCode.NOT_FOUND,
        message: `Not found user with id ${id}`,
      }); 
    }

    res.status(statusCode.NO_CONTENT).send("Deleted successfully");
  } catch (err) {
    throw err;
  }
};

module.exports = { 
  getAllUsers,
   createUser,
   getUser,
   updateUser,
   deleteUser
 };
