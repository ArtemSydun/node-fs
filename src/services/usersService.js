const { User } = require('../model/userModel.js');

const getUsers = async () => {
  try {
    const usersList = await User.find();
    return usersList;
  } catch (err) {
    throw err;
  }
};

const addUser = async (userInfo) => {
  try {
    const newUser = await User.create(userInfo);
    return newUser;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const userById = await User.findById(id);

    return userById;
  } catch (err) {
    throw err;
  }
};

const updateUserById = async (id, body) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: body }, { new: true });
    return updatedUser;
  } catch (err) {
    throw err;
  }
};

const deleteUserById = async (id) => {
  try {
    const userToDelete = await User.findByIdAndDelete(id);
    return userToDelete;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUsers,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
