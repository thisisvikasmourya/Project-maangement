import { User } from '../models/user.model';
import { getPagination } from '../utils/pagination';

export const getAllUsersService = async (search = "", page = 1, limit = 10) => {
  const { skip } = getPagination(page, limit);
  const query = {
    deleted: false,
    name: { $regex: search, $options: "i" },
  };
  const users = await User.find(query).skip(skip).limit(limit).select("name email role avatar");
  const total = await User.countDocuments(query);
  return { users, total };
};

export const getUserByIdService = async (id: string) => {
  return await User.findById(id).where({ deleted: false }).select("-password");
};

export const updateUserService = async (id: string, data: any) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUserService = async (id: string) => {
  return await User.findByIdAndUpdate(id, { deleted: true });
};

export const updateUserRoleService = async (id: string, role: string) => {
  return await User.findByIdAndUpdate(id, { role }, { new: true });
};

export const updateAvatarService = async (id: string, path: string) => {
  return await User.findByIdAndUpdate(id, { avatar: path }, { new: true });
};
