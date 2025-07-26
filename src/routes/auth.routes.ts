import { Router } from 'express';

import {
  getProfileController,
  loginController,
  registerController,
} from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", authenticate, getProfileController);
export default router;
