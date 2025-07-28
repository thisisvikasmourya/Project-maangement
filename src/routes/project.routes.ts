import { Router } from 'express';

import {
  createProject,
  deleteProject,
  projectLists,
  updateProject,
} from '../controllers/project.controller';
import { authenticate } from '../middlewares/auth.middleware';

// import { getProjectsList } from '../services/project.service';

const router = Router()

router.post("/", authenticate, createProject)

router.get("/", authenticate, projectLists);
router.patch("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);

// router.patch("/:id", authenticate, updateUserById);
// router.delete("/:id", authenticate, deleteUserById);
// router.patch("/:id/role", authenticate, updateUserRole);
// router.patch('/users/:id/avatar', upload.single('avatar'), updateAvatar);

export default router
