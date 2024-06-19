import { Model } from "mongoose";

 
 export interface TUserName{
    firstName:string,
    middleName:string
    lastName:string,

 }


export type TUser = {
  name: TUserName;
  email: string;
  password: string;
  phone: number;
  role: "admin" | "user";,
  isDeleted:Boolean,
  address: string;
};


export interface UserModel extends Model<TUser>{
  isUserExistWithCustomId(id:string):Promise<TUser>,
  isPasswordMatched(plainPassword:string,hashedPassword:string):Promise<boolean>
}

