import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import {
  LoginInput,
  RegisterInput,
} from '../utils/user.types';

export const registerUser = async(data:RegisterInput)=>{
    const existing = await User.findOne({email:data.email})
    if(existing){
        throw new Error("User already exists")
    }

    const hashed = await bcrypt.hash(data.password,10)
    const newUser = await User.create({...data,password:hashed})
    return newUser
}


export const loginUser = async(data:LoginInput)=>{
    const existingUser = await User.findOne({email:data.email})
    if(!existingUser){
        throw new Error("Invalid Credintails")
    }
    const isMatch = await bcrypt.compare(data.password,existingUser.password)
    if(!isMatch){
        throw new Error("Invalid Credintails")
    }

    const token = Jwt.sign({
        id:existingUser._id,
        email:existingUser.email,
        role:existingUser.role
    },process.env.SECRET_TOKEN!,{expiresIn:"1d"})

    return {token,email:existingUser.email}
}

export const getProfile = async (id: string) => {
  const user = await User.findById(id).select('-password') // exclude password
  if (!user) {
    throw new Error('User not found')
  }
  return user
}
