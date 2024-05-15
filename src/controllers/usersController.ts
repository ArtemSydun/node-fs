import { statusCode } from '../helpers/constants';
import { Request, Response, NextFunction } from 'express';
import { userService } from "../services/usersService";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();

    res.status(statusCode.OK).send(users);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInfo = req.body;
    const newUser = await userService.addUser(userInfo);
    res.status(statusCode.CREATED).json(newUser);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userById = await userService.getUserById(id);

    if (!userById) {
      return next({
        status: statusCode.NOT_FOUND,
        message: `Not found user with id ${id}`,
      });
    }

    res.status(statusCode.OK).send(userById);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      return next({
        status: statusCode.NOT_FOUND,
        message: `Not found user with id ${id}`,
      });
    }

    const updatedUser = await userService.updateUserById(id, req.body);
    res.status(statusCode.OK).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deletedUser = await userService.deleteUserById(id);

    if (!deletedUser) {
      return next({
        status: statusCode.NOT_FOUND,
        message: `Not found user with id ${id}`,
      });
    }

    res.status(statusCode.NO_CONTENT).send("Deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const userController = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
