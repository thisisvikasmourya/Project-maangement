import {
  Request,
  Response,
} from 'express';

import * as userService from '../services/user.service';
import {
  updateRoleSchema,
  updateUserSchema,
} from '../validations/user.validation';

interface MulterRequest extends Request {
  file: Express.Multer.File;
}




export const getAllUsers = async (req: Request, res: Response) => {
  const { page = "1", limit = "10", search = "" } = req.query;

  const result = await userService.getAllUsersService(search as string, +page, +limit);
  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserByIdService(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
};

export const updateUserById = async (req: Request, res: Response) => {
  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      errors: parsed.error,
    });
  }

  const user = await userService.updateUserService(req.params.id, parsed.data);

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
};

export const deleteUserById = async (req: Request, res: Response) => {
  await userService.deleteUserService(req.params.id);

  return res.status(200).json({
    success: true,
    message: "User soft deleted successfully",
  });
};

export const updateUserRole = async (req: Request, res: Response) => {
  const parsed = updateRoleSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid role data",
      errors: parsed.error,
    });
  }

  const user = await userService.updateUserRoleService(req.params.id, parsed.data.role);

  return res.status(200).json({
    success: true,
    message: "User role updated successfully",
    data: user,
  });
};

export const updateAvatar = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const user = await userService.updateAvatarService(req.params.id, req.file.path);

  return res.status(200).json({
    success: true,
    message: "Avatar updated successfully",
    data: user,
  });
};
