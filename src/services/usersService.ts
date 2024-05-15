import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import { User } from '../types/User';

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

const addUser = async (userInfo: User) => {
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

const getUserById = async (id: string) => {
  try {
    const usersList = await getUsers();
    const userById = usersList.find((user: User) => user.id == id);

    return userById;
  } catch (err) {
    throw err;
  }
};

const updateUserById = async (id: string, body: User) => {
  try {
    const userToUpdate = await getUserById(id);
    const usersList = await getUsers();
    const updatedUser = { ...userToUpdate, ...body };
    const updatedUsersList = usersList.map((user: User) =>
      user.id == id ? updatedUser : user
    );
    await fs.writeFile(users, JSON.stringify(updatedUsersList), "utf8");
    return updatedUser;
  } catch (err) {
    throw err;
  }
};

const deleteUserById = async (id: string) => {
  try {
    const userToDelete = await getUserById(id);
    const usersList = await getUsers();
    const updatedUsersList = usersList.filter((user: User) => user.id !== id);

    await fs.writeFile(users, JSON.stringify(updatedUsersList), "utf8");

    return userToDelete;
  } catch (err) {
    throw err;
  }
};

export const userService = {
  getUsers,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
