const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

const users = path.join(__dirname, "../model/users.json");

const getUsers = async () => {
  try {
    const data = await fs.readFile(users, "utf-8");
    const parsedUsersList = JSON.parse(data);
    return parsedUsersList;
  } catch (err) {
    throw err;
  }
};

const addUser = async (userInfo) => {
  try {
    const newUser = {
      id: uuidv4(),
      ...userInfo,
    };
    const existingUsersData = await fs.readFile(users, "utf8");
    const existingUsers = JSON.parse(existingUsersData);
    existingUsers.push(newUser);

    await fs.writeFile(users, JSON.stringify(existingUsers), "utf8");
    return newUser;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const usersList = await getUsers();
    const userById = usersList.find((user) => user.id == id);

    return userById;
  } catch (err) {
    throw err;
  }
};

const updateUserById = async (id, body) => {
  try {
    const userToUpdate = await getUserById(id);
    const usersList = await getUsers();
    const updatedUser = { ...userToUpdate, ...body };
    const updatedUsersList = usersList.map((user) =>
      user.id == id ? updatedUser : user
    );
    await fs.writeFile(users, JSON.stringify(updatedUsersList), "utf8");
    return updatedUser;
  } catch (err) {
    throw err;
  }
};

const deleteUserById = async (id) => {
  try {
    const userToDelete = await getUserById(id);
    const usersList = await getUsers();
    const updatedUsersList = usersList.filter((user) => user.id !== id);

    await fs.writeFile(users, JSON.stringify(updatedUsersList), "utf8");

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
