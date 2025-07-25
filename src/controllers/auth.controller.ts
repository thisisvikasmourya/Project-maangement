import {
  Request,
  Response,
} from 'express';

import { registerUser } from '../services/auth.service';
import { registerSchema } from '../validations/auth.validation';

export const registerController = async (req: Request, res: Response) => {
  try {
    const validated = registerSchema.parse(req.body);
    const user = await registerUser(validated);
    res
      .status(201)
      .json({ success: true, message: "User created", data: user });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
      data: "",
    });
  }
};
