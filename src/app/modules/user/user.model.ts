import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

export const userSchema= new Schema<TUser>({
   name:{
    type:String,
    required:[true,'Name is required']
   },
   email:{
    type:String,
    required:[true,'email is required']
   },
   password:{
    type:String,
    required:[true,'Password is required']
   },
   phone:{
    type:Number,
    required:[true,'phone is required']
   },
   address:{
    type:String,
    required:[true,'address is required']
   }
},
{
    timestamps:true
})


export const User= model<TUser>('User',userSchema)