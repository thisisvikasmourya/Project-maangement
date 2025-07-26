import {
  Request,
  Response,
} from 'express';

import { AuthRequest } from '../middlewares/auth.middleware';
import {
  getProfile,
  loginUser,
  registerUser,
} from '../services/auth.service';
import {
  loginSchema,
  registerSchema,
} from '../validations/auth.validation';

export const registerController = async (req: Request, res: Response) => {
  try {
    const validated = registerSchema.parse(req.body);
    const user = await registerUser(validated);
    res
      .status(201)
      .json({ success: true, message: "User created", data: user });
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error?.message,
      data: "",
    });
  }
};


export const loginController = async(req:Request,res:Response)=>{
    try {
        const validated = loginSchema.parse(req.body)
        const user = await loginUser(validated);
        res.status(200).json({success:true,message:"User login successfuly",data:{email:user.email,token:user.token}})
    } catch (error) {
       res.status(400).json({
      success: false,
      message: error,
      data: "",
    });
    }
}

export const getProfileController = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getProfile(req.user?.id!)
    res.status(200).json({ user })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}
