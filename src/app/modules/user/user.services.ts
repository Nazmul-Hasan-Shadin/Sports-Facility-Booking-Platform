import express from 'express'
import { User } from './user.model'
import { AppError } from '../../errors/AppError';
const getUserFromDb=async(email:Record<string,unknown>)=>{
    const user = await User.isUserExistWithCustomId(email);
     if (!user) {
        throw new AppError(404,'User does not exist')
     }
     return user
}



export const UserServices={
  getUserFromDb
}