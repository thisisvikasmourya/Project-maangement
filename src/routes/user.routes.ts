import { Router } from 'express';

import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateAvatar,
  updateUserById,
  updateUserRole,
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { upload } from '../utils/upload';

const router = Router()

router.get("/", authenticate, getAllUsers)
router.get("/:id", authenticate, getUserById);
router.patch("/:id", authenticate, updateUserById);
router.delete("/:id", authenticate, deleteUserById);
router.patch("/:id/role", authenticate, updateUserRole);
router.patch('/users/:id/avatar', upload.single('avatar'), updateAvatar);

export default router
