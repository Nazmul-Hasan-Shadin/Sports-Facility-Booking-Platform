import { Document, Model } from "mongoose";

 
 export interface TUserName{
    firstName:string,
    middleName:string
    lastName:string,

 }


export interface TUser extends  Document {
  name: TUserName;
  email: string;
  password: string;
  phone: number;
  role: "admin" | "user";
  passwordChangedAt?:Date;
  isDeleted:Boolean,
  address: string;
};


export interface UserModel extends Model<TUser>{
  isUserExistWithCustomId(id:string):Promise<TUser>,
  isPasswordMatched(plainPassword:string,hashedPassword:string):Promise<boolean>,
  isJwtIssuedBefofunctionrePasswordChanged(passwordChangeTime:Date,jwtIssuedTime:number):Promise<boolean>
}

