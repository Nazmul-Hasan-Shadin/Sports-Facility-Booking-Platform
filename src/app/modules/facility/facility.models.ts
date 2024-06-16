import { TFacility } from './facility.interface';
import mongoose, { model } from "mongoose";

const facilitySchema= new mongoose.Schema<TFacility>({
   name:{
    type:String,
    require:[true,'Title is required']
   },
   description:{
    type:String,
    require:[true,'Title is required']
   },
   pricePerHour:{
    type:Number,
    require:[true,'Title is required']
   },
   location:{
    type:String,
    require:[true,'location is required']
   },
   isDeleted:{
    type:Boolean,
    default:false
    
   }
})
export const Facility= model<TFacility>('Facility',facilitySchema)