import express from 'express'
import { User } from './user.model'
import { AppError } from '../../errors/AppError';
import { TUser } from './user.interface';
const getUserFromDb=async(email:string)=>{
    if (email) {
      const user = await User.isUserExistWithCustomId(email);
      if (!user) {
         throw new AppError(404,'User does not exist')
      }
      return user
    }
    return 'User not found'
}

const createAdminIntoDb= async (payload: TUser) => {
   payload.role='admin'
  const createUser = await User.create(payload)
  const result= await User.findById(createUser._id).select('-createdAt -updatedAt -__v -password');
  return result;
};


export const UserServices={
  getUserFromDb,
  createAdminIntoDb
}