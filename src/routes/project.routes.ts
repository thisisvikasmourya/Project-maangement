import { Router } from 'express';

import { createProject } from '../controllers/project.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router()

router.post("/", authenticate, createProject)

// router.get("/:id", authenticate, getUserById);
// router.patch("/:id", authenticate, updateUserById);
// router.delete("/:id", authenticate, deleteUserById);
// router.patch("/:id/role", authenticate, updateUserRole);
// router.patch('/users/:id/avatar', upload.single('avatar'), updateAvatar);

export default router
