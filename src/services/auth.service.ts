import bcrypt from 'bcryptjs';

import { User } from '../models/user.model';
import { RegisterInput } from '../types/user.types';

export const registerUser = async(data:RegisterInput)=>{
    const existing = await User.findOne({email:data.email})
    if(existing){
        throw new Error("User already exists")
    }

    const hashed = await bcrypt.hash(data.password,10)
    const newUser = await User.create({...data,password:hashed})
    return newUser
}